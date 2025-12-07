import { NextResponse } from 'next/server'
import { blogQueries, blogAPI } from '@/lib/api-client'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Use the new API client
    let result
    if (category) {
      result = await blogQueries.getPostsByCategory(category)
    } else {
      result = await blogAPI.getAllPosts({ limit, offset })
    }

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message },
        { status: result.error.status || 500 }
      )
    }

    const posts = result.data?.posts || result.data || []

    return NextResponse.json({
      success: true,
      data: posts,
      total: posts.length,
      limit,
      offset
    })

  } catch (error) {
    console.error('Blog API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ['title', 'slug', 'excerpt', 'content', 'category_id']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Prepare post data
    const postData = {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      featured_image: body.featured_image || null,
      category_id: body.category_id,
      author_name: body.author_name || 'iSPEAK Team',
      author_bio: body.author_bio || null,
      is_published: body.is_published || false
    }

    // Use the admin API to create a blog post
    const { adminAPI } = await import('@/lib/api-client')
    const { data, error } = await adminAPI.createBlogPost(postData)
      
    if (error) {
      console.error('Error creating blog post:', error)
      return NextResponse.json(
        { error: 'Failed to create blog post' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Blog post created successfully',
      data: data
    })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}