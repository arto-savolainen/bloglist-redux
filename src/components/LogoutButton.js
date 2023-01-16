import PropTypes from 'prop-types'

const LogoutButton = ({ handleLogout }) => (
  <button onClick={handleLogout}>logout</button>
)

LogoutButton.propTypes = {
  handleLogout: PropTypes.func.isRequired
}

export default LogoutButton