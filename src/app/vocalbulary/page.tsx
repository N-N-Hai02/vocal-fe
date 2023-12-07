"use client"
import { useEffect, useState } from 'react'
import type { Metadata } from 'next'
import { fechAllVocal } from '@/services/vocalService'

export const metadata: Metadata = {
    title: 'Vocalbulary Home',
    description: 'View Vocalbulary Home',
}

export default function VocalbularyHome() {
    const [valueSearch, setValueSearch] = useState("")
    const [allVocals, setAllVocals] = useState<[]>([])

    const handleSubmit = async () => {
        let res: any = await fechAllVocal()
        let resultSearch
        if (res && res.EC === 0) {
            let datas = res.DT
            if (valueSearch === "") {
                resultSearch = []
            } else {
                resultSearch = datas.filter((data: any) => data.en.includes(valueSearch))
            }
        }
        resultSearch && resultSearch.length > 0 && setAllVocals(resultSearch)
    }

    return (
        <div className="h-100">
            <div className="card rounded-0 m-4" style={{ marginTop: "4.5rem!important" }}>
                <h5 className="card-header text-uppercase">Nguyen Ngoc Hai</h5>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Search..!"
                            value={valueSearch}
                            onChange={(e) => setValueSearch(e.target.value)}
                        />
                        <button
                            className='btn btn-outline-primary'
                            onClick={() => handleSubmit()}
                        >
                            Tìm kiếm
                        </button>
                    </div>
                    {
                        !valueSearch && valueSearch.length === 0
                        ?
                        <div className="alert alert-warning"><span>Chưa có dữ liệu</span></div>
                        :
                        <div className='text-center'>
                            <table className="table table-bordered border-primary">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">English</th>
                                        <th scope="col">Vietnamese</th>
                                        <th scope="col">Spelling</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allVocals && allVocals.length > 0
                                        &&
                                        allVocals.map((item: any, index: number) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{item.en}</td>
                                                    <td>{item.vn}</td>
                                                    <td>{item.spelling}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
                <button className="btn btn-outline-secondary">Add To Home Screen</button>
            </div>
        </div>
    )
}