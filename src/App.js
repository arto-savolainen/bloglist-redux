import { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, getUserFromLocalStorageAndLogin, logoutUser } from './reducers/loginReducer'
import { Routes, Route, Link, useMatch, useNavigate } from "react-router-dom"
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'

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

  if (user !== null) {
    return (
      <div>
        <Menu username={user.name} handleLogout={handleLogout}/>
        <h2>blog app</h2>
        <Notification />
        <p></p>

        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="*" element={<p>Page not found</p>} />
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
