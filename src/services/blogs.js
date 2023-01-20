import axios from 'axios'
import store from '../store'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  if (newToken === null) {
    token = null
  }
  else {
    token = `bearer ${newToken}`
  }
}

const checkToken = () => {
  const user = store.getState().user
  if (user) {
    setToken(user.token)
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog) => {
  checkToken()
  const response = await axios.post(baseUrl, blog, {
    headers: {
      Authorization: token
    }
  })
  return response.data
}

const update = async (updateBlog) => {
  const response = await axios.put(`${baseUrl}/${updateBlog.id}`, updateBlog)
  return response.data
}

const remove = async (id) => {
  checkToken()
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: token
    }
  })
  return response.data
}

export default { setToken, getAll, create, update, remove }