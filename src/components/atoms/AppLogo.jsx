import ApperIcon from '@/components/ApperIcon'
import React from 'react'

const AppLogo = ({ className = '' }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
      <ApperIcon name="Music" size={18} className="text-white" />
    </div>
    <h1 className="text-xl font-bold text-white">SoundWave</h1>
  </div>
)

export default React.memo(AppLogo)