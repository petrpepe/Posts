import { configureStore } from "@reduxjs/toolkit"
import postReducer from "../features/posts/PostSlice"
import userReducer from "../features/users/UserSlice"
import commentReducer from "../features/comments/CommentSlice"

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
    comments: commentReducer,
  },
})