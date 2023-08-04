import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const PostDetail = () => {
    const postId = useParams()
    const post = useSelector(state =>
            state.posts.posts.find(post => post.id + "" === postId.id)
    )

    return <span>{post ? post.title : "Unknown post"}</span>
}

export default PostDetail