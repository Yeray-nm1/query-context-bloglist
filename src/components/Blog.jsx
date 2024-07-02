import { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogServices from '../services/blogs'
import { useNotificationDispatch } from '../context/NotificationContext'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const updateBlogsMutation = useMutation({
    mutationFn: blogServices.updateLikes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogServices.removeBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const handleLike = () => {
    try {
      updateBlogsMutation.mutate(blog.id)
      dispatch({ type: 'ADD_NOTIFICATION', payload: `Blog ${blog.title} liked` })
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION' })
      }, 3000)
    } catch (exception) {
      dispatch({ type: 'ADD_NOTIFICATION', payload: 'Failed to like blog' })
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION' })
      }, 3000)
    }
  }

  const handleRemove = () => {
    if (
      window.confirm(`Remove blog ${blog.title} by ${blog.author}?`) === true
    ) {
      try {
        removeBlogMutation.mutate(blog.id)
        dispatch({ type: 'ADD_NOTIFICATION', payload: `Blog ${blog.title} removed` })
        setTimeout(() => {
          dispatch({ type: 'REMOVE_NOTIFICATION' })
        }, 3000)
      } catch (exception) {
        dispatch({ type: 'ADD_NOTIFICATION', payload: 'Failed to remove blog' })
        setTimeout(() => {
          dispatch({ type: 'REMOVE_NOTIFICATION' })
        }, 3000)
      }
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} data-testid="blog">
      <p>{blog.title}</p>
      <p>{blog.author}</p>
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible} data-testid="more-info">
        <p>{blog.url}</p>
        <p>
          {blog.likes} likes <button onClick={handleLike}>like</button>
        </p>
        <p>added by {blog.user.name}</p>
        {user.username === blog.user.username && (
          <button onClick={handleRemove}>remove</button>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
