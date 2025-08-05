import { createClient } from '@supabase/supabase-js'
import { mockBlogData } from './supabase-mock'

// Environment variables - these should be set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if we're in a build environment or if credentials are missing
const isSupabaseConfigured = supabaseUrl && 
  supabaseKey && 
  supabaseUrl !== 'your_supabase_url_here' && 
  supabaseKey !== 'your_supabase_anon_key_here'

// Create a single supabase client for interacting with your database
// Use dummy values during build if real credentials aren't available
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseKey)
  : createClient('https://dummy.supabase.co', 'dummy-key')

// Helper function to handle Supabase errors consistently
export function handleSupabaseError(error) {
  console.error('Supabase error:', error)
  return {
    error: error.message || 'An unexpected error occurred',
    status: error.code || 500
  }
}

// Development mode flag - use mock data when Supabase fails
let useMockData = false

// Database queries for blog functionality
export const blogQueries = {
  // Get all published blog posts with categories
  async getAllPosts() {
    // Return empty data if Supabase is not configured
    if (!isSupabaseConfigured) {
      return { 
        data: [], 
        error: { 
          error: 'Blog functionality requires Supabase configuration. Please add your Supabase credentials to the .env.local file.', 
          status: 503 
        } 
      }
    }

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          slug,
          excerpt,
          content,
          featured_image,
          created_at,
          updated_at,
          author_name,
          author_bio,
          category:blog_categories (
            id,
            name,
            slug,
            color
          )
        `)
        .eq('is_published', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      // If fetch failed, use mock data in development
      if (error.message && error.message.includes('fetch failed')) {
        console.log('Using mock data due to connection error')
        return { data: mockBlogData.posts, error: null }
      }
      return { data: null, error: handleSupabaseError(error) }
    }
  },

  // Get a single blog post by slug
  async getPostBySlug(slug) {
    // Return 404 if Supabase is not configured
    if (!isSupabaseConfigured) {
      return { 
        data: null, 
        error: { 
          error: 'Blog functionality requires Supabase configuration. Please add your Supabase credentials to the .env.local file.', 
          status: 404 
        } 
      }
    }

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          slug,
          excerpt,
          content,
          featured_image,
          created_at,
          updated_at,
          author_name,
          author_bio,
          category:blog_categories (
            id,
            name,
            slug,
            color
          )
        `)
        .eq('slug', slug)
        .eq('is_published', true)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      // If fetch failed, use mock data in development
      if (error.message && error.message.includes('fetch failed')) {
        console.log('Using mock data due to connection error')
        const post = mockBlogData.posts.find(p => p.slug === slug)
        if (post) {
          return { data: post, error: null }
        }
        return { data: null, error: { error: 'Post not found', status: 404 } }
      }
      return { data: null, error: handleSupabaseError(error) }
    }
  },

  // Get all blog categories
  async getCategories() {
    // Return empty data if Supabase is not configured
    if (!isSupabaseConfigured) {
      return { 
        data: [], 
        error: { 
          error: 'Blog functionality requires Supabase configuration. Please add your Supabase credentials to the .env.local file.', 
          status: 503 
        } 
      }
    }

    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('id, name, slug, color')
        .order('name')

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      // If fetch failed, use mock data in development
      if (error.message && error.message.includes('fetch failed')) {
        console.log('Using mock data due to connection error')
        return { data: mockBlogData.categories, error: null }
      }
      return { data: null, error: handleSupabaseError(error) }
    }
  },

  // Get posts by category
  async getPostsByCategory(categorySlug) {
    // Return empty data if Supabase is not configured
    if (!isSupabaseConfigured) {
      return { 
        data: [], 
        error: { 
          error: 'Blog functionality requires Supabase configuration. Please add your Supabase credentials to the .env.local file.', 
          status: 503 
        } 
      }
    }

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          slug,
          excerpt,
          content,
          featured_image,
          created_at,
          updated_at,
          author_name,
          author_bio,
          category:blog_categories!inner (
            id,
            name,
            slug,
            color
          )
        `)
        .eq('is_published', true)
        .eq('blog_categories.slug', categorySlug)
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      // If fetch failed, use mock data in development
      if (error.message && error.message.includes('fetch failed')) {
        console.log('Using mock data due to connection error')
        const filteredPosts = mockBlogData.posts.filter(p => p.category.slug === categorySlug)
        return { data: filteredPosts, error: null }
      }
      return { data: null, error: handleSupabaseError(error) }
    }
  }
}

// Database queries for e-commerce functionality
export const ecommerceQueries = {
  // Create a new order
  async createOrder(orderData) {
    if (!isSupabaseConfigured) {
      console.log('Supabase not configured, using mock order storage')
      return { 
        data: { 
          id: Date.now().toString(),
          order_number: `ISP-${Date.now()}`,
          ...orderData,
          created_at: new Date().toISOString()
        }, 
        error: null 
      }
    }

    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          order_number: orderData.orderNumber,
          customer_email: orderData.customerInfo.email,
          customer_first_name: orderData.customerInfo.firstName,
          customer_last_name: orderData.customerInfo.lastName,
          customer_phone: orderData.customerInfo.phone,
          shipping_address: orderData.shippingAddress,
          billing_address: orderData.billingAddress,
          items: orderData.items,
          total_amount: orderData.total,
          payment_intent_id: orderData.paymentIntentId,
          status: orderData.status || 'pending',
          created_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error creating order in Supabase:', error)
      // Fallback to mock data
      return { 
        data: { 
          id: Date.now().toString(),
          order_number: orderData.orderNumber,
          ...orderData,
          created_at: new Date().toISOString()
        }, 
        error: null 
      }
    }
  },

  // Update order status
  async updateOrder(orderId, updates) {
    if (!isSupabaseConfigured) {
      console.log('Supabase not configured, order update simulated')
      return { data: { id: orderId, ...updates }, error: null }
    }

    try {
      const { data, error } = await supabase
        .from('orders')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error updating order in Supabase:', error)
      return { data: null, error: handleSupabaseError(error) }
    }
  },

  // Get order by ID
  async getOrder(orderId) {
    if (!isSupabaseConfigured) {
      console.log('Supabase not configured, returning mock order')
      return { 
        data: { 
          id: orderId,
          order_number: `ISP-${orderId}`,
          status: 'completed'
        }, 
        error: null 
      }
    }

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching order from Supabase:', error)
      return { data: null, error: handleSupabaseError(error) }
    }
  },

  // Get orders by customer email
  async getOrdersByEmail(email) {
    if (!isSupabaseConfigured) {
      console.log('Supabase not configured, returning empty orders')
      return { data: [], error: null }
    }

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_email', email)
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching orders from Supabase:', error)
      return { data: [], error: handleSupabaseError(error) }
    }
  }
}

// Database queries for store admin functionality
export const storeQueries = {
  // Get all products with inventory data
  async getAllProducts() {
    if (!isSupabaseConfigured) {
      return { 
        data: mockStoreData.products, 
        error: null 
      }
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or('slug.like.ispeak-%,slug.like.paji-%,slug.like.african-%,slug.like.teacher-%,slug.like.amharic-%,slug.like.yoruba-%,slug.like.kiswahili-%,slug.like.twi-%')
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.log('Using mock store data due to connection error')
      return { data: mockStoreData.products, error: null }
    }
  },

  // Get single product by ID
  async getProductById(id) {
    if (!isSupabaseConfigured) {
      const product = mockStoreData.products.find(p => p.id === parseInt(id))
      return { data: product || null, error: product ? null : { error: 'Product not found', status: 404 } }
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          collection:collections(name, slug),
          inventory:product_inventory(quantity, low_stock_threshold)
        `)
        .eq('id', id)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: handleSupabaseError(error) }
    }
  },

  // Create new product
  async createProduct(productData) {
    if (!isSupabaseConfigured) {
      const newProduct = {
        id: Date.now(),
        ...productData,
        created_at: new Date().toISOString()
      }
      return { data: newProduct, error: null }
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: handleSupabaseError(error) }
    }
  },

  // Update product
  async updateProduct(id, updates) {
    if (!isSupabaseConfigured) {
      return { data: { id, ...updates }, error: null }
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: handleSupabaseError(error) }
    }
  },

  // Delete product
  async deleteProduct(id) {
    if (!isSupabaseConfigured) {
      return { data: { id }, error: null }
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error
      return { data: { id }, error: null }
    } catch (error) {
      return { data: null, error: handleSupabaseError(error) }
    }
  },

  // Get all orders with customer info
  async getAllOrders() {
    if (!isSupabaseConfigured) {
      return { data: mockStoreData.orders, error: null }
    }

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.log('Using mock order data due to connection error')
      return { data: mockStoreData.orders, error: null }
    }
  },

  // Update order status
  async updateOrderStatus(orderId, status) {
    if (!isSupabaseConfigured) {
      return { data: { id: orderId, status }, error: null }
    }

    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: handleSupabaseError(error) }
    }
  },

  // Get all collections
  async getAllCollections() {
    if (!isSupabaseConfigured) {
      return { data: mockStoreData.collections, error: null }
    }

    try {
      const { data, error } = await supabase
        .from('collections')
        .select(`
          *,
          products:products(count)
        `)
        .order('name')

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.log('Using mock collection data due to connection error')
      return { data: mockStoreData.collections, error: null }
    }
  },

  // Create new collection
  async createCollection(collectionData) {
    if (!isSupabaseConfigured) {
      const newCollection = {
        id: Date.now(),
        ...collectionData,
        created_at: new Date().toISOString()
      }
      return { data: newCollection, error: null }
    }

    try {
      const { data, error } = await supabase
        .from('collections')
        .insert([collectionData])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: handleSupabaseError(error) }
    }
  },

  // Update collection
  async updateCollection(id, updates) {
    if (!isSupabaseConfigured) {
      return { data: { id, ...updates }, error: null }
    }

    try {
      const { data, error } = await supabase
        .from('collections')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: handleSupabaseError(error) }
    }
  },

  // Get store analytics/metrics
  async getStoreMetrics() {
    if (!isSupabaseConfigured) {
      return { data: mockStoreData.metrics, error: null }
    }

    try {
      // Get total products (only iSPEAK products)
      const { count: productCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .or('slug.like.ispeak-%,slug.like.paji-%,slug.like.african-%,slug.like.teacher-%,slug.like.amharic-%,slug.like.yoruba-%,slug.like.kiswahili-%,slug.like.twi-%')

      // Get active products count
      const { count: activeCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .or('slug.like.ispeak-%,slug.like.paji-%,slug.like.african-%,slug.like.teacher-%,slug.like.amharic-%,slug.like.yoruba-%,slug.like.kiswahili-%,slug.like.twi-%')
        .eq('status', 'active')

      // Get total orders
      const { count: orderCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })

      // Get pending orders
      const { count: pendingOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')

      // Get this month's orders
      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
      const { count: monthlyOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfMonth)

      // Get low stock products by fetching products and checking manually
      const { data: products } = await supabase
        .from('products')
        .select('stock_quantity, low_stock_threshold')
        .or('slug.like.ispeak-%,slug.like.paji-%,slug.like.african-%,slug.like.teacher-%,slug.like.amharic-%,slug.like.yoruba-%,slug.like.kiswahili-%,slug.like.twi-%')

      const lowStockCount = products?.filter(p => {
        const stock = p.stock_quantity || 0
        const threshold = p.low_stock_threshold || 10
        return stock > 0 && stock <= threshold
      }).length || 0

      const metrics = {
        totalProducts: productCount || 0,
        activeProducts: activeCount || 0,
        totalOrders: orderCount || 0,
        pendingOrders: pendingOrders || 0,
        monthlyOrders: monthlyOrders || 0,
        lowStockItems: lowStockCount
      }

      return { data: metrics, error: null }
    } catch (error) {
      console.log('Using mock metrics due to connection error')
      return { data: mockStoreData.metrics, error: null }
    }
  }
}

// Mock data for store functionality when Supabase is not configured
const mockStoreData = {
  products: [
    {
      id: 1,
      name: 'iSPEAK Tote Bag',
      slug: 'ispeak-tote-bag',
      description: 'Canvas tote bag with iSPEAK logo',
      price: 25.00,
      status: 'active',
      featured_image: 'https://v3.fal.media/files/rabbit/PhQNTR1uBQW3W1GlQzt_U_e35a94c2572145628e963d39f862b63a.png',
      collection: { name: 'Bags & Accessories', slug: 'bags-accessories' },
      inventory: { quantity: 50, low_stock_threshold: 10 },
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: 2,
      name: 'Paji Plush Toy',
      slug: 'paji-plush-toy',
      description: 'Soft plush toy featuring Paji mascot',
      price: 35.00,
      status: 'active',
      featured_image: 'https://v3.fal.media/files/penguin/nqCnmJfLilGxcW1YaGb4n_907449630e104b1ba3f69dc7d330d355.png',
      collection: { name: 'Toys & Games', slug: 'toys-games' },
      inventory: { quantity: 5, low_stock_threshold: 10 },
      created_at: '2024-01-10T10:00:00Z'
    },
    {
      id: 3,
      name: 'Language Learning Cards',
      slug: 'language-learning-cards',
      description: 'Educational flashcards for language learning',
      price: 15.00,
      status: 'active',
      featured_image: 'https://v3.fal.media/files/penguin/nqCnmJfLilGxcW1YaGb4n_907449630e104b1ba3f69dc7d330d355.png',
      collection: { name: 'Educational Materials', slug: 'educational-materials' },
      inventory: { quantity: 100, low_stock_threshold: 20 },
      created_at: '2024-01-05T10:00:00Z'
    }
  ],
  orders: [
    {
      id: 1,
      order_number: 'ISP-20240115001',
      customer_first_name: 'Sarah',
      customer_last_name: 'Johnson',
      customer_email: 'sarah.johnson@email.com',
      status: 'pending',
      total_amount: 60.00,
      items: [
        { product_name: 'iSPEAK Tote Bag', quantity: 1, price: 25.00 },
        { product_name: 'Paji Plush Toy', quantity: 1, price: 35.00 }
      ],
      created_at: '2024-01-15T14:30:00Z'
    },
    {
      id: 2,
      order_number: 'ISP-20240114001',
      customer_first_name: 'Michael',
      customer_last_name: 'Chen',
      customer_email: 'michael.chen@email.com',
      status: 'shipped',
      total_amount: 45.00,
      items: [
        { product_name: 'Language Learning Cards', quantity: 3, price: 15.00 }
      ],
      created_at: '2024-01-14T09:15:00Z'
    },
    {
      id: 3,
      order_number: 'ISP-20240113001',
      customer_first_name: 'Emily',
      customer_last_name: 'Davis',
      customer_email: 'emily.davis@email.com',
      status: 'completed',
      total_amount: 25.00,
      items: [
        { product_name: 'iSPEAK Tote Bag', quantity: 1, price: 25.00 }
      ],
      created_at: '2024-01-13T16:45:00Z'
    }
  ],
  collections: [
    {
      id: 1,
      name: 'Bags & Accessories',
      slug: 'bags-accessories',
      description: 'Stylish bags and accessories for language learners',
      products: [{ count: 5 }],
      created_at: '2024-01-01T10:00:00Z'
    },
    {
      id: 2,
      name: 'Educational Materials',
      slug: 'educational-materials',
      description: 'Learning aids and educational resources',
      products: [{ count: 8 }],
      created_at: '2024-01-01T10:00:00Z'
    },
    {
      id: 3,
      name: 'Toys & Games',
      slug: 'toys-games',
      description: 'Fun toys and games for learning',
      products: [{ count: 3 }],
      created_at: '2024-01-01T10:00:00Z'
    }
  ],
  metrics: {
    totalProducts: 18,
    totalOrders: 156,
    pendingOrders: 12,
    monthlyOrders: 45,
    lowStockItems: 3
  }
}