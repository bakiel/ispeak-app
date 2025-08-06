# URGENT: Mopres.co.za Website Fix Instructions

**Issue:** Your website at https://www.mopres.co.za is displaying iSPEAK educational products instead of Mopres shoes.

## The Problem

Your site is currently showing:
- African Language Learning products (posters, flashcards, etc.)
- iSPEAK branded items (t-shirts, backpacks)
- Prices in the R20-R50 range (educational products)

Instead of:
- Mopres luxury high heels and shoes
- Prices in the R850-R1,800 range

## Database Status ✅

The database is CORRECTLY configured:
- **30 Mopres shoe products** are active and ready
- All shoe images have been restored with proper URLs
- Products are properly tagged with `project_name = 'mopres'`
- Shoe prices range from R850 to R1,800

## Required Fixes for Your Application

### 1. Fix Product Query
Your application needs to filter products correctly:

**WRONG** (what you're probably doing):
```javascript
const { data } = await supabase
  .from('products')
  .select('*')
  .eq('status', 'active')
```

**CORRECT** (what you should do):
```javascript
const { data } = await supabase
  .from('products')
  .select('*')
  .eq('project_name', 'mopres')  // ← ADD THIS LINE
  .eq('status', 'active')
```

### 2. Add Image Domain Configuration

Add Supabase domain to your allowed image sources:

**For Next.js** (in `next.config.js`):
```javascript
module.exports = {
  images: {
    domains: [
      'gfbedvoexpulmmfitxje.supabase.co',  // ← Add this
      // ... other domains
    ]
  }
}
```

**For standard HTML/React**:
Make sure your CSP (Content Security Policy) allows:
```
img-src 'self' https://gfbedvoexpulmmfitxje.supabase.co
```

### 3. Verify Supabase Connection

Ensure your environment variables are set correctly:
```
NEXT_PUBLIC_SUPABASE_URL=https://gfbedvoexpulmmfitxje.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
```

## Test Query

Run this query to verify you're getting the right products:

```sql
SELECT name, price, images[1] as image_url
FROM products 
WHERE project_name = 'mopres' 
  AND status = 'active'
LIMIT 5;
```

This should return:
- Beige Buckled Ankle-strap (R1,700)
- Black Lustre (R1,800)
- Silver Radiance (R1,800)
- etc. (all shoe products)

## Your 30 Active Mopres Products

All these products are ready in the database:
1. Beige Buckled Ankle-strap - R1,700
2. Beige Classic - R1,800
3. Beige Signature - R1,800
4. Black Buckled Mule - R1,500
5. Black Chic Flat - R850
6. Black Lustre - R1,800
7. Blush Sandal - R1,600
8. Bow Charm Gold - R1,800
9. Bow Charm Silver - R1,800
10. Bow Envy - R1,800
... and 20 more shoe products

## Image URLs

All product images are stored at:
```
https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/product-images/[filename]
```

Example:
```
https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/product-images/Black_patent_leather_high_heels.jpg
```

## Quick Verification

After making these changes:
1. Products should show shoes, not educational items
2. Prices should be R850+ not R20-50
3. Images should load properly
4. Product names should be shoe-related (heels, sandals, flats, etc.)

## Contact for Database Access

If you need to verify database access or check the products directly:
- Database: Supabase (shared instance)
- Products table: `public.products`
- Filter: `WHERE project_name = 'mopres'`

---

**The database is ready with all 30 shoe products. You just need to update your application to query the correct products.**