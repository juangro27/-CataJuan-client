import { Link } from 'react-router-dom'
import postsService from '../../services/posts.service'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/auth.context'


const PostsList = ({ posts }) => {

    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    useEffect(() => {

    }, [user])

    const handleClick = (e) => {

        e.preventDefault()

        postsService
            .deletePost(posts._id, posts.country)
            .then(() => navigate(`/countries/${posts.country}`))
            .catch(err => console.log(err))
    }
    return (
        <div>
            {
                posts?.map(({ title, _id, owner }) => {

                    return (
                        <div key={_id} >
                            <Link to={`/posts/${_id}`}><p>{title}</p></Link>
                            {
                                (user._id === owner || user.role === 'ADMIN') &&
                                <>
                                    <Link to={`/posts/${_id}/edit`}>Edit</Link>
                                    <Link to={'/delete'} onClick={handleClick}>Delete</Link>
                                </>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default PostsList