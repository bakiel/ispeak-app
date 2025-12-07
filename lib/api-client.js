/**
 * iSPEAK API Client
 * Connects to the MySQL backend API on Hostinger VPS
 */

// API base URL - use environment variable or fallback to production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://72.61.201.237:3001/api'

// Helper to get auth token from localStorage
function getAuthToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('ispeak_token')
}

// Helper to get session ID for cart
function getSessionId() {
  if (typeof window === 'undefined') return null
  let sessionId = localStorage.getItem('ispeak_session_id')
  if (!sessionId) {
    sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    localStorage.setItem('ispeak_session_id', sessionId)
  }
  return sessionId
}

// Helper to normalize product data (convert string prices to numbers)
function normalizeProduct(product) {
  if (!product) return product
  return {
    ...product,
    price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
    sale_price: product.sale_price ? (typeof product.sale_price === 'string' ? parseFloat(product.sale_price) : product.sale_price) : null,
    cost_price: product.cost_price ? (typeof product.cost_price === 'string' ? parseFloat(product.cost_price) : product.cost_price) : null
  }
}

// Base fetch helper with error handling
async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const token = getAuthToken()
  const sessionId = getSessionId()

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...(sessionId && { 'X-Session-Id': sessionId }),
    ...options.headers
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        data: null,
        error: {
          message: data.message || 'An error occurred',
          status: response.status
        }
      }
    }

    return { data, error: null }
  } catch (error) {
    console.error('API fetch error:', error)
    return {
      data: null,
      error: {
        message: error.message || 'Network error',
        status: 500
      }
    }
  }
}

// =====================================================
// AUTHENTICATION
// =====================================================
export const authAPI = {
  async register(userData) {
    const result = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
    if (result.data?.token) {
      localStorage.setItem('ispeak_token', result.data.token)
    }
    return result
  },

  async login(email, password) {
    const result = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
    if (result.data?.token) {
      localStorage.setItem('ispeak_token', result.data.token)
    }
    return result
  },

  async logout() {
    localStorage.removeItem('ispeak_token')
    return { data: { success: true }, error: null }
  },

  async getProfile() {
    return apiFetch('/auth/profile')
  },

  async updateProfile(updates) {
    return apiFetch('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(updates)
    })
  },

  async changePassword(currentPassword, newPassword) {
    return apiFetch('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword })
    })
  },

  async requestPasswordReset(email) {
    return apiFetch('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    })
  },

  isLoggedIn() {
    return !!getAuthToken()
  }
}

// =====================================================
// PRODUCTS
// =====================================================
export const productsAPI = {
  async getAll(filters = {}) {
    const params = new URLSearchParams()
    if (filters.category) params.append('category', filters.category)
    if (filters.status) params.append('status', filters.status)
    if (filters.limit) params.append('limit', filters.limit)
    if (filters.offset) params.append('offset', filters.offset)

    const queryString = params.toString()
    const result = await apiFetch(`/products${queryString ? '?' + queryString : ''}`)
    // Normalize product prices from strings to numbers
    if (result.data && Array.isArray(result.data)) {
      result.data = result.data.map(normalizeProduct)
    }
    return result
  },

  async getById(id) {
    const result = await apiFetch(`/products/${id}`)
    if (result.data) {
      result.data = normalizeProduct(result.data)
    }
    return result
  },

  async getBySlug(slug) {
    const result = await apiFetch(`/products/slug/${slug}`)
    if (result.data) {
      result.data = normalizeProduct(result.data)
      // Also normalize related products if present
      if (result.data.relatedProducts) {
        result.data.relatedProducts = result.data.relatedProducts.map(normalizeProduct)
      }
    }
    return result
  },

  async getCategories() {
    // Backend uses /products/meta/categories
    return apiFetch('/products/meta/categories')
  },

  async getByCategory(categorySlug) {
    const result = await apiFetch(`/products/category/${categorySlug}`)
    if (result.data && Array.isArray(result.data)) {
      result.data = result.data.map(normalizeProduct)
    }
    return result
  },

  async getFeatured() {
    const result = await apiFetch('/products?featured=true&limit=8')
    if (result.data && Array.isArray(result.data)) {
      result.data = result.data.map(normalizeProduct)
    }
    return result
  },

  async search(query) {
    const result = await apiFetch(`/products?search=${encodeURIComponent(query)}`)
    if (result.data && Array.isArray(result.data)) {
      result.data = result.data.map(normalizeProduct)
    }
    return result
  },

  async checkStock(productId, quantity = 1) {
    return apiFetch(`/products/${productId}/stock?quantity=${quantity}`)
  }
}

// =====================================================
// CART
// =====================================================
export const cartAPI = {
  async get() {
    return apiFetch('/cart')
  },

  async addItem(productId, quantity = 1) {
    return apiFetch('/cart/items', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity })
    })
  },

  async updateItem(productId, quantity) {
    return apiFetch(`/cart/items/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity })
    })
  },

  async removeItem(productId) {
    return apiFetch(`/cart/items/${productId}`, {
      method: 'DELETE'
    })
  },

  async clear() {
    return apiFetch('/cart', {
      method: 'DELETE'
    })
  },

  async applyCoupon(code) {
    return apiFetch('/cart/coupon', {
      method: 'POST',
      body: JSON.stringify({ code })
    })
  },

  async removeCoupon() {
    return apiFetch('/cart/coupon', {
      method: 'DELETE'
    })
  }
}

// =====================================================
// ORDERS
// =====================================================
export const ordersAPI = {
  async create(orderData) {
    return apiFetch('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    })
  },

  async getAll() {
    return apiFetch('/orders')
  },

  async getById(orderId) {
    return apiFetch(`/orders/${orderId}`)
  },

  async getByNumber(orderNumber) {
    return apiFetch(`/orders/number/${orderNumber}`)
  },

  async track(orderNumber, email) {
    return apiFetch(`/orders/track?orderNumber=${orderNumber}&email=${encodeURIComponent(email)}`)
  },

  async updateStatus(orderId, status) {
    return apiFetch(`/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    })
  }
}

// =====================================================
// DONATIONS
// =====================================================
export const donationsAPI = {
  async create(donationData) {
    return apiFetch('/donations', {
      method: 'POST',
      body: JSON.stringify(donationData)
    })
  },

  async getStats() {
    return apiFetch('/donations/stats')
  },

  async getProgress() {
    return apiFetch('/donations/progress')
  },

  async getRecent(limit = 10) {
    return apiFetch(`/donations/recent?limit=${limit}`)
  },

  async getByCategory(category) {
    return apiFetch(`/donations/category/${category}`)
  }
}

// =====================================================
// BLOG
// =====================================================
export const blogAPI = {
  async getAllPosts(filters = {}) {
    const params = new URLSearchParams()
    if (filters.category) params.append('category', filters.category)
    if (filters.limit) params.append('limit', filters.limit)
    if (filters.offset) params.append('offset', filters.offset)

    const queryString = params.toString()
    // Backend uses /blog (not /blog/posts)
    return apiFetch(`/blog${queryString ? '?' + queryString : ''}`)
  },

  async getPostBySlug(slug) {
    // Backend uses /blog/slug/:slug
    return apiFetch(`/blog/slug/${slug}`)
  },

  async getCategories() {
    return apiFetch('/blog/categories')
  },

  async getPostsByCategory(categorySlug) {
    // Use query param for category
    return apiFetch(`/blog?category=${categorySlug}`)
  },

  async getFeaturedPosts() {
    // Backend has /blog/featured endpoint
    return apiFetch('/blog/featured?limit=3')
  },

  async getRecentPosts(limit = 5) {
    return apiFetch(`/blog?limit=${limit}`)
  },

  async getPostById(id) {
    // Backend uses /blog/admin/:id for ID-based lookup
    return apiFetch(`/blog/admin/${id}`)
  }
}

// =====================================================
// USERS / STUDENTS
// =====================================================
export const usersAPI = {
  async getStudents() {
    return apiFetch('/users/students')
  },

  async addStudent(studentData) {
    return apiFetch('/users/students', {
      method: 'POST',
      body: JSON.stringify(studentData)
    })
  },

  async updateStudent(studentId, updates) {
    return apiFetch(`/users/students/${studentId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    })
  },

  async deleteStudent(studentId) {
    return apiFetch(`/users/students/${studentId}`, {
      method: 'DELETE'
    })
  },

  async getEnrollments() {
    return apiFetch('/users/enrollments')
  },

  async getNotifications() {
    return apiFetch('/users/notifications')
  },

  async updateNotificationPreferences(preferences) {
    return apiFetch('/users/notifications', {
      method: 'PUT',
      body: JSON.stringify(preferences)
    })
  }
}

// =====================================================
// LESSONS
// =====================================================
export const lessonsAPI = {
  async getUpcoming() {
    return apiFetch('/lessons/upcoming')
  },

  async getHistory() {
    return apiFetch('/lessons/history')
  },

  async getById(lessonId) {
    return apiFetch(`/lessons/${lessonId}`)
  },

  async schedule(lessonData) {
    return apiFetch('/lessons', {
      method: 'POST',
      body: JSON.stringify(lessonData)
    })
  },

  async cancel(lessonId, reason) {
    return apiFetch(`/lessons/${lessonId}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason })
    })
  },

  async reschedule(lessonId, newDateTime) {
    return apiFetch(`/lessons/${lessonId}/reschedule`, {
      method: 'POST',
      body: JSON.stringify({ newDateTime })
    })
  },

  async submitFeedback(lessonId, feedback) {
    return apiFetch(`/lessons/${lessonId}/feedback`, {
      method: 'POST',
      body: JSON.stringify(feedback)
    })
  },

  async getEducators(language) {
    const params = language ? `?language=${language}` : ''
    return apiFetch(`/lessons/educators${params}`)
  },

  async getAvailability(educatorId, date) {
    return apiFetch(`/lessons/availability/${educatorId}?date=${date}`)
  }
}

