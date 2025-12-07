import { NextResponse } from 'next/server'
import { blogAPI, adminAPI } from '@/lib/api-client'

export async function GET(request, { params }) {
  try {
    const { id } = params

    const { data, error } = await blogAPI.getPostById(id)

    if (error) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data.post || data
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
    const { data, error } = await adminAPI.updatePost(id, updateData)

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

    // Delete post
    const { error } = await adminAPI.deletePost(id)

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