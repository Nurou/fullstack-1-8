import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { ALL_BOOKS } from '../queries/queries'

// TODO:
/**
 * a row of buttons for each genre beneath table
 * clicking button causes books to be iterated over
 * only those including selected genre are displayed
 */

const Books = props => {
  // runs automatically on each each render
  const { loading, error, data } = useQuery(ALL_BOOKS)

  // all genres
  const [genres, setGenres] = useState([])
  // selected genre
  const [selectedGenre, setSelectedGenre] = useState(null)

  useEffect(() => {
    if (data) {
      setGenres([...new Set(data.allBooks.map(book => book.genres).flat())])
    }
  }, [data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  if (!props.show) {
    return null
  }

  const displayByFilter = () => {
    if (!selectedGenre) {
      return data.allBooks.map(book => (
        <tr key={book.title.toString()} className='bg-grey-100'>
          <td className='border px-4 py-2'>{book.title}</td>
          <td className='border px-4 py-2'>{book.author.name}</td>
          <td className='border px-4 py-2'>{book.published}</td>
        </tr>
      ))
    }

    return data.allBooks
      .filter(b => b.genres.includes(selectedGenre))
      .map(book => (
        <tr key={book.title.toString()} className='bg-grey-100'>
          <td className='border px-4 py-2'>{book.title}</td>
          <td className='border px-4 py-2'>{book.author.name}</td>
          <td className='border px-4 py-2'>{book.published}</td>
        </tr>
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
      {/* Buttons listed here */}
      {genres.map(genre => (
        <button
          value={genre}
          onClick={({ target }) => setSelectedGenre(target.value)}
          className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
        >
          {genre}
        </button>
      ))}
    </div>
  )
}

export default Books
