import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { ALL_BOOKS, CURRENT_USER } from '../queries/queries'

export const Recommend = props => {
  // books
  const {
    loading: loadingBooks,
    error: errorWithBooks,
    data: booksData
  } = useQuery(ALL_BOOKS)
  // user's favourite genre
  const [usersFavoriteGenre, setUsersFavoriteGenre] = useState(null)

  const {
    loading: loadingUser,
    error: errorWithUser,
    data: userData
  } = useQuery(CURRENT_USER)

  useEffect(() => {
    if (userData) {
      setUsersFavoriteGenre(userData.me.favoriteGenre)
    }
  }, [userData])

  if (loadingUser || loadingBooks) return <p>Loading...</p>
  if (errorWithUser || errorWithBooks) return <p>Error:(</p>

  if (!props.show) {
    return null
  }

  const displayRecommendations = () => {
    if (usersFavoriteGenre) {
      return booksData.allBooks
        .filter(b => b.genres.includes(usersFavoriteGenre))
        .map(book => (
          <tr key={book.title.toString()} className='bg-grey-100'>
            <td className='border px-4 py-2'>{book.title}</td>
            <td className='border px-4 py-2'>{book.author.name}</td>
            <td className='border px-4 py-2'>{book.published}</td>
          </tr>
        ))
    }
  }
  return (
    <div>
      <h1>Recommendations</h1>
      <br />
      <h2>{`Books in your favourite genre ${usersFavoriteGenre}`}</h2>
      <br />
      {displayRecommendations()}
    </div>
  )
}

export default Recommend
