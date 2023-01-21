import Togglable from './Togglable'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import AddBlogForm from './AddBlogForm'
import { updateBlogListState, createBlog, likeBLog, removeBlog } from '../reducers/blogReducer'

const BlogView = () => {
  const blogs = useSelector(state => state.blogs)
  const toggleAddBlogFormRef = useRef()
  const dispatch = useDispatch()

  //This is used to update likes
  const updateBlog = id => {
    dispatch(likeBLog(id))
  }

  const deleteBlog = id => {
    dispatch(removeBlog(id))
  }

  useEffect(() => {
    dispatch(updateBlogListState())
  }, [])

  const handleAddBlog = (event, newBlog) => {
    event.preventDefault()

    //Notifications and error handling are now blogReducer's responsibility,
    //because exception stack trace doesn't propagate here from dispatch.
    //For example in case of 401 response from blogService we see:
    //Uncaught Error: The error you provided does not contain a stack trace.
    dispatch(createBlog(newBlog))
    toggleAddBlogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <Togglable buttonLabel='add blog' ref={toggleAddBlogFormRef}>
        <h2>create new</h2>
        <AddBlogForm handleAddBlog={handleAddBlog} />
      </Togglable>

      {blogs ? blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />) : null
      }
    </div>
  )
}

export default BlogView