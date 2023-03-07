import { Container, Row, Col } from 'react-bootstrap'
import { AuthContext } from '../../contexts/auth.context'
import { useContext, useEffect, useState } from 'react'
import UserInfo from '../../components/UserInfo/UserInfo'

const MyProfilePage = () => {

    const [currentUser, setCurrentUser] = useState({})
    const { user } = useContext(AuthContext)

    useEffect(() => {
        setCurrentUser(user)
    }, [user])

    return (
        <>
            {
                currentUser && <UserInfo user={currentUser} />
            }
        </>
    )
}
export default MyProfilePage