import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { updateUserListState } from '../reducers/userReducer'

const UserView = () => {
  const users = useSelector(state => state.users)
  console.log('users in userview:', users)
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
      {users ? users.map(user => <tr key={user.id}><td>{user.name}</td><td>{user.blogs.length}</td></tr>) : null}
      </tbody>
      </table>
    </div>
  )
}

export default UserView