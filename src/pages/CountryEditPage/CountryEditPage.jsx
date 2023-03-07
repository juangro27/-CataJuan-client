import CountryEditForm from "../../components/CountryEditForm/CountryEditForm"
import { Container, Row, Col } from "react-bootstrap"
import { useNavigate, useParams } from 'react-router-dom'


const CountryEditPage = () => {

    const navigate = useNavigate()
    const { id } = useParams()


    const fireFinalActions = () => {
        navigate(`/countries/${id}`)
    }

    return (
        <Container>

            <h1 className="mb-4">Edit Country</h1>
            <hr />

            <Row>

                <Col md={{ span: 8, offset: 2 }}>

                    <CountryEditForm fireFinalActions={fireFinalActions} />

                </Col >

            </Row>

        </Container>
    )
}

export default CountryEditPage