import { fechAllLevel } from "@/services/levelServices"

var levelVocal:any = []

const handleGetAllLevel = async () => {
    let levelVocal:any = []
    let res:any = await fechAllLevel()
    res && res.EC === 0 && levelVocal.push(res.DT)

    return levelVocal
}
handleGetAllLevel()

export { levelVocal }