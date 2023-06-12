import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

// Add a request interceptor
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

// Add a response interceptor
axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const { response } = error;
    if (response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN');
    } 

    throw error;
});

export default axiosClient;