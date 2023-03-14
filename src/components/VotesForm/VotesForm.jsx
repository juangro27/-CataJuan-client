import { faHandPointDown } from '@fortawesome/free-solid-svg-icons'
import { faHandPointUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, ButtonIcon } from 'react-rainbow-components'


const VotesForm = ({ setVote }) => {



    return (
        <>
            < ButtonIcon
                onClick={() => setVote('up')}
                variant="brand"
                size="large"
                tooltip='Vote up'
                icon={< FontAwesomeIcon icon={faHandPointUp} />
                } />
            < ButtonIcon
                onClick={() => setVote('down')}
                variant="brand"
                size="large"
                tooltip='Vote down'
                icon={< FontAwesomeIcon icon={faHandPointDown} />
                } />
        </>
    )
}

export default VotesForm