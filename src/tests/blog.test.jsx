import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import CreateBlog from '../components/CreateBlog'
import { test, expect, vi, describe } from 'vitest'
import userEvent from '@testing-library/user-event'

const blog = {
  title: 'Test Blog',
  author: 'Test Author',
  url: 'http://test.com',
  likes: 0,
  user: {
    name: 'Test User',
    username: 'testuser'
  }
}

const user = blog.user

describe('Blog component', () => {

  test('render partial blog info', () => {
    render(<Blog blog={blog} user={user} />)

    expect(screen.getByText('Test Blog')).toBeInTheDocument()
    expect(screen.getByText('Test Author')).toBeInTheDocument()
    expect(screen.getByText(blog.url)).not.toBeVisible()
    expect(screen.getByText(`${blog.likes} likes`)).not.toBeVisible()
  })

  test('render full blog info', async () => {

    render(<Blog blog={blog} user={user} />)
    const us = userEvent.setup()
    const button = screen.getByText('view')
    await us.click(button)

    expect(screen.getByText(blog.url)).toBeInTheDocument()
    expect(screen.getByText(`${blog.likes} likes`)).toBeInTheDocument()

  })

  test('like button click twice', async () => {

    const mockLikes = vi.fn()

    render(<Blog blog={blog} updateBlog={mockLikes} user={user} />)

    const us = userEvent.setup()
    const button = screen.getByText('view')
    await us.click(button)

    for (let i = 0; i < 2; i++) {
      const likeButton = screen.getByText('like')
      await us.click(likeButton)
    }

    expect(mockLikes.mock.calls).toHaveLength(2)
  })

})

describe('Blog Form for CreateBlog component', async () => {
  test('create new blog', async () => {

    const setTitle = () => { }
    const setAuthor = () => { }
    const setUrl = () => { }

    const mockCreate = vi.fn()
    render(<CreateBlog createBlog={mockCreate}
      setTitle={setTitle} title={blog.title}
      setAuthor={setAuthor} setUrl={setUrl}
      author={blog.author} url={blog.url} />)

    const us = userEvent.setup()
    const b = screen.getByText('Create')
    await us.click(b)

    expect(mockCreate.mock.calls).toHaveLength(1)
    expect(mockCreate.mock.calls[0][0]).toEqual({ title: blog.title, author: blog.author, url: blog.url })
  })
})