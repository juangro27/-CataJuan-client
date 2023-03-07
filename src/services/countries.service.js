import axios from 'axios'

class CountryService {
    static _instance
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/countries`
        })
    }
    static getInstance() {
        if (!this._instance) {
            this._instance = new CountryService();
        }
        return this._instance;
    }


    getCountries() {
        return this.api.get(`/`)
    }

    getCountriesNames() {
        return this.api.get('/names')
    }

    getOneCountry(id) {
        return this.api.get(`/${id}`)
    }

    editCountry(id, data) {
        return this.api.put(`/${id}/edit`, data)
    }

    deleteCountry(id) {
        return this.api.delete(`/${id}/delete`)
    }

    createComment(country, data) {
        return this.api.post(`/${country}/comments/create`, data)
    }

    editComment(country, data) {
        return this.api.put(`/${country}/comments/create`, data)
    }

    editComment(country, data) {
        return this.api.put(`/${country}/comments/edit`, data)
    }

    deleteComment(country) {
        return this.api.delete(`/${country}/comments/delete`)
    }

}

export default CountryService.getInstance()