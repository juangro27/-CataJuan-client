import countriesService from "../../services/countries.service"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react"
import { Button, Form, Row, Col } from "react-bootstrap";


const CountryEditForm = ({ fireFinalActions }) => {

    const { id: countryId } = useParams()

    const [country, setCountry] = useState({
        description: '',
        img: '',
        discriminationProtection: '',
        goodPlaceToLive: '',
        illegalSameSexRelationships: '',
        propaganda: '',
        safetyIndex: '',
        transMurderRates: '',
        transgenderLegal: '',
        violenceCriminalization: '',
        score: '',
    })



    useEffect(() => {

        countriesService
            .getOneCountry(countryId)
            .then(({ data }) => {
                const {
                    description,
                    discriminationProtection,
                    goodPlaceToLive,
                    illegalSameSexRelationships,
                    img,
                    propaganda,
                    safetyIndex,
                    score,
                    transMurderRates,
                    transgenderLegal,
                    violenceCriminalization
                } = data

                setCountry({
                    description,
                    discriminationProtection,
                    goodPlaceToLive,
                    illegalSameSexRelationships,
                    img,
                    propaganda,
                    safetyIndex,
                    score,
                    transMurderRates,
                    transgenderLegal,
                    violenceCriminalization
                })
            })
            .catch(err => console.log(err))


    }, [])

    const handleInputChange = e => {

        const { value, name } = e.target
        setCountry({ ...country, [name]: value })

    }

    const changeChecked = (type) => {

        setCountry({ ...country, [type]: !country[type] })

    }

    const handleCountrySubmit = e => {
        e.preventDefault()
        countriesService
            .editCountry(countryId, country)
            .then(() => {
                fireFinalActions()
            })
            .catch(err => console.log(err))
    }

    return (

        <Form onSubmit={handleCountrySubmit}>
            <Row>

                <Form.Group as={Col} md={4} controlId="discriminationProtection">
                    <Form.Label>Discrimination protection</Form.Label>
                    <Form.Control type='number' name="discriminationProtection" value={country.discriminationProtection} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group as={Col} md={4} controlId="goodPlaceToLive">
                    <Form.Label>goodPlaceToLive</Form.Label>
                    <Form.Control
                        type="text"
                        name="goodPlaceToLive"
                        value={country.goodPlaceToLive}
                        onChange={handleInputChange} />
                </Form.Group>

                <Form.Group as={Col} md={4} controlId="safetyIndex">
                    <Form.Label>safetyIndex</Form.Label>
                    <Form.Control type="text" name="safetyIndex" value={country.safetyIndex} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group as={Col} md={4} controlId="transMurderRates">
                    <Form.Label>transMurderRates</Form.Label>
                    <Form.Control type="text" name="transMurderRates" value={country.transMurderRates} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group as={Col} md={4} controlId="transgenderLegal">
                    <Form.Label>transgenderLegal</Form.Label>
                    <Form.Control type='number' name="transgenderLegal" value={country.transgenderLegal} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group as={Col} md={4} controlId="violenceCriminalization">
                    <Form.Label>violenceCriminalization</Form.Label>
                    <Form.Control type="text" name="violenceCriminalization" value={country.violenceCriminalization} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group as={Col} md={4} controlId="score">
                    <Form.Label>score</Form.Label>
                    <Form.Control type='text' name="score" value={country.score} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group as={Col} md={4} controlId="illegalSameSexRelationships">
                    <Form.Check
                        type="switch"
                        id="illegalSameSexRelationships"
                        label="Illegal same sex relationships"
                        checked={country.illegalSameSexRelationships ? true : false}
                        onChange={() => { changeChecked('illegalSameSexRelationships') }} />
                </Form.Group>

                <Form.Group as={Col} md={4} controlId="propaganda">
                    <Form.Label>propaganda</Form.Label>
                    <Form.Check
                        type="switch"
                        id="propaganda"
                        label="Propaganda"
                        checked={country.propaganda ? true : false}
                        onChange={() => { changeChecked('propaganda') }} />

                </Form.Group>

            </Row>

            <Button variant="dark" type="submit">Save</Button>

        </Form >
    )
}

export default CountryEditForm
