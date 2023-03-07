import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CountryInfo from "../../components/CountryInfo/CountryInfo"
import countriesService from "../../services/countries.service"

const CountryDetailsPage = () => {

    const { id } = useParams()
    const [country, setCountry] = useState([])

    useEffect(() => {

        countriesService
            .getOneCountry(id)
            .then(({ data }) => setCountry(data))
            .catch(err => console.log(err))

    }, [])


    return (
        <CountryInfo country={country} />
    )
}

export default CountryDetailsPage 