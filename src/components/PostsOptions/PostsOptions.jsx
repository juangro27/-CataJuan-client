import { useEffect, useState } from "react"
import postsService from "../../services/posts.service"
import { Accordion, AccordionSection, Select, Button } from 'react-rainbow-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";


const PostsOptions = ({ country, filterPosts }) => {

    const [queries, setQueries] = useState({ sort: {} })

    useEffect(() => {

        getPosts(queries)

    }, [queries])

    const getPosts = queries => {

        postsService
            .getPosts(country, queries)
            .then(({ data }) => filterPosts(data))
            .catch(err => console.log(err))

    }

    const resetOptions = () => {

        setQueries({ sort: {} })

        const form = document.getElementById('options');
        const selectElements = form.getElementsByTagName('select');
        for (let i = 0; i < selectElements.length; i++) {
            selectElements[i].selectedIndex = 0;
        }

    }

    const getQueries = (newQuery) => {

        if (!newQuery) setQueries({ ...queries })
        else {
            newQuery === "alphabetic1"
                ? setQueries({ sort: { title: 1 } })
                : newQuery === "alphabetic0"
                    ? setQueries({ sort: { title: -1 } })
                    : newQuery === "score1"
                        ? setQueries({ sort: { score: 1 } })
                        : setQueries({ sort: { score: -1 } })
        }
    }


    const handleOption = e => {

        const { value } = e.target

        getQueries(value)

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
        <div className="post-sorting">
            <Accordion >
                <AccordionSection icon={<FontAwesomeIcon icon={faFilter} />}
                    label="Sort Posts">
                    <div id='options'>
                        <Select
                            label="Sort by:"
                            labelAlignment="left"
                            id="alphabetic"
                            defaultValue=''
                            onChange={handleOption}
                            options={[
                                { value: '', label: 'Select Option' },
                                { value: 'alphabetic1', label: 'A-Z' },
                                { value: 'alphabetic0', label: 'Z-A' },
                                { value: 'score1', label: 'Lowest first' },
                                { value: 'score0', label: 'Highest first' }
                            ]}
                        />
                    </div>

                    <Button
                        label="Reset"
                        onClick={resetOptions}
                        variant="brand"
                        className="wide-btn"
                    />

                </AccordionSection>
            </Accordion >
        </div>
    )
}

export default PostsOptions