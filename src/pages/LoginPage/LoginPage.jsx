import { useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import LoginForm from '../../components/LoginForm/LoginForm'
import { ThemeContext } from '../../contexts/theme.context'

const LoginPage = () => {

    const { themeSelected, } = useContext(ThemeContext)


    return (
        <div className={themeSelected.theme === 'light' ? "form-container form-container-light" : "form-container form-container-dark"}>
            <h1>Log in</h1>
            <LoginForm />
        </div>
    )
}
export default LoginPage