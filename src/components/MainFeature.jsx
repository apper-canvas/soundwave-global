import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import trackService from '../services/api/trackService'
import playlistService from '../services/api/playlistService'

const MainFeature = ({ currentView }) => {
  const [tracks, setTracks] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [queue, setQueue] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [previousVolume, setPreviousVolume] = useState(0.7)
  const progressRef = useRef(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [tracksData, playlistsData] = await Promise.all([
          trackService.getAll(),
          playlistService.getAll()
        ])
        setTracks(tracksData || [])
        setPlaylists(playlistsData || [])
        if (tracksData?.length > 0) {
          setCurrentTrack(tracksData[0])
          setQueue(tracksData)
        }
      } catch (err) {
        setError(err.message)
        toast.error("Failed to load music data")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = tracks.filter(track =>
        track?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track?.artist?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track?.album?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }, [searchQuery, tracks])

  useEffect(() => {
    let interval
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleNext()
            return 0
          }
          return prev + (100 / (currentTrack.duration || 180))
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentTrack])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    toast.success(isPlaying ? "Paused" : "Playing", { autoClose: 1000 })
  }

  const handleNext = () => {
    if (queue.length === 0) return
    const currentIndex = queue.findIndex(track => track?.id === currentTrack?.id)
    const nextIndex = (currentIndex + 1) % queue.length
    setCurrentTrack(queue[nextIndex])
    setProgress(0)
    toast.success("Next track", { autoClose: 1000 })
  }

  const handlePrevious = () => {
    if (queue.length === 0) return
    const currentIndex = queue.findIndex(track => track?.id === currentTrack?.id)
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : queue.length - 1
    setCurrentTrack(queue[prevIndex])
    setProgress(0)
    toast.success("Previous track", { autoClose: 1000 })
  }

  const handleProgressClick = (e) => {
    if (!progressRef.current || !currentTrack) return
    const rect = progressRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newProgress = (clickX / rect.width) * 100
    setProgress(Math.max(0, Math.min(100, newProgress)))
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (newVolume > 0 && isMuted) {
      setIsMuted(false)
    }
  }

  const handleMute = () => {
    if (isMuted) {
      setVolume(previousVolume)
      setIsMuted(false)
    } else {
      setPreviousVolume(volume)
      setVolume(0)
      setIsMuted(true)
    }
  }

  const handleTrackSelect = (track) => {
    setCurrentTrack(track)
    setProgress(0)
    setIsPlaying(true)
    toast.success(`Now playing: ${track?.title || 'Unknown'}`)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const createPlaylist = async () => {
    try {
      const newPlaylist = await playlistService.create({
        name: `My Playlist ${playlists.length + 1}`,
        tracks: [],
        coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300"
      })
      setPlaylists(prev => [...prev, newPlaylist])
      toast.success("Playlist created!")
    } catch (err) {
      toast.error("Failed to create playlist")
    }
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-surface-400">Loading your music...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertCircle" size={48} className="text-red-500 mx-auto mb-4" />
          <p className="text-surface-400">{error}</p>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (currentView) {
      case 'search':
        return (
          <div className="p-6">
            <div className="max-w-2xl mx-auto">
              <div className="relative mb-8">
                <input
                  type="text"
                  placeholder="Search for songs, artists, albums..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-800 text-white px-12 py-4 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <ApperIcon name="Search" size={24} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-surface-400" />
              </div>

              {searchResults.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white mb-4">Search Results</h3>
                  {searchResults.map((track) => (
                    <motion.div
                      key={track?.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-800 cursor-pointer transition-colors"
                      onClick={() => handleTrackSelect(track)}
                    >
                      <img 
                        src={track?.coverUrl || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60"} 
                        alt={track?.title || 'Track'} 
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{track?.title || 'Unknown Title'}</h4>
                        <p className="text-surface-400 text-sm">{track?.artist || 'Unknown Artist'}</p>
                      </div>
                      <span className="text-surface-400 text-sm">
                        {formatTime(track?.duration || 0)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )

      case 'library':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Your Library</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tracks.map((track) => (
                <motion.div
                  key={track?.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-surface-800 p-4 rounded-xl hover:bg-surface-700 cursor-pointer transition-colors group"
                  onClick={() => handleTrackSelect(track)}
                >
                  <div className="relative mb-4">
                    <img 
                      src={track?.coverUrl || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300"} 
                      alt={track?.title || 'Track'} 
                      className="w-full aspect-square rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <ApperIcon name="Play" size={32} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-white font-medium mb-1 truncate">{track?.title || 'Unknown Title'}</h3>
                  <p className="text-surface-400 text-sm truncate">{track?.artist || 'Unknown Artist'}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'playlists':
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Playlists</h2>
              <button
                onClick={createPlaylist}
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors"
              >
                <ApperIcon name="Plus" size={16} />
                Create Playlist
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {playlists.map((playlist) => (
                <motion.div
                  key={playlist?.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-surface-800 p-4 rounded-xl hover:bg-surface-700 cursor-pointer transition-colors"
                >
                  <img 
                    src={playlist?.coverUrl || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300"} 
                    alt={playlist?.name || 'Playlist'} 
                    className="w-full aspect-square rounded-lg object-cover mb-4"
                  />
                  <h3 className="text-white font-medium mb-1">{playlist?.name || 'Untitled Playlist'}</h3>
                  <p className="text-surface-400 text-sm">{playlist?.tracks?.length || 0} songs</p>
                </motion.div>
              ))}
            </div>
          </div>
        )

      default:
        return (
          <div className="flex-1 flex">
            {/* Main Player Area */}
            <div className="flex-1 p-6 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <div className="relative mb-8">
                  <img 
                    src={currentTrack?.coverUrl || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=320"} 
                    alt={currentTrack?.title || 'Current Track'} 
                    className={`w-80 h-80 rounded-2xl object-cover shadow-2xl ${isPlaying ? 'album-rotation' : ''}`}
                  />
                  {isPlaying && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                  )}
                </div>

                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {currentTrack?.title || 'No Track Selected'}
                  </h2>
                  <p className="text-xl text-surface-400">{currentTrack?.artist || 'Unknown Artist'}</p>
                  <p className="text-lg text-surface-500">{currentTrack?.album || 'Unknown Album'}</p>
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-md mb-6">
                  <div 
                    ref={progressRef}
                    className="w-full h-2 bg-surface-700 rounded-full cursor-pointer mb-2"
                    onClick={handleProgressClick}
                  >
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-surface-400">
                    <span>{formatTime((progress / 100) * (currentTrack?.duration || 0))}</span>
                    <span>{formatTime(currentTrack?.duration || 0)}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-6 mb-8">
                  <button
                    onClick={handlePrevious}
                    className="text-surface-400 hover:text-white transition-colors"
                  >
                    <ApperIcon name="SkipBack" size={24} />
                  </button>
                  
                  <button
                    onClick={handlePlayPause}
                    className="w-16 h-16 bg-primary hover:bg-primary-dark rounded-full flex items-center justify-center transition-colors shadow-lg"
                  >
                    <ApperIcon name={isPlaying ? "Pause" : "Play"} size={24} className="text-white" />
                  </button>
                  
                  <button
                    onClick={handleNext}
                    className="text-surface-400 hover:text-white transition-colors"
                  >
                    <ApperIcon name="SkipForward" size={24} />
                  </button>
                </div>

                {/* Volume Control */}
                <div className="relative">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleMute}
                      onMouseEnter={() => setShowVolumeSlider(true)}
                      className="text-surface-400 hover:text-white transition-colors"
                    >
                      <ApperIcon 
                        name={isMuted || volume === 0 ? "VolumeX" : volume > 0.5 ? "Volume2" : "Volume1"} 
                        size={20} 
                      />
                    </button>
                    
                    <AnimatePresence>
                      {showVolumeSlider && (
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="flex items-center"
                          onMouseLeave={() => setShowVolumeSlider(false)}
                        >
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={handleVolumeChange}
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
              </motion.div>
            </div>

            {/* Queue Sidebar */}
            <div className="w-80 bg-surface-900 p-6 overflow-y-auto scrollbar-hide">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <ApperIcon name="ListMusic" size={20} />
                Queue ({queue.length})
              </h3>
              
              <div className="space-y-2">
                {queue.map((track, index) => (
                  <motion.div
                    key={`${track?.id}-${index}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      currentTrack?.id === track?.id 
                        ? 'bg-primary/20 border border-primary/50' 
                        : 'hover:bg-surface-800'
                    }`}
                    onClick={() => handleTrackSelect(track)}
                  >
                    <img 
                      src={track?.coverUrl || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60"} 
                      alt={track?.title || 'Track'} 
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium truncate ${
                        currentTrack?.id === track?.id ? 'text-primary' : 'text-white'
                      }`}>
                        {track?.title || 'Unknown Title'}
                      </h4>
                      <p className="text-surface-400 text-sm truncate">{track?.artist || 'Unknown Artist'}</p>
                    </div>
                    <span className="text-surface-400 text-xs">
                      {formatTime(track?.duration || 0)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {renderContent()}
    </div>
  )
}

export default MainFeature