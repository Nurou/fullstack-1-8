import axios from 'axios'
const baseUrl = '/api/login'

// the token is set when user login is handled
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  // server returns user details & token
  return response.data
}

export default { login, setToken }
