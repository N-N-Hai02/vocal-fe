import { createContext, useEffect, useState } from "react"
import { fechAllVocal } from '../services/vocalService'
import { usePathname } from 'next/navigation'

type GlobalContent = {
    data: [],
    setLevelEnglish: (id: number) => void,
    levelEnglish: number,
    checkClickVocalbulary: (id: number) => void,
    index: number,
    toggle: boolean,
    setToggle: (value: boolean) => void,
}
const DataContexts = createContext<GlobalContent>({ 
    data: [], 
    setLevelEnglish: () => {}, 
    levelEnglish: 0,
    checkClickVocalbulary: () => {}, 
    index: 0,
    toggle: false,
    setToggle: () => {}, 
})

const DataProvider = ({ children }: { children: any} ) => {
    const pathname = usePathname()
    // list vocalbulary
    const [data, setData] = useState<[]>([])
    const [levelEnglish, setLevelEnglish] = useState<number>(0)
    const [index, setIndex] = useState<number>(0)
    const [toggle, setToggle] = useState<boolean>(false)

    const checkClickVocalbulary = (index:number) => setIndex(index)

    const getAllVocal = async (levelId:number) => {
        let response:any = await fechAllVocal()
        if (response && response.DT) {
            let datas = response.DT
            let result =  datas.filter((item:any) => +item.levelId === levelId)
            setData(result)
        }
    }

    useEffect(() => {
        const childrenContent:any = document.getElementById('childrenContent')
        childrenContent.onclick = () => setToggle(false)
    }, [pathname, toggle])

    useEffect(() => {
        getAllVocal(levelEnglish)
    }, [levelEnglish])

    return (
        <DataContexts.Provider value={{ data, index, toggle, setToggle, setLevelEnglish, levelEnglish, checkClickVocalbulary }}>
            {children}
        </DataContexts.Provider>
    )
}

export { DataProvider, DataContexts }