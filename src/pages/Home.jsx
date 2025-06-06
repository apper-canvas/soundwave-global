import { useState, useEffect } from 'react'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = ({ darkMode, setDarkMode }) => {
  const [currentView, setCurrentView] = useState('home')

  return (
    <div className="flex h-screen bg-secondary dark:bg-secondary text-white overflow-hidden">
      {/* Navigation Sidebar */}
      <div className="w-60 bg-black/90 backdrop-blur-sm p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <ApperIcon name="Music" size={18} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">SoundWave</h1>
        </div>

        <nav className="space-y-4 flex-1">
          <button 
            onClick={() => setCurrentView('home')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
              currentView === 'home' ? 'bg-surface-800 text-white' : 'text-surface-400 hover:text-white'
            }`}
          >
            <ApperIcon name="Home" size={20} />
            <span>Home</span>
          </button>
          
          <button 
            onClick={() => setCurrentView('search')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
              currentView === 'search' ? 'bg-surface-800 text-white' : 'text-surface-400 hover:text-white'
            }`}
          >
            <ApperIcon name="Search" size={20} />
            <span>Search</span>
          </button>
          
          <button 
            onClick={() => setCurrentView('library')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
              currentView === 'library' ? 'bg-surface-800 text-white' : 'text-surface-400 hover:text-white'
            }`}
          >
            <ApperIcon name="Library" size={20} />
            <span>Your Library</span>
          </button>
          
          <button 
            onClick={() => setCurrentView('playlists')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
              currentView === 'playlists' ? 'bg-surface-800 text-white' : 'text-surface-400 hover:text-white'
            }`}
          >
            <ApperIcon name="ListMusic" size={20} />
            <span>Playlists</span>
          </button>
        </nav>

        <div className="mt-auto">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-surface-400 hover:text-white transition-colors"
          >
            <ApperIcon name={darkMode ? "Sun" : "Moon"} size={20} />
            <span>Theme</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <MainFeature currentView={currentView} />
      </div>
    </div>
  )
}

export default Home