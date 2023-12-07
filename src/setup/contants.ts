const API_URL = "http://localhost:8400"
const VERSION = "/api/v1"

let GET_JWT_LOCAL_STORAGE: any = ''

GET_JWT_LOCAL_STORAGE = (typeof window !== 'undefined') &&  localStorage.getItem('jwt')

export {
    API_URL,
    VERSION,
    GET_JWT_LOCAL_STORAGE
}