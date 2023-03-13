import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import postsService from "../../services/posts.service"

const PostsOptions = ({ country, filterPosts }) => {

    const [queries, setQueries] = useState({
        alphabetic: '',
        score: '',
    })

    useEffect(() => {

        getPosts(queries)

    }, [queries])

    const getPosts = queries => {

        postsService
            .getPosts(country, queries)
            .then(({ data }) => {
                filterPosts(data)
            })
            .catch(err => console.log(err))

    }

    const resetOptions = () => {

        setQueries({
            score: '',
            alphabetic: ''
        })

        const form = document.getElementById('options');
        const selectElements = form.getElementsByTagName('select');
        for (let i = 0; i < selectElements.length; i++) {
            selectElements[i].selectedIndex = 0;
        }

    }

    const handleOption = e => {

        const { id } = e.target
        const { value } = e.target

        setQueries({ ...queries, [id]: value })
        if (id === 'score') {
            const select = document.getElementById('alphabetic')
            select.selectedIndex = 0;
        } else {
            const select = document.getElementById('score')
            select.selectedIndex = 0;
        }

    }


    return (
        <>
            <Form id="options" >

                Sort Alphabetically
                <Form.Select id="alphabetic" defaultValue='' onChange={handleOption}>
                    <option value="">Select option</option>
                    <option value="1">A-Z</option>
                    <option value="-1">Z-A</option>
                </Form.Select>

                Sort by Score
                <Form.Select id="score" defaultValue='' onChange={handleOption}>
                    <option value="">Select option</option>
                    <option value="1">Lowest first</option>
                    <option value="-1">Highest first</option>
                </Form.Select>

                <Button onClick={resetOptions}>Reset</Button>
            </Form>
        </>
    )
}

export default PostsOptions