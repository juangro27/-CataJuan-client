import { useState, useContext } from "react"
import authService from "../../services/auth.service"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import FormError from "../FormError/FormError"
import { Button, Input, Notification } from 'react-rainbow-components'
import styled from 'styled-components'
import { ThemeContext } from "../../contexts/theme.context"


const LoginForm = () => {

    const { authenticateUser, storeToken } = useContext(AuthContext)
    const { themeSelected } = useContext(ThemeContext)
    const [errors, setErrors] = useState([])

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = e => {

        authService
            .login(loginData)
            .then(({ data }) => {
                storeToken(data.authToken)
                authenticateUser()
            })
            .then(() => navigate('/'))
            .catch(err => setErrors([err.response.data.errorMessages]))
    }

    return (

        <div className="form">


            <div className={themeSelected.theme === 'light' ? "input input-light" : "input input-dark"}>
                <Input
                    label="Email:"
                    labelAlignment="left"
                    placeholder="Email@gmail.com"
                    type="email"
                    controlId="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleInputChange}
                // style={inputStyles}
                />
            </div>

            <div className={themeSelected.theme === 'light' ? "input input-light" : "input input-dark"}>
                <Input
                    label="Password:"
                    labelAlignment="left"
                    placeholder="**********"
                    type="password"
                    controlId="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                // style={inputStyles}
                />
            </div>

            <div className="login-submit">

                <Button
                    label="Log in"
                    onClick={() => handleSubmit()}
                    variant="brand"
                    className="wide-btn"
                />
            </div>

            {
                errors?.length > 0 &&
                <FormError errorsArr={errors} />
            }
        </div>
    )
}

export default LoginForm