import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const VolumeControl = ({ volume, isMuted, onMute, onVolumeChange, showSlider, setShowSlider }) => {
  const volumeIcon = isMuted || volume === 0 ? "VolumeX" : volume > 0.5 ? "Volume2" : "Volume1"

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        <button
          onClick={onMute}
          onMouseEnter={() => setShowSlider(true)}
          className="text-surface-400 hover:text-white transition-colors"
        >
          <ApperIcon name={volumeIcon} size={20} />
        </button>
        
        <AnimatePresence>
          {showSlider && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="flex items-center"
              onMouseLeave={() => setShowSlider(false)}
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={onVolumeChange}
                className="w-24 accent-primary"
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <span className="text-surface-400 text-sm min-w-[3rem]">
          {Math.round(volume * 100)}%
        </span>
      </div>
    </div>
  )
}

export default React.memo(VolumeControl)