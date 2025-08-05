import { supabase } from './supabase'

// Hero Sections
export async function getHeroSection(pageSlug) {
  try {
    const { data, error } = await supabase
      .from('hero_sections')
      .select('*')
      .eq('page_slug', pageSlug)
      .eq('is_active', true)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching hero section:', error)
    return null
  }
}

// Statistics
export async function getStatistics() {
  try {
    const { data, error } = await supabase
      .from('statistics')
      .select('*')
      .eq('is_active', true)
      .order('display_order')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching statistics:', error)
    return []
  }
}

// Feature Cards
export async function getFeatureCards(pageSlug = null) {
  try {
    let query = supabase
      .from('feature_cards')
      .select('*')
      .eq('is_active', true)
      .order('display_order')
    
    if (pageSlug) {
      query = query.eq('page_slug', pageSlug)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching feature cards:', error)
    return []
  }
}

// Testimonials
export async function getTestimonials(featured = false) {
  try {
    let query = supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
    
    if (featured) {
      query = query.eq('is_featured', true)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

// FAQ Items
export async function getFAQItems(category = null) {
  try {
    let query = supabase
      .from('faq_items')
      .select('*')
      .eq('is_active', true)
      .order('display_order')
    
    if (category) {
      query = query.eq('category', category)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching FAQ items:', error)
    return []
  }
}

// Programs
export async function getPrograms(featured = false) {
  try {
    let query = supabase
      .from('programs')
      .select('*')
      .eq('is_active', true)
    
    if (featured) {
      query = query.eq('is_featured', true)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching programs:', error)
    return []
  }
}

// Languages (handle the view)
export async function getLanguages() {
  try {
    // First try the languages view
    let { data, error } = await supabase
      .from('languages')
      .select('*')
    
    // If that fails, we might need to handle it differently
    if (error) {
      console.error('Error fetching from languages view:', error)
      // Return hardcoded languages for now
      return [
        {
          code: 'yoruba',
          name: 'Yoruba',
          native_name: 'Èdè Yorùbá',
          flag_emoji: '🇳🇬',
          is_active: true
        },
        {
          code: 'kiswahili',
          name: 'Kiswahili',
          native_name: 'Kiswahili',
          flag_emoji: '🇰🇪',
          is_active: true
        },
        {
          code: 'twi',
          name: 'Twi',
          native_name: 'Twi',
          flag_emoji: '🇬🇭',
          is_active: true
        },
        {
          code: 'amharic',
          name: 'Amharic',
          native_name: 'አማርኛ',
          flag_emoji: '🇪🇹',
          is_active: true
        }
      ]
    }
    
    return data || []
  } catch (error) {
    console.error('Error fetching languages:', error)
    return []
  }
}

// Educators
export async function getEducators(featured = false) {
  try {
    let query = supabase
      .from('educators')
      .select('*')
      .eq('is_active', true)
    
    if (featured) {
      query = query.eq('is_featured', true)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching educators:', error)
    return []
  }
}

// Pricing Plans
export async function getPricingPlans() {
  try {
    const { data, error } = await supabase
      .from('pricing_plans')
      .select('*')
      .eq('is_active', true)
      .order('display_order')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching pricing plans:', error)
    return []
  }
}

// Page Sections
export async function getPageSections(pageSlug) {
  try {
    const { data, error } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page_slug', pageSlug)
      .eq('is_active', true)
      .order('display_order')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching page sections:', error)
    return []
  }
}

// Utility function to get all homepage content at once
export async function getHomepageContent() {
  try {
    const [hero, statistics, featureCards, testimonials] = await Promise.all([
      getHeroSection('home'),
      getStatistics(),
      getFeatureCards('home'),
      getTestimonials(true) // featured only
    ])
    
    return {
      hero,
      statistics,
      featureCards,
      testimonials
    }
  } catch (error) {
    console.error('Error fetching homepage content:', error)
    return {
      hero: null,
      statistics: [],
      featureCards: [],
      testimonials: []
    }
  }
}