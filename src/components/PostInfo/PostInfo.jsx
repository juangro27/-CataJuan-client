import postsService from '../../services/posts.service'
import { useNavigate, useParams, Link } from 'react-router-dom'


const PostInfo = ({ post }) => {

    const { id } = useParams()
    const navigate = useNavigate()
    const { country } = post
    const handleClick = (e) => {

        e.preventDefault()

        postsService
            .deletePost(id, country)
            .then(({ data: country }) => navigate(`/countries/${country}`))
            .catch(err => console.log(err))
    }

    return (
        <>
            <h1>{post.title}</h1>
            <Link to="./edit">Edit</Link>
            <Link to="./delete" onClick={handleClick}>Delete</Link>

        </>
    )
}

export default PostInfo