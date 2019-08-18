import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SimpleBlog from '../components/SimpleBlog'

afterEach(cleanup)

describe('<SimpleBlog />', () => {
  let component
  let mockHandler

  const blog = {
    title: 'test blog',
    author: 'tester',
    likes: 99,
  }

  beforeEach(() => {
    mockHandler = jest.fn()
    component = render(<SimpleBlog blog={blog} onClick={mockHandler} />)
  })

  // renders title, author, and like count
  test('renders title & author', () => {
    const div = component.container.querySelector('.titleAndAuthor')
    expect(div).toHaveTextContent('test blog tester')
  })

  // renders the like count
  test('renders the like count', () => {
    const div = component.container.querySelector('.likes')
    expect(div).toHaveTextContent('blog has 99 likes')
  })

  /* Write a test that verifies that if the like button of a component is pressed twice,
   the event handler function passed in the component's props is called twice. */
  test('two button clicks result in two event handler calls', async () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
