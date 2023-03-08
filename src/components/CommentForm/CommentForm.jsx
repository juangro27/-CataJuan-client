import { useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useState, useContext } from "react"
import { AuthContext } from '../../contexts/auth.context'
import commentsService from "../../services/comments.service"


const CommentForm = ({ type, refreshComments }) => {

    const [comment, setComment] = useState('')
    const { id } = useParams()
    const { user } = useContext(AuthContext)

    const handleInputChange = (e) => {

        const { value } = e.target
        setComment(value)

    }

    const handleSubmit = (e) => {

        e.preventDefault()
        commentsService
<<<<<<< HEAD
            .createComment(type, id, comment)
=======
            .createComment(type, id, { comment })
>>>>>>> c8de2e46040f9b4efeba4200bdc7416d9b153e3c
            .then(() => {
                setComment('')
                refreshComments()
            })
            .catch(err => console.log(err))

    }


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="comment">
                <Form.Label>Comment:</Form.Label>
                <Form.Control as="textarea" rows={3} value={comment} onChange={handleInputChange} />
            </Form.Group>
            <div className="d-grid">
                <Button variant="dark" type="submit">Send</Button>
            </div>
        </Form>
    )
}

export default CommentForm