import axios from "axios"
import { IPost } from "../types"


class NetworkService {

    private url = 'https://jsonplaceholder.typicode.com/posts'

    async getData() {
        const { data } = await axios.get<IPost[]>(this.url)
        return data
    }

     async deletePost(id: number) {
        const { data } = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        return data
    }

    async updatePost({id, payload}: {id: number, payload: Omit<IPost, 'id'>}) {
        const { data } = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, payload)
        return data
    }

}

export const networkService = new NetworkService()