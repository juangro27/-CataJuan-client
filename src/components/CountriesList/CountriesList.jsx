import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import countriesService from "../../services/countries.service"
import capitalize from '../../utils/capitalize'
import Nivo from "../Nivo/Nivo"

const CountriesList = () => {

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
            <div className="d-flex justify-content-center" >
                <div id='root' style={{ width: '1000px', height: '600px' }}>
                    <Nivo />
                </div>
            </div>


            {countries.map(elm => <li key={elm._id}><Link to={elm._id}>{capitalize(elm.name)}</Link></li>)}
        </ul>
    )

}
export default CountriesList