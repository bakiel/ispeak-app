# iSPEAK Language Learning Platform

## Project Overview
This is a Next.js application for the iSPEAK Language Learning Program, connecting children ages 3-14 with indigenous African language speakers through live online lessons.

## Tech Stack
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome
- **Deployment**: GitHub Pages / Vercel

## Project Structure
```
ispeak-nextjs/
├── app/                    # Next.js 13+ App Router
│   ├── layout.js          # Root layout
│   ├── page.js            # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navigation.js      # Header navigation
│   ├── HeroSection.js     # Hero banner
│   └── Footer.js          # Footer component
├── public/                # Static assets
├── .claude/               # Claude configuration
├── .mcp.json             # MCP server configuration
├── tailwind.config.js    # Tailwind CSS config
├── next.config.js        # Next.js config
└── package.json          # Dependencies
```

## Key Features
- Live 1:1 language lessons
- Four languages: Yoruba, Kiswahili, Twi, and Amharic
- Age-appropriate curriculum for 3-14 year olds
- Native speaker educators
- Cultural immersion
- Progress tracking

## Development Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## GitHub Repository
- **Repository**: https://github.com/bakiel/ispeak-nextjs
- **Owner**: bakiel
- **Branch**: main

## Current Status
- ✅ Basic project structure created
- ✅ Navigation component with mobile menu
- ✅ Hero section
- ✅ Welcome video section
- ✅ Statistics banner
- ✅ Value proposition cards
- ✅ Footer
- 🔲 Program overview section
- 🔲 Language offerings section
- 🔲 How it works section
- 🔲 Testimonials
- 🔲 FAQ section
- 🔲 Additional pages (About, Plans, etc.)

## Environment Variables (to be added)
```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_STRIPE_KEY=
```

## Contact
- **Owner**: Daisy Ross
- **Phone**: +1 (478) 390-4040
- **Email**: info@ispeaklanguages.com
