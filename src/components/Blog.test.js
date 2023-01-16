import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog tests', () => {
  const blog = {
    id: '6351a675791242ac66083f7c',
    url: 'www.testurl.bla',
    title: 'Test blog',
    author: 'Test author',
    likes: 69420,
    user: 'Testaaja'
  }

  let container

  //do mock functions only work when defined within test() scope?
  //these don't work if declared here
  //how am i supposed to use beforeEach() if rendering with mock functions must be done within test()?
  // const mockUpdateHandler = jest.fn(x => x)
  // const mockDeleteHandler = jest.fn(x => x)

  const foo = () => {
    //dummy function for required proptypes
  }

  // beforeEach(() => {
  //   container = render(<Blog key={blog.id} blog={blog} updateBlog={mockUpdateHandler} deleteBlog={mockDeleteHandler} />).container
  // })

  test('Blog renders only title and author by default', async () => {
    container = render(<Blog key={blog.id} blog={blog} updateBlog={foo} deleteBlog={foo} />).container

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')

    let element = await screen.findByText('Test blog')
    expect(element).toBeVisible()
    element = await screen.findByText('Test author')
    expect(element).toBeVisible()
    element = await screen.findByText('www.testurl.bla')
    expect(element).not.toBeVisible()
    element = await screen.findByText('69420')
    expect(element).not.toBeVisible()
  })

  test('clicking the view button renders url and likes', async () => {
    container = render(<Blog key={blog.id} blog={blog} updateBlog={foo} deleteBlog={foo} />).container

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')

    let element = await screen.findByText('Test blog')
    expect(element).toBeVisible()
    element = await screen.findByText('Test author')
    expect(element).toBeVisible()
    element = await screen.findByText('www.testurl.bla')
    expect(element).toBeVisible()
    element = await screen.findByText('69420')
    expect(element).toBeVisible()
  })

  test('clicking the like button twice calls the handler function passed as prop twice, and increases likes by 2', async () => {
    const likesAtBeginning = blog.likes
    const user = userEvent.setup()
    const mockUpdateHandler = jest.fn(x => x)

    render(<Blog key={blog.id} blog={blog} updateBlog={mockUpdateHandler} deleteBlog={mockUpdateHandler} />)

    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockUpdateHandler.mock.calls).toHaveLength(2)
    expect(blog.likes).toBe(likesAtBeginning + 2)
  })
})