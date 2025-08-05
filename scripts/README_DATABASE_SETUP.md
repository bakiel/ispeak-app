# Database Setup Instructions

## Step 1: Create Tables in Supabase

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project (gfbedvoexpulmmfitxje)
3. Navigate to the SQL Editor (in the left sidebar)
4. Copy and paste the contents of `createSupabaseTables.sql`
5. Click "Run" to execute the SQL

This will create all necessary tables:
- product_collections
- products
- product_variants
- product_reviews
- orders
- order_items

## Step 2: Populate Products

After creating the tables, run the populate script:

```bash
cd scripts
node populateSupabaseProducts.js
```

This will insert:
- 6 product collections (Apparel, School Supplies, Educational, Toys, Books, Accessories)
- 18 products with full details
- Product variants for each product

## Step 3: Update Product Pages

The product pages are already configured to use Supabase data with fallback to mock data. Once the database is populated, the products will automatically load from Supabase.

## Database Schema

### Collections Table
- Stores product categories
- Each product belongs to one collection

### Products Table
- Main product information
- Linked to collections
- Includes pricing, inventory, and metadata

### Product Variants Table
- Size and color variations
- Individual SKUs and inventory tracking

### Orders & Order Items
- Complete order management system
- Ready for Stripe integration

## Troubleshooting

If you encounter permission errors:
1. Check that Row Level Security (RLS) policies are properly set
2. Ensure your API keys are correct in `.env.local`
3. Verify tables were created successfully in Supabase dashboard