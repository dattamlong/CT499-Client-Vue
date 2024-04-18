import api from './axiosConfig'

export const login = async (payload) => {
  try {
    const response = await api.post('/auth/login', payload)
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}
