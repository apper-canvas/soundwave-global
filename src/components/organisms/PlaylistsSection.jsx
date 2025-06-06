import React from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Text from '@/components/atoms/Text'
import ApperIcon from '@/components/ApperIcon'
import MusicCard from '@/components/molecules/MusicCard'

const PlaylistsSection = ({ playlists, onCreatePlaylist }) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Text type="h2">Playlists</Text>
        <Button onClick={onCreatePlaylist}>
          <ApperIcon name="Plus" size={16} />
          Create Playlist
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {playlists.map((playlist) => (
          <MusicCard
            key={playlist?.id}
            item={playlist}
            onClick={() => {}} // Playlists are not playable yet
            type="playlist"
          />
        ))}
      </div>
    </div>
  )
}

export default React.memo(PlaylistsSection)