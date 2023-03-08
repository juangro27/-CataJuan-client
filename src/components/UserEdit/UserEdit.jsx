import { Col, Container, Form, Row, Button, FormGroup } from "react-bootstrap"
import userService from '../../services/user.service'
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

        userService
            .editUser(user._id, currentUser)
            .then(({ data }) => {
                localStorage.setItem('authToken', data.authToken)
                authenticateUser()
            })
            .then(() => navigate('/myprofile'))
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <Row>

                <Form onSubmit={handleFormSubmit} >

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
                                <FormGroup controlId="avatar">
                                    <Form.Label>Avatar</Form.Label>
                                    <Form.Control type="text" value={currentUser.avatar} onChange={handleInputChange} name="avatar" />
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

                        {/* <hr />
                    <h3>My favorites</h3>
                    <p>These are my favorite destinations</p>

                    <hr />
                    <h3 >My Posts</h3>
                    <p className="mb-5">These are my posts</p> */}

                    </Col>


                </Form>
            </Row>
        </Container>


    )

}

export default UserEdit