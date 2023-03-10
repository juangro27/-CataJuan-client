import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CommentForm from "../../components/CommentForm/CommentForm"
import CommentsList from "../../components/CommentsList/CommentsList"
import CountryInfo from "../../components/CountryInfo/CountryInfo"
import commentsService from "../../services/comments.service"
import countriesService from "../../services/countries.service"
import capitalize from "../../utils/capitalize"

const CountryDetailsPage = () => {

    const { id } = useParams()
    const [country, setCountry] = useState({})
    const [comments, setComments] = useState([])

    useEffect(() => {

        getCountry()

    }, [id])


    const getCountry = () => {

        countriesService
            .getOneCountry(id)
            .then(({ data }) => {
                setComments(data.comments)
                setCountry({ ...data, name: capitalize(data.name) })
            })
            .catch(err => console.log(err))

    }

    const refreshComments = () => {

        commentsService
            .getComments('COUNTRY', id)
            .then(({ data }) => {
                setComments(data.comments)
            })
            .catch(err => console.log(err))

    }

    return (
        <>

            <CountryInfo country={country} />
            <CommentsList specs={{ type: 'COUNTRY', id }} commentsData={comments} refreshComments={refreshComments} />
            <CommentForm type='COUNTRY' comments={comments} refreshComments={refreshComments} />
        </>

    )
}

export default CountryDetailsPage 