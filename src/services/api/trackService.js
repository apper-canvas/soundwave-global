import { delay, generateId, createCopy, handleServiceError } from '../index'
import tracksData from '../mockData/tracks.json'

let tracks = [...tracksData]

const trackService = {
  async getAll() {
    try {
      await delay(300)
      return createCopy(tracks)
    } catch (error) {
      handleServiceError(error, 'fetch tracks')
    }
  },

  async getById(id) {
    try {
      await delay(200)
      const track = tracks.find(t => t.id === id)
      if (!track) {
        throw new Error('Track not found')
      }
      return createCopy(track)
    } catch (error) {
      handleServiceError(error, 'fetch track')
    }
  },

  async create(trackData) {
    try {
      await delay(400)
      const newTrack = {
        ...trackData,
        id: generateId(),
        createdAt: new Date().toISOString()
      }
      tracks.push(newTrack)
      return createCopy(newTrack)
    } catch (error) {
      handleServiceError(error, 'create track')
    }
  },

  async update(id, updates) {
    try {
      await delay(350)
      const index = tracks.findIndex(t => t.id === id)
      if (index === -1) {
        throw new Error('Track not found')
      }
      tracks[index] = { ...tracks[index], ...updates }
      return createCopy(tracks[index])
    } catch (error) {
      handleServiceError(error, 'update track')
    }
  },

  async delete(id) {
    try {
      await delay(300)
      const index = tracks.findIndex(t => t.id === id)
      if (index === -1) {
        throw new Error('Track not found')
      }
      tracks.splice(index, 1)
      return { success: true }
    } catch (error) {
      handleServiceError(error, 'delete track')
    }
  }
}

export default trackService