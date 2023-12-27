"use client"
import { useCallback, useContext, useEffect, useState } from "react"
import Link from 'next/link'
import { DataContexts } from '@/context/dataContext'
import { levelVocal } from '@/contants/level'
import { UserContext } from "@/context/UserContext"
import { fechAllVocalWithPaginate, fechAllVocalByUser, vocalAssignToUser, deleteVocalAssignToUser } from "@/services/vocalService"
import ReactPaginate from "react-paginate"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

export default function VocabularyList() {
    const { data: session }: any = useSession()
    const { levelEnglish, setLevelEnglish, checkClickVocalbulary, setDataVocalPagination } = useContext(DataContexts)
    const { user }: any = useContext(UserContext)

    const [vocalByUserList, setVocalByUserList] = useState([])
    const [vocalList, setVocalList] = useState<[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(3)
    const [totalPages, setTotalPages] = useState(0)

    const getVocals = useCallback(async () => {
        let response: any = await fechAllVocalWithPaginate(currentPage, currentLimit, +levelEnglish)
        if (response && response.EC === 0) {
            setTotalPages(Math.ceil(response.DT.totalPages))
            setVocalList(response.DT.vocals)
            setDataVocalPagination(response.DT.vocals)
        }
        setCurrentLimit(5)
    }, [currentPage, currentLimit, levelEnglish])

    useEffect(() => {
        (user.isAuthenticated || (session?.user !== undefined)) && getVocals()
    }, [getVocals])

    const handlePageClick = (event: any) => setCurrentPage(+event.selected + 1)

    useEffect(() => setLevelEnglish(1), [])

    const getAllVocalByUser = async () => {
        let res: any = await fechAllVocalByUser()
        res && res.EC === 0 && setVocalByUserList(res.DT)
    }

    useEffect(() => {
        (user.isAuthenticated || (session?.user !== undefined)) && getAllVocalByUser()
    }, [])

    const vocalId = vocalByUserList.reduce((accumulator: any, currentValue: any) => {
        if (currentValue.userId === user.account.id) {
            accumulator.push(currentValue.vocalId)
        }
        return accumulator
    }, [])

    const handleStatus = async (data: any) => {
        if (session?.user === undefined) {

            let checkExitVocalId = vocalId.includes(data.id)

            let resultData = {
                userId: user.account.id,
                vocalId: data.id
            }

            if (checkExitVocalId) {
                if (confirm(`Un Assign To User: ${data.en} to ${user.account.username}`) == true) {
                    let res: any = await deleteVocalAssignToUser(resultData)
                    if (res && res.EC === 0) {
                        toast.success(res.EM)
                        getAllVocalByUser()
                    } else {
                        toast.error(res.EM)
                    }
                }
            } else {
                if (data && confirm(`Assign: ${data.en} to ${user.account.username}`) == true) {
                    let res: any = await vocalAssignToUser(resultData)
                    if (res && res.EC === 0) {
                        toast.success(res.EM)
                        getAllVocalByUser()
                    } else {
                        toast.error(res.EM)
                    }
                }
            }
        } else {
            alert("TODO...")
        }
    }

    if (user.isLoading) return <></>
    
    return (
        <div className="h-100">
            {
                ((user.isAuthenticated && user.account.groupWithRoles !== undefined) || (session !== null && session?.user !== undefined))
                    ?
                    <div className="card rounded-0">
                        <h5 className="card-header text-uppercase alert alert-primary">Danh sách từ</h5>
                        <div className="card-body">
                            <div className="row input-group mb-3">
                                <div className="mx-3 col-12 col-sm-4 alert alert-primary">
                                    <label className="my-2 fw-bold text-warning">Level - english</label>
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        onChange={(e) => setLevelEnglish(+e.target.value)}
                                    >
                                        {levelVocal[0]?.map((item: any, index: number) => <option key={index} value={item.id}>{item.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="d-none d-sm-block">
                                <table className="table table-hover text-center">
                                    <thead>
                                        <tr className="table-primary">
                                            <th scope="col">No</th>
                                            <th scope="col">ID</th>
                                            <th scope="col">English</th>
                                            <th scope="col">Spelling</th>
                                            <th scope="col">Pronunciation</th>
                                            <th scope="col">Vietnamese</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vocalList && vocalList.length > 0
                                        && 
                                        vocalList.map((item: any, index: number) => (
                                            <tr key={index}>
                                                <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                <td>{item.id}</td>
                                                <th scope="row" onClick={() => checkClickVocalbulary(index)}>
                                                    <Link href="/user/Detail-Vocal">{item.en}</Link>
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
                                        {vocalList && vocalList.length > 0 &&
                                            vocalList.map((item: any, index: number) => {
                                                return (
                                                    <div className="card-body" key={index}>
                                                        <p className="card-title text-primary fw-bold">No: {(currentPage - 1) * currentLimit + index + 1}</p>
                                                        <p className="card-text" onClick={() => checkClickVocalbulary(index)}><span className="fw-bold me-2">Spelling:</span>
                                                            <Link href="/user/Detail-Vocal">{item.en}</Link>
                                                        </p>
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

                            <div className="alert alert-primary">
                                <ReactPaginate
                                    nextLabel={<i className="ms-2 fa fa-forward"></i>}
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={1}
                                    marginPagesDisplayed={0}
                                    pageCount={totalPages}
                                    previousLabel={<i className="fa fa-backward"></i>}
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    renderOnZeroPageCount={null}
                                />
                            </div>
                        </div>
                    </div>
                    : <div className="alert alert-primary text-center">No Data...!</div>
            }
        </div>
    )
}