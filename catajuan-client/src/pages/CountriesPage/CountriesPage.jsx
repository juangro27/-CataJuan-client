import { useEffect, useState } from "react"
import CountriesList from "../../components/CountriesList/CountriesList"
import countriesService from "../../services/countries.service"

const CountriesPage = () => {

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
        <CountriesList countries={countries} />
    )
}

export default CountriesPage