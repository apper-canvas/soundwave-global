import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Input = ({ type = 'text', placeholder, value, onChange, className = '', iconName, ...props }) => (
  <div className="relative">
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full bg-surface-800 text-white px-12 py-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    />
    {iconName && (
      <ApperIcon name={iconName} size={24} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-surface-400" />
    )}
  </div>
)

export default React.memo(Input)