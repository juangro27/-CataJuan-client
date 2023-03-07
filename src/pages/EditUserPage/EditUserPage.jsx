import { AuthContext } from '../../contexts/auth.context'
import { useContext, useEffect, useState } from 'react'
import UserEdit from '../../components/UserEdit/UserEdit'

const EditUserPage = () => {

    const [currentUser, setCurrentUser] = useState({})
    const { user } = useContext(AuthContext)

    useEffect(() => {
        setCurrentUser(user)
    }, [user])

    return (
        <>
            {
                currentUser && <UserEdit user={currentUser} />
            }
        </>
    )
}
export default EditUserPage