import ApiClient from "@/utils/apiClient";

const client = new ApiClient('user', true)

export default {
    async fetchAll() {
        return await client.get(undefined)
    },
    async create(data) {
        return await client.post(data)
    },
    async update(id, data) {
        return await client.put(id, data)
    },
    async delete(id) {
        return await client.delete(id)
    }
}