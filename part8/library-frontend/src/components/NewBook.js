import React, { useState } from 'react'
import {
  useQuery,
  useMutation,
  useSubscription,
  useApolloClient
} from '@apollo/react-hooks'

import {
  CREATE_BOOK,
  ALL_BOOKS,
  ALL_AUTHORS,
  NEW_BOOK
} from '../queries/queries'

const NewBook = props => {
  const [errorMessage, setErrorMessage] = useState(null)
  const handleError = error => {
    console.log('error here')
    console.log(error.graphQLErrors[0].message)
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  useSubscription(NEW_BOOK, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async e => {
    e.preventDefault()
    await addBook({
      variables: { title, author, published, genres }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div className='m-5 '>
      {errorMessage && (
        <div style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</div>
      )}
      <br />
      <form className='w-full max-w-sm' onSubmit={submit}>
        <div className='pb-4'>
          Title
          <input
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className='pb-4'>
          Author
          <input
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className='pb-4'>
          Published
          <input
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
            type='number'
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div className=''>
          <input
            className='inline-block text-gray-700 text-center bg-gray-400 px-4 py-2 m-2'
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button
            className='inline-block text-gray-700 text-center bg-gray-400 px-4 py-2 m-2'
            onClick={addGenre}
            type='button'
          >
            Add Genre
          </button>
        </div>

        <div className='pb-4'>Genres: {genres.join(', ')}</div>
        {''}
        <button
          className='bg-gray-200 font-bold appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
          type='submit'
        >
          Create book
        </button>
      </form>
    </div>
  )
}

export default NewBook
