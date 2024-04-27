import ApiClient from "@/utils/apiClient"

const apiClient = new ApiClient('users')
export default {
    me: async () => await apiClient.get('me')
}