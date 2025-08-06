# iSPEAK Language Learning Platform - Deployment Guide

**Last Updated:** August 5, 2025  
**Live Site:** https://ispeak-app-prod.vercel.app  
**GitHub Repository:** https://github.com/bakiel/ispeak-app  

## 🚀 Live Links

### Main Website
- **Homepage:** https://ispeak-app-prod.vercel.app
- **Shop:** https://ispeak-app-prod.vercel.app/shop
- **Blog:** https://ispeak-app-prod.vercel.app/blog

### Language Programs
- **Yoruba:** https://ispeak-app-prod.vercel.app/programs/yoruba
- **Kiswahili:** https://ispeak-app-prod.vercel.app/programs/kiswahili
- **Twi:** https://ispeak-app-prod.vercel.app/programs/twi
- **Amharic:** https://ispeak-app-prod.vercel.app/programs/amharic

### About & Information
- **About Us:** https://ispeak-app-prod.vercel.app/about
- **Our Philosophy:** https://ispeak-app-prod.vercel.app/philosophy
- **Success Stories:** https://ispeak-app-prod.vercel.app/success-stories
- **For Schools:** https://ispeak-app-prod.vercel.app/for-schools

### Learning & Resources
- **Resources:** https://ispeak-app-prod.vercel.app/resources
- **Student Portal:** https://ispeak-app-prod.vercel.app/portal
- **Sample Lessons:** https://ispeak-app-prod.vercel.app/sample-lessons
- **FAQ:** https://ispeak-app-prod.vercel.app/faq

### Pricing & Plans
- **Pricing Plans:** https://ispeak-app-prod.vercel.app/plans
- **Trial Lessons:** https://ispeak-app-prod.vercel.app/trial
- **Gift Cards:** https://ispeak-app-prod.vercel.app/gift-cards

### Contact & Support
- **Contact Us:** https://ispeak-app-prod.vercel.app/contact
- **Book a Lesson:** https://ispeak-app-prod.vercel.app/book-lesson

### Community & Engagement
- **Community:** https://ispeak-app-prod.vercel.app/community
- **Loyalty Program:** https://ispeak-app-prod.vercel.app/loyalty
- **Testimonials:** https://ispeak-app-prod.vercel.app/testimonials

### Legal Pages
- **Privacy Policy:** https://ispeak-app-prod.vercel.app/privacy
- **Terms of Service:** https://ispeak-app-prod.vercel.app/terms

### API Endpoints
- **Products Verification:** https://ispeak-app-prod.vercel.app/api/verify-products
- **Test Products:** https://ispeak-app-prod.vercel.app/api/test-products

## 📊 Current Status

### ✅ What's Working
- All 28 routes are deployed and accessible
- Shop displays 17 iSPEAK products with images
- Blog system is functional with Supabase integration
- Mobile-responsive design
- Navigation menus work correctly

### 🔧 Configuration
- **Environment Variables:** Set in Vercel dashboard
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Image Domains:** Configured for external image hosting
- **Database:** Connected to Supabase

### 📦 Product Catalog
- **Total Products:** 17 iSPEAK products
- **Categories:** 
  - Apparel (5 products)
  - Accessories (4 products)
  - Learning Materials (4 products)
  - Stationery (2 products)
  - Toys & Games (2 products)
- **Featured Products:** 10 items

## 🛠️ Deployment Commands

### Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Available at: http://localhost:3000
```

### Production Deployment
```bash
# Build for production
npm run build

# Deploy to Vercel (automatic with git push)
git add -A
git commit -m "Your commit message"
git push origin main
```

### Manual Vercel Deployment
```bash
# If you need to deploy manually
vercel --prod
```

## 🔍 Troubleshooting

### Common Issues
1. **Images not loading:** Check image domain configuration in `lib/imageConfig.js`
2. **Products not showing:** Verify Supabase environment variables are set
3. **404 errors:** Ensure all routes exist in the `app/` directory

### Verification Steps
1. Check deployment logs in Vercel dashboard
2. Verify environment variables are properly set
3. Test API endpoints to ensure database connection
4. Check browser console for any JavaScript errors

## 📞 Support Information

**Client Contact:**
- **Name:** Daisy Ross
- **Phone:** +1 (478) 390-4040
- **Email:** info@ispeaklanguages.com

**Technical Support:**
- Check GitHub repository for latest updates
- Review deployment logs in Vercel dashboard
- Contact development team for urgent issues

## 🚀 Quick Links Summary

| Page | Live URL |
|------|----------|
| Homepage | https://ispeak-app-prod.vercel.app |
| Shop | https://ispeak-app-prod.vercel.app/shop |
| Blog | https://ispeak-app-prod.vercel.app/blog |
| Programs | https://ispeak-app-prod.vercel.app/programs |
| About | https://ispeak-app-prod.vercel.app/about |
| Contact | https://ispeak-app-prod.vercel.app/contact |
| Plans | https://ispeak-app-prod.vercel.app/plans |

---
**Note:** This deployment is connected to the GitHub repository and automatically deploys on push to the main branch.