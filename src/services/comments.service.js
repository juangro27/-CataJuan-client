import axios from 'axios'

class CommentsService {
    static _instance
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/comments`
        })
    }
    static getInstance() {
        if (!this._instance) {
            this._instance = new CommentsService();
        }
        return this._instance;
    }

    getCommets(type, typeId) {
        return this.api.get(`/${type}/${typeId}`)
    }

    createComment(type, typeId, data) {
        return this.api.post(`/create/${type}/${typeId}`, data)
    }

    editComment(id, data) {
        return this.api.put(`/edit/${id}`, data)
    }
    deleteComment(type, typeId, id) {
        return this.api.delete(`/delete/${type}/${typeId}/${id}`)
    }

}

export default CommentsService.getInstance()