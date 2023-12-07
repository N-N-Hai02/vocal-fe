import { fechAllLevel } from "@/services/levelServices"

let levelVocal:any = []

const getAllLevel = async () => {
    let res:any = await fechAllLevel()
    res && res.EC === 0 && levelVocal.push(res.DT)
}
getAllLevel()

export { levelVocal , getAllLevel}