// =====================================================
// CONTACT / FREE TRIAL
// =====================================================
export const contactAPI = {
  async submit(contactData) {
    return apiFetch('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData)
    })
  },

  async requestFreeTrial(trialData) {
    return apiFetch('/contact/free-trial', {
      method: 'POST',
      body: JSON.stringify(trialData)
    })
  }
}

// =====================================================
// ADMIN (requires admin authentication)
// =====================================================
export const adminAPI = {
  async getDashboard() {
    return apiFetch('/admin/dashboard')
  },

  // Products
  async getProducts(filters = {}) {
    const params = new URLSearchParams(filters)
    return apiFetch(`/admin/products?${params}`)
  },

  async createProduct(productData) {
    return apiFetch('/admin/products', {
      method: 'POST',
      body: JSON.stringify(productData)
    })
  },

  async updateProduct(productId, updates) {
    return apiFetch(`/admin/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    })
  },

  async deleteProduct(productId) {
    return apiFetch(`/admin/products/${productId}`, {
      method: 'DELETE'
    })
  },

  // Orders
  async getOrders(filters = {}) {
    const params = new URLSearchParams(filters)
    return apiFetch(`/admin/orders?${params}`)
  },

  async updateOrderStatus(orderId, status, notes) {
    return apiFetch(`/admin/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, notes })
    })
  },

  // Coupons
  async getCoupons() {
    return apiFetch('/admin/coupons')
  },

  async createCoupon(couponData) {
    return apiFetch('/admin/coupons', {
      method: 'POST',
      body: JSON.stringify(couponData)
    })
  },

  async updateCoupon(couponId, updates) {
    return apiFetch(`/admin/coupons/${couponId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    })
  },

  async deleteCoupon(couponId) {
    return apiFetch(`/admin/coupons/${couponId}`, {
      method: 'DELETE'
    })
  },

  // Users
  async getUsers(filters = {}) {
    const params = new URLSearchParams(filters)
    return apiFetch(`/admin/users?${params}`)
  },

  async updateUserRole(userId, role) {
    return apiFetch(`/admin/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role })
    })
  },

  // Donations
  async getDonations(filters = {}) {
    const params = new URLSearchParams(filters)
    return apiFetch(`/admin/donations?${params}`)
  },

  // Blog
  async getBlogPosts(filters = {}) {
    const params = new URLSearchParams(filters)
    return apiFetch(`/admin/blog/posts?${params}`)
  },

  async createBlogPost(postData) {
    return apiFetch('/admin/blog/posts', {
      method: 'POST',
      body: JSON.stringify(postData)
    })
  },

  async updateBlogPost(postId, updates) {
    return apiFetch(`/admin/blog/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    })
  },

  async deleteBlogPost(postId) {
    return apiFetch(`/admin/blog/posts/${postId}`, {
      method: 'DELETE'
    })
  },

  async publishBlogPost(postId) {
    return apiFetch(`/admin/blog/posts/${postId}/publish`, {
      method: 'POST'
    })
  },

  async unpublishBlogPost(postId) {
    return apiFetch(`/admin/blog/posts/${postId}/unpublish`, {
      method: 'POST'
    })
  },

  // Contact submissions
  async getContactSubmissions(filters = {}) {
    const params = new URLSearchParams(filters)
    return apiFetch(`/admin/contact?${params}`)
  },

  async updateContactStatus(submissionId, status) {
    return apiFetch(`/admin/contact/${submissionId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    })
  },

  // Free trial requests
  async getFreeTrialRequests(filters = {}) {
    const params = new URLSearchParams(filters)
    return apiFetch(`/admin/free-trials?${params}`)
  },

  async updateFreeTrialStatus(requestId, status) {
    return apiFetch(`/admin/free-trials/${requestId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    })
  },

  // Blog post CRUD (alias for consistency)
  async createPost(postData) {
    return apiFetch('/admin/blog/posts', {
      method: 'POST',
      body: JSON.stringify(postData)
    })
  },

  async updatePost(postId, updates) {
    return apiFetch(`/admin/blog/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    })
  },

  async deletePost(postId) {
    return apiFetch(`/admin/blog/posts/${postId}`, {
      method: 'DELETE'
    })
  },

  // Statistics (for homepage stats management)
  async getStatistics() {
    return apiFetch('/admin/statistics')
  },

  async updateStatistic(statId, updates) {
    return apiFetch(`/admin/statistics/${statId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    })
  },

  // Hero Sections (for page hero management)
  async getHeroSections() {
    return apiFetch('/admin/hero-sections')
  },

  async updateHeroSection(sectionId, updates) {
    return apiFetch(`/admin/hero-sections/${sectionId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    })
  }
}

