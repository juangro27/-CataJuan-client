import { Link } from 'react-router-dom'


const PostInfo = ({ post }) => {

    return (
        <>
            <h1>{post.title}</h1>
            <Link to="./edit">Edit</Link>
            <Link to="./delete">Delete</Link>

        </>
    )
}

export default PostInfo