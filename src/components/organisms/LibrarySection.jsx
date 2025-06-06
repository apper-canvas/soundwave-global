import React from 'react'
import { motion } from 'framer-motion'
import MusicCard from '@/components/molecules/MusicCard'
import Text from '@/components/atoms/Text'

const LibrarySection = ({ tracks, onTrackSelect }) => {
  return (
    <div className="p-6">
      <Text type="h2" className="mb-6">Your Library</Text>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tracks.map((track) => (
          <MusicCard
            key={track?.id}
            item={track}
            onClick={onTrackSelect}
            type="track"
          />
        ))}
      </div>
    </div>
  )
}

export default React.memo(LibrarySection)