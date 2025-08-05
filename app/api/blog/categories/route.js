import { NextResponse } from 'next/server'
import { blogQueries } from '@/lib/supabase'

export async function GET() {
  try {
    const result = await blogQueries.getCategories()

    if (result.error) {
      return NextResponse.json(
        { error: result.error.error },
        { status: result.error.status || 500 }
      )
    }

    // Transform the data to ensure proper structure
    const categories = result.data?.map(category => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      color: category.color || '#6EC5B8' // Default to secondary color
    })) || []

    return NextResponse.json({
      success: true,
      data: categories,
      count: categories.length
    })

  } catch (error) {
    console.error('Categories API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}