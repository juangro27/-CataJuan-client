import { useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useState, useContext } from "react"
import { AuthContext } from '../../contexts/auth.context'
import commentsService from "../../services/comments.service"
import FormError from "../FormError/FormError"


const CommentForm = ({ type, refreshComments }) => {

    const [comment, setComment] = useState('')
    const { id } = useParams()
    const { user } = useContext(AuthContext)
    const [errors, setErrors] = useState([])

    const handleInputChange = (e) => {

        const { value } = e.target
        setComment(value)

    }

    const handleSubmit = (e) => {

        e.preventDefault()
        commentsService
            .createComment(type, id, { comment })
            .then(() => {
                setComment('')
                refreshComments()
            })
            .catch(err => setErrors(err.response.data.errorMessages))

    }


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="comment">
                <Form.Label>Comment:</Form.Label>
                <Form.Control as="textarea" rows={3} value={comment} onChange={handleInputChange} />
            </Form.Group>

            {errors.length > 0 && <FormError>{errors.map((elm, index) => <p key={index}>{elm}</p>)} </FormError>}

            <div className="d-grid">
                <Button variant="dark" type="submit">Send</Button>
            </div>
        </Form>
    )
}

export default CommentForm