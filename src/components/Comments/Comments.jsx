import { useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useState, useContext } from "react"
import { AuthContext } from '../../contexts/auth.context'


const Comments = ({ comments }) => {

    const { user } = useContext(AuthContext)
    const [comment, setComment] = useState('')
    const { id } = useParams()

    const handleInputChange = (e) => {
        const { value } = e.target
        setComment(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log({ comment, user, id })
    }


    return (<>
        <h1>Comments</h1>

        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="comment">
                <Form.Label>Comment:</Form.Label>
                <Form.Control as="textarea" rows={3} value={comment} onChange={handleInputChange} />
            </Form.Group>
            <div className="d-grid">
                <Button variant="dark" type="submit">Send</Button>
            </div>
        </Form>
    </>

    )
}

export default Comments