import React from 'react'

const Image = ({ src, alt, className = '', defaultSrc = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60" }) => (
  <img 
    src={src || defaultSrc} 
    alt={alt} 
    className={`object-cover ${className}`}
    onError={(e) => {
      e.target.onerror = null; 
      e.target.src = defaultSrc;
    }}
  />
)

export default React.memo(Image)