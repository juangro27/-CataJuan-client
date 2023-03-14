import { Alert } from "react-bootstrap"
import { Notification } from "react-rainbow-components"
import { useEffect, useState } from "react"

const FormError = ({ errorsArr }) => {

    const [errors, setErrors] = useState(errorsArr[0])

    useEffect(() => setErrors(errorsArr[0]), [errorsArr])

    const handleClose = i => {
        const errorsCopy = [...errors]
        errorsCopy.splice(i, 1)
        setErrors(errorsCopy)
    }

    console.log(errors)

    return (< Alert variant={'danger'} className='error-alert'>
        {
            errors?.map((elm, index) => {
                return <Notification
                    key={index}
                    className="error-alert-notification"
                    title="Error"
                    icon="error"
                    description={elm}
                    onRequestClose={() => handleClose(index)}
                />
            })
        }


    </Alert >
    )
}

export default FormError