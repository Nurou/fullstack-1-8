/* 
  verify that by default only the name and author of the blog post is shown. 
  verify that when the blog post is clicked,
  the other information of the blog post become visible.
*/

import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import Blog from '../components/Blog'

afterEach(cleanup)

describe('<Blog />', () => {
  let component
  let mockRemovePost

  const user = {
    username: 'test username',
    name: 'teddy the Tester',
    id: '5d4c5f37801b2885adf2bc47',
  }

  const blog = {
    title: 'test blog',
    author: 'test author',
    likes: 99,
    url: 'http://www.test.com',
    user: user,
  }

  beforeEach(() => {
    mockRemovePost = jest.fn()
    component = render(
      <Blog blog={blog} onClick={mockRemovePost} user={user} />,
    )
  })

  // by default only the name and author of the blog post is shown
  test('renders only name and author when extra info not selected', () => {
    const togglableDiv = component.container.querySelector('.defaultInfo')
    expect(togglableDiv).not.toHaveStyle('display: none')
  })

  test('when blog is clicked all info is displayed', () => {
    const allInfoDiv = component.container.querySelector('.allInfo')
    const togglableDiv = component.container.querySelector('.defaultInfo')

    fireEvent.click(togglableDiv)
    expect(allInfoDiv).not.toHaveStyle('display: none')
  })
})
