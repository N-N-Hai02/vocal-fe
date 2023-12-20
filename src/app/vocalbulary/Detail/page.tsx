
"use client"
import { useCallback, useContext, useEffect, useState } from 'react'
import AppPaginate from '@/component/app.paginate'
import { DataContexts } from '@/context/dataContext'
import { levelVocal } from '@/contants/level'
import { UserContext } from '@/context/UserContext'
import { fechAllVocalWithPaginate } from '@/services/vocalService'
import { useSession } from "next-auth/react"

const VocalbularyDetail = () => {
    const { data: session }: any = useSession()
    const { data, index, levelEnglish, dataVocalPagination } = useContext(DataContexts)
    const { user } = useContext(UserContext)

    const [vocalDetail, setVocalDetail] = useState<any>([])
    const [totalPages, setTotalPages] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(0)
    
    const handlePageClick = (event: any) => setCurrentPage(+event.selected)

    const getVocalDetail = useCallback(async () => {
        if (dataVocalPagination && currentPage === 0) {
            setTotalPages(dataVocalPagination.length)
            setVocalDetail([dataVocalPagination[index]])
        }

        let response: any = await fechAllVocalWithPaginate(currentPage, 1, +levelEnglish)
        if (response && response.EC === 0) {
            setTotalPages(response.DT.totalPages)
            setVocalDetail(response.DT.vocals)
        }
    }, [currentPage, levelEnglish])

    useEffect(() => {
        getVocalDetail()
    }, [getVocalDetail])

    const getLevel = levelVocal[0]?.find((element: any) => element.id === levelEnglish)
    
    return (
        <div className="h-100">
            {
                ((user.isAuthenticated && vocalDetail && vocalDetail.length > 0 && getLevel) || (session !== null && session?.user !== undefined))
                    ?
                    <div className="card rounded-0 m-4" style={{ marginTop: "4.5rem!important" }}>
                        <div className="card-header alert alert-primary">
                            <h5 className="text-uppercase">Vocalbulary Detail</h5>
                        </div>
                        <div className='row'>
                            <div className='col-12 col-lg-3'></div>
                            <div className="card-body text-center col-12 col-lg-6 mx-2 mx-lg-0">
                                {vocalDetail && vocalDetail.map((item: any, index: number) => {
                                    return (
                                            <div className="card text-white bg-primary mb-3" key={index}>
                                                <h2 className="card-header">{getLevel?.name}</h2>
                                                <div className="card-body">
                                                    <p className="card-text"><span className="fw-bold">English:</span> {item?.en} </p>
                                                    <p className="card-text"><span className="fw-bold">Spelling:</span> {item?.spelling} </p>
                                                    <p className="card-text"><span className="fw-bold">Pronunciation:</span> {item?.pronunciation} </p>
                                                    <p className="card-text"><span className="fw-bold">Vietnamese:</span> {item?.vn} </p>
                                                    <p className="card-text"><span className="fw-bold">Example English:</span> {item?.vn} </p>
                                                    <p className="card-text"><span className="fw-bold">Example Vietnamese:</span> {item?.vn} </p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <hr />
                                <div className='alert alert-primary mb-0'>
                                    <AppPaginate totalPages={totalPages} handlePageClick={handlePageClick} />
                                </div>
                            </div>
                            <div className='col-12 col-lg-3'></div>
                        </div>
                    </div>
                    : <div className="alert alert-primary text-center">No Data...!</div>
            }
        </div>
    )
}

export default VocalbularyDetail

