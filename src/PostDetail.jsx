import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getPostById } from "./features/posts/PostSlice"
import { getUserById } from "./features/users/UserSlice"
import { getCommentsByPostId } from "./features/comments/CommentSlice"
import { Status } from "./features/Status"
import { PostAuthor } from './PostAuthor'

const PostDetail = () => {
    const dispatch = useDispatch()

    const postId = useParams().id
    const post = useSelector(state => {
        if (state.posts.posts.length > 0) {
            return state.posts.posts.find(post => post.id + "" === postId)
        } else return state.posts.posts
    })
    const postsStatus = useSelector((state) => state.posts.status)
    const postsMessage = useSelector((state) => state.posts.message)
    const usersStatus = useSelector((state) => state.users.status)
    const usersMessage = useSelector((state) => state.users.message)
    const comments = useSelector((state) => state.comments.comments)
    const commentsStatus = useSelector((state) => state.comments.status)
    const commentsMessage = useSelector((state) => state.users.message)

    useEffect(() => {
        if (postsStatus === Status.Idle) {
            dispatch(getPostById(postId))
        }        
        if (usersStatus === Status.Idle && post.userId) {
            dispatch(getUserById(post.userId))
        }
        if (commentsStatus === Status.Idle) {
            dispatch(getCommentsByPostId(postId))
        }
    }, [postId, postsStatus, post.userId, usersStatus, commentsStatus, dispatch])

    let commentsContent

    if (commentsStatus === Status.Loading) {
        commentsContent = <span>Loading...</span>
    } else if (commentsStatus === Status.Success) {
        commentsContent = 
        <div className='comments'>
            <h2 >Comments</h2>
            {comments.filter(comment => comment.postId + "" === postId)
            .map(comment => (
                <div className='comment' key={comment.id}>
                    <h4>{comment.name}</h4>
                    <span>{comment.email}</span>
                    <p>{comment.body}</p>
                </div>
            ))}
        </div>
    } else if (commentsStatus === Status.Error) {
        commentsContent = <div>{commentsMessage}</div>
    }

    let postContent

    if (postsStatus === Status.Loading) {
        postContent = <span>Loading...</span>
    } else if (postsStatus === Status.Success) {
        postContent = <section className='post'>
            <Link to={"/"} className='back-btn' >Go back</Link>
            <h1>{post.title}</h1>
            <PostAuthor userId={post.userId} message={usersMessage}/>
            <p className='post-body'>{post.body}</p>
            {commentsContent}
        </section>
    } else if (postsStatus === Status.Error) {
        postContent = <div>{postsMessage}</div>
    }

    return <>{postContent}</>
}

export default PostDetail