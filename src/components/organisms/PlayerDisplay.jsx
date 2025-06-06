import React from 'react'
import { motion } from 'framer-motion'
import Image from '@/components/atoms/Image'
import Text from '@/components/atoms/Text'
import ProgressBar from '@/components/atoms/ProgressBar'
import PlaybackControls from '@/components/molecules/PlaybackControls'
import VolumeControl from '@/components/molecules/VolumeControl'
import { formatTime } from '@/utils/helpers' // Assuming formatTime is moved to a utility

const PlayerDisplay = React.forwardRef(({ 
  currentTrack, 
  isPlaying, 
  progress, 
  volume, 
  isMuted, 
  showVolumeSlider,
  onPlayPause, 
  onPrevious, 
  onNext, 
  onProgressClick, 
  onVolumeChange, 
  onMute, 
  setShowVolumeSlider 
}, ref) => (
  <div className="flex-1 p-6 flex flex-col items-center justify-center">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center"
    >
      <div className="relative mb-8">
        <Image 
          src={currentTrack?.coverUrl} 
          alt={currentTrack?.title || 'Current Track'} 
          className={`w-80 h-80 rounded-2xl shadow-2xl ${isPlaying ? 'album-rotation' : ''}`}
          defaultSrc="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=320"
        />
        {isPlaying && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
        )}
      </div>

      <div className="mb-6">
        <Text type="h2" className="mb-2">
          {currentTrack?.title || 'No Track Selected'}
        </Text>
        <Text type="p" className="text-xl">{currentTrack?.artist || 'Unknown Artist'}</Text>
        <Text type="p" className="text-lg text-surface-500">{currentTrack?.album || 'Unknown Album'}</Text>
      </div>

      <div className="w-full max-w-md mb-6">
        <ProgressBar 
          ref={ref}
          progress={progress}
          onClick={onProgressClick}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-surface-400">
          <span>{formatTime((progress / 100) * (currentTrack?.duration || 0))}</span>
          <span>{formatTime(currentTrack?.duration || 0)}</span>
        </div>
      </div>

      <PlaybackControls
        isPlaying={isPlaying}
        onPlayPause={onPlayPause}
        onPrevious={onPrevious}
        onNext={onNext}
      />

      <VolumeControl
        volume={volume}
        isMuted={isMuted}
        onMute={onMute}
        onVolumeChange={onVolumeChange}
        showSlider={showVolumeSlider}
        setShowSlider={setShowVolumeSlider}
      />
    </motion.div>
  </div>
))

export default React.memo(PlayerDisplay)