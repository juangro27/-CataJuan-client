import postsService from '../../services/posts.service'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import { useContext, useEffect, useState } from 'react'
import votesService from '../../services/votes.service'
import VotesForm from '../VotesForm/VotesForm'
import FavoriteForm from '../FavoriteForm/FavoriteForm'

const PostInfo = ({ post }) => {

    const [votes, setVotes] = useState(0)
    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const { country } = post

    useEffect(() => {
        refreshVotes()
    }, [])

    const handleClick = (e) => {

        e.preventDefault()

        postsService
            .deletePost(id, country)
            .then(({ data: country }) => navigate(`/countries/${country}`))
            .catch(err => console.log(err))
    }

    const refreshVotes = () => {

        votesService.getVotes('POST', id)
            .then(({ data }) => setVotes(Number(data)))
            .catch(err => console.log(err))
    }

    const setVote = (vote) => {

        votesService
            .setVote('POST', id, { vote })
            .then(() => refreshVotes())
            .catch(err => console.log(err))

    }

    return (
        <>
            <h1>{post.title}</h1>
            <FavoriteForm specs={{ type: 'POST', id }} />
            <img src={post.postImg} alt={post.title} style={{ width: '400px' }} />
            <p>{post.description}</p>
            {
                (user?._id === post.owner || user?.role === 'ADMIN') &&
                <>
                    <Link to={`/posts/${post._id}/edit`}>Edit</Link>
                    <Link to={'/delete'} onClick={handleClick}>Delete</Link>
                </>
            }

            <hr />
            <h1>Votes: {votes}</h1>
            <VotesForm setVote={setVote} />

        </>
    )
}

export default PostInfo