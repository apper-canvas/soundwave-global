import { delay, generateId, createCopy, handleServiceError } from '../index'
import playlistsData from '../mockData/playlists.json'

let playlists = [...playlistsData]

const playlistService = {
  async getAll() {
    try {
      await delay(250)
      return createCopy(playlists)
    } catch (error) {
      handleServiceError(error, 'fetch playlists')
    }
  },

  async getById(id) {
    try {
      await delay(200)
      const playlist = playlists.find(p => p.id === id)
      if (!playlist) {
        throw new Error('Playlist not found')
      }
      return createCopy(playlist)
    } catch (error) {
      handleServiceError(error, 'fetch playlist')
    }
  },

  async create(playlistData) {
    try {
      await delay(400)
      const newPlaylist = {
        ...playlistData,
        id: generateId(),
        createdAt: new Date().toISOString(),
        tracks: playlistData.tracks || []
      }
      playlists.push(newPlaylist)
      return createCopy(newPlaylist)
    } catch (error) {
      handleServiceError(error, 'create playlist')
    }
  },

  async update(id, updates) {
    try {
      await delay(350)
      const index = playlists.findIndex(p => p.id === id)
      if (index === -1) {
        throw new Error('Playlist not found')
      }
      playlists[index] = { ...playlists[index], ...updates }
      return createCopy(playlists[index])
    } catch (error) {
      handleServiceError(error, 'update playlist')
    }
  },

  async delete(id) {
    try {
      await delay(300)
      const index = playlists.findIndex(p => p.id === id)
      if (index === -1) {
        throw new Error('Playlist not found')
      }
      playlists.splice(index, 1)
      return { success: true }
    } catch (error) {
      handleServiceError(error, 'delete playlist')
    }
  }
}

export default playlistService