// This script sets up the donations database tables in Supabase
// Run with: node scripts/setup-donations-db.js

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gfbedvoexpulmmfitxje.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmYmVkdm9leHB1bG1tZml0eGplIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzU3MTYzMiwiZXhwIjoyMDYzMTQ3NjMyfQ.CvYLjYB7l6E-AMXf2eeMpEU-WRT87zi0kuhZHJ7fqi4'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  console.log('Setting up donations database...')
  
  try {
    // Create donations table
    const { error: donationsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS donations (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          confirmation_number TEXT UNIQUE NOT NULL,
          amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
          currency TEXT DEFAULT 'USD',
          donation_type TEXT NOT NULL CHECK (donation_type IN ('one-time', 'monthly')),
          payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
          payment_method TEXT CHECK (payment_method IN ('card', 'paypal', 'bank')),
          donor_email TEXT NOT NULL,
          donor_first_name TEXT,
          donor_last_name TEXT,
          donor_phone TEXT,
          is_anonymous BOOLEAN DEFAULT false,
          category_allocations JSONB NOT NULL DEFAULT '[]',
          transaction_id TEXT,
          payment_intent_id TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
          completed_at TIMESTAMP WITH TIME ZONE,
          metadata JSONB DEFAULT '{}'
        );
      `
    })
    
    if (donationsError) {
      console.error('Error creating donations table:', donationsError)
    } else {
      console.log('✓ Donations table created')
    }

    // Create donation_categories table
    const { error: categoriesError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    })
    
    if (categoriesError) {
      console.error('Error creating categories table:', categoriesError)
    } else {
      console.log('✓ Donation categories table created')
    }

    // Create donation_milestones table
    const { error: milestonesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS donation_milestones (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          amount DECIMAL(10, 2) NOT NULL,
          title TEXT NOT NULL,
          description TEXT,
          achieved BOOLEAN DEFAULT false,
          achieved_at TIMESTAMP WITH TIME ZONE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
        );
      `
    })
    
    if (milestonesError) {
      console.error('Error creating milestones table:', milestonesError)
    } else {
      console.log('✓ Donation milestones table created')
    }

    // Insert default categories
    const { error: insertCategoriesError } = await supabase
      .from('donation_categories')
      .upsert([
        {
          id: 'fws',
          name: 'Family World School Cooperative Learners',
          description: 'Supports individual learners in the Family World School Cooperative',
          goal_amount: 50000
        },
        {
          id: 'partner-schools',
          name: 'FWS Partner Schools',
          description: 'Supports infrastructure and technology for partner schools',
          goal_amount: 75000
        },
        {
          id: 'language-councils',
          name: 'Language Councils',
          description: 'Supports language preservation initiatives',
          goal_amount: 30000
        }
      ], { onConflict: 'id' })
    
    if (insertCategoriesError) {
      console.error('Error inserting categories:', insertCategoriesError)
    } else {
      console.log('✓ Default categories inserted')
    }

    // Insert default milestones
    const { error: insertMilestonesError } = await supabase
      .from('donation_milestones')
      .insert([
        {
          amount: 10000,
          title: 'First Milestone',
          description: 'Launched 2 pilot programs',
          achieved: true
        },
        {
          amount: 25000,
          title: 'Expansion Phase',
          description: 'Added 3 new partner schools',
          achieved: true
        },
        {
          amount: 50000,
          title: 'Technology Upgrade',
          description: 'Provided tablets to 100 students',
          achieved: true
        },
        {
          amount: 75000,
          title: 'Community Center',
          description: 'Open first language learning center',
          achieved: false
        },
        {
          amount: 100000,
          title: 'Full Program',
          description: 'Support 500+ students annually',
          achieved: false
        }
      ])
    
    if (insertMilestonesError) {
      console.error('Error inserting milestones:', insertMilestonesError)
    } else {
      console.log('✓ Default milestones inserted')
    }

    console.log('\n✅ Database setup complete!')
    
  } catch (error) {
    console.error('Setup failed:', error)
  }
}

setupDatabase()