import { useEffect, useState } from "react"
import userService from "../../services/user.service"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, ButtonIcon } from 'react-rainbow-components'
import { faHeart as noFav } from "@fortawesome/free-regular-svg-icons"
import { faHeart as Fav } from "@fortawesome/free-solid-svg-icons"



const FavoriteForm = ({ specs }) => {

    const { type, id } = specs
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {

        verifyFavorite()

    }, [])

    const verifyFavorite = () => {

        userService
            .isFavorite(type, id)
            .then(({ data }) => setIsFavorite(data))
            .catch(err => console.log(err))

    }


    const handleConnect = () => {

        userService
            .addFavorite(type, id)
            .then(() => setIsFavorite(!isFavorite))
            .catch(err => console.log(err))

    }
    return (

        <>
            < ButtonIcon
                onClick={handleConnect}
                variant="brand"
                size="large"
                tooltip={isFavorite ? "Alredy favorite" : 'Make favorite'}
                icon={< FontAwesomeIcon icon={isFavorite ? Fav : noFav} />
                } />
        </>

    )
}

export default FavoriteForm