/**
 * iSPEAK Blog Mock Data
 * Fallback data for when API is unavailable
 */

export const blogPosts = [
  {
    id: 1,
    title: "Why Learning African Languages Matters",
    slug: "why-learning-african-languages-matters",
    excerpt: "Discover the incredible benefits of learning African languages for children and how it connects them to their heritage.",
    content: "<p>Learning African languages offers children a unique opportunity to connect with their heritage while developing valuable cognitive skills.</p><p>Research shows that bilingual children often demonstrate enhanced problem-solving abilities, improved memory, and greater cultural awareness.</p>",
    featured_image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    author_name: "Dr. Amara Johnson",
    published_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    views: 245,
    category_name: "Language Learning",
    category_slug: "language-learning",
    category_color: "#0d9488"
  },
  {
    id: 2,
    title: "Tips for Parents: Supporting Language Learning at Home",
    slug: "tips-parents-supporting-language-learning",
    excerpt: "Practical strategies for parents to reinforce African language learning outside of lesson time.",
    content: "<p>As a parent, you play a crucial role in your child's language learning journey. Here are some proven strategies to support their progress at home.</p><p>Create a language-rich environment by labeling items around your home in the target language.</p>",
    featured_image: "https://images.unsplash.com/photo-1543342384-1f1350e27861?w=800",
    author_name: "Maria Okonkwo",
    published_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    views: 189,
    category_name: "Parent Resources",
    category_slug: "parent-resources",
    category_color: "#2563eb"
  },
  {
    id: 3,
    title: "Celebrating Yoruba Culture Through Language",
    slug: "celebrating-yoruba-culture-through-language",
    excerpt: "Explore the rich cultural heritage of the Yoruba people and how language preservation keeps traditions alive.",
    content: "<p>The Yoruba language is more than just words\u2014it is a gateway to understanding one of Africa's most vibrant cultures.</p><p>From proverbs to songs, every aspect of Yoruba language carries centuries of wisdom and tradition.</p>",
    featured_image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800",
    author_name: "Chief Adebayo Williams",
    published_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    views: 312,
    category_name: "Cultural Insights",
    category_slug: "cultural-insights",
    category_color: "#7c3aed"
  }
]

export const blogCategories = [
  { id: 1, name: "Language Learning", slug: "language-learning", color: "#0d9488", post_count: 1 },
  { id: 2, name: "Cultural Insights", slug: "cultural-insights", color: "#7c3aed", post_count: 1 },
  { id: 3, name: "Parent Resources", slug: "parent-resources", color: "#2563eb", post_count: 1 },
  { id: 4, name: "News & Updates", slug: "news-updates", color: "#dc2626", post_count: 0 },
  { id: 5, name: "Success Stories", slug: "success-stories", color: "#ea580c", post_count: 0 }
]

export function getPostBySlug(slug) {
  return blogPosts.find(post => post.slug === slug) || null
}

export function getPostsByCategory(categorySlug) {
  if (!categorySlug || categorySlug === 'all') {
    return blogPosts
  }
  return blogPosts.filter(post => post.category_slug === categorySlug)
}

export function getFeaturedPosts(limit = 3) {
  return blogPosts.slice(0, limit)
}
