import React, { useState } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginView from './components/LoginView'
import { Recommend } from './components/Recommend'

const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(
    localStorage.getItem('booklist-user-token')
  )

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const displayBasedOnToken = () => {
    if (!token) {
      return (
        <button
          className=' flex-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2'
          onClick={() => setPage('login')}
        >
          login
        </button>
      )
    }
    return (
      <>
        <button
          className=' flex-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2'
          onClick={() => setPage('add')}
        >
          add book
        </button>
        <button
          className=' flex-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2'
          onClick={() => setPage('recommend')}
        >
          recommend
        </button>
        <button
          className=' flex-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2'
          onClick={handleLogout}
        >
          logout
        </button>
      </>
    )
  }

  return (
    <div>
      <div className='flex items-center bg-gray-200 h-24'>
        <button
          className=' flex-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2'
          onClick={() => setPage('authors')}
        >
          authors
        </button>
        <button
          className=' flex-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2'
          onClick={() => setPage('books')}
        >
          books
        </button>

        {displayBasedOnToken()}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommend show={page === 'recommend'} />

      <LoginView
        show={page === 'login'}
        setToken={token => setToken(token)}
        setPage={page => setPage(page)}
      />
    </div>
  )
}

export default App
