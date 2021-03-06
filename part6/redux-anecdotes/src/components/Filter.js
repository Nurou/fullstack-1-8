import React from 'react'
import { filterAnecdotes } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = props => {
  const handleChange = event => {
    // input-field value is in variable event.target.value
    const keyword = event.target.value
    props.filterAnecdotes(keyword)
  }

  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filterAnecdotes,
}

export default connect(
  null,
  mapDispatchToProps,
)(Filter)
