import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { ALL_AUTHORS } from '../queries/queries'
import { AuthorUpdateForm } from './AuthorUpdateForm'
const Authors = props => {
  // runs automatically on each each render
  const { loading, error, data } = useQuery(ALL_AUTHORS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  if (!props.show) {
    return null
  }

  return (
    <div className='m-5'>
      <h2 className='font-bold '>Authors</h2>
      <table className='table-auto'>
        <tbody>
          <tr className='bg-grey-100'>
            <th className='px-4 py-2'></th>
            <th className='px-4 py-2'>Birth Year</th>
            <th className='px-4 py-2'>Number of Books</th>
          </tr>
          {data.allAuthors.map(a => (
            <tr key={a.name} className='bg-grey-100'>
              <td className='border px-4 py-2'>{a.name}</td>
              <td className='border px-4 py-2'>{a.born ? a.born : 'N/A'}</td>
              <td className='border px-4 py-2'>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <AuthorUpdateForm
        initialAuthorSelection={data.allAuthors[0].name}
        authors={data.allAuthors}
      />
    </div>
  )
}

export default Authors
