import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import ProductsTable from '@/components/admin/ProductsTable'

export const metadata = {
  title: 'Product Management | iSPEAK Admin',
  description: 'Manage store products for iSPEAK language learning platform'
}

export default function ProductsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Products</h2>
            <p className="mt-1 text-sm text-gray-600">
              Manage your store products and inventory
            </p>
          </div>
          <Link
            href="/admin/store/products/new"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors inline-flex items-center"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Product
          </Link>
        </div>

        {/* ProductsTable component will handle stats */}

        {/* Products Table */}
        <ProductsTable />
      </div>
    </AdminLayout>
  )
}