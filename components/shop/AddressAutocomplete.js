'use client'

import { useState, useRef, useEffect } from 'react'

export default function AddressAutocomplete({
  value,
  onChange,
  onAddressSelect,
  placeholder = "Start typing an address...",
  className = "",
  required = false,
  id,
  name
}) {
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef(null)
  const debounceRef = useRef(null)

  // Mock address suggestions - in production, you'd use Google Places API or similar
  const mockAddresses = [
    {
      description: "123 Main Street, New York, NY 10001, USA",
      structured: {
        address: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "US"
      }
    },
    {
      description: "456 Oak Avenue, Los Angeles, CA 90210, USA",
      structured: {
        address: "456 Oak Avenue",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90210",
        country: "US"
      }
    },
    {
      description: "789 Pine Road, Chicago, IL 60601, USA",
      structured: {
        address: "789 Pine Road",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
        country: "US"
      }
    },
    {
      description: "321 Elm Street, Miami, FL 33101, USA",
      structured: {
        address: "321 Elm Street",
        city: "Miami",
        state: "FL",
        zipCode: "33101",
        country: "US"
      }
    },
    {
      description: "654 Cedar Lane, Austin, TX 73301, USA",
      structured: {
        address: "654 Cedar Lane",
        city: "Austin",
        state: "TX",
        zipCode: "73301",
        country: "US"
      }
    }
  ]

  const searchAddresses = async (query) => {
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Filter mock addresses based on query
    const filtered = mockAddresses.filter(addr =>
      addr.description.toLowerCase().includes(query.toLowerCase())
    )
    
    // In production, you would make an API call like:
    /*
    try {
      const response = await fetch(`/api/geocode?address=${encodeURIComponent(query)}`)
      const data = await response.json()
      setSuggestions(data.predictions || [])
    } catch (error) {
      console.error('Error fetching address suggestions:', error)
      setSuggestions([])
    }
    */
    
    setSuggestions(filtered)
    setIsLoading(false)
  }

  const handleInputChange = (e) => {
    const newValue = e.target.value
    onChange(newValue)
    
    // Clear existing debounce timer
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    
    if (newValue.length > 2) {
      // Debounce the search to avoid too many API calls
      debounceRef.current = setTimeout(() => {
        searchAddresses(newValue)
        setShowSuggestions(true)
      }, 300)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
    
    setHighlightedIndex(-1)
  }

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion.description)
    setShowSuggestions(false)
    setSuggestions([])
    
    // Call the onAddressSelect callback with structured data
    if (onAddressSelect) {
      onAddressSelect(suggestion.structured)
    }
  }

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[highlightedIndex])
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setHighlightedIndex(-1)
        break
    }
  }

  const handleBlur = () => {
    // Delay hiding suggestions to allow for click events
    setTimeout(() => {
      setShowSuggestions(false)
      setHighlightedIndex(-1)
    }, 200)
  }

  const handleFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [])

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${className}`}
          autoComplete="off"
          required={required}
          id={id}
          name={name}
        />
        
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400"></div>
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none ${
                index === highlightedIndex ? 'bg-yellow-50 border-l-4 border-yellow-400' : ''
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 mr-3">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {suggestion.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {showSuggestions && !isLoading && suggestions.length === 0 && value.length > 2 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="px-4 py-3 text-sm text-gray-500">
            No addresses found. Please check your spelling or enter more details.
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-1 text-xs text-gray-500">
        Start typing to see address suggestions
      </div>
    </div>
  )
}

// For Google Places API integration (production version):
/*
export function GoogleAddressAutocomplete({ onAddressSelect, ...props }) {
  const [autocomplete, setAutocomplete] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      const autocompleteInstance = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ['address'],
          componentRestrictions: { country: ['us', 'ca'] },
          fields: ['address_components', 'formatted_address', 'geometry']
        }
      )

      autocompleteInstance.addListener('place_changed', () => {
        const place = autocompleteInstance.getPlace()
        
        if (place.address_components) {
          const components = place.address_components
          const structured = parseGoogleAddressComponents(components)
          onAddressSelect(structured)
        }
      })

      setAutocomplete(autocompleteInstance)
    }
  }, [onAddressSelect])

  return (
    <input
      ref={inputRef}
      type="text"
      {...props}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${props.className || ''}`}
    />
  )
}

function parseGoogleAddressComponents(components) {
  const result = {
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  }

  components.forEach(component => {
    const types = component.types
    
    if (types.includes('street_number')) {
      result.address = component.long_name + ' '
    }
    if (types.includes('route')) {
      result.address += component.long_name
    }
    if (types.includes('locality')) {
      result.city = component.long_name
    }
    if (types.includes('administrative_area_level_1')) {
      result.state = component.short_name
    }
    if (types.includes('postal_code')) {
      result.zipCode = component.long_name
    }
    if (types.includes('country')) {
      result.country = component.short_name
    }
  })

  return result
}
*/