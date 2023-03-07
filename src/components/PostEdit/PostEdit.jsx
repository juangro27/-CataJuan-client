import { useEffect, useState } from "react"
import { Col, Container, Form, Row, Button, FormGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import postsService from '../../services/posts.service'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'


const PostEdit = ({ postId }) => {

    const [countries, setCountries] = useState([])
    const [currentPost, setCurrentPost] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        postsService
            .getOnePost(postId)
            .then(({ data }) => setCurrentPost(data))
            .catch(err => console.log(err))
    }, [])

    const handleInputChange = e => {
        const { value, name } = e.target
        setCurrentPost({ ...currentPost, [name]: value })
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        postsService
            .editPost(postId, currentPost)
            .then(() => navigate(`/countries/${currentPost.country}`))
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <Row>

                <Form onSubmit={handleFormSubmit} >

                    <Col md={{ offset: 2, span: 8 }}>

                        <Row>
                            <Col>
                                <FormGroup controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" value={currentPost.title} onChange={handleInputChange} name="title" />
                                </FormGroup>
                            </Col>

                            <Col>
                                <FormGroup controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" value={currentPost.description} onChange={handleInputChange} name="description" />
                                </FormGroup>
                            </Col>
                        </Row>

                        <hr />

                        <Row>
                            <Col>
                                <FormGroup controlId="postImg">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type="text" value={currentPost.postImg} onChange={handleInputChange} name="postImg" />
                                </FormGroup>
                            </Col>

                        </Row>

                        <div className="d-grid m-3">
                            <Button variant="dark" type="submit">Update</Button>
                        </div>

                    </Col>


                </Form>
            </Row>
        </Container>


    )

}

export default PostEdit