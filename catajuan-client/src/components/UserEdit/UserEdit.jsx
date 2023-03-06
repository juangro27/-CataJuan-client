import { useEffect, useState } from "react"
import { Col, Container, Form, Row, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import userService from '../../services/user.service'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'


const UserEdit = ({ user }) => {

    const { authenticateUser } = useContext(AuthContext)

    const [currentUser, setCurrentUser] = useState({
        name: '',
        lastName: '',
        email: '',
        avatar: ''
    })
    const navigate = useNavigate()

    useEffect(() => {
        setCurrentUser(user)
    }, [user])


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
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="name" value={currentUser.name} onChange={handleInputChange} name="name" />
                            </Col>

                            <Col>
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="lastName" value={currentUser.lastName} onChange={handleInputChange} name="lastName" />
                            </Col>
                        </Row>

                        <hr />

                        <Row>
                            <Col>
                                <img src={currentUser.avatar} alt="profile image" />
                            </Col>

                            <Col>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={currentUser.email} onChange={handleInputChange} name="email" />
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