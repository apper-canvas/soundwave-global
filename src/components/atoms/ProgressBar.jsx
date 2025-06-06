import React from 'react'

const ProgressBar = React.forwardRef(({ progress, onClick, className = '' }, ref) => (
  <div 
    ref={ref}
    className={`w-full h-2 bg-surface-700 rounded-full cursor-pointer ${className}`}
    onClick={onClick}
  >
    <div 
      className="h-full bg-primary rounded-full transition-all duration-300"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
))

export default React.memo(ProgressBar)