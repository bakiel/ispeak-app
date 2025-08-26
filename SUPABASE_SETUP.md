# Supabase Donations Database Setup

## Quick Setup

The donation system backend is ready to use! The database tables need to be created in your Supabase project.

### Method 1: Direct SQL (Recommended)

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select the iSPEAK project (gfbedvoexpulmmfitxje)
3. Navigate to **SQL Editor** in the sidebar
4. Create a new query and paste the following SQL:

```sql
-- Create donations table
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

-- Create donation_milestones table
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
```

5. Click **Run** to execute the SQL

### Method 2: Using Node.js Script

If you prefer to run a script:

```bash
# Install dependencies if not already installed
npm install

# Run the setup script
node scripts/setup-donations-db.js
```

## Environment Variables

The `.env.local` file already contains the necessary Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://gfbedvoexpulmmfitxje.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

These are already configured and ready to use.

## Testing the Integration

1. The development server should already be running (`npm run dev`)
2. Navigate to http://localhost:3000/donate
3. Make a test donation
4. Check the admin panel at http://localhost:3000/admin/donations

## Features Implemented

### Frontend Pages
- ✅ `/donate` - Main donation page with categories
- ✅ `/donate/confirm` - Payment confirmation page
- ✅ `/donate/thank-you` - Thank you page with confirmation
- ✅ `/donate/progress` - Live donation progress tracking
- ✅ `/admin/donations` - Admin management dashboard

### Backend API
- ✅ `POST /api/donations` - Create new donation
- ✅ `GET /api/donations` - List donations with filters
- ✅ `GET /api/donations?type=stats` - Get donation statistics
- ✅ `PATCH /api/donations/[id]` - Update donation status
- ✅ `DELETE /api/donations/[id]` - Delete donation (admin only)

### Database Tables
- `donations` - Main donation records
- `donation_categories` - Donation categories (FWS, Partner Schools, Language Councils)
- `donation_milestones` - Progress milestones for tracking

### Features
- Multiple donation categories support
- One-time and monthly donations
- Anonymous donation option
- Real-time progress tracking
- Admin dashboard with statistics
- CSV export functionality
- Confirmation emails (ready for Stripe integration)
- Tax-deductible receipt generation

## Next Steps

### Payment Processing
To enable real payment processing, integrate with Stripe:

1. Get your Stripe API keys from [Stripe Dashboard](https://dashboard.stripe.com)
2. Add to `.env.local`:
```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```
3. Update the payment processing in `/app/donate/confirm/page.js` to use Stripe

### Email Notifications
To send confirmation emails:

1. Set up email service (SendGrid, Resend, etc.)
2. Add email credentials to `.env.local`
3. Update API routes to send emails on successful donations

## Troubleshooting

If you encounter any issues:

1. **Tables not created**: Make sure you're running the SQL in the correct Supabase project
2. **API errors**: Check that the service role key in `.env.local` is correct
3. **Connection issues**: Verify the Supabase URL is correct

For support, contact: info@ispeaklanguages.com