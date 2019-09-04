import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
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
      return state.sort((a, b) => b.votes - a.votes)
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
  return async dispatch => {
    await anecdoteService.updateVotes(id)
    dispatch({
      type: 'VOTE',
      data: { id },
    })
  }
}

// anecdotes are created through async action creators
// made possible by redux thunk middleware
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export default anecdoteReducer
