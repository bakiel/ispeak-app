# Image Management Guide

## Overview
This guide explains how images are managed in the iSPEAK application and how to prevent image loading issues.

## Image Sources

We have multiple image sources in the application:

1. **Supabase Storage** (`gfbedvoexpulmmfitxje.supabase.co`) - For blog images and some product images
2. **Fal.ai CDN** (`v3.fal.media`) - For AI-generated product mockups
3. **Other CDNs** - ImgBB, ImageKit for various assets

## Common Issues and Solutions

### Issue 1: Images Not Loading on Production
**Cause**: Image domain not added to Next.js configuration
**Solution**: 
1. Add domain to `lib/imageConfig.js`
2. Run `npm run validate:images` to check all images
3. Deploy changes

### Issue 2: Mixed Image URL Formats in Database
**Cause**: Products have inconsistent image URLs (relative paths, just filenames, full URLs)
**Solution**:
1. Run `node scripts/unify-product-images.js` to standardize all product images
2. This script maps products to their correct image URLs

## Configuration Files

### `lib/imageConfig.js`
Central configuration for all allowed image domains. Add new domains here.

### `next.config.js`
Imports domains from `imageConfig.js`. Don't edit directly.

### `scripts/validate-images.js`
Validates all images in codebase are from allowed domains.
Run with: `npm run validate:images`

### `scripts/unify-product-images.js`
Unifies all product images to use consistent URLs.
Run when product images are broken.

## Best Practices

1. **Always use full URLs** for images in the database
2. **Add new domains** to `lib/imageConfig.js` before using
3. **Run validation** before deployment: `npm run validate:images`
4. **Use CDN images** when possible for better performance
5. **Keep a fallback image** for missing products

## Product Image Mapping

The system maintains a mapping between product slugs and their images in `scripts/unify-product-images.js`. This ensures consistency even when database data gets corrupted.

## Troubleshooting

### Blog images not loading
1. Check if Supabase domain is in `lib/imageConfig.js`
2. Verify environment variables are set on Vercel
3. Check browser console for specific errors

### Product images showing as broken
1. Run `node scripts/unify-product-images.js`
2. Check if the product slug exists in the mapping
3. Verify the image URL is accessible

### New image domain needed
1. Add to `lib/imageConfig.js`
2. Run `npm run validate:images`
3. Commit and deploy

## Emergency Fixes

If images break in production:
1. Add missing domain to `lib/imageConfig.js`
2. Push to GitHub (auto-deploys to Vercel)
3. For product images, run the unify script with database access