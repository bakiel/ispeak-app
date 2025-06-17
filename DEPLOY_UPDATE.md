# Deployment Update Instructions

## Changes Made
- Fixed dark overlay on register page by changing from `hero-bg-secondary` to a light gradient background
- Fixed dark overlay on login page by changing from `hero-bg-primary` to a light gradient background
- Both pages now use subtle gradient backgrounds for better visibility of the forms

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