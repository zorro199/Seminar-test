import axios from "axios"

class NetworkService {

    private url = 'http://localhost:3000/seminars'

    async getData() {
        const { data } = await axios.get<ISeminar[]>(this.url)
        return data
    }

    async deleteSeminar(id: number) {
        const { data } = await axios.delete(`${this.url}/${id}`)
        return data
    }

    async updateSeminar(id: number, title: string, description: string) {
        const { data } = await axios.put(`${this.url}/${id}`, {
            title,
            description
        })
        return data
    }
}

export const networkService = new NetworkService()