import { useState, useContext } from "react"
import { Form, Button } from "react-bootstrap"
import authService from "../../services/auth.service"
import { useNavigate } from 'react-router-dom'


const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
    })

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        authService
            .signup(signupData)
            .then(() => navigate('/login'))
            .catch(err => console.log(err))
    }



    return (

        <Form onSubmit={handleFormSubmit} >

            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" value={signupData.name} onChange={handleInputChange} name="name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Lastname:</Form.Label>
                <Form.Control type="text" value={signupData.lastName} onChange={handleInputChange} name="lastName" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={signupData.password} onChange={handleInputChange} name="password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={signupData.email} onChange={handleInputChange} name="email" />
            </Form.Group>


            <div className="d-grid">
                <Button variant="dark" type="submit">Registrarme</Button>
            </div>

        </Form>
    )
}

export default SignupForm