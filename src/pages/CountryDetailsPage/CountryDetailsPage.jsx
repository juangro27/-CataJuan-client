import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CommentForm from "../../components/CommentForm/CommentForm"
import CommentsList from "../../components/CommentsList/CommentsList"
import CountryInfo from "../../components/CountryInfo/CountryInfo"
import commentsService from "../../services/comments.service"
import countriesService from "../../services/countries.service"

const CountryDetailsPage = () => {

    const { id } = useParams()
    const [country, setCountry] = useState([])
    const [commentsArr, setCommentsArr] = useState([])

    useEffect(() => {

        countriesService
            .getOneCountry(id)
            .then(({ data }) => {
                setCommentsArr(data.comments)
                setCountry(data)
            })
            .catch(err => console.log(err))

    }, [])

    const refreshComments = () => {

        commentsService
            .getCommets('COUNTRY', id)
            .then(({ data }) => {
                setCommentsArr(data.comments)
            })
            .catch(err => console.log(err))
    }

    return (
        <>

            <CountryInfo country={country} />
            <CommentsList specs={{ type: 'COUNTRY', id }} commentsData={commentsArr} refreshComments={refreshComments} />
            <CommentForm type='COUNTRY' comments={commentsArr} refreshComments={refreshComments} />
        </>

    )
}

export default CountryDetailsPage 