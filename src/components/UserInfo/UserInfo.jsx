import { Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import capitalize from "../../utils/capitalize"


const UserInfo = () => {

    const { user } = useContext(AuthContext)
    const link = `/users/${user._id}/edit`
    const { name, lastName, avatar, email } = user
    const capitalizedName = capitalize(name)
    const capitalizedLastName = capitalize(lastName)

    return (
        <Container>
            <Row>
                <Col md={{ offset: 2, span: 8 }}>

                    <h1>{capitalizedName} {capitalizedLastName}</h1>
                    <hr />

                    <Row>
                        <Col>
                            <img src={avatar} alt={`${capitalizedName} profile`} />
                        </Col>

                        <Col>
                            <p>Email: {email}</p>
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