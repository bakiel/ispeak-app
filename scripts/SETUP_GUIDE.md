# iSPEAK E-commerce Setup Guide

## Overview
This guide will help you set up a complete e-commerce system in Supabase with proper image storage and product management.

## Step 1: Create Products Table

1. Go to your Supabase dashboard: https://app.supabase.com
2. Navigate to the SQL Editor
3. Copy and run the SQL from `createProductsTable.sql`

This creates:
- A products table with all necessary fields
- Proper indexes for performance
- Row Level Security policies
- Automatic timestamp updates

## Step 2: Run Product Setup Script

```bash
cd scripts
node setupSupabaseProducts.js
```

This script will:
1. Create a 'products' storage bucket in Supabase
2. Download product images from fal.ai CDN
3. Upload them to your Supabase storage bucket
4. Insert all 18 products into the database with proper Supabase image URLs

## What You Get

### Products Storage Bucket
- All product images stored in Supabase
- Public access for frontend display
- Organized by product slug

### Products Table
Complete product data including:
- Product names and descriptions
- Prices (with sale prices)
- Categories
- Stock levels
- Featured flags
- Image URLs pointing to Supabase storage

### 18 Complete Products
1. Paji T-Shirt - Kids
2. iSPEAK Learning Journal
3. Yoruba Alphabet Flashcards
4. Paji Plush Toy
5. Kiswahili Phrase Book
6. African Heritage Water Bottle
7. iSPEAK Tote Bag
8. Language Learning Cards
9. iSPEAK T-Shirt - Adult
10. African Patterns Notebook
11. Cultural Storybook Collection
12. iSPEAK Backpack
13. Language Poster Set
14. iSPEAK Cap
15. Teacher Coffee Mug
16. iSPEAK Hoodie
17. Twi Counting Poster
18. Amharic Writing Workbook

## Frontend Integration

The app is already configured to:
- Check Supabase for products first
- Fall back to mock data if needed
- Display products from the database
- Show images from Supabase storage

## Verification

After setup, you can verify:
1. Check Storage tab in Supabase - you should see 'products' bucket with images
2. Check Table Editor - products table should have 18 rows
3. Visit http://localhost:3000/shop - products should load from database

## Troubleshooting

If products don't appear:
1. Check browser console for errors
2. Verify your Supabase URL and anon key in .env.local
3. Check that RLS policies are enabled
4. Ensure the products table exists

## Benefits

✅ **Real E-commerce Experience**
- All data in Supabase
- Proper image storage
- Ready for production

✅ **Professional Setup**
- Organized storage buckets
- Indexed database queries
- Security policies in place

✅ **Scalable Architecture**
- Easy to add more products
- Simple to update images
- Ready for additional features