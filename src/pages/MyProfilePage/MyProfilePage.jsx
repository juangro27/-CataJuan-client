import { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import UserInfo from '../../components/UserInfo/UserInfo'
import { AuthContext } from '../../contexts/auth.context'
import postsService from '../../services/posts.service'

const MyProfilePage = () => {

    const [posts, setPosts] = useState([])
    const { user } = useContext(AuthContext)

    useEffect(() => {
        getMyPosts()
    }, [])

    const getMyPosts = () => {
        console.log(user)
        postsService
            .getByOwner(user?._id)
            .then(post => {
                console.log(post)
                setPosts(post)
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

            {
                posts.map(elm => <p>{elm.title}</p>)
            }

            <p className="mb-5">These are my posts</p>

        </Container>
    )
}
export default MyProfilePage