import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const notificationRef = useRef()
  const toggleAddBlogFormRef = useRef()

  const updateBlogList = async () => {
    const blogList = await blogService.getAll()
    blogList.sort((a, b) => b.likes - a.likes)
    setBlogs(blogList)
  }

  //this is used to update likes
  //a more general update function would create a notification and thus require a separate implementation
  const updateBlog = async (updateBlog) => {
    try {
      const updatedBlog = await blogService.update(updateBlog)
      return updatedBlog
    }
    catch (exception) {
      createNotification(`Error: ${exception.response.data.error}`, 'error')
    }
  }

  const deleteBlog = async (id) => {
    try {
      const deletedBlog = await blogService.remove(id)
      createNotification('Blog deleted')
      await updateBlogList()
      return deletedBlog
    }
    catch (exception) {
      createNotification(`Error: ${exception.response.data.error}`, 'error')
    }
  }

  const createNotification = (message, style, timeout) => {
    notificationRef.current.createNotification(message, style, timeout)
  }

  useEffect(() => {
    updateBlogList()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event, username, password) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      createNotification(null)
    }
    catch (exception) {
      createNotification('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
    createNotification('You have logged out')
  }

  const handleAddBlog = async (event, newBlog) => {
    event.preventDefault()

    try {
      const createdBlog = await blogService.create(newBlog)
      toggleAddBlogFormRef.current.toggleVisibility()
      createNotification(`A new blog ${createdBlog.title} by ${createdBlog.author} added`)
      await updateBlogList()
    }
    catch (exception) {
      //console.log('exception:', exception)
      //note: if jwt token expiration is set, expired token exception is caught here
      //would need a more comprehensive session management system to handle that properly
      //for now, user is required to logout and log back in if token is expired
      createNotification(`Error: ${exception.response.data.error}`, 'error')
    }
  }

  if (user !== null) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification ref={notificationRef} />
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

  return (
    <div>
      <h1>Log in to application</h1>
      <Notification ref={notificationRef} />
      <LoginForm handleLogin={handleLogin} />

    </div>
  )
}

export default App
