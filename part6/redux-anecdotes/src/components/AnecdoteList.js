import React from 'react'
import Notification from '../components/Notification'
import { addVote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
  // filter value also stored in the store
  const { anecdotes, filter } = store.getState()

  const anecdotesToShow = () => {
    return anecdotes.filter(a => a.content.includes(filter))
  }

  const handleVote = anecdote => {
    store.dispatch(addVote(anecdote.id))
    store.dispatch(addNotification(`You voted "${anecdote.content}"`))
    setTimeout(() => {
      store.dispatch(addNotification(null))
    }, 5000)
  }

  const listAnecdotes = () =>
    anecdotesToShow().map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
    ))

  const displayNotification = () =>
    store.getState().notification &&
    store.getState().notification.includes('voted') && (
      <Notification store={store} />
    )

  return (
    <div>
      {displayNotification()}
      <br />
      {listAnecdotes()}
    </div>
  )
}

export default AnecdoteList
