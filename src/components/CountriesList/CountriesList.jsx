import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import countriesService from "../../services/countries.service"

const countriesList = () => {

    const [countries, setCountries] = useState([])

    useEffect(() => {

        loadCountries()

    }, [])

    const loadCountries = () => {

        countriesService
            .getCountries()
            .then(({ data }) => setCountries(data))
            .catch(err => console.log(err))
    }

    return (
        <ul>
            {countries.map(elm => <li key={elm._id}><Link to={elm._id}>{elm.name}</Link></li>)}
        </ul>
    )

}
export default countriesList