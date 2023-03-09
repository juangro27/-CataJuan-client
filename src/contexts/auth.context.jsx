import { createContext, useEffect, useState } from "react"
import authService from "../services/auth.service"

const AuthContext = createContext()

function AuthProviderWrapper(props) {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const storeToken = token => localStorage.setItem('authToken', token)

    useEffect(() => {
        authenticateUser()
    }, [])

    const authenticateUser = () => {

        const token = localStorage.getItem('authToken')

        if (token) {
            authService
                .verify(token)
                .then(({ data }) => {
                    setUser(data)
                    setIsLoading(false)
                })
                .catch(err => logout())
        } else {
            logout()
        }
    }

    const logout = () => {
        localStorage.removeItem('authToken')
        setUser(null)
        setIsLoading(false)
    }


    return (
        <AuthContext.Provider value={{ authenticateUser, user, logout, isLoading, storeToken }}>
            {props.children}
        </AuthContext.Provider>
    )

}

export { AuthContext, AuthProviderWrapper }