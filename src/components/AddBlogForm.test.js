import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlogForm from './AddBlogForm'

describe('AddBlogForm tests', () => {
  const blog = {
    id: '6351a675791242ac66083f7c',
    url: 'www.testurl.bla',
    title: 'Test blog',
    author: 'Test author',
    likes: 69420,
    user: 'Testaaja'
  }

  let container

  test('clicking create button sends data in input fields to mock handler function', async () => {
    const user = userEvent.setup()
    const mockHandleAddBlog = jest.fn(event => event.preventDefault())

    container = render(<AddBlogForm handleAddBlog={mockHandleAddBlog} />).container

    const titleInput = container.querySelector('input[name="Title"]')
    const authorInput = container.querySelector('input[name="Author"]')
    const urlInput = container.querySelector('input[name="Url"]')
    const createButton = screen.getByText('create')

    await user.type(titleInput, blog.title)
    await user.type(authorInput, blog.author)
    await user.type(urlInput, blog.url)
    await user.click(createButton)

    expect(mockHandleAddBlog.mock.calls).toHaveLength(1)
    expect(mockHandleAddBlog.mock.calls[0][1].title).toContain(blog.title)
    expect(mockHandleAddBlog.mock.calls[0][1].author).toContain(blog.author)
    expect(mockHandleAddBlog.mock.calls[0][1].url).toContain(blog.url)
  })
})