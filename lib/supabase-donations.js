import { createClient } from '@supabase/supabase-js'

// NOTE: This file is LEGACY - donations now use the Hostinger MySQL backend
// These Supabase clients are only created at runtime to avoid build issues

// Lazy initialization to avoid build-time errors
let _supabaseAdmin = null
let _supabase = null

function getSupabaseAdmin() {
  if (_supabaseAdmin) return _supabaseAdmin

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (supabaseUrl && supabaseServiceKey) {
    _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
  }
  return _supabaseAdmin
}

function getSupabase() {
  if (_supabase) return _supabase

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseAnonKey) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey)
  }
  return _supabase
}

// Export getters for backwards compatibility
export const supabaseAdmin = { get: getSupabaseAdmin }
export const supabase = { get: getSupabase }

// Donation Categories
export const DONATION_CATEGORIES = {
  'fws': {
    id: 'fws',
    name: 'Family World School Cooperative Learners',
    description: 'Supports individual learners in the Family World School Cooperative through tuition support, technology fees, books, and educational events and activities.',
    goal: 50000,
    current: 0
  },
  'partner-schools': {
    id: 'partner-schools',
    name: 'FWS Partner Schools',
    description: 'Supports infrastructure, technology, and other costs to build and maintain quality learning environments across FWS partner schools on the African continent.',
    goal: 75000,
    current: 0
  },
  'language-councils': {
    id: 'language-councils',
    name: 'Language Councils',
    description: 'Supports the creation and maintenance of language councils and initiatives for indigenous African languages.',
    goal: 30000,
    current: 0
  }
}

// Database Schema Setup (run this once in Supabase SQL editor)
export const DONATIONS_SCHEMA = `
-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  confirmation_number TEXT UNIQUE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
  currency TEXT DEFAULT 'USD',
  donation_type TEXT NOT NULL CHECK (donation_type IN ('one-time', 'monthly')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method TEXT CHECK (payment_method IN ('card', 'paypal', 'bank')),
  
  -- Donor information
  donor_email TEXT NOT NULL,
  donor_first_name TEXT,
  donor_last_name TEXT,
  donor_phone TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  
  -- Category allocation (JSON array of {category_id, amount})
  category_allocations JSONB NOT NULL DEFAULT '[]',
  
  -- Stripe/PayPal transaction details
  transaction_id TEXT,
  payment_intent_id TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Additional metadata
  metadata JSONB DEFAULT '{}'
);

-- Create donation_categories table
CREATE TABLE IF NOT EXISTS donation_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  goal_amount DECIMAL(10, 2) DEFAULT 0,
  current_amount DECIMAL(10, 2) DEFAULT 0,
  donor_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create donation_progress table for tracking milestones
CREATE TABLE IF NOT EXISTS donation_milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  amount DECIMAL(10, 2) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  achieved BOOLEAN DEFAULT false,
  achieved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_donations_email ON donations(donor_email);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(payment_status);
CREATE INDEX IF NOT EXISTS idx_donations_created ON donations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_donations_confirmation ON donations(confirmation_number);

-- Create function to update category totals
CREATE OR REPLACE FUNCTION update_category_totals()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.payment_status = 'completed' AND OLD.payment_status != 'completed' THEN
    -- Update category totals based on allocations
    UPDATE donation_categories
    SET 
      current_amount = current_amount + (allocation->>'amount')::DECIMAL,
      donor_count = donor_count + 1,
      updated_at = NOW()
    FROM jsonb_array_elements(NEW.category_allocations) AS allocation
    WHERE id = allocation->>'category_id';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating category totals
DROP TRIGGER IF EXISTS update_category_totals_trigger ON donations;
CREATE TRIGGER update_category_totals_trigger
  AFTER UPDATE ON donations
  FOR EACH ROW
  EXECUTE FUNCTION update_category_totals();

-- Insert default categories
INSERT INTO donation_categories (id, name, description, goal_amount)
VALUES 
  ('fws', 'Family World School Cooperative Learners', 'Supports individual learners in the Family World School Cooperative', 50000),
  ('partner-schools', 'FWS Partner Schools', 'Supports infrastructure and technology for partner schools', 75000),
  ('language-councils', 'Language Councils', 'Supports language preservation initiatives', 30000)
ON CONFLICT (id) DO NOTHING;

-- Insert default milestones
INSERT INTO donation_milestones (amount, title, description, achieved)
VALUES 
  (10000, 'First Milestone', 'Launched 2 pilot programs', true),
  (25000, 'Expansion Phase', 'Added 3 new partner schools', true),
  (50000, 'Technology Upgrade', 'Provided tablets to 100 students', true),
  (75000, 'Community Center', 'Open first language learning center', false),
  (100000, 'Full Program', 'Support 500+ students annually', false)
ON CONFLICT DO NOTHING;
`;

