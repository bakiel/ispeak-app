# Content Management System Documentation

## Overview
The iSPEAK platform now features a comprehensive content management system that allows all website content to be edited through Supabase and managed via the admin interface.

## Database Tables

### 1. `hero_sections`
Manages hero banners for different pages.
- **Fields**: page_slug, subtitle, title, description, CTAs, image settings
- **Admin**: `/admin/content/hero-sections`

### 2. `statistics`
Homepage statistics and metrics.
- **Fields**: title, value, icon, display_order
- **Admin**: `/admin/content/statistics`

### 3. `feature_cards`
Value proposition cards and feature highlights.
- **Fields**: title, description, icon, CTA, colors
- **Admin**: `/admin/content/feature-cards`

### 4. `testimonials`
Parent and student testimonials.
- **Fields**: parent_name, location, content, rating, language
- **Admin**: `/admin/content/testimonials`

### 5. `faq_items`
Frequently asked questions.
- **Fields**: category, question, answer, display_order
- **Admin**: `/admin/content/faq`

### 6. `programs`
Language learning programs.
- **Fields**: title, age_range, price, features, curriculum
- **Admin**: `/admin/content/programs`

### 7. `educators`
Educator profiles.
- **Fields**: name, bio, languages, specialties, experience
- **Admin**: `/admin/content/educators`

### 8. `pricing_plans`
Subscription and pricing options.
- **Fields**: name, price, lessons, features
- **Admin**: `/admin/content/pricing`

### 9. `page_sections`
Generic content sections for various pages.
- **Fields**: page_slug, section_key, content, metadata
- **Admin**: `/admin/content/page-sections`

## Content Library Functions

### Fetching Content
```javascript
import { 
  getHeroSection,
  getStatistics,
  getFeatureCards,
  getTestimonials,
  getFAQItems,
  getPrograms,
  getEducators,
  getPricingPlans,
  getPageSections,
  getHomepageContent
} from '@/lib/content'

// Example usage
const hero = await getHeroSection('home')
const stats = await getStatistics()
const testimonials = await getTestimonials(true) // featured only
```

## Components

### Server Components (Recommended)
```javascript
// StatisticsBanner.js - Fetches at build time
import { getStatistics } from '@/lib/content'

export default async function StatisticsBanner() {
  const statistics = await getStatistics()
  // ... render statistics
}
```

### Client Components (When needed)
```javascript
// HeroSection.js - Fetches on client
'use client'
import { useState, useEffect } from 'react'
import { getHeroSection } from '@/lib/content'

export default function HeroSection() {
  const [heroData, setHeroData] = useState(null)
  
  useEffect(() => {
    async function fetchHeroContent() {
      const data = await getHeroSection('home')
      setHeroData(data)
    }
    fetchHeroContent()
  }, [])
  // ... render hero
}
```

## Admin Interface

### Access Content Management
1. Navigate to `/admin`
2. Click on "Content" in the sidebar
3. Select the content type you want to manage

### Editing Content
1. Click "Edit" on any content item
2. Update the fields
3. Toggle "Active" status as needed
4. Click "Save Changes"

### Content Features
- **Live Preview**: Changes appear immediately on the website
- **Fallback Content**: Default content displays if database is empty
- **Image Management**: Full URL support for all image fields
- **SEO Friendly**: Meta titles and descriptions where applicable
- **Ordering**: Display order fields for organized content

## Best Practices

### 1. Always Use Full URLs for Images
```javascript
// Good
https://i.ibb.co/abc123/image.jpg
https://v3.fal.media/files/...

// Bad
/images/local-image.jpg
image.jpg
```

### 2. Maintain Fallback Content
Always include default content in components:
```javascript
const defaultStats = [
  { title: 'Countries', value: '170+', icon: 'fas fa-globe' },
  // ... more defaults
]

const stats = statistics.length > 0 ? statistics : defaultStats
```

### 3. Use Server Components When Possible
Server components fetch data at build time for better performance:
```javascript
// app/page.js
import StatisticsBanner from '@/components/StatisticsBanner'

export default function HomePage() {
  return (
    <>
      <StatisticsBanner /> {/* Server component */}
    </>
  )
}
```

### 4. Handle Loading States
For client components, always handle loading:
```javascript
if (loading) {
  return <div>Loading...</div>
}
```

## Migration Commands

To set up the content management system:

```sql
-- Run the migrations in Supabase SQL editor
-- 1. Create tables: create_content_management_tables
-- 2. Seed initial data: seed_initial_content_data
-- 3. Add more content: seed_programs_educators_pricing
```

## Troubleshooting

### Content Not Showing
1. Check if the content is marked as `is_active = true`
2. Verify the correct `page_slug` is being used
3. Check browser console for API errors
4. Ensure Supabase environment variables are set

### Images Not Loading
1. Verify image URLs are complete (https://...)
2. Check if domain is in `next.config.js`
3. Run `npm run validate:images`

### Admin Interface Issues
1. Clear browser cache
2. Check Supabase connection
3. Verify user has admin privileges
4. Check for JavaScript errors in console

## Future Enhancements
- [ ] Bulk editing capabilities
- [ ] Content versioning/history
- [ ] Preview before publish
- [ ] Multilingual content support
- [ ] Rich text editor for content fields
- [ ] Media library integration
- [ ] Content scheduling
- [ ] A/B testing support