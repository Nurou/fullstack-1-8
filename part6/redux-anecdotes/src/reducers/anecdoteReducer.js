import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      return state
        .map(a => (a.id === id ? changedAnecdote : a))
        .sort((a, b) => b.votes - a.votes)
    case 'NEW_ANECDOTE':
      const anecdote = action.data
      return state.concat(anecdote)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

/**
|--------------------------------------------------
| Action creators
|--------------------------------------------------
*/

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const addVote = id => {
  return {
    type: 'VOTE',
    data: { id },
  }
}

export const createAnecdote = data => {
  return {
    type: 'NEW_ANECDOTE',
    data,
  }
}

export default anecdoteReducer
