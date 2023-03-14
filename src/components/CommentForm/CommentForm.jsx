import { useParams } from "react-router-dom"
import { useState } from "react"
import { Button, Textarea } from 'react-rainbow-components'
import commentsService from "../../services/comments.service"
import FormError from "../FormError/FormError"


const CommentForm = ({ type, refreshComments }) => {

    const [comment, setComment] = useState('')
    const { id } = useParams()
    const [errors, setErrors] = useState([])

    const handleInputChange = (e) => {

        const { value } = e.target
        setComment(value)

    }
    const handleSubmit = (e) => {

        commentsService
            .createComment(type, id, { comment })
            .then(() => {
                setComment('')
                refreshComments()
            })
            .catch(err => setErrors(err.response.data.errorMessages))

    }

    return (
        <div className="comment-form">

            <Textarea
                className="comment-textarea"
                id="comment"
                rows={2}
                placeholder="Insert comment"
                value={comment}
                onChange={handleInputChange}
            />
            <div className="comment-btn">
                <Button
                    label="Comment"
                    onClick={() => handleSubmit()}
                    variant="brand"
                />
            </div>

            {
                errors?.length > 0 &&
                <FormError errorsArr={[errors]} />
            }

        </div>
    )
}

export default CommentForm