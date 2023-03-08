import { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import countriesService from '../../services/countries.service'
import postsService from '../../services/posts.service'
import { AuthContext } from '../../contexts/auth.context'
import { useLocation } from 'react-router-dom';


const NewPost = () => {

    const { user } = useContext(AuthContext)
    const [countries, setCountries] = useState([])

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const myParam = queryParams.get('country')

    const navigate = useNavigate()

    const [postData, setPostData] = useState({
        title: '',
        postImg: '',
        description: '',
        country: myParam,
        owner: ''
    })

    useEffect(() => {
        setPostData({ ...postData, owner: user?._id })
        countriesService
            .getCountriesNames()
            .then(({ data }) => setCountries(data))
            .catch(err => console.log(err))

    }, [])

    useEffect(() => {
        setPostData({ ...postData, owner: user?._id })

    }, [user])

    const handleInputChange = e => {
        const { value, name } = e.target
        setPostData({ ...postData, [name]: value })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        postsService
            .createPost(postData)
            .then(({ data: post }) => navigate(`/posts/${post}`))
            .catch(err => console.log(err))

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
                <Form.Control type="text" value={postData.postImg} onChange={handleInputChange} name="postImg" />
            </Form.Group>


            <div className="d-grid mb-3">
                <Button variant="dark" type="submit">Post</Button>
            </div>

        </Form >
    )
}

export default NewPost