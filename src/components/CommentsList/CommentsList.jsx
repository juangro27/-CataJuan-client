import { useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import commentsService from "../../services/comments.service"


const CommentsList = ({ refreshComments, specs, commentsData }) => {

    const [isEdit, setIsEdit] = useState({ status: false, index: null })
    const [commentValue, setCommentValue] = useState('')
    const { user } = useContext(AuthContext)

    const handleInputChange = (e) => {

        const { value } = e.target
        setCommentValue(value)

    }

    const changeIsEdit = (status, index, comment) => {

        setIsEdit({ status, index })
        setCommentValue(comment)

    }

    const saveComment = (id) => {

        const comment = { comment: commentValue }

        commentsService
            .editComment(id, comment)
            .then(() => {
                setIsEdit({ status: null, index: null })
                refreshComments()
            })
            .catch(err => console.log(err))

    }

    const deleteComment = (id) => {

        commentsService
            .deleteComment(specs.type, specs.id, id)
            .then(() => {
                refreshComments()
            })
            .catch(err => console.log(err))

    }

    return (
        <ul>
            {

                commentsData?.map((comment, i) => {
                    const { owner } = comment
                    return (
                        isEdit.status && i === isEdit.index
                            ?
                            <Form.Group className="mb-3" controlId="comment" key={comment._id}>
                                <Form.Label>Comment:</Form.Label>
                                <Form.Control as="textarea" rows={3} value={commentValue} onChange={handleInputChange} />
                                <Button onClick={() => changeIsEdit(null)}>Cancel</Button>
                                <Button onClick={() => saveComment(comment._id, i)}>Save</Button>
                            </Form.Group>
                            :
                            <div key={comment._id}>
                                <li key={comment._id}>{owner.name}, {comment.comment}</li>
                                {(owner._id === user?._id || user?.role === 'ADMIN') &&
                                    <>
                                        <Button onClick={() => changeIsEdit(true, i, comment.comment)}>Edit</Button>
                                        <Button onClick={() => deleteComment(comment._id)}>Delete</Button>
                                    </>
                                }
                            </div>

                    )
                })
            }
        </ul>
    )

}

export default CommentsList