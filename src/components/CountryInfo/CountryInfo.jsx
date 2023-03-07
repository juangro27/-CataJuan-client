import { Link } from 'react-router-dom'
import countriesService from '../../services/countries.service'
import { useNavigate, useParams } from 'react-router-dom'


const CountryInfo = ({ country }) => {

    const { id } = useParams()
    const navigate = useNavigate()

    const handleClick = (e) => {

        e.preventDefault()

        countriesService
            .deleteCountry(id)
            .then(() => navigate('/countries'))
            .catch(err => console.log(err))
    }

    return (
        <>
            <h1>{country.flag}{country.name}</h1>
            <Link to={'/edit'}>Edit</Link>
            <Link to={'/delete'} onClick={handleClick}>Delete</Link>
            <Link to={`/posts/create?country=${id}`}>Create new post</Link>
        </>
    )
}

export default CountryInfo