import { Link } from 'react-router-dom'

const countriesList = ({ countries }) => {

    return (
        <ul>
            {countries.map(elm => <li key={elm._id}><Link to={elm._id}>{elm.name}</Link></li>)}
        </ul>
    )

}
export default countriesList