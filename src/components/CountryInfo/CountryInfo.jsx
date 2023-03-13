import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import countriesService from '../../services/countries.service'
import votesService from '../../services/votes.service'
import PostsList from '../PostsList/PostsList'
import VotesForm from '../VotesForm/VotesForm'
import FavoriteForm from '../FavoriteForm/FavoriteForm'
import PostsOptions from '../PostsOptions/PostsOptions'

const CountryInfo = ({ country }) => {

    const [votes, setVotes] = useState(0)
    const [posts, setPosts] = useState(country.posts)
    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        refreshVotes()
    }, [])

    const handleClick = (e) => {

        e.preventDefault()

        countriesService
            .deleteCountry(id)
            .then(() => navigate('/countries'))
            .catch(err => console.log(err))
    }

    const refreshVotes = () => {

        votesService.getVotes('COUNTRY', id)
            .then(({ data }) => setVotes(Number(data)))
            .catch(err => console.log(err))
    }

    const setVote = (vote) => {

        votesService
            .setVote('COUNTRY', id, { vote })
            .then(() => refreshVotes())
            .catch(err => console.log(err))

    }

    const filterPosts = posts => {

        setPosts(posts)

    }

    return (
        <>
            <h1>{country.flag}{country.name}</h1>
            <FavoriteForm specs={{ type: 'COUNTRY', id }} />

            <h1>Votes: {votes}</h1>
            <VotesForm setVote={setVote} />

            <PostsOptions filterPosts={filterPosts} country={id} />
            <PostsList posts={posts} />
            {
                user?.role === 'ADMIN' &&
                <>
                    <Link to={`/countries/${id}/edit`}>Edit</Link>
                    <Link to={'/delete'} onClick={handleClick}>Delete</Link>
                </>
            }
            <Link to={`/posts/create?country=${id}`} >Create new post</Link>
        </>
    )
}


export default CountryInfo