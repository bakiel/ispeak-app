'use client'

import { useState } from 'react'

export default function ProductReviews({ product }) {
  const [filterRating, setFilterRating] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  // Mock detailed reviews data
  const mockReviews = [
    {
      id: 1,
      customer_name: "Sarah M.",
      rating: 5,
      title: "Perfect for my 6-year-old!",
      comment: "My daughter loves wearing her Paji t-shirt to school. The quality is excellent and it's held up beautifully after multiple washes. The African-inspired design sparked great conversations about different cultures.",
      created_at: "2024-01-15",
      verified_purchase: true,
      helpful_votes: 12,
      size_purchased: "6",
      color_purchased: "Yellow"
    },
    {
      id: 2,
      customer_name: "Marcus J.",
      rating: 5,
      title: "Great quality and meaningful purchase",
      comment: "Bought this for my nephew who's learning Yoruba. The shirt is well-made and I love that the purchase supports language education. The fit is true to size.",
      created_at: "2024-01-10",
      verified_purchase: true,
      helpful_votes: 8,
      size_purchased: "8",
      color_purchased: "Blue"
    },
    {
      id: 3,
      customer_name: "Aisha K.",
      rating: 4,
      title: "Beautiful design, runs slightly large",
      comment: "The Paji design is adorable and my son loves it. Only feedback is that it runs a bit large - I'd recommend sizing down if your child is between sizes. Otherwise, excellent quality!",
      created_at: "2024-01-05",
      verified_purchase: true,
      helpful_votes: 15,
      size_purchased: "7",
      color_purchased: "Green"
    },
    {
      id: 4,
      customer_name: "Jennifer L.",
      rating: 5,
      title: "Supporting a great cause",
      comment: "Not only is this a beautiful, well-made shirt, but knowing that my purchase helps fund language education makes it even better. My daughter gets compliments every time she wears it.",
      created_at: "2023-12-28",
      verified_purchase: true,
      helpful_votes: 6,
      size_purchased: "5T",
      color_purchased: "Yellow"
    },
    {
      id: 5,
      customer_name: "David R.",
      rating: 4,
      title: "Good quality, vibrant colors",
      comment: "Ordered this for my twins. The colors are vibrant and the fabric feels durable. Wish there were more size options for older kids, but overall very satisfied.",
      created_at: "2023-12-20",
      verified_purchase: true,
      helpful_votes: 4,
      size_purchased: "10",
      color_purchased: "Blue"
    }
  ]

  // Filter and sort reviews
  const filteredReviews = mockReviews.filter(review => {
    if (filterRating === 'all') return true
    return review.rating === parseInt(filterRating)
  })

  const sortedReviews = filteredReviews.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.created_at) - new Date(a.created_at)
      case 'oldest':
        return new Date(a.created_at) - new Date(b.created_at)
      case 'highest':
        return b.rating - a.rating
      case 'lowest':
        return a.rating - b.rating
      case 'helpful':
        return b.helpful_votes - a.helpful_votes
      default:
        return 0
    }
  })

  const StarRating = ({ rating, size = 'w-4 h-4' }) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`${size} ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-white">
      {/* Reviews Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>
        
        {/* Review Summary */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {product.reviews.average}
              </div>
              <StarRating rating={Math.floor(product.reviews.average)} size="w-6 h-6" />
              <p className="text-sm text-gray-600 mt-2">
                Based on {product.reviews.count} reviews
              </p>
            </div>

            {/* Rating Breakdown */}
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-8">{rating} ★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.max((product.reviews.breakdown[rating] / product.reviews.count) * 100, 2)}%` 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8 text-right">
                    {product.reviews.breakdown[rating]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Filter by rating:</label>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
              <option value="all">All ratings</option>
              <option value="5">5 stars</option>
              <option value="4">4 stars</option>
              <option value="3">3 stars</option>
              <option value="2">2 stars</option>
              <option value="1">1 star</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="highest">Highest rated</option>
              <option value="lowest">Lowest rated</option>
              <option value="helpful">Most helpful</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div key={review.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                {/* Customer Avatar */}
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {review.customer_name.charAt(0)}
                  </span>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{review.customer_name}</span>
                    {review.verified_purchase && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRating rating={review.rating} />
                    <span className="text-sm text-gray-500">
                      {formatDate(review.created_at)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Purchase Details */}
              <div className="text-sm text-gray-500 text-right">
                <div>Size: {review.size_purchased}</div>
                <div>Color: {review.color_purchased}</div>
              </div>
            </div>

            {/* Review Content */}
            <div className="mb-4">
              <h4 className="font-semibold text-lg mb-2">{review.title}</h4>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>

            {/* Review Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                Helpful ({review.helpful_votes})
              </button>
              
              <button className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
                Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review CTA */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4">Share Your Experience</h3>
          <p className="text-gray-600 mb-6">
            Help other families by sharing your thoughts about this product
          </p>
          <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-3 rounded-xl font-semibold hover:from-yellow-300 hover:to-orange-300 transition-all duration-300 transform hover:scale-105">
            Write a Review
          </button>
        </div>
      </div>
    </div>
  )
}