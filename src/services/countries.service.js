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

    getOneCountry(id) {
        return this.api.get(`/${id}`)
    }

    editCountry(id, data) {
        return this.api.put(`/${id}/edit`, data)
    }

    deleteCountry(id) {
        return this.api.delete(`/${id}/delete`)
    }
}

export default CountryService.getInstance()