import { VERSION } from "@/setup/contants"
import axios from "../setup/axios"

const fechAllVocal = () => axios.get(`${VERSION}/vocal/read`)

const createNewVocal = (vocalData:any) => axios.post(`${VERSION}/vocal/create`, [...vocalData])

const vocalAssignToUser = (data:any) => axios.post(`${VERSION}/vocal/assign-to-user`, {...data})

const fechAllVocalByUser = () => axios.get(`${VERSION}/vocal/by-user/read`)

const updateCurrentVocal = (vocalData: any) => axios.put(`${VERSION}/vocal/update`, {...vocalData})

const deleteVocal = (vocal: any) => axios.delete(`${VERSION}/vocal/delete`, { data: { id: vocal.id } })

export { fechAllVocal, createNewVocal, updateCurrentVocal, deleteVocal, vocalAssignToUser, fechAllVocalByUser }