// =====================================================
// COMPATIBILITY LAYER
// These match the existing Supabase function signatures
// for easier migration
// =====================================================
export const blogQueries = {
  async getAllPosts() {
    const result = await blogAPI.getAllPosts()
    return {
      data: result.data?.posts || result.data || [],
      error: result.error
    }
  },

  async getPostBySlug(slug) {
    const result = await blogAPI.getPostBySlug(slug)
    return {
      data: result.data?.post || result.data || null,
      error: result.error
    }
  },

  async getCategories() {
    const result = await blogAPI.getCategories()
    return {
      data: result.data?.categories || result.data || [],
      error: result.error
    }
  },

  async getPostsByCategory(categorySlug) {
    const result = await blogAPI.getPostsByCategory(categorySlug)
    return {
      data: result.data?.posts || result.data || [],
      error: result.error
    }
  }
}

export const ecommerceQueries = {
  async createOrder(orderData) {
    // Map old format to new format
    const mappedData = {
      customer_email: orderData.customerInfo?.email,
      customer_first_name: orderData.customerInfo?.firstName,
      customer_last_name: orderData.customerInfo?.lastName,
      customer_phone: orderData.customerInfo?.phone,
      shipping_address: orderData.shippingAddress,
      billing_address: orderData.billingAddress,
      items: orderData.items,
      total_amount: orderData.total,
      payment_intent_id: orderData.paymentIntentId
    }
    return ordersAPI.create(mappedData)
  },

  async updateOrder(orderId, updates) {
    if (updates.status) {
      return ordersAPI.updateStatus(orderId, updates.status)
    }
    return { data: null, error: { message: 'Invalid update', status: 400 } }
  },

  async getOrder(orderId) {
    return ordersAPI.getById(orderId)
  },

  async getOrdersByEmail(email) {
    // This would need a custom endpoint or admin access
    return { data: [], error: null }
  }
}

export const storeQueries = {
  async getAllProducts() {
    const result = await productsAPI.getAll()
    return {
      data: result.data?.products || result.data || [],
      error: result.error
    }
  },

  async getProductById(id) {
    const result = await productsAPI.getById(id)
    return {
      data: result.data?.product || result.data || null,
      error: result.error
    }
  },

  async createProduct(productData) {
    return adminAPI.createProduct(productData)
  },

  async updateProduct(id, updates) {
    return adminAPI.updateProduct(id, updates)
  },

  async deleteProduct(id) {
    return adminAPI.deleteProduct(id)
  },

  async getAllOrders() {
    const result = await adminAPI.getOrders()
    return {
      data: result.data?.orders || result.data || [],
      error: result.error
    }
  },

  async updateOrderStatus(orderId, status) {
    return adminAPI.updateOrderStatus(orderId, status)
  },

  async getAllCollections() {
    const result = await productsAPI.getCategories()
    return {
      data: result.data?.categories || result.data || [],
      error: result.error
    }
  },

  async createCollection(collectionData) {
    // Would need admin endpoint
    return { data: null, error: { message: 'Not implemented', status: 501 } }
  },

  async updateCollection(id, updates) {
    // Would need admin endpoint
    return { data: null, error: { message: 'Not implemented', status: 501 } }
  },

  async getStoreMetrics() {
    const result = await adminAPI.getDashboard()
    return {
      data: result.data || {
        totalProducts: 0,
        activeProducts: 0,
        totalOrders: 0,
        pendingOrders: 0,
        monthlyOrders: 0,
        lowStockItems: 0
      },
      error: result.error
    }
  }
}

// Default export for convenience
export default {
  auth: authAPI,
  products: productsAPI,
  cart: cartAPI,
  orders: ordersAPI,
  donations: donationsAPI,
  blog: blogAPI,
  users: usersAPI,
  lessons: lessonsAPI,
  contact: contactAPI,
  admin: adminAPI,
  // Compatibility layer
  blogQueries,
  ecommerceQueries,
  storeQueries
}
