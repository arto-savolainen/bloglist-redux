import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlogListState, createBlog, likeBLog, removeBlog } from './reducers/blogReducer'
import { loginUser, getUserFromLocalStorageAndLogin, logoutUser } from './reducers/userReducer'

const App = () => {
  const user = useSelector(state => state.user)
  const toggleAddBlogFormRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const updateBlogList = async () => {
    dispatch(updateBlogListState())
  }

  //This is used to update likes
  const updateBlog = id => {
    dispatch(likeBLog(id))
  }

  const deleteBlog = id => {
    dispatch(removeBlog(id))
  }

  useEffect(() => {
    updateBlogList()
  }, [])

  useEffect(() => {
    dispatch(getUserFromLocalStorageAndLogin())
  }, [])

  const handleLogin = (event, username, password) => {
    event.preventDefault()

    dispatch(loginUser(username, password))
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const handleAddBlog = (event, newBlog) => {
    event.preventDefault()

    //Notifications and error handling are now blogReducer's responsibility,
    //because exception stack trace doesn't propagate here from dispatch.
    //For example in case of 401 response from blogService we see:
    //Uncaught Error: The error you provided does not contain a stack trace.
    dispatch(createBlog(newBlog))
    toggleAddBlogFormRef.current.toggleVisibility()
  }

  if (user !== null) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <p>{user.name} logged in <LogoutButton handleLogout={handleLogout} /></p>

        <Togglable buttonLabel='add blog' ref={toggleAddBlogFormRef}>
          <h2>create new</h2>
          <AddBlogForm handleAddBlog={handleAddBlog} />
        </Togglable>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
        )}
      </div>
    )
  }

  console.log('user in app:', user)
  return (
    <div>
      <h1>Log in to application</h1>
      <Notification />
      <LoginForm handleLogin={handleLogin} />

    </div>
  )
}

export default App
