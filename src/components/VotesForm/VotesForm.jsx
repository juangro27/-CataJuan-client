import { useState } from "react"
import { Button } from "react-bootstrap"
import { useParams } from "react-router-dom"
import votesService from "../../services/votes.service"

const VotesForm = ({ setVote }) => {

    const [comment, setComment] = useState('')
    const { id } = useParams()
    const [errors, setErrors] = useState([])


    return (
        <>
            <Button onClick={() => setVote('up')}>Up</Button>
            <Button onClick={() => setVote('down')}>Down</Button>
        </>
    )
}

export default VotesForm