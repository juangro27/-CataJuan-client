import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import userService from "../../services/user.service"


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


    const handleClick = () => {

        userService
            .addFavorite(type, id)
            .then(() => setIsFavorite(!isFavorite))
            .catch(err => console.log(err))

    }
    return (

        <>
            <h1>is favorite: {isFavorite ? 'yes' : 'no'}</h1>
            <Button onClick={handleClick}>Favorite</Button>
        </>

    )
}

export default FavoriteForm