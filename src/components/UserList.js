import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { updateUserListState } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const UserList = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateUserListState())
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users ? users.map(user => <tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
            <td>{user.blogs.length}</td></tr>) : null}
        </tbody>
      </table>
    </div>
  )
}

export default UserList