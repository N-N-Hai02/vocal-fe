const API_URL = process.env.BA_EN_URL
const VERSION = process.env.V_S_URL

let GET_JWT_LOCAL_STORAGE: any = ''

GET_JWT_LOCAL_STORAGE = (typeof window !== 'undefined') &&  localStorage.getItem('jwt')

export {
    API_URL,
    VERSION,
    GET_JWT_LOCAL_STORAGE
}