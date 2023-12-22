import { fechAllLevel } from "@/services/levelServices"

var levelVocal:any = []

const handleGetAllLevel = async () => {
    let res:any = await fechAllLevel()
    res && res.EC === 0 && levelVocal.push(res.DT)
}
handleGetAllLevel()

export { levelVocal }