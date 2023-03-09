import { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import countriesService from '../../services/countries.service'
import postsService from '../../services/posts.service'
import uploadService from '../../services/upload.service'
import { AuthContext } from '../../contexts/auth.context'
import { useLocation } from 'react-router-dom';
import FormError from "../FormError/FormError"


const NewPost = () => {

    const { user } = useContext(AuthContext)
    const [countries, setCountries] = useState([])
    const [errors, setErrors] = useState([])


    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const myParam = queryParams.get('country')

    const navigate = useNavigate()

    const [postData, setPostData] = useState({
        title: '',
        postImg: '',
        description: '',
        country: myParam,
    })

    useEffect(() => {
        countriesService
            .getCountriesNames()
            .then(({ data }) => setCountries(data))
            .catch(err => console.log(err))

    }, [])

    const handleInputChange = e => {
        const { value, name } = e.target
        setPostData({ ...postData, [name]: value })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('imageUrl', e.target.imageUrl.files[0]);

        uploadService
            .uploadImage(formData)
            .then(({ data }) => {
                const { cloudinary_url } = data
                return postsService.createPost({ ...postData, postImg: cloudinary_url })

            })
            .then(({ data: post }) => navigate(`/posts/${post}`))
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    return (
        <Form onSubmit={handleFormSubmit} encType="multipart/form-data" >

            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title:</Form.Label>
                <Form.Control type="text" value={postData.title} onChange={handleInputChange} name="title" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description:</Form.Label>
                <Form.Control type="text" value={postData.description} onChange={handleInputChange} name="description" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="country">
                <Form.Label>Country:</Form.Label>
                <Form.Select onChange={handleInputChange} name="country" value={myParam ? myParam : ''}>
                    <option key='' value=''>Select country</option>
                    {
                        countries.map(elm => {
                            return elm._id === myParam ?
                                <option key={elm._id} value={elm._id}>{elm.name}</option>
                                :
                                <option key={elm._id} value={elm._id}>{elm.name}</option>
                        })
                    }
                </Form.Select>

            </Form.Group>

            <Form.Group className="mb-3" controlId="postImg">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" name="imageUrl" />
            </Form.Group>

            {errors.length > 0 && <FormError>{errors.map((elm, index) => <p key={index}>{elm}</p>)} </FormError>}


            <div className="d-grid mb-3">
                <Button variant="dark" type="submit">Post</Button>
            </div>

        </Form >
    )
}

export default NewPost