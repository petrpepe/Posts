import React from 'react'
import { useSelector } from 'react-redux'

export const PostAuthor = ({ userId, message }) => {
    const author = useSelector(state =>
        state.users.users.find(user => user.id === userId)
    )

    return <span>{message ? message : "by " + (author ? author.name : "Unknown author")}</span>
}