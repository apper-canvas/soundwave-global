import React from 'react'
import { motion } from 'framer-motion'
import Image from '@/components/atoms/Image'
import Text from '@/components/atoms/Text'
import ApperIcon from '@/components/ApperIcon'

const MusicCard = ({ item, onClick, type = 'track' }) => {
  const imageUrl = item?.coverUrl || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300"
  const title = type === 'track' ? item?.title : item?.name
  const subtitle = type === 'track' ? item?.artist : `${item?.tracks?.length || 0} songs`

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-surface-800 p-4 rounded-xl hover:bg-surface-700 cursor-pointer transition-colors group"
      onClick={() => onClick(item)}
    >
      <div className="relative mb-4">
        <Image 
          src={imageUrl} 
          alt={title || 'Item'} 
          className="w-full aspect-square rounded-lg"
          defaultSrc="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300"
        />
        {type === 'track' && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <ApperIcon name="Play" size={32} className="text-white" />
          </div>
        )}
      </div>
      <Text type="h4" className="mb-1 truncate">{title || 'Unknown Title'}</Text>
      <Text type="p" className="truncate">{subtitle || 'Unknown'}</Text>
    </motion.div>
  )
}

export default React.memo(MusicCard)