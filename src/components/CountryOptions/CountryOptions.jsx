import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import countriesService from "../../services/countries.service"

const CountryOptions = ({ filterCountries }) => {

    const [queries, setQueries] = useState({
        discriminationProtection: '',
        violenceCriminalization: '',
        goodPlaceToLive: '',
        propaganda: '',
        illegalSameSexRelationships: '',
        transgenderLegal: '',
        calification: '',
        transMurderRates: '',
        safetyIndex: '',
        alphabetic: '',
        page: 1,
        score: '',
    })
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {

        getCountries(queries)

    }, [queries])

    const getCountries = queries => {

        countriesService
            .getCountries({ ...queries, page: currentPage })
            .then(({ data }) => {
                filterCountries(data.countries)
                setCurrentPage(data.currentPage)
                setTotalPages(data.totalPages)
            })
            .catch(err => console.log(err))

    }


    const resetOptions = () => {

        setQueries({
            discriminationProtection: '',
            violenceCriminalization: '',
            goodPlaceToLive: '',
            propaganda: '',
            illegalSameSexRelationships: '',
            transgenderLegal: '',
            calification: '',
            transMurderRates: '',
            safetyIndex: '',
            alphabetic: '',
            page: 1,
            score: '',
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

            <Form id="options" className="m-5">

                Discrimination protection
                <Form.Select id="discriminationProtection" defaultValue='' onChange={handleOption}>
                    <option value="">Select option</option>
                    <option value="Constitutional protections">Constitutional protections</option>
                    <option value="Broad protections">Broad protections</option>
                    <option value="Limited protections">Limited protections</option>
                    <option value="No protections">No LGBTQ+ protections</option>
                </Form.Select>

                Criminalization against violence
                <Form.Select id="violenceCriminalization" defaultValue='' onChange={handleOption} >
                    <option value="">Select option</option>
                    <option value="Hate crimes">Hate crimes</option>
                    <option value="Inicitement">Inicitement</option>
                    <option value="Limited protections">Limited protections</option>
                    <option value="No protections">No LGBTQ+ protections</option>
                </Form.Select>

                Is it a good place to live?
                <Form.Select id="goodPlaceToLive" defaultValue='' onChange={handleOption}>
                    <option value="">Select option</option>
                    <option value="0-25%">0-25%</option>
                    <option value="26-50%">26-50%</option>
                    <option value="51-75%">51-75%</option>
                    <option value="76-100%">76-100%</option>
                </Form.Select>

                Propaganda/Morality Laws
                <Form.Select id="propaganda" defaultValue='' onChange={handleOption}>
                    <option value="">Select option</option>
                    <option value="Allowed">Allowed</option>
                    <option value="Laws prevent the discussion of Pro-LGTBTQ+ issues">Laws prevent the discussion of Pro-LGTBTQ+ issues</option>
                </Form.Select>

                Illegal Same-sex Relationships
                <Form.Select id="illegalSameSexRelationships" defaultValue='' onChange={handleOption} >
                    <option value="">Select option</option>
                    <option value="Allowed">Allowed</option>
                    <option value="Punishments range from jail time to the death penalty">Punishments range from jail time to the death penalty</option>
                </Form.Select>

                Transgender Legal Identity Laws
                <Form.Select id="transgenderLegal" defaultValue='' onChange={handleOption} >
                    <option value="">Select option</option>
                    <option value="Allowed">Allowed</option>
                    <option value="Punishments range from jail time to the death penalty">Punishments range from jail time to the death penalty</option>
                </Form.Select>

                Calification
                <Form.Select id="calification" defaultValue='' onChange={handleOption}>
                    <option value="">Select option</option>
                    <option value="f">F</option>
                    <option value="d-">D-</option>
                    <option value="d">D</option>
                    <option value="d+">D+</option>
                    <option value="c-">C-</option>
                    <option value="c">C</option>
                    <option value="c+">C+</option>
                    <option value="b-">B-</option>
                    <option value="b">B</option>
                    <option value="b+">B+</option>
                    <option value="a-">A-</option>
                    <option value="a">A</option>
                </Form.Select>

                Sort by: Tans Murder Rates
                <Form.Select id="transMurderRates" defaultValue='' onChange={handleOption}>
                    <option value="">Select option</option>
                    <option value="-1">Ascending</option>
                    <option value="1">Descending-</option>
                </Form.Select>

                Sort by: Safety Index
                <Form.Select id="safetyIndex" defaultValue='' onChange={handleOption}>
                    <option value="">Select option</option>
                    <option value="-1">Ascending</option>
                    <option value="1">Descending</option>
                </Form.Select>

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

export default CountryOptions