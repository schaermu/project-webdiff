import ApiClient from "@/utils/apiClient";

const client = new ApiClient('user', true)

export default {
    async fetchAll() {
        return await client.get(undefined)
    },
    async create(data: any) {
        return await client.post(data)
    },
    async update(id: string, data: any) {
        return await client.put(id, data)
    },
    async delete(id: string) {
        return await client.delete(id)
    }
}