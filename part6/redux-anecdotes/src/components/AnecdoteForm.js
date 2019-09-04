import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'
import Notification from '../components/Notification'
import { connect } from 'react-redux'

const AnecdoteForm = props => {
  const addAnecdote = async event => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(anecdote)
    props.addNotification(`You added ${anecdote}`)
    setTimeout(() => {
      props.addNotification(null)
    }, 5000)
  }

  const displayNotification = () =>
    props.notification &&
    props.notification.includes('added') && <Notification />

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

const mapStateToProps = state => {
  // retrieving the state of the notification
  // from store and returning a prop that holds it
  return {
    notification: state.notification,
  }
}

const mapDispatchToProps = {
  createAnecdote,
  addNotification,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnecdoteForm)
