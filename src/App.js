import { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, getUserFromLocalStorageAndLogin, logoutUser } from './reducers/loginReducer'
import { Routes, Route, Link, useMatch, useNavigate } from "react-router-dom"
import BlogView from './components/BlogView'
import UserView from './components/UserView'

const App = () => {
  const user = useSelector(state => state.currentUser)
  const dispatch = useDispatch()

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

  // if (user !== null) {
  //   return (
  //     <div>
        // <h2>blogs</h2>
        // <Notification />
        // <p>{user.name} logged in <LogoutButton handleLogout={handleLogout} /></p>

       

  //       <Togglable buttonLabel='add blog' ref={toggleAddBlogFormRef}>
  //         <h2>create new</h2>
  //         <AddBlogForm handleAddBlog={handleAddBlog} />
  //       </Togglable>

  //       {blogs.map(blog =>
  //         <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
  //       )}

  //     </div>
  //   )
  // }

  if (user !== null) {
    return (
      <div>
      <h2>Blogs</h2>
        <Notification />
        <p>{user.name} logged in <LogoutButton handleLogout={handleLogout} /></p>

        <Routes>
          <Route path="/" element={<BlogView />} />
          <Route path="/users" element={<UserView />} /> 
        </Routes>
      </div>
    )
  }

  return (
    <div>
      <h1>Log in to application</h1>
      <Notification />
      <LoginForm handleLogin={handleLogin} />
    </div>
  )
}

export default App
