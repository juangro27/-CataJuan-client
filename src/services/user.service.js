import axios from 'axios'

class UserService {
    static _instance
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/users`
        })
    }
    static getInstance() {
        if (!this._instance) {
            this._instance = new UserService()
        }
        return this._instance;
    }


    editUser(id, data) {
        return this.api.put(`/${id}/edit`, data)
    }

    deleteUser(id) {
        return this.api.delete(`/${id}/delete`)
    }

}

export default UserService.getInstance()