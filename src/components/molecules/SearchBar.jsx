import React from 'react'
import Input from '@/components/atoms/Input'

const SearchBar = ({ query, onQueryChange }) => (
  <div className="max-w-2xl mx-auto mb-8">
    <Input
      type="text"
      placeholder="Search for songs, artists, albums..."
      value={query}
      onChange={onQueryChange}
      iconName="Search"
    />
  </div>
)

export default React.memo(SearchBar)