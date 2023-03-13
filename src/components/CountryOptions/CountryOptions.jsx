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
        sort: {},
        page: 1,
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
            sort: {},
            page: 1,
        });

        setCurrentPage(1);
        setTotalPages(0);

        const form = document.getElementById('filter');
        const selectElements = form.getElementsByTagName('select');

        for (let i = 0; i < selectElements.length; i++) {
            selectElements[i].selectedIndex = 0;
        }
    }

    const handleOption = e => {

        const { id } = e.target
        const { value } = e.target

        if (id !== 'sort') setQueries({ ...queries, [id]: value })
        else {
            value === "Murder0"
                ? setQueries({ ...queries, sort: { transMurderRates: -1 } })
                : value === "Murder1"
                    ? setQueries({ ...queries, sort: { transMurderRates: 1 } })
                    : value === "Safety0"
                        ? setQueries({ ...queries, sort: { safetyIndex: -1 } })
                        : value === "Safety1"
                            ? setQueries({ ...queries, sort: { safetyIndex: 1 } })
                            : value === "Name0"
                                ? setQueries({ ...queries, sort: { name: -1 } })
                                : value === "Name1"
                                    ? setQueries({ ...queries, sort: { name: 1 } })
                                    : value === "Score0"
                                        ? setQueries({ ...queries, sort: { score: -1 } })
                                        : setQueries({ ...queries, sort: { score: 1 } })
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

            <Form id="filter" className="m-5">

                Discrimination protection
                <Form.Select as="select" id="discriminationProtection" defaultValue='' onChange={handleOption}>
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
                    <option value="Incitement">Incitement</option>
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
                    <option value="No information">No information</option>
                    <option value="Illegal">Illegal</option>
                    <option value="Legal to change gender without sex reassignment surgery">Legal to change gender without sex reassignment surgery</option>
                </Form.Select>

                Calification
                <Form.Select id="calification" defaultValue='' onChange={handleOption}>
                    <option value="">Select option</option>
                    <option value="f">F</option>
                    <option value="d%2D">D-</option>
                    <option value="d">D</option>
                    <option value="d%2B">D+</option>
                    <option value="c%2D">C-</option>
                    <option value="c">C</option>
                    <option value="c%2B">C+</option>
                    <option value="b%2D">B-</option>
                    <option value="b">B</option>
                    <option value="b%2B">B+</option>
                    <option value="a%2D">A-</option>
                    <option value="a">A</option>
                </Form.Select>

                Sort by:
                <Form.Select id="sort" defaultValue='' onChange={handleOption}>
                    <option value="">Select option</option>
                    <option value="Murder0">Trans Murder Rates: Ascending</option>
                    <option value="Murder1">Trans Murder Rates: Descending</option>
                    <option value="Safety0">Safety Index: Ascending</option>
                    <option value="Safety1">Safety Index: Descending-</option>
                    <option value="Name1">Name: A-Z</option>
                    <option value="Name0">Name: Z-A</option>
                    <option value="Score1">Score: Lowest first</option>
                    <option value="Score0">Score: Highest first</option>
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