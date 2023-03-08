import { Col, Container, Form, Row, Button, FormGroup } from "react-bootstrap"
import userService from '../../services/user.service'
import uploadService from '../../services/upload.service'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import { useContext, useState } from 'react'


const UserEdit = () => {

    const { authenticateUser, user } = useContext(AuthContext)

    const [currentUser, setCurrentUser] = useState({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar
    })

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setCurrentUser({ ...currentUser, [name]: value })
    }



    const handleFormSubmit = e => {

        e.preventDefault()

        const formData = new FormData();
        formData.append('imageUrl', e.target.imageUrl.files[0]);


        uploadService
            .uploadImage(formData)
            .then(({ data }) => {
                const { cloudinary_url } = data
                return userService.editUser(user._id, { ...currentUser, avatar: cloudinary_url })

            })
            .then(({ data }) => {
                localStorage.setItem('authToken', data.authToken)
                authenticateUser()
                return
            })
            .then(() => navigate('/myprofile'))
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <Row>

                <Form onSubmit={handleFormSubmit} encType="multipart/form-data" >

                    <Col md={{ offset: 2, span: 8 }}>

                        <Row>
                            <Col>
                                <FormGroup controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" value={currentUser.name} onChange={handleInputChange} name="name" />
                                </FormGroup>
                            </Col>

                            <Col>
                                <FormGroup controlId="lastName">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control type="text" value={currentUser.lastName} onChange={handleInputChange} name="lastName" />
                                </FormGroup>
                            </Col>
                        </Row>

                        <hr />

                        <Row>
                            <Col>
                                <FormGroup controlId="imageUrl">
                                    <Form.Label>Avatar</Form.Label>
                                    <Form.Control type="file" name="imageUrl" />
                                </FormGroup>
                            </Col>

                            <Col>
                                <FormGroup controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={currentUser.email} onChange={handleInputChange} name="email" />
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

export default UserEdit