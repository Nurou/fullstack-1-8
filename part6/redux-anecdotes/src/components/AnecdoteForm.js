import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'
import Notification from '../components/Notification'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = props => {
  const addAnecdote = async event => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    // save to db
    const newAnecdote = await anecdoteService.createAnecdote(anecdote)
    // update UI
    props.createAnecdote(newAnecdote)
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
