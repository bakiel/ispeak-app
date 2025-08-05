'use client'
import { useState } from 'react'

// Reusable bulk actions component for tables
export default function BulkActions({ 
  selectedCount = 0, 
  totalCount = 0, 
  onSelectAll, 
  onApplyAction,
  actions = [],
  disabled = false 
}) {
  const [selectedAction, setSelectedAction] = useState('')

  const defaultActions = [
    { value: 'delete', label: 'Delete Selected', icon: 'fas fa-trash', danger: true },
    { value: 'export', label: 'Export Selected', icon: 'fas fa-download' },
  ]

  const actionOptions = actions.length > 0 ? actions : defaultActions

  const handleApply = () => {
    if (selectedAction && onApplyAction) {
      onApplyAction(selectedAction)
      setSelectedAction('')
    }
  }

  const allSelected = selectedCount === totalCount && totalCount > 0
  const someSelected = selectedCount > 0 && selectedCount < totalCount

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="checkbox"
              checked={allSelected}
              ref={(el) => {
                if (el) el.indeterminate = someSelected
              }}
              onChange={onSelectAll}
              disabled={disabled || totalCount === 0}
              className="rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50"
            />
          </div>
          <span className="text-sm text-gray-700">
            {selectedCount > 0 ? (
              <span className="font-medium">
                {selectedCount} of {totalCount} selected
              </span>
            ) : (
              `Select all ${totalCount} items`
            )}
          </span>
        </div>
        
        {selectedCount > 0 && (
          <div className="flex items-center space-x-2">
            <select 
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={disabled}
            >
              <option value="">Bulk actions</option>
              {actionOptions.map((action) => (
                <option key={action.value} value={action.value}>
                  {action.label}
                </option>
              ))}
            </select>
            <button 
              onClick={handleApply}
              disabled={!selectedAction || disabled}
              className={`px-3 py-1 text-sm rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                actionOptions.find(a => a.value === selectedAction)?.danger
                  ? 'bg-red-100 hover:bg-red-200 text-red-700'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  )
}