import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import commentService from "./CommentService"
import { Status } from "../Status"

const initialState = {
    comments: [],
    status: Status.Idle,
    message: "",
}

export const getComments = createAsyncThunk("comments/get", async (thunkAPI) => {
    try {
        return await commentService.getComments()
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(getComments.pending, (state) => {
            state.status = Status.Loading
        })
        .addCase(getComments.fulfilled, (state, action) => {
            state.status = Status.Success
            state.comments = action.payload
        })
        .addCase(getComments.rejected, (state, action) => {
            state.status = Status.Error
            state.message = action.payload
        })
    }
})

export const {reset} = commentSlice.actions
export default commentSlice.reducer