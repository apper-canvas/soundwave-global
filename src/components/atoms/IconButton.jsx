import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const IconButton = ({ iconName, onClick, size = 20, className = '', label = '', active = false }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${className} ${
      active ? 'bg-surface-800 text-white' : 'text-surface-400 hover:text-white'
    }`}
  >
    <ApperIcon name={iconName} size={size} />
    {label && <span>{label}</span>}
  </button>
)

export default React.memo(IconButton)