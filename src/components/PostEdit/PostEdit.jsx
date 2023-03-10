import { useEffect, useState } from "react"
import { Col, Container, Form, Row, Button, FormGroup } from "react-bootstrap"
import postsService from '../../services/posts.service'
import { useNavigate } from 'react-router-dom'
import uploadService from '../../services/upload.service'
import FormError from "../FormError/FormError"


const PostEdit = ({ postId }) => {

    const [currentPost, setCurrentPost] = useState({
        title: '',
        description: '',
        postImg: ''
    })
    const navigate = useNavigate()
    const [errors, setErrors] = useState([])

    useEffect(() => {

        getPost()

    }, [])

    const getPost = () => {

        postsService
            .getOnePost(postId)
            .then(({ data }) => setCurrentPost(data))
            .catch(err => console.log(err))

    }

    const handleInputChange = e => {

        const { value, name } = e.target
        setCurrentPost({ ...currentPost, [name]: value })

    }

    const handleFormSubmit = e => {

        e.preventDefault()

        const formData = new FormData();
        formData.append('imageUrl', e.target.imageUrl.files[0]);

        uploadService
            .uploadImage(formData)
            .then(({ data }) => {
                const { cloudinary_url } = data
                return postsService.editPost(postId, { ...currentPost, postImg: cloudinary_url })
            })
            .then(({ data: post }) => navigate(`/posts/${post._id}`))
            .catch(err => setErrors(err.response.data.errorMessages))

    }

    return (
        <Container>
            <Row>

                <Form onSubmit={handleFormSubmit} encType="multipart/form-data">

                    <Col md={{ offset: 2, span: 8 }}>


                        <FormGroup controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={currentPost.title} onChange={handleInputChange} name="title" />
                        </FormGroup>



                        <hr />


                        <img src={currentPost.postImg} alt={currentPost.title} style={{ width: '450px' }} />
                        <FormGroup controlId="postImg">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" name="imageUrl" />
                        </FormGroup>


                        <FormGroup controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={currentPost.description} onChange={handleInputChange} name="description" />
                        </FormGroup>

                        {errors.length > 0 && <FormError>{errors.map((elm, index) => <p key={index}>{elm}</p>)} </FormError>}


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