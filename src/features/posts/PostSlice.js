import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import postService from "./PostService"
import { Status } from "../Status"

const initialState = {
    posts: [],
    status: Status.Idle,
    message: "",
}

export const getPosts = createAsyncThunk("posts/get", async (thunkAPI) => {
    try {
        return await postService.getPosts()
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(getPosts.pending, (state) => {
            state.status = Status.Loading
        })
        .addCase(getPosts.fulfilled, (state, action) => {
            state.status = Status.Success
            state.posts = action.payload
        })
        .addCase(getPosts.rejected, (state, action) => {
            state.status = Status.Error
            state.message = action.payload
        })
    }
})

export const {reset} = postSlice.actions
export default postSlice.reducer