import ApiClient from "@/utils/apiClient";

const client = new ApiClient('watches', true)

export default {
    async fetchAll() {
        return await client.get(undefined)
    },
    async fetchById(id: string) {
        return await client.get(id)
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