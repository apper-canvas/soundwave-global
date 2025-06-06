import React from 'react'

const Text = ({ type, children, className = '' }) => {
  switch (type) {
    case 'h1':
      return <h1 className={`text-xl font-bold text-white ${className}`}>{children}</h1>
    case 'h2':
      return <h2 className={`text-2xl font-bold text-white ${className}`}>{children}</h2>
    case 'h3':
      return <h3 className={`text-lg font-semibold text-white ${className}`}>{children}</h3>
    case 'h4':
      return <h4 className={`text-white font-medium ${className}`}>{children}</h4>
    case 'p':
      return <p className={`text-surface-400 text-sm ${className}`}>{children}</p>
    case 'span':
      return <span className={`text-surface-400 text-sm ${className}`}>{children}</span>
    default:
      return <p className={className}>{children}</p>
  }
}

export default React.memo(Text)