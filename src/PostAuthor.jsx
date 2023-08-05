import React from 'react'
import { useSelector } from 'react-redux'

export const PostAuthor = ({ userId, message }) => {
    const author = useSelector(state => {
        if (state.users.users.length > 0) {
            return state.users.users.find(user => user.id === userId)
        } else return state.users.users
    })

    return <h3>{message ? message : "by " + (author ? author.name : "Unknown author")}</h3>
}