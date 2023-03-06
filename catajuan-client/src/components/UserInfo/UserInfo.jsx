import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"


const UserInfo = ({ user }) => {

    const [currentUser, setCurrentUser] = useState({})
    useEffect(() => {
        setCurrentUser(user)
    }, [user])

    const link = `/users/${currentUser._id}/edit`

    return (
        <Container>
            <Row>
                <Col md={{ offset: 2, span: 8 }}>

                    <h1>{currentUser.name} {currentUser.lastName}</h1>
                    <hr />

                    <Row>
                        <Col>
                            <img src={currentUser.avatar} alt="profile image" />
                        </Col>

                        <Col>
                            <p>Email: {currentUser.email}</p>
                            <Link to={link}>Edit</Link>
                        </Col>
                    </Row>

                    <hr />
                    <h3>My favorites</h3>
                    <p>These are my favorite destinations</p>

                    <hr />
                    <h3 >My Posts</h3>
                    <p className="mb-5">These are my posts</p>

                </Col>
            </Row>
        </Container>


    )

}

export default UserInfo