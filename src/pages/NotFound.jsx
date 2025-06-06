import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <ApperIcon name="MusicOff" size={64} className="text-surface-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">404</h1>
          <p className="text-surface-400 text-lg">This page doesn't exist</p>
        </div>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full transition-colors"
        >
          <ApperIcon name="ArrowLeft" size={16} />
          Back to SoundWave
        </Link>
      </div>
    </div>
  )
}

export default NotFound