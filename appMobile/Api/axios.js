import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export  const axiosClient = axios.create({
    baseURL: `http://192.168.1.7:8000`,
    headers: {
        'Content-Type': 'application/json',
    }
})
axiosClient.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

export default axiosClient;