import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { showNotification, clearNotification } from './notificationReducer'

const initialState = null

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout(state, action) {
      return null
    }
  }
})

export const { login, logout } = slice.actions

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(login(user))
      dispatch(clearNotification())
    }
    catch (exception) {
      dispatch(showNotification('Wrong username or password', 'error'))
    }
  }
}

export const getUserFromLocalStorageAndLogin = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
    }
  }
}

export const logoutUser = () => {
  return async (dispatch, getState) => {
    window.localStorage.removeItem('loggedUser')
    dispatch(logout())
    dispatch(showNotification('You have logged out'))
  }
}

export default slice.reducer