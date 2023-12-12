
import axios from "../setup/axios"
import { VERSION } from "@/setup/contants"

const registerNewUser = (email:string, phone:string, username:string, password:string, conformPassword:string) => {
    return axios.post(`${VERSION}/user/register`, {email, phone, username, password, conformPassword})
}
const loginUser = (valueLogin:string, password:String) => axios.post(`${VERSION}/user/login`, { valueLogin, password }, { withCredentials: true })

const logoutUser = () => axios.post(`${VERSION}/user/logout`)

const fetchAllUser = (page:number, limit:number) => axios.get(`${VERSION}/user/read?page=${page}&limit=${limit}`)

const deleteUser = (user: any) => axios.delete(`${VERSION}/user/delete`, { data: { id: user.id } })

const fetchGroup = () => axios.get(`${VERSION}/group/read`)

const createNewUser = (userData: any) => axios.post(`${VERSION}/user/create`, {...userData})

const updateCurrentUser = (userData: any) => axios.put(`${VERSION}/user/update`, {...userData})

const getUserAccount = () => axios.get(`${VERSION}/user/account`)

export {
    registerNewUser,
    loginUser,
    logoutUser,
    fetchAllUser,
    deleteUser,
    fetchGroup,
    createNewUser,
    updateCurrentUser,
    getUserAccount
}