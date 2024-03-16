import {axiosClient} from "./axios.js";

const AuthApi = {
    getCsrfToken: async () => {
        return await axiosClient.get('/sanctum/csrf-cookie')
    },
    login: async (email,password) => {
        return await axiosClient.post('/api/login', {email,password})
    },
    logout:() => {
        localStorage.clear()
        sessionStorage.clear()
        window.location.href = "/login"
    }
}
export default AuthApi