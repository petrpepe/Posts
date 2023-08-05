import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const PostCommentsNumber = ({ postId, message }) => {
    const commentsNumber = useSelector(state => {
        return state.comments.comments.filter(comment => comment.postId === postId).length
    })

    return <span className='commentsNumber'><Link to={"/" + postId}>{message ? message : "Comments (" + commentsNumber + ")"}</Link></span>
}