import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const CountryInfo = ({ country }) => {

    const [postData, setPostData] = useState({
        title: '',
        postImg: '',
        description: ''
    })

    // const navigate = useNavigate()


    const handleInputChange = e => {
        const { value, name } = e.target
        setPostData({ ...postData, [name]: value })
    }

    const handleFormSubmit = (e) => {

        e.preventDefault()

        // countriesService
        //     .deleteCountry(id)
        //     .then(() => navigate('/countries'))
        //     .catch(err => console.log(err))
    }

    return (
        <Form onSubmit={handleFormSubmit} >

            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title:</Form.Label>
                <Form.Control type="text" value={postData.title} onChange={handleInputChange} name="title" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description:</Form.Label>
                <Form.Control type="text" value={postData.description} onChange={handleInputChange} name="description" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="postImg">
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" value={postData.postImg} onChange={handleInputChange} name="postImg" />
            </Form.Group>


            <div className="d-grid mb-3">
                <Button variant="dark" type="submit">Post</Button>
            </div>

        </Form>
    )
}

export default CountryInfo