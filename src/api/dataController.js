import queryString from 'query-string'
import api from './axiosConfig'

const apiURL = import.meta.env.VITE_BE_ENDPOINT

export const getList = async (resource, search) => {
  const query = {
    search
  }

  const url = `${apiURL}/api/${resource}/?${queryString.stringify(query)}`
  const { data } = await api.get(url)

  return data
}

export const getOne = async (resource, id) => {
  const url = `${apiURL}/api/${resource}/${id}`

  const { data } = await api.get(url)

  return data
}

export const updateOne = async (resource, id, newData) => {
  const url = `${apiURL}/api/${resource}/${id}`
  const { data } = await api.patch(url, newData)

  return data
}

export const create = async (resource, newData) => {
  const url = `${apiURL}/api/${resource}`
  const { data } = await api.post(url, newData)

  return data
}

export const deleteOne = async (resource, id) => {
  const url = `${apiURL}/api/${resource}/${id}`
  const { data } = await api.delete(url)

  return data
}

export const uploadImage = (source, file) => {
  const formData = new FormData()

  formData.append('file', file)

  return api.post(`api/photos/${source}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
