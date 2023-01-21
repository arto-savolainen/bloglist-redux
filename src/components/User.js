import { useDispatch, useSelector } from "react-redux"
import { useMatch } from 'react-router-dom'
import { useEffect } from 'react'
import { updateUserListState } from '../reducers/userReducer'

//Should state be fetched in App and passed to components as props?
//Or done like this?
const User = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()
  const match = useMatch('users/:id')
  const user = match ? users.find(x => x.id === match.params.id) : null

  useEffect(() => {
    dispatch(updateUserListState())
  }, [])

  if (!user) {
    return <p>User not found</p>
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default User