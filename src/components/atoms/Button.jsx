import React from 'react'

const Button = ({ children, onClick, className = '', type = 'button', disabled = false }) => (
  <button 
    type={type}
    onClick={onClick}
    className={`bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
)

export default React.memo(Button)