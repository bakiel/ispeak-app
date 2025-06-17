# Deployment Update Instructions

## Latest Changes (Update 4 - Age Range Expansion)
- Updated age range from "3-14" to "3 and above" throughout the application
- Modified home page hero section to say "AGES 3 AND ABOVE"
- Updated FAQs to include age groups for teens (15+)
- Added ages 15, 16, 17, 18 to the register form age selector
- Updated layout metadata to reflect "children and teens aged 3 and above"
- Modified marketing copy across all pages to be inclusive of older teens

## Previous Changes (Update 2)
- Created new `hero-bg-light` class that keeps the background image but with a subtle white overlay
- Register page now uses the light hero background with the banner integrated at the top of the card
- Login page also uses the same light hero background for consistency
- Fixed the yellow banner positioning - now it's part of the card instead of floating
- Added proper shadows to cards for better depth

## Previous Changes
- Fixed dark overlay on register page
- Fixed dark overlay on login page

## To Deploy the Update:

1. Open Terminal and navigate to the project:
   ```bash
   cd "/Users/mac/Downloads/iSPEAK/Pages to build the APP/ispeak-nextjs"
   ```

2. Check git status (optional):
   ```bash
   git status
   ```

3. Push to GitHub:
   ```bash
   git push origin main
   ```

   You'll need to authenticate with GitHub. Use one of these methods:
   - If prompted for username/password, use your GitHub username and a Personal Access Token (not your password)
   - Or use GitHub Desktop to push the changes

## After Pushing:
- Vercel will automatically detect the changes and start a new deployment
- The deployment usually takes 1-2 minutes
- You'll see the deployment progress in your Vercel dashboard
- Once complete, the changes will be live on your production URL

## What Changed:
- **Register Page**: Now has a light gradient background (from-secondary/10 via-white to-accent/10)
- **Login Page**: Now has a light gradient background (from-primary/5 via-white to-secondary/10)

These changes make the forms much more visible and remove the dark overlay that was making them hard to see.