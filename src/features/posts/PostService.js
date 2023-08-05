import axios from "axios"

const API_URL = "https://jsonplaceholder.typicode.com/posts/"

const getPosts = async () => {
    const response = await axios.get(API_URL)

    return response.data
}

const getPostById = async (id) => {
    const response = await axios.get(API_URL + id)

    return response.data
}

const postService = {
    getPosts,
    getPostById,
}

export default postService