import React from 'react'
import Notification from '../components/Notification'
import { addVote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = props => {
  const handleVote = anecdote => {
    props.addVote(anecdote.id)
    props.addNotification(`You voted "${anecdote.content}"`, 1)
  }

  const listAnecdotes = () =>
    props.visibleAnecdotes.map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
    ))

  const displayNotification = () =>
    props.notificationToDisplay && <Notification />

  return (
    <div>
      {displayNotification()}
      <br />
      {listAnecdotes()}
    </div>
  )
}

const anecdotesToShow = props => {
  return props.anecdotes.filter(a => a.content.includes(props.filter))
}

const mapStateToProps = state => {
  return {
    visibleAnecdotes: anecdotesToShow(state),
    notificationToDisplay: state.notification,
  }
}

const mapDispatchToProps = {
  addVote,
  addNotification,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnecdoteList)
