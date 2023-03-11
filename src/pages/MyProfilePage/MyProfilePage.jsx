import { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import UserInfo from '../../components/UserInfo/UserInfo'
import { AuthContext } from '../../contexts/auth.context'
import postsService from '../../services/posts.service'
import userService from '../../services/user.service'
import capitalize from '../../utils/capitalize'

const MyProfilePage = () => {

    const [posts, setPosts] = useState([])
    const [favoriteCountries, setFavoriteCountries] = useState([])
    const [favoritePosts, setFavoritePosts] = useState([])
    const { user } = useContext(AuthContext)

    useEffect(() => {

        getMyPosts()
        getMyFavorites()

    }, [])

    const getMyPosts = () => {

        postsService
            .getByOwner(user?._id)
            .then(post => setPosts(post.data))
            .catch(err => console.log(err))

    }

    const getMyFavorites = () => {

        userService
            .getUser(user?._id)
            .then(({ data }) => {

                const { favoriteCountries, favoritePosts } = data

                setFavoriteCountries(favoriteCountries)
                setFavoritePosts(favoritePosts)

            })
            .catch(err => console.log(err))

    }

    return (
        <Container>

            <UserInfo />

            <hr />
            <h3>My favorite countries</h3>

            {
                favoriteCountries.length >= 1

                    ? favoriteCountries.map(country => {
                        return (
                            <Link key={country._id} to={`/countries/${country._id}`}>
                                <p>{capitalize(country.name)}</p>
                            </Link>
                        )
                    })

                    : <p>You dont have favorite countries yet.</p>
            }

            <hr />
            <h3>My favorite posts</h3>

            {
                favoritePosts.length >= 1

                    ? favoritePosts.map(post => {
                        return (
                            <Link key={post._id} to={`/posts/${post._id}`}>
                                <p>{capitalize(post.title)}</p>
                            </Link>
                        )
                    })


                    : <p>You dont have favorite posts yet.</p>
            }


            <hr />
            <h3 >My Posts</h3>

            {
                posts.length >= 1

                    ?
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
                    : <p>You haven't create posts yet.</p>

            }


        </Container>
    )
}
export default MyProfilePage