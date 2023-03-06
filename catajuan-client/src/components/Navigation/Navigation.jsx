import { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'

const Navigation = () => {

    const { user, logout } = useContext(AuthContext)
    console.log(user)
    return (
        <Navbar bg='dark' variant='dark' expand="md" className='mb-4'>
            <Container>
                <Navbar.Brand href="#home">CataJuan</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/">
                            <Nav.Link as="span">Inicio</Nav.Link>
                        </Link>
                        <Link to="/countries">
                            <Nav.Link as="span">Countries</Nav.Link>
                        </Link>
                        <Link to="/aboutus">
                            <Nav.Link as="span">About us</Nav.Link>
                        </Link>
                        <Link to="/contact">
                            <Nav.Link as="span">Contact</Nav.Link>
                        </Link>
                        <Link to="/login">
                            <Nav.Link as="span">Log In</Nav.Link>
                        </Link>
                        <Link to="/signup">
                            <Nav.Link as="span">Sign Up</Nav.Link>
                        </Link>
                        <Link to="/myprofile">
                            <Nav.Link as="span">My Profile</Nav.Link>
                        </Link>
                    </Nav>
                    {user && <Navbar.Text>Bienvenid@, {user.name} | </Navbar.Text>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation