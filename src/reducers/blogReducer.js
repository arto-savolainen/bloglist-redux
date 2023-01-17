import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const initialState = []

const slice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    like(state, action) {
      const blog = state.find(x => x.id === action.payload)
      blog.likes++
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { appendBlog, like, setBlogs } = slice.actions

export const updateBlogListState = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blog => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch(appendBlog(newBlog))
    }
    catch (exception) {
      //Feels like showing notifications should be done on the caller's side in App
      //But the exception doesn't propagate there, so that responsibility is now here
      dispatch(showNotification(`Error: ${exception.response.data.error}`, 'error'))
    }
  }
}

export const likeBLog = id => {
  return async (dispatch, getState) => {
    const blog = getState().blogs.find(x => x.id === id)
    await blogService.update({ ...blog, likes: blog.likes + 1 })
    dispatch(like(id))
  }
}

export default slice.reducer