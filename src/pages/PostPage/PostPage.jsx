import { useParams, } from 'react-router-dom'
import { useEffect, useState } from "react"
import commentsService from '../../services/comments.service'
import postsService from '../../services/posts.service'
import PostInfo from '../../components/PostInfo/PostInfo'
import CommentsList from '../../components/CommentsList/CommentsList'
import CommentForm from '../../components/CommentForm/CommentForm'
import capitalize from '../../utils/capitalize'

const PostPage = () => {

    const { id } = useParams()
    const [post, setPost] = useState([])
    const [commentsArr, setCommentsArr] = useState([])

    useEffect(() => {

        getPost()

    }, [])

    const getPost = () => {

        postsService
            .getOnePost(id)
            .then(({ data }) => {
                console.log(data)
                setCommentsArr(data.comments)
                setPost({ ...data, title: capitalize(data.title) })
            })
            .catch(err => console.log(err))

    }
    const refreshComments = () => {

        commentsService
            .getComments('POST', id)
            .then(({ data }) => {
                setCommentsArr(data.comments)
            })
            .catch(err => console.log(err))
    }

    return (<>
        <PostInfo post={post} />
        <CommentsList specs={{ type: 'POST', id }} commentsData={commentsArr} refreshComments={refreshComments} />
        <CommentForm type='POST' comments={commentsArr} refreshComments={refreshComments} />
    </>)
}

export default PostPage