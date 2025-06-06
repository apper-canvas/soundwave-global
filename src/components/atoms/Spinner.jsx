import React from 'react'

const Spinner = ({ className = '' }) => (
  <div className={`w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4 ${className}`}></div>
)

export default React.memo(Spinner)