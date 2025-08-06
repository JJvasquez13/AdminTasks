import api from './axiosInstance'

export const getProfile = async () => {
    const response = await api.get('/users/profile')
    return response.data
}
