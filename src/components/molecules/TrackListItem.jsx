import React from 'react'
import { motion } from 'framer-motion'
import Image from '@/components/atoms/Image'
import Text from '@/components/atoms/Text'
import { formatTime } from '@/utils/helpers' // Assuming formatTime is moved to a utility

const TrackListItem = ({ track, isCurrent, onClick, delayIndex = 0 }) => {
  return (
    <motion.div
      key={`${track?.id}-${delayIndex}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delayIndex * 0.05 }}
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
        isCurrent 
          ? 'bg-primary/20 border border-primary/50' 
          : 'hover:bg-surface-800'
      }`}
      onClick={() => onClick(track)}
    >
      <Image 
        src={track?.coverUrl} 
        alt={track?.title || 'Track'} 
        className="w-12 h-12 rounded"
        defaultSrc="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60"
      />
      <div className="flex-1 min-w-0">
        <Text type="h4" className={`truncate ${isCurrent ? 'text-primary' : 'text-white'}`}>
          {track?.title || 'Unknown Title'}
        </Text>
        <Text type="p" className="truncate">{track?.artist || 'Unknown Artist'}</Text>
      </div>
      <Text type="span" className="text-xs">
        {formatTime(track?.duration || 0)}
      </Text>
    </motion.div>
  )
}

export default React.memo(TrackListItem)