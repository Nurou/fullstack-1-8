import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async content => {
  const object = { content: content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVotes = async id => {
  const anecdote = await axios.get(`${baseUrl}/${id}`)
  const newObject = { ...anecdote.data, votes: anecdote.data.votes + 1 }
  console.log(newObject)
  await axios.put(`${baseUrl}/${id}`, newObject)
}

export default { getAll, createAnecdote, updateVotes }
