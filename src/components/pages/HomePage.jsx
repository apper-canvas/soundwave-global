import React, { useState, useEffect, useRef, useCallback } from 'react'
import { toast } from 'react-toastify'
import MainTemplate from '@/components/templates/MainTemplate'
import PlayerDisplay from '@/components/organisms/PlayerDisplay'
import SearchSection from '@/components/organisms/SearchSection'
import LibrarySection from '@/components/organisms/LibrarySection'
import PlaylistsSection from '@/components/organisms/PlaylistsSection'
import QueueSidebar from '@/components/organisms/QueueSidebar'
import Spinner from '@/components/atoms/Spinner'
import ApperIcon from '@/components/ApperIcon' // Directly import ApperIcon
import Text from '@/components/atoms/Text'

import trackService from '@/services/api/trackService'
import playlistService from '@/services/api/playlistService'
import { formatTime } from '@/utils/helpers' // Assuming formatTime is moved to a utility

const HomePage = ({ darkMode, setDarkMode }) => {
  const [currentView, setCurrentView] = useState('home')
  const [tracks, setTracks] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [queue, setQueue] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(true)
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
          const newProgress = prev + (100 / (currentTrack.duration || 180))
          return newProgress >= 100 ? 100 : newProgress
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentTrack])

  // Separate effect to handle track completion
  useEffect(() => {
    if (progress >= 100 && isPlaying && currentTrack) {
      const timer = setTimeout(() => {
        handleNext()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [progress, isPlaying, currentTrack, handleNext])

  const handlePlayPause = useCallback(() => {
    setIsPlaying(prev => {
      toast.success(prev ? "Paused" : "Playing", { autoClose: 1000 })
      return !prev
    })
  }, [])

  const handleNext = useCallback(() => {
    if (queue.length === 0) return
    const currentIndex = queue.findIndex(track => track?.id === currentTrack?.id)
    const nextIndex = (currentIndex + 1) % queue.length
    setCurrentTrack(queue[nextIndex])
    setProgress(0)
    toast.success("Next track", { autoClose: 1000 })
  }, [queue, currentTrack])

  const handlePrevious = useCallback(() => {
    if (queue.length === 0) return
    const currentIndex = queue.findIndex(track => track?.id === currentTrack?.id)
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : queue.length - 1
    setCurrentTrack(queue[prevIndex])
    setProgress(0)
    toast.success("Previous track", { autoClose: 1000 })
  }, [queue, currentTrack])

  const handleProgressClick = useCallback((e) => {
    if (!progressRef.current || !currentTrack) return
    const rect = progressRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newProgress = (clickX / rect.width) * 100
    setProgress(Math.max(0, Math.min(100, newProgress)))
  }, [currentTrack])

  const handleVolumeChange = useCallback((e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (newVolume > 0 && isMuted) {
      setIsMuted(false)
    }
  }, [isMuted])

  const handleMute = useCallback(() => {
    if (isMuted) {
      setVolume(previousVolume)
      setIsMuted(false)
    } else {
      setPreviousVolume(volume)
      setVolume(0)
      setIsMuted(true)
    }
  }, [isMuted, volume, previousVolume])

  const handleTrackSelect = useCallback((track) => {
    setCurrentTrack(track)
    setProgress(0)
    setIsPlaying(true)
    toast.success(`Now playing: ${track?.title || 'Unknown'}`)
  }, [])

  const createPlaylist = useCallback(async () => {
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
  }, [playlists.length])

  const navItems = [
    { name: 'Home', icon: 'Home', view: 'home' },
    { name: 'Search', icon: 'Search', view: 'search' },
    { name: 'Your Library', icon: 'Library', view: 'library' },
    { name: 'Playlists', icon: 'ListMusic', view: 'playlists' },
  ]

  const sidebarFooter = {
    icon: darkMode ? "Sun" : "Moon",
    label: "Theme",
    onClick: () => setDarkMode(!darkMode)
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Spinner />
            <Text type="p">Loading your music...</Text>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <ApperIcon name="AlertCircle" size={48} className="text-red-500 mx-auto mb-4" />
            <Text type="p">{error}</Text>
          </div>
        </div>
      )
    }

    switch (currentView) {
      case 'search':
        return (
          <SearchSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResults={searchResults}
            onTrackSelect={handleTrackSelect}
          />
        )
      case 'library':
        return (
          <LibrarySection
            tracks={tracks}
            onTrackSelect={handleTrackSelect}
          />
        )
      case 'playlists':
        return (
          <PlaylistsSection
            playlists={playlists}
            onCreatePlaylist={createPlaylist}
          />
        )
      default:
        return (
          <>
            <PlayerDisplay
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              progress={progress}
              volume={volume}
              isMuted={isMuted}
              showVolumeSlider={showVolumeSlider}
              onPlayPause={handlePlayPause}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onProgressClick={handleProgressClick}
              onVolumeChange={handleVolumeChange}
              onMute={handleMute}
              setShowVolumeSlider={setShowVolumeSlider}
              ref={progressRef}
            />
            <QueueSidebar
              queue={queue}
              currentTrack={currentTrack}
              onTrackSelect={handleTrackSelect}
            />
          </>
        )
    }
  }

  return (
    <MainTemplate
      navItems={navItems}
      currentView={currentView}
      setCurrentView={setCurrentView}
      sidebarFooter={sidebarFooter}
    >
      {renderContent()}
    </MainTemplate>
  )
}

export default HomePage