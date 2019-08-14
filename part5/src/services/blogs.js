import axios from 'axios'
const baseUrl = '/api/blogs'

// the token is set when user login is handled
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

// fetch blog list from API
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// use token to create new blog
const create = async newBlog => {
  const config = {
    headers: { authorization: token },
  }

  // send the new blog and the config
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, updatedBlog) => {
  const config = {
    headers: {
      authorization: token,
    },
  }
  // send the updated blog and the config
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return response.data
}

export default { getAll, setToken, create, update }
