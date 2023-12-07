import { VERSION } from "@/setup/contants"
import axios from "../setup/axios"

const fechAllLevel = () => axios.get(`${VERSION}/level/read`)

const createNewLevel = (levels: any) => axios.post(`${VERSION}/level/create`, [...levels])

const deleteLevel = (level:any) => axios.delete(`${VERSION}/level/delete`, { data: { id: level.id } })

const updateCurrentLevel = (levelData: any) => axios.put(`${VERSION}/level/update`, {...levelData })

export { 
    fechAllLevel, 
    createNewLevel,
    deleteLevel,
    updateCurrentLevel 
}