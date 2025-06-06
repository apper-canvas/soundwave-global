import React from 'react'
import { motion } from 'framer-motion'
import SearchBar from '@/components/molecules/SearchBar'
import TrackListItem from '@/components/molecules/TrackListItem'
import Text from '@/components/atoms/Text'

const SearchSection = ({ searchQuery, setSearchQuery, searchResults, onTrackSelect }) => {
  return (
    <div className="p-6">
      <SearchBar query={searchQuery} onQueryChange={(e) => setSearchQuery(e.target.value)} />

      {searchResults.length > 0 && (
        <div className="space-y-2">
          <Text type="h3" className="mb-4">Search Results</Text>
          {searchResults.map((track) => (
            <TrackListItem
              key={track?.id}
              track={track}
              onClick={onTrackSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default React.memo(SearchSection)