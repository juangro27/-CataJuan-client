import { useParams, } from 'react-router-dom'
import { useEffect, useState } from "react"
import commentsService from '../../services/comments.service'
import postsService from '../../services/posts.service'
import PostInfo from '../../components/PostInfo/PostInfo'
import CommentsList from '../../components/CommentsList/CommentsList'
import CommentForm from '../../components/CommentForm/CommentForm'

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
                setCommentsArr(data.comments)
                setPost(data)
            })
            .catch(err => console.log(err))

    }
    const refreshComments = () => {

        commentsService
            .getCommets('POST', id)
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