import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import postsService from "../../services/posts.service"

const PostsOptions = ({ country, filterPosts }) => {

    const [queries, setQueries] = useState({
        alphabetic: '',
        score: '',
    })
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {

        getPosts(queries)

    }, [queries])

    const getPosts = queries => {

        postsService
            .getPosts(country, { ...queries, page: currentPage })
            .then(({ data }) => {
                filterPosts(data.posts)
                setCurrentPage(data.currentPage)
                setTotalPages(data.totalPages)
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

    const nextPage = () => {
        currentPage < totalPages && setCurrentPage(currentPage + 1)
        setQueries({ ...queries, page: currentPage })
    }

    const previousPage = () => {
        currentPage > 1 && setCurrentPage(currentPage - 1)
        setQueries({ ...queries, page: currentPage })
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

            <div className="d-flex m-2 align-content-center">
                {currentPage !== 1 &&
                    <Button onClick={() => previousPage()}>Previous</Button>
                }

                <p className="m-2">Page: {currentPage} / {totalPages}</p>

                {currentPage < totalPages &&
                    <Button onClick={() => nextPage()}>Next</Button>
                }
            </div>
        </>
    )
}

export default PostsOptions