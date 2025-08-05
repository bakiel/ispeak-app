import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request, { params }) {
  try {
    const { id } = params
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        blog_categories!category_id(id, name, slug, color)
      `)
      .eq('id', id)
      .single()
      
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        )
      }
      throw error
    }
    
    return NextResponse.json({
      success: true,
      data: data
    })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    
    // Check if post exists
    const { data: existingPost, error: fetchError } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('id', id)
      .single()
      
    if (fetchError || !existingPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }
    
    // If slug is being changed, check if new slug already exists
    if (body.slug) {
      const { data: slugPost } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', body.slug)
        .neq('id', id)
        .single()
        
      if (slugPost) {
        return NextResponse.json(
          { error: 'A post with this slug already exists' },
          { status: 400 }
        )
      }
    }
    
    // Prepare update data
    const updateData = {
      updated_at: new Date().toISOString()
    }
    
    // Only include fields that are provided
    const allowedFields = [
      'title', 'slug', 'excerpt', 'content', 'featured_image',
      'category_id', 'author_name', 'author_bio', 'author_image',
      'is_published', 'meta_title', 'meta_description', 'meta_keywords',
      'og_title', 'og_description', 'og_image'
    ]
    
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    }
    
    // Update published_at if publishing status changes
    if (body.is_published !== undefined) {
      updateData.published_at = body.is_published ? new Date().toISOString() : null
    }
    
    // Update post
    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
      
    if (error) {
      console.error('Error updating blog post:', error)
      return NextResponse.json(
        { error: 'Failed to update blog post' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Blog post updated successfully',
      data: data
    })
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    
    // Check if post exists
    const { data: existingPost, error: fetchError } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('id', id)
      .single()
      
    if (fetchError || !existingPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }
    
    // Delete post
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)
      
    if (error) {
      console.error('Error deleting blog post:', error)
      return NextResponse.json(
        { error: 'Failed to delete blog post' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}