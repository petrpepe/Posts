import axios from "axios"

const API_URL = "https://jsonplaceholder.typicode.com/users/"

const getUsers = async () => {
    const response = await axios.get(API_URL)

    return response.data
}

const getUserById = async (id) => {
    const response = await axios.get(API_URL + id)

    return response.data
}

const userService = {
    getUsers,
    getUserById,
}

export default userService