import AdminLayout from '@/components/admin/AdminLayout'
import ProductForm from '@/components/admin/ProductForm'
import Link from 'next/link'

export const metadata = {
  title: 'Add New Product | iSPEAK Admin',
  description: 'Create a new product for your iSPEAK store'
}

export default function NewProductPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
            <p className="mt-1 text-sm text-gray-600">
              Create a new product for your iSPEAK store
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

        <ProductForm />
      </div>
    </AdminLayout>
  )
}