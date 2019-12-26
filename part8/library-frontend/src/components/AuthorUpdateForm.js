import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries/queries'

export const AuthorUpdateForm = props => {
  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
    // onError: handleError
  })

  // form field state
  const [name, setName] = useState(props.initialAuthorSelection)
  const [born, setBorn] = useState('')

  const submit = async e => {
    e.preventDefault()
    const setBornTo = born
    await editAuthor({
      variables: { name, setBornTo }
    })

    setBorn('')
  }

  return (
    <>
      <h2 className='font-bold '>Set Birth Year</h2>
      <form className='w-full max-w-sm' onSubmit={submit}>
        <select
          onChange={({ target }) => setName(target.value)}
          className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
        >
          {props.authors.map((a, index) => (
            <option key={index} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <div className='pb-4'>
          Born
          <input
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
            type='number'
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button
          className='bg-gray-200 font-bold appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
          type='submit'
        >
          Update Author
        </button>
      </form>
    </>
  )
}
