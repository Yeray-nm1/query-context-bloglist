import Blog from './Blog'
import CreateBlog from './CreateBlog'
import Toggable from './Toggable'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useUserDispatch } from '../context/UserContext'
import { useRef } from 'react'

const Blogs = ({ user }) => {
  const userDispatch = useUserDispatch()

  const blogList = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false
  })

  const blogFormRef = useRef()

  const handleLogout = () => {
    userDispatch({ type: 'LOGOUT' })
  }

  if (blogList.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Toggable buttonLabel="new blog" ref={blogFormRef}>
        <CreateBlog blogFormRef={blogFormRef} />
      </Toggable>
      {blogList.data.map((blog) => (
        <Blog key={blog.id} user={user} blog={blog} />
      ))}
    </div>
  )
}

export default Blogs
