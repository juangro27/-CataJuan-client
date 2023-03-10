import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import countriesService from "../../services/countries.service"


const SearchForm = () => {

    const [countriesBackup, setCountriesBackup] = useState([])
    const [countries, setCountries] = useState([])
    const navigate = useNavigate()
    const [showOptions, setShowOptions] = useState(false)

    useEffect(() => {
        getCountries()

    }, [])

    const getCountries = () => {
        countriesService
            .getCountriesNames()
            .then(({ data }) => {
                setCountriesBackup(data)
                setCountries(data)
            })
            .catch(err => console.log(err))
    }

    const handleChange = (e) => {
        e.target.value !== '' ? setShowOptions(true) : setShowOptions(false)
        const filteredCountries = countriesBackup.filter(elm => elm.name.startsWith(e.target.value))
        setCountries(filteredCountries)
    }

    const handleOnClick = (e) => {

        setShowOptions(false)
        console.log(e.target.value)
        countriesService
            .getOneCountry(e.target.value)
            .then(({ data }) => navigate(`/countries/${data._id}`))

            .catch(err => console.log(err))
    }

    return (

        <Form className="d-flex">

            <Form.Control type="text" placeholder="Search" list="options" onChange={handleChange} />
            <Form.Select hidden={!showOptions} id="options" multiple >
                {countries.map((option) => {
                    return <option value={option._id} key={option._id} onClick={handleOnClick}>{option.name}</option>
                }
                )}
            </Form.Select>

        </Form>

    )
}

export default SearchForm