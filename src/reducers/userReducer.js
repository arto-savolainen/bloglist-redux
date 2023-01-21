import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import { showNotification } from './notificationReducer'

const initialState = []

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

export const { setUsers } = slice.actions

export const updateUserListState = () => {
  return async dispatch => {
    try {
      const users = await userService.getAll()
      
      //Sort according to number of blogs created by user
      if (users) {
        users.sort((a, b) => b.blogs.length - a.blogs.length)
        dispatch(setUsers(users))
      }
    }
    catch {
      dispatch(showNotification(`Error: ${exception.response.data.error}`, 'error'))
    }

  }
}

export default slice.reducer