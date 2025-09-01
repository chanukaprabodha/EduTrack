import axios from "axios";

const api = axios.create({
    baseURL: "https://689f09413fed484cf878cf8e.mockapi.io/api/v1",
    timeout: 10000,
})

// Interceptors: very last moment before the request is sent

api.interceptors.request.use(async (config: any) => {
    // config.headers.Authorization = `Bearer ${yourAuthToken}`;
    return config;
})

api.interceptors.response.use(async (config: any) => {
    // Handle response data or errors here
    return config;
})

export default api;