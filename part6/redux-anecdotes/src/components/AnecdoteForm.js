import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'
import Notification from '../components/Notification'

const AnecdoteForm = ({ store }) => {
  const addAnecdote = event => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    store.dispatch(createAnecdote(anecdote))
    store.dispatch(addNotification(`You added ${anecdote}`))
    setTimeout(() => {
      store.dispatch(addNotification(null))
    }, 5000)
  }

  const displayNotification = () =>
    store.getState().notification &&
    store.getState().notification.includes('added') && (
      <Notification store={store} />
    )

  return (
    <>
      <br />
      {displayNotification()}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
