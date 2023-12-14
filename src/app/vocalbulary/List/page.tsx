"use client"
import { useContext, useEffect, useState } from "react"
import Link from 'next/link'
import { DataContexts } from '@/context/dataContext'
import { levelVocal } from '@/contants/level'
import { UserContext } from "@/context/UserContext"
import { fechAllVocalByUser, vocalAssignToUser } from "@/services/vocalService"
import { toast } from "react-toastify"

export default function VocabularyList() {
    const { data, setVlaue, checkClickVocalbulary } = useContext(DataContexts)
    const { user } = useContext(UserContext)

    const [vocalByUserList, setVocalByUserList] = useState([])

    useEffect(() => setVlaue(1), [])

    const handleStatus = async (data:any) => {
        let resultData = {
            userId: user.account.groupWithRoles.id,
            vocalId: data.id
        }

        if (data && confirm(`Assign: ${data.en} to ${user.account.username}`) == true) {
            let res:any = await vocalAssignToUser(resultData)
            if (res && res.EC === 0) {
                toast.success(res.EM)
                getAllVocalByUser()
            } else {
                toast.error(res.EM)
            }
        }
    }

    useEffect(() => {
        getAllVocalByUser()
    }, [])

    const getAllVocalByUser = async () => {
        let res:any = await fechAllVocalByUser()
        res && res.EC === 0 && setVocalByUserList(res.DT)
    }

    const vocalId = vocalByUserList.reduce((accumulator:any, currentValue:any) => {
        if (currentValue.userId === user.account.groupWithRoles?.id) {
            accumulator.push(currentValue.vocalId)
        }
        return accumulator
    }, [])

    return (
        <div className="h-100">
            <div className="card rounded-0">
                <h5 className="card-header text-uppercase">Danh sách từ</h5>
                <div className="card-body">
                    <div className="row input-group mb-3">
                        <div className="col-12 col-sm-4">
                            <label className="my-2 fw-bold text-warning">Level - english</label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                onChange={(e) => setVlaue(+e.target.value)}
                            >
                                {levelVocal[0]?.map((item:any, index:number) => <option value={item.id} key={index}>{item.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="d-none d-sm-block">
                        <table className="table table-hover text-center">
                            <thead>
                                <tr className="table-dark">
                                    <th scope="col">No</th>
                                    <th scope="col">English</th>
                                    <th scope="col">Spelling</th>
                                    <th scope="col">Pronunciation</th>
                                    <th scope="col">Vietnamese</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item: any, index:number) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <th scope="row" onClick={() => checkClickVocalbulary(index)}>
                                            <Link href="/vocalbulary/Detail">{item.en}</Link>
                                        </th>
                                        <td>{item.spelling}</td>
                                        <td>{item.pronunciation}</td>
                                        <td>{item.vn}</td>
                                        <td>
                                            <button className="btn btn-outline-warning" onClick={() => handleStatus(item)}>
                                                {
                                                    vocalId && vocalId.includes(item.id)
                                                    ? <i className="fas fa-star"></i>
                                                    : <i className="far fa-star"></i>
                                                }
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Reponsive mobile */}
                    <div className="card mb-3 d-block d-sm-none" style={{ maxWidth: '540px' }}>
                        <div className="row g-0">
                            <div className="col-md-8">
                                {data && data.length > 0 &&
                                    data.map((item: any, index: number) => {
                                        return (
                                            <div className="card-body" key={index}>
                                                <p className="card-title text-primary fw-bold">No: {index + 1}</p>
                                                <p className="card-text"><span className="fw-bold">Spelling:</span> {item.en} </p>
                                                <p className="card-text"><span className="fw-bold">English:</span> {item.vn} </p>
                                                <p className="card-text"><span className="fw-bold">Vietnamese:</span> {item.spelling} </p>
                                                <button className="btn btn-outline-warning" onClick={() => handleStatus(item)}>
                                                    {
                                                        vocalId && vocalId.includes(item.id)
                                                        ? <i className="fas fa-star"></i>
                                                        : <i className="far fa-star"></i>
                                                    }
                                                </button>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                                <hr />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    {/* ----->>>>>>>>>>>------- */}
                </div>
            </div>
        </div>
    )
}