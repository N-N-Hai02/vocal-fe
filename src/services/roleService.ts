import axios from "../setup/axios"
import { VERSION } from "@/setup/contants"

const createNewRoles = (roles: any) => {
    return axios.post(`${VERSION}/role/create`, [...roles])
}

const fetchAllRoles = () => {
    return axios.get(`${VERSION}/role/read`)
}

const deleteRole = (role:any) => {
    return axios.delete(`${VERSION}/role/delete`, { data: { id: role.id } })
}

const updateCurrentRole = (roleData: any) => axios.put(`${VERSION}/role/update`, {...roleData})

const fetchRolesByGroup = (groupId:string) => {
    return axios.get(`${VERSION}/role/by-group/${groupId}`)
}

const assignRolesToGroup = (data: any) => {
    return axios.post(`${VERSION}/role/assign-to-group`, { data })
}

export {
    createNewRoles,
    fetchAllRoles,
    deleteRole,
    updateCurrentRole,
    fetchRolesByGroup,
    assignRolesToGroup
}