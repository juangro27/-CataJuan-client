import { Button } from "react-bootstrap"

const VotesForm = ({ setVote }) => {



    return (
        <>
            <Button onClick={() => setVote('up')}>Up</Button>
            <Button onClick={() => setVote('down')}>Down</Button>
        </>
    )
}

export default VotesForm