// Donation API functions
// NOTE: These functions are LEGACY - donations now use the Hostinger MySQL backend via api-client.js
export async function createDonation(donationData) {
  try {
    const client = getSupabaseAdmin()
    if (!client) {
      return { data: null, error: new Error('Supabase not configured - use Hostinger backend instead') }
    }

    const confirmationNumber = generateConfirmationNumber()

    const { data, error } = await client
      .from('donations')
      .insert([{
        confirmation_number: confirmationNumber,
        amount: donationData.amount,
        donation_type: donationData.donationType,
        donor_email: donationData.email,
        donor_first_name: donationData.firstName,
        donor_last_name: donationData.lastName,
        donor_phone: donationData.phone,
        is_anonymous: donationData.isAnonymous,
        category_allocations: donationData.categories.map(cat => ({
          category_id: cat.id,
          amount: donationData.amount / donationData.categories.length // Split evenly
        })),
        payment_method: donationData.paymentMethod,
        payment_status: 'pending'
      }])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error creating donation:', error)
    return { data: null, error }
  }
}

export async function updateDonationStatus(donationId, status, transactionId = null) {
  try {
    const client = getSupabaseAdmin()
    if (!client) {
      return { data: null, error: new Error('Supabase not configured - use Hostinger backend instead') }
    }

    const updates = {
      payment_status: status,
      updated_at: new Date().toISOString()
    }

    if (status === 'completed') {
      updates.completed_at = new Date().toISOString()
    }

    if (transactionId) {
      updates.transaction_id = transactionId
    }

    const { data, error } = await client
      .from('donations')
      .update(updates)
      .eq('id', donationId)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error updating donation status:', error)
    return { data: null, error }
  }
}

export async function getDonations(filters = {}) {
  try {
    const client = getSupabaseAdmin()
    if (!client) {
      return { data: null, error: new Error('Supabase not configured - use Hostinger backend instead') }
    }

    let query = client.from('donations').select('*')
    
    if (filters.status) {
      query = query.eq('payment_status', filters.status)
    }
    
    if (filters.email) {
      query = query.eq('donor_email', filters.email)
    }
    
    if (filters.startDate) {
      query = query.gte('created_at', filters.startDate)
    }
    
    if (filters.endDate) {
      query = query.lte('created_at', filters.endDate)
    }
    
    // Order by created_at descending by default
    query = query.order('created_at', { ascending: false })
    
    if (filters.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching donations:', error)
    return { data: null, error }
  }
}

export async function getDonationStats() {
  try {
    const client = getSupabaseAdmin()
    if (!client) {
      return { data: null, error: new Error('Supabase not configured - use Hostinger backend instead') }
    }

    // Get category totals
    const { data: categories, error: catError } = await client
      .from('donation_categories')
      .select('*')

    if (catError) throw catError

    // Get recent donations
    const { data: recentDonations, error: recentError } = await client
      .from('donations')
      .select('*')
      .eq('payment_status', 'completed')
      .order('created_at', { ascending: false })
      .limit(10)

    if (recentError) throw recentError

    // Get milestones
    const { data: milestones, error: milestoneError } = await client
      .from('donation_milestones')
      .select('*')
      .order('amount', { ascending: true })
    
    if (milestoneError) throw milestoneError

    // Calculate totals
    const totalRaised = categories.reduce((sum, cat) => sum + parseFloat(cat.current_amount || 0), 0)
    const totalDonors = categories.reduce((sum, cat) => sum + (cat.donor_count || 0), 0)
    const totalGoal = categories.reduce((sum, cat) => sum + parseFloat(cat.goal_amount || 0), 0)

    return {
      data: {
        categories,
        recentDonations,
        milestones,
        summary: {
          totalRaised,
          totalDonors,
          totalGoal,
          percentageComplete: totalGoal > 0 ? (totalRaised / totalGoal) * 100 : 0
        }
      },
      error: null
    }
  } catch (error) {
    console.error('Error fetching donation stats:', error)
    return { data: null, error }
  }
}

// Helper function to generate confirmation number
function generateConfirmationNumber() {
  const prefix = 'DON'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substr(2, 5).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

export default {
  createDonation,
  updateDonationStatus,
  getDonations,
  getDonationStats
}