import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import countriesService from "../../services/countries.service"
import capitalize from '../../utils/capitalize'
import CountryOptions from "../CountryOptions/CountryOptions"
import ModalCountry from "../ModalCountry/ModalCountry"
import Nivo from "../Nivo/Nivo"

const CountriesList = () => {

    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState('')
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {

        loadCountries()

    }, [])

    const loadCountries = () => {

        countriesService
            .getCountriesNames()
            .then(({ data }) => setCountries(data))
            .catch(err => console.log(err))
    }

    const showCountry = country => {

        countryInformation(country)
        setShowModal(true)

    }

    const handleClose = () => {
        setShowModal(false)
    }

    const filterCountries = countries => {

        setCountries(countries)

    }

    const countryInformation = country => {

        countriesService
            .getOneCountryByCode(country)
            .then(({ data }) => setSelectedCountry(data))
            .catch(err => console.log(err))

    }

    return (
        <>
            {(selectedCountry && showModal) &&
                <ModalCountry handleClose={handleClose} showModal={showModal} country={selectedCountry} />
            }
            <div className="d-flex justify-content-center" >
                <div id='root' style={{ width: '1000px', height: '600px' }}>
                    <Nivo showCountry={showCountry} />
                    <h3>Safety index map</h3>
                </div>
            </div>

            <CountryOptions filterCountries={filterCountries} />

            <ul>
                {countries.map(elm => <li key={elm._id}><Link to={elm._id}>{capitalize(elm.name)}</Link></li>)}
            </ul>
        </>
    )

}
export default CountriesList