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
    },
    deleteBlog(state, action) {
      const newBlogList = state.filter(x => x.id !== action.payload)
      return newBlogList
    }
  }
})

export const { appendBlog, like, setBlogs, deleteBlog } = slice.actions

export const updateBlogListState = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    //Sorting only here for now. Makes sense that blogs don't bounce around during user actions
    blogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blog => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch(appendBlog(newBlog))
      dispatch(showNotification(`A new blog ${newBlog.title} by ${newBlog.author}`))
    }
    catch (exception) {
      //This exception doesn't propagate to caller properly, so notification responsibility is now here
      dispatch(showNotification(`Error: ${exception.response.data.error}`, 'error'))
    }
  }
}

export const likeBLog = id => {
  return async (dispatch, getState) => {
    const blog = getState().blogs.find(x => x.id === id)
    try {
      await blogService.update({ ...blog, likes: blog.likes + 1 })
      dispatch(like(id))
    }
    catch (exception) {
      dispatch(showNotification(`Error: ${exception.response.data.error}`, 'error'))
    }
  }
}

export const removeBlog = id => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch(deleteBlog(id))
      dispatch(showNotification('Blog deleted'))
    }
    catch (exception) {
      dispatch(showNotification(`Error: ${exception.response.data.error}`, 'error'))
    }
    
  }
}

export default slice.reducer