import React from 'react'
import ApperIcon from '@/components/ApperIcon'
import IconButton from '@/components/atoms/IconButton' // Reusing IconButton for consistent styling

const PlaybackControls = ({ isPlaying, onPlayPause, onPrevious, onNext }) => (
  <div className="flex items-center gap-6 mb-8">
    <IconButton
      iconName="SkipBack"
      onClick={onPrevious}
      className="text-surface-400 hover:text-white"
      label="" // No label for these buttons
    />
    
    <button
      onClick={onPlayPause}
      className="w-16 h-16 bg-primary hover:bg-primary-dark rounded-full flex items-center justify-center transition-colors shadow-lg"
    >
      <ApperIcon name={isPlaying ? "Pause" : "Play"} size={24} className="text-white" />
    </button>
    
    <IconButton
      iconName="SkipForward"
      onClick={onNext}
      className="text-surface-400 hover:text-white"
      label="" // No label for these buttons
    />
  </div>
)

export default React.memo(PlaybackControls)