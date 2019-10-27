/*  The test can wait for the content of the component to render 
with the waitForElement function. */
import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
jest.mock('./services/blogs') // mocks the db operations
import App from './App'

describe('<App />', () => {
  test('when no user has logged in, renders only login form ', async () => {
    const component = render(<App />)
    // component rerendered to ensure that all of the effects are executed
    component.rerender(<App />)
    // wait for async fetching to execute
    await waitForElement(() => component.container.querySelector('h2'))
    // console.log(prettyDOM(component.container))

    expect(component.container).toHaveTextContent('Login to the Application')
    expect(component.container).not.toHaveTextContent('logged in')
  })

  test('when logged in, all blog posts are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester',
    }

    localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

    const component = render(<App />)
    // component rerendered to ensure that all of the effects are executed
    component.rerender(<App />)
    // wait for async fetching to execute
    await waitForElement(() => component.getByText('Blogs'))

    // console.log(prettyDOM(component.container))

    const allBlogPosts = component.container.querySelectorAll('.blogContainer')

    expect(allBlogPosts).toHaveLength(2)
  })
})
