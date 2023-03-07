import { AuthContext } from '../../contexts/auth.context'
import { useContext, useEffect, useState } from 'react'
import PostEdit from '../../components/PostEdit/PostEdit'
import { useParams } from 'react-router'
import postsService from '../../services/posts.service'


const EditPostPage = () => {

    const { id: postId } = useParams()

    return (
        <>
            <h2>Edit post</h2>
            <PostEdit postId={postId} />
        </>
    )
}
export default EditPostPage