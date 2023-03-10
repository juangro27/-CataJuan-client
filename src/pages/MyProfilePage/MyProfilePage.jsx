import { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import UserInfo from '../../components/UserInfo/UserInfo'
import { AuthContext } from '../../contexts/auth.context'
import postsService from '../../services/posts.service'
import capitalize from '../../utils/capitalize'

const MyProfilePage = () => {

    const [posts, setPosts] = useState([])
    const { user } = useContext(AuthContext)

    useEffect(() => {
        getMyPosts()
    }, [])

    const getMyPosts = () => {
        postsService
            .getByOwner(user?._id)
            .then(post => {
                setPosts(post.data)
            })
            .catch(err => console.log(err))
    }

    return (
        <Container>

            <UserInfo />

            <hr />
            <h3>My favorites</h3>
            <p>These are my favorite destinations</p>

            <hr />
            <h3 >My Posts</h3>
            <ul>

                {
                    posts.map(elm => {
                        return (
                            <li key={elm._id}>
                                <Link to={`/posts/${elm._id}`}> {capitalize(elm.title)} </Link>

                            </li>
                        )
                    })
                }
            </ul>


            <p className="mb-5">These are my posts</p>

        </Container>
    )
}
export default MyProfilePage