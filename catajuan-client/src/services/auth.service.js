import axios from 'axios'

class AuthService {
    static _instance
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/auth`
        })
    }
    static getInstance() {
        if (!this._instance) {
            this._instance = new AuthService();
        }
        return this._instance;
    }


    signup(data) {
        return this.api.post(`/signup`, data)
    }

    login(data) {
        return this.api.post(`/login`, data)
    }

    verify(token) {
        return this.api.get(`/verify`, { headers: { Authorization: `Bearer ${token}` } })
    }

}

export default AuthService.getInstance()