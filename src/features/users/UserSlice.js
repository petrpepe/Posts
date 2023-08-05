import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import userService from "./UserService"
import { Status } from "../Status"

const initialState = {
    users: [],
    status: Status.Idle,
    message: "",
}

export const getUsers = createAsyncThunk("users/get", async (thunkAPI) => {
    try {
        return await userService.getUsers()
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getUserById = createAsyncThunk("users/getOneById", async (userId, thunkAPI) => {
    try {
        return await userService.getUserById(userId)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUsers.pending, (state) => {
            state.status = Status.Loading
        })
        .addCase(getUsers.fulfilled, (state, action) => {
            state.status = Status.Success
            state.users = action.payload
        })
        .addCase(getUsers.rejected, (state, action) => {
            state.status = Status.Error
            state.message = action.payload
        })
        .addCase(getUserById.pending, (state) => {
            state.status = Status.Loading
        })
        .addCase(getUserById.fulfilled, (state, action) => {
            state.status = Status.Success
            state.users = action.payload
        })
        .addCase(getUserById.rejected, (state, action) => {
            state.status = Status.Error
            state.message = action.payload
        })
    }
})

export const {reset} = userSlice.actions
export default userSlice.reducer