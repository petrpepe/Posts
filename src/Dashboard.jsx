import  {useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getPosts } from "./features/posts/PostSlice"
import { getUsers } from "./features/users/UserSlice"
import { getComments } from "./features/comments/CommentSlice"
import { Status } from "./features/Status"
import { PostAuthor } from "./PostAuthor"
import { Link } from "react-router-dom"
import { PostCommentsNumber } from "./PostCommentsNumber"

function Dashboard() {
    const dispatch = useDispatch()

    const posts = useSelector((state) => state.posts.posts)
    const postsStatus = useSelector((state) => state.posts.status)
    const postsMessage = useSelector((state) => state.posts.message)
    const usersStatus = useSelector((state) => state.users.status)
    const usersMessage = useSelector((state) => state.users.message)
    const commentsStatus = useSelector((state) => state.comments.status)
    const commentsMessage = useSelector((state) => state.users.message)

    useEffect(() => {
        if (postsStatus === Status.Idle || !posts.length) {
            dispatch(getPosts())
        }
        if (usersStatus === Status.Idle || !posts.length) {
            dispatch(getUsers())
        }
        if (commentsStatus === Status.Idle || !posts.length) {
            dispatch(getComments())
        }
    }, [postsStatus, usersStatus, commentsStatus, posts.length, dispatch])

    let content

    if (postsStatus === Status.Loading) {
        content = <span>Loading...</span>
    } else if (postsStatus === Status.Success && posts.length > 0) {
        content = posts.map(post => (
            <article key={post.id} className="post">
                <h2>{post.title}</h2>
                <PostAuthor userId={post.userId} message={usersMessage} />
                <p className="post-body post-body-short">{post.body}</p>
                <Link to={"/" + post.id}>Show more...</Link>
                <PostCommentsNumber postId={post.id} message={commentsMessage} />
            </article>
        ))
    } else if (postsStatus === Status.Error) {
        content = <div>{postsMessage}</div>
    } 

    return (
        <section className="posts">
            {content}
        </section>
    )
}

export default Dashboard