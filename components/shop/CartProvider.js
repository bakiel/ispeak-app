'use client'
import { CartContextProvider } from '@/lib/cartContext'

export default function CartProvider({ children }) {
  return (
    <CartContextProvider>
      {children}
    </CartContextProvider>
  )
}