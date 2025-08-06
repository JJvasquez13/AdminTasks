import api from './axiosInstance'

export const getProfile = async () => {
    const response = await api.get('/users/profile')
    return response.data
}

export const logout = async () => {
    try {
        await api.post('/auth/logout', {}, {
            headers: { 'X-XSRF-TOKEN': document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'))?.[2] || '' }
        })
        // Limpia la cookie XSRF-TOKEN del lado del cliente
        document.cookie = 'XSRF-TOKEN=; Max-Age=-1; path=/;'
    } catch (error) {
        console.error('Error al cerrar sesión:', error.response?.data || error.message)
        throw error
    }
}