import PropTypes from 'prop-types'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogServices from '../services/blogs'
import { useNotificationDispatch } from '../context/NotificationContext'

const CreateBlog = ({ blogFormRef }) => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newBlogMutation = useMutation({
    mutationFn: blogServices.createBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
    },
  })

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()
    try {
      newBlogMutation.mutate({ title, author, url })
      dispatch({ type: 'ADD_NOTIFICATION', payload: `Blog ${title} created` })
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION' })
      }, 3000)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      dispatch({ type: 'ADD_NOTIFICATION', payload: 'Failed to create blog' })
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION' })
      }, 3000)
    } finally {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <div>
      <h1>Create new</h1>
      <form onSubmit={handleCreateBlog}>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <input
          type="text"
          name="author"
          placeholder="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <input
          type="text"
          name="url"
          placeholder="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

CreateBlog.propTypes = {
  blogFormRef: PropTypes.object.isRequired,
}

export default CreateBlog
