import { NextResponse } from 'next/server'
import { blogQueries, supabase } from '@/lib/supabase'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')
    const published = searchParams.get('published')
    
    // Build query
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        blog_categories!category_id(id, name, slug, color)
      `)
      .order('created_at', { ascending: false })
      
    // Apply filters
    if (published !== null) {
      query = query.eq('is_published', published === 'true')
    }
    
    if (category) {
      const { data: categoryData } = await supabase
        .from('blog_categories')
        .select('id')
        .eq('slug', category)
        .single()
        
      if (categoryData) {
        query = query.eq('category_id', categoryData.id)
      }
    }
    
    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`)
    }
    
    // Apply pagination
    const { data, error, count } = await query
      .range(offset, offset + limit - 1)
    
    if (error) {
      console.error('Error fetching blog posts:', error)
      // Fallback to legacy method
      let result
      if (category) {
        result = await blogQueries.getPostsByCategory(category)
      } else {
        result = await blogQueries.getAllPosts()
      }
      
      if (result.error) {
        return NextResponse.json(
          { error: result.error.error },
          { status: result.error.status || 500 }
        )
      }
      
      return NextResponse.json({
        success: true,
        data: result.data || [],
        count: result.data?.length || 0
      })
    }

    // Transform the data
    const posts = data?.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featured_image: post.featured_image,
      published_at: post.published_at,
      created_at: post.created_at,
      updated_at: post.updated_at,
      is_published: post.is_published,
      meta_title: post.meta_title,
      meta_description: post.meta_description,
      meta_keywords: post.meta_keywords,
      og_title: post.og_title,
      og_description: post.og_description,
      og_image: post.og_image,
      author_name: post.author_name || 'iSPEAK Team',
      author_bio: post.author_bio,
      author_image: post.author_image,
      category: post.blog_categories ? {
        id: post.blog_categories.id,
        name: post.blog_categories.name,
        slug: post.blog_categories.slug,
        color: post.blog_categories.color
      } : null
    })) || []

    return NextResponse.json({
      success: true,
      data: posts,
      total: count || posts.length,
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
    
    // Check if slug already exists
    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', body.slug)
      .single()
      
    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 400 }
      )
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
      author_image: body.author_image || null,
      is_published: body.is_published || false,
      meta_title: body.meta_title || body.title,
      meta_description: body.meta_description || body.excerpt,
      meta_keywords: body.meta_keywords || null,
      og_title: body.og_title || body.title,
      og_description: body.og_description || body.excerpt,
      og_image: body.og_image || body.featured_image || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      published_at: body.is_published ? new Date().toISOString() : null
    }
    
    // Insert post
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([postData])
      .select()
      .single()
      
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