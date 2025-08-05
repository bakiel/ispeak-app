'use client'
import { createContext, useContext, useReducer, useEffect } from 'react'

// Cart context
const CartContext = createContext()

// Cart actions
export const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  SET_CART: 'SET_CART',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  APPLY_PROMO: 'APPLY_PROMO',
  REMOVE_PROMO: 'REMOVE_PROMO'
}

// Promo codes
const PROMO_CODES = {
  'WELCOME10': { discount: 0.1, type: 'percentage', description: '10% off your order' },
  'FREESHIP': { discount: 0, type: 'shipping', description: 'Free shipping on any order' },
  'LEARN15': { discount: 0.15, type: 'percentage', description: '15% off your order' }
}

// Cart reducer
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item => 
        item.id === action.payload.id && 
        item.size === action.payload.size && 
        item.color === action.payload.color
      )

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === existingItem.id && 
            item.size === existingItem.size && 
            item.color === existingItem.color
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          )
        }
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }]
      }
    }

    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => 
          !(item.id === action.payload.id && 
            item.size === action.payload.size && 
            item.color === action.payload.color)
        )
      }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => 
            !(item.id === action.payload.id && 
              item.size === action.payload.size && 
              item.color === action.payload.color)
          )
        }
      }

      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id && 
          item.size === action.payload.size && 
          item.color === action.payload.color
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }
    }

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
        appliedPromo: null
      }

    case CART_ACTIONS.SET_CART:
      return {
        ...state,
        ...action.payload
      }

    case CART_ACTIONS.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen
      }

    case CART_ACTIONS.APPLY_PROMO: {
      const promoCode = PROMO_CODES[action.payload.toUpperCase()]
      if (promoCode) {
        return {
          ...state,
          appliedPromo: {
            code: action.payload.toUpperCase(),
            ...promoCode
          }
        }
      }
      return state
    }

    case CART_ACTIONS.REMOVE_PROMO:
      return {
        ...state,
        appliedPromo: null
      }

    default:
      return state
  }
}

// Initial state
const initialState = {
  items: [],
  sidebarOpen: false,
  appliedPromo: null
}

// Cart provider component
export function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('ispeak-cart')
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart)
          dispatch({ 
            type: CART_ACTIONS.SET_CART, 
            payload: { 
              ...parsedCart, 
              sidebarOpen: false // Don't restore sidebar state
            } 
          })
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const cartToSave = {
          items: state.items,
          appliedPromo: state.appliedPromo
        }
        localStorage.setItem('ispeak-cart', JSON.stringify(cartToSave))
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    }
  }, [state.items, state.appliedPromo])

  // Cart calculations
  const calculations = {
    itemCount: state.items.reduce((total, item) => total + item.quantity, 0),
    
    subtotal: state.items.reduce((total, item) => {
      const price = item.salePrice || item.price
      return total + (price * item.quantity)
    }, 0),

    get shipping() {
      // Free shipping on orders over $50 or with FREESHIP promo
      if (this.subtotal >= 50 || (state.appliedPromo?.type === 'shipping')) {
        return 0
      }
      return 7.99
    },

    get discount() {
      if (!state.appliedPromo || state.appliedPromo.type !== 'percentage') {
        return 0
      }
      return this.subtotal * state.appliedPromo.discount
    },

    get tax() {
      return (this.subtotal - this.discount) * 0.08
    },

    get total() {
      return this.subtotal - this.discount + this.shipping + this.tax
    },

    get freeShippingProgress() {
      if (this.subtotal >= 50) return 100
      return (this.subtotal / 50) * 100
    },

    get freeShippingRemaining() {
      return Math.max(0, 50 - this.subtotal)
    }
  }

  // Action creators
  const actions = {
    addItem: (item) => {
      dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: item })
    },

    removeItem: (item) => {
      dispatch({ 
        type: CART_ACTIONS.REMOVE_ITEM, 
        payload: { id: item.id, size: item.size, color: item.color } 
      })
    },

    updateQuantity: (item, quantity) => {
      dispatch({ 
        type: CART_ACTIONS.UPDATE_QUANTITY, 
        payload: { id: item.id, size: item.size, color: item.color, quantity } 
      })
    },

    clearCart: () => {
      dispatch({ type: CART_ACTIONS.CLEAR_CART })
    },

    toggleSidebar: () => {
      dispatch({ type: CART_ACTIONS.TOGGLE_SIDEBAR })
    },

    openSidebar: () => {
      if (!state.sidebarOpen) {
        dispatch({ type: CART_ACTIONS.TOGGLE_SIDEBAR })
      }
    },

    closeSidebar: () => {
      if (state.sidebarOpen) {
        dispatch({ type: CART_ACTIONS.TOGGLE_SIDEBAR })
      }
    },

    applyPromo: (code) => {
      dispatch({ type: CART_ACTIONS.APPLY_PROMO, payload: code })
      return PROMO_CODES[code.toUpperCase()] ? true : false
    },

    removePromo: () => {
      dispatch({ type: CART_ACTIONS.REMOVE_PROMO })
    }
  }

  const value = {
    ...state,
    ...calculations,
    ...actions,
    isValidPromo: (code) => !!PROMO_CODES[code.toUpperCase()],
    getPromoDetails: (code) => PROMO_CODES[code.toUpperCase()]
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartContextProvider')
  }
  return context
}

export default CartContext