import {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {getPosts} from "./features/posts/PostSlice"
import {getUsers} from "./features/users/UserSlice"
import { Status } from "./features/Status"
import { PostAuthor } from "./PostAuthor"
import { Link } from "react-router-dom"

function Dashboard() {
    const dispatch = useDispatch()

    const posts = useSelector((state) => state.posts.posts)
    const postsStatus = useSelector((state) => state.posts.status)
    const postsMessage = useSelector((state) => state.posts.message)
    const usersStatus = useSelector((state) => state.users.status)
    const usersMessage = useSelector((state) => state.users.message)

    useEffect(() => {
        if (postsStatus === Status.Idle) {
            dispatch(getPosts())
        }
        if (usersStatus === Status.Idle) {
            dispatch(getUsers())
        }
    }, [postsStatus, usersStatus, dispatch])

    let content

    if (postsStatus === Status.Loading) {
        content = <span>Loading...</span>
    } else if (postsStatus === Status.Success) {
        content = posts.map(post => (
            <article key={post.id} className="post">
                <h2>{post.title}</h2>
                <PostAuthor userId={post.userId} message={usersMessage} />
                <p className="post-body-short">{post.body}</p>
                <Link to={"/" + post.id}>Show more...</Link>
            </article>
        ))
    } else if (postsStatus === Status.Error) {
        content = <div>{postsMessage}</div>
    } 

    return (
        <section>
            {content}
        </section>
    )
}

export default Dashboard