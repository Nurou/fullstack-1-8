import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { ALL_BOOKS, DELETE_BOOK, ALL_AUTHORS } from '../queries/queries'

const Books = props => {
  // runs automatically on each each render
  const { loading, error, data } = useQuery(ALL_BOOKS)

  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })

  // all genres
  const [genres, setGenres] = useState([])

  const [title, setTitle] = useState('')

  // selected genre
  const [selectedGenre, setSelectedGenre] = useState('all genres')

  useEffect(() => {
    if (data) {
      setGenres(
        [...new Set(data.allBooks.map(book => book.genres).flat())].concat(
          'all genres'
        )
      )
    }
  }, [data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  if (!props.show) {
    return null
  }

  const handleClick = async props => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the book ${props}?`
    )

    confirmed &&
      (await deleteBook({
        variables: { title: props }
      }))
  }

  const displayByFilter = () => {
    // no specific genre selected
    if (!selectedGenre || selectedGenre === 'all genres') {
      return data.allBooks.map((book, index) => (
        <>
          <tr key={book.title.toString()} className='bg-grey-100'>
            <td className='border px-4 py-2'>
              {book.title}
              <br />
              <button
                key={index}
                value={book.title}
                className='inline-block border-solid border-4 border-red-600'
                onClick={({ target }) => handleClick(target.value)}
              >
                Remove
              </button>
            </td>
            <td className='border px-4 py-2'>{book.author.name}</td>
            <td className='border px-4 py-2'>{book.published}</td>
          </tr>
        </>
      ))
    }

    return data.allBooks
      .filter(b => b.genres.includes(selectedGenre))
      .map(book => (
        <>
          <tr key={book.title.toString()} className='bg-grey-100'>
            <td className='border px-4 py-2'>{book.title}</td>
            <td className='border px-4 py-2'>{book.author.name}</td>
            <td className='border px-4 py-2'>{book.published}</td>
          </tr>
        </>
      ))
  }

  return (
    <div className='m-5'>
      <h2 className='font-bold '>Books</h2>
      <table className='table-auto'>
        <tbody>
          <tr className='bg-grey-100'>
            <th className='px-4 py-2'></th>
            <th className='px-4 py-2'>Author</th>
            <th className='px-4 py-2'>Published</th>
          </tr>
          {displayByFilter()}
        </tbody>
      </table>
      <br />
      {genres.map((genre, index) => (
        <button
          key={index}
          value={genre}
          onClick={({ target }) => setSelectedGenre(target.value)}
          className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
        >
          {genre}
        </button>
      ))}
      <br />
      <pre>{title}</pre>
    </div>
  )
}

export default Books
