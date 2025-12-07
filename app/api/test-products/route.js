import { productsAPI } from '@/lib/api-client'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { data, error } = await productsAPI.getAll({ status: 'active' })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const products = data?.products || data || []

    return NextResponse.json({
      count: products.length,
      products: products.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        images: p.images,
        status: p.status
      }))
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}