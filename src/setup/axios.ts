import axios from "axios"
import { toast } from "react-toastify";
import { API_URL, GET_JWT_LOCAL_STORAGE } from "./contants";

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: API_URL
});

instance.defaults.withCredentials = true

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = `Bearer ${GET_JWT_LOCAL_STORAGE}`
instance.defaults.headers.common['Authorization'] = `Bearer ${typeof window !== 'undefined' && localStorage.getItem('jwt')}`

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = (error && error.response && error.response.status) || 500 // or write code --> const status = error.reponse?.status || 500
    switch (status) {
        // authentication (token related Issuses)
        case 401: {
            if (typeof window !== "undefined") {
                if (window.location.pathname !== '/' && window.location.pathname !== '/login' && window.location.pathname !== '/register') {
                    toast.error('Unauthorized the user. Please login...')
                }
            }
            return error.response.data
        }
        // forbidden (permission related Issues)
        case 403: {
            toast.error(`You don't have the permission to access this resource...`)
            return Promise.reject(error)
        }
        // bad request
        case 400: {
            return Promise.reject(error)
        }
        // not found
        case 404: {
            return Promise.reject(error)
        }
        // conflict
        case 409: {
            return Promise.reject(error)
        }
        // uoprocessable
        case 402: {
            return Promise.reject(error)
        }
        // genneric api error (server related) unexpected
        case 422: {
            return Promise.reject(error)
        }
        default: {
            return error.response.data
        }
    }
    
});

export default instance