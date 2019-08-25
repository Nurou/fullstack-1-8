import React from 'react'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = ({ store }) => {
  const handleChange = event => {
    // input-field value is in variable event.target.value
    const keyword = event.target.value
    store.dispatch(filterAnecdotes(keyword))
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

export default Filter
