import AdminLayout from '@/components/admin/AdminLayout'
import ProductForm from '@/components/admin/ProductForm'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Edit Product | iSPEAK Admin',
  description: 'Edit product details for your iSPEAK store'
}

async function getProduct(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    notFound()
  }

  return data
}

export default async function EditProductPage({ params }) {
  const product = await getProduct(params.id)

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
            <p className="mt-1 text-sm text-gray-600">
              Update product details for: {product.name}
            </p>
          </div>
          <Link
            href="/admin/store/products"
            className="text-gray-600 hover:text-gray-900 inline-flex items-center"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Products
          </Link>
        </div>

        <ProductForm product={product} isEdit={true} />
      </div>
    </AdminLayout>
  )
}