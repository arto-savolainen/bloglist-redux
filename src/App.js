import { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, getUserFromLocalStorageAndLogin, logoutUser } from './reducers/loginReducer'
import { Routes, Route, Link, useMatch, useNavigate } from "react-router-dom"
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'

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
        <h2>Blogs</h2>
        <Notification />
        <p>{user.name} logged in <LogoutButton handleLogout={handleLogout} /></p>

        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User />} />
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
