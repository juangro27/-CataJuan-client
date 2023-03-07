import axios from 'axios'

class PostService {
    static _instance
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/posts`
        })
    }
    static getInstance() {
        if (!this._instance) {
            this._instance = new PostService()
        }
        return this._instance;
    }

    getAllPosts() {
        return this.api.get(`/`)
    }

    createPost(data) {
        console.log(data)

        return this.api.post(`/create`, data)
    }

    getOnePost(id) {
        return this.api.get(`/${id}`)
    }

    editPost(id, data) {
        return this.api.put(`/${id}/edit`, data)
    }

    deletePost(id) {
        return this.api.delete(`/${id}/delete`)
    }

}

export default PostService.getInstance()