import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = () => {

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
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation