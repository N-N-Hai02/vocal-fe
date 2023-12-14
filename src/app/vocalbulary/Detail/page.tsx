
"use client"
import { useContext, useEffect, useState } from 'react';
import AppPaginate from '@/component/app.paginate';
import { DataContexts } from '@/context/dataContext';
import { levelVocal } from '@/contants/level';
import { UserContext } from '@/context/UserContext';

const VocalbularyDetail = () => {
    const { data, index } = useContext(DataContexts)
    const { user } = useContext(UserContext)
    const [vocalDetail, setDataList] = useState<any[]>([])
    const [totalPages, setTotalPages] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const handlePageClick = (event: any) => setCurrentPage(+event.selected)

    useEffect(() => {
        setCurrentPage(index)
    }, [])

    useEffect(() => {
        setDataList([data[currentPage]])
        setTotalPages(data.length)
    }, [currentPage, data])

    const getLevel = levelVocal[0]?.find((element: any) => element.id === vocalDetail[0]?.levelId)

    return (
        <div className="h-100">
            {
                user.isAuthenticated && vocalDetail && vocalDetail.length > 0 && getLevel
                    ?
                    <div className="card rounded-0 m-4" style={{ marginTop: "4.5rem!important" }}>
                        <div className="card-header">
                            <h5 className="text-uppercase">Vocalbulary Detail</h5>
                        </div>
                        <div className="card-body text-center d-flex justify-content-center">
                            {vocalDetail && vocalDetail.map((item: any, index: number) => {
                                return (
                                    <div className="card text-white bg-primary mb-3 w-50" key={index}>
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
                        </div>
                        <hr />
                        <div className="d-flex justify-content-center">
                            <AppPaginate pathName="/vocalbulary/List" totalPages={totalPages} handlePageClick={handlePageClick} />
                        </div>
                    </div>
                    : <div className="alert alert-primary text-center">No Data...!</div>
            }
        </div>
    )
}

export default VocalbularyDetail

