import axios from "axios"

const API_URL = "https://jsonplaceholder.typicode.com/comments"

const getComments = async () => {
    const response = await axios.get(API_URL)

    return response.data
}

const getCommentsByPostId = async (postId) => {
    const response = await axios.get(API_URL + "?postId=" + postId)

    return response.data
}

const commentService = {
    getComments,
    getCommentsByPostId,
}

export default commentService