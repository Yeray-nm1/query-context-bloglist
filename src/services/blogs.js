import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  const requestSorted = request.then((response) =>
    response.data.sort((a, b) => b.likes - a.likes)
  )
  return requestSorted
}

const updateLikes = async (id) => {
  const response = await axios.put(`${baseUrl}/like/${id}`)
  return response.data
}

const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, setToken, createBlog, updateLikes, removeBlog }
