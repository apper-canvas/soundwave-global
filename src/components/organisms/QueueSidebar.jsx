import React from 'react'
import ApperIcon from '@/components/ApperIcon'
import Text from '@/components/atoms/Text'
import TrackListItem from '@/components/molecules/TrackListItem'

const QueueSidebar = ({ queue, currentTrack, onTrackSelect }) => (
  <div className="w-80 bg-surface-900 p-6 overflow-y-auto scrollbar-hide">
    <Text type="h3" className="mb-4 flex items-center gap-2">
      <ApperIcon name="ListMusic" size={20} />
      Queue ({queue.length})
    </Text>
    
    <div className="space-y-2">
      {queue.map((track, index) => (
        <TrackListItem
          key={track?.id}
          track={track}
          isCurrent={currentTrack?.id === track?.id}
          onClick={onTrackSelect}
          delayIndex={index}
        />
      ))}
    </div>
  </div>
)

export default React.memo(QueueSidebar)