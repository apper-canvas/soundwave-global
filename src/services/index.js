// Service utilities and shared functions
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const generateId = () => Date.now().toString()

export const createCopy = (data) => JSON.parse(JSON.stringify(data))

export const handleServiceError = (error, operation) => {
  console.error(`Error during ${operation}:`, error)
  throw new Error(`Failed to ${operation}. Please try again.`)
}