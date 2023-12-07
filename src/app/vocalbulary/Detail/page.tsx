
"use client"
import { useContext, useEffect, useState } from 'react';
import AppPaginate from '@/component/app.paginate';
import { DataContexts } from '@/context/dataContext';

const VocalbularyDetail = () => {
    const { data, index } = useContext(DataContexts)
    const [dataList, setDataList] = useState<any[]>([])
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
    
    return (
        <div className="h-100">
            <div className="card rounded-0 m-4" style={{ marginTop: "4.5rem!important" }}>
                <div className="card-header">
                    <h5 className="text-uppercase">Vocalbulary Detail</h5>
                </div>
                <div className="card-body text-center d-flex justify-content-center">
                    {dataList && dataList.map((item:any, index:number) => {
                        return (
                            <div className="card text-white bg-primary mb-3 w-50" key={index}>
                                <div className="card-header">{item?.en}</div>
                                <div className="card-body">
                                    <h5 className="card-title">{item?.vn}</h5>
                                    <p className="card-text">{item?.example_en}</p>
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
        </div>
    )
}

export default VocalbularyDetail

