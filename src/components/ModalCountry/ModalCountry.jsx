import { Button, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import capitalize from "../../utils/capitalize"


const ModalCountry = ({ handleClose, country, showModal }) => {
    const {
        name,
        discriminationProtection,
        violenceCriminalization,
        goodPlaceToLive,
        transgenderLegal,
        transMurderRates,
        illegalSameSexRelationships,
        propaganda,
        score,
        calification,
        flag,
        _id: id
    } = country

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>What you need to know about {capitalize(name)} {flag} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1>{discriminationProtection}</h1>
                <h1>{violenceCriminalization}</h1>
                <h1>{goodPlaceToLive}</h1>
                <h1>{transgenderLegal}</h1>
                <h1>{transMurderRates}</h1>
                <h1>{illegalSameSexRelationships}</h1>
                <h1>{propaganda}</h1>
                <h1>{calification}</h1>
                <h1>{score}</h1>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Close
                </Button>
                <Link to={`./${id}`} onClick={handleClose}>
                    <Button variant="dark" >
                        More information...
                    </Button>
                </Link>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalCountry