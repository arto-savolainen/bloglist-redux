import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'

const Menu = ({ username, handleLogout }) => {
  const padding = {
    paddingRight: 5
  }
  const menuStyle = {
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    backgroundColor: 'LightGray'
  }
  return (
    <div style={menuStyle}>
      <Link style={padding} to="/blogs">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      <div style={{ display: 'inline' }}>{username} logged in <LogoutButton handleLogout={handleLogout} /></div>
    </div>
  )
}

export default Menu