import { useState, forwardRef, useEffect, useImperativeHandle, useContext } from "react"
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";
import ModalLevel from "./ModalLevel";
import { deleteLevel, fechAllLevel } from "@/services/levelServices";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserContext } from "@/context/UserContext";

const TableLevel = forwardRef((props, ref) => {
    const { data: session }: any = useSession()
    const { user }: any = useContext(UserContext)

    const [isShow, setIsShow] = useState(false)
    const [dataModalLevel, setDataModalLevel] = useState({})
    const [listLevel, setListLevel] = useState([])

    const getAllLevel = async () => {
        let res:any = await fechAllLevel()
        res && res.EC === 0 && setListLevel(res.DT)
    }

    useEffect(() => {
        (user.isAuthenticated || (session?.user !== undefined)) && getAllLevel()
    }, [])

    useImperativeHandle(ref, () => ({
        fetchChildTableLevel() {
           (user.isAuthenticated || (session?.user !== undefined)) && getAllLevel()
        }
    }));

    const handleEditLevel = (level: any) => {
        setDataModalLevel(level)
        setIsShow(true)
    }
    const hanldeDeleteLevel = async (level: any) => {
        if (level && confirm(`Delete this level: ${level.name}`) == true) {
            let res: any = await deleteLevel(level)
            if (res && +res.EC === 0) {
                toast.success(res.EM)
                getAllLevel()
            } else {
                toast.error(res.EM)
            }
        }
    }
    const handlePageClick = () => {
        // TODO
    }

    const handleCloseModal = () => {
        setIsShow(false)
        getAllLevel()
    }

    return (
        <>
            <div className="table-content">
                <div className="d-none d-sm-block">
                    <table className="table table-hover table-bordered mt-3">
                        <thead className="table-primary">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col" className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listLevel && listLevel.length > 0
                                ? listLevel?.map((levelList: any, index: number) =>
                                    <tr key={`row-${index}`}>
                                        <th>{levelList.id}</th>
                                        <td>{levelList.name}</td>
                                        <td>{levelList.description}</td>
                                        <td className="text-center w-25">
                                            <button
                                                className="btn btn-outline-warning me-2"
                                                type="submit"
                                                onClick={() => handleEditLevel(levelList)}
                                            >
                                                <i className="fa fa-pen me-2" />
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-outline-danger"
                                                type="submit"
                                                onClick={() => hanldeDeleteLevel(levelList)}
                                            >
                                                <i className="fa fa-trash me-2" />
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                                : <tr>
                                    <td colSpan={4}>Not found roles</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>

                {/* Reponsive mobile */}
                <div className="card mb-3 d-block d-sm-none" style={{ maxWidth: '540px' }}>
                    <div className="row g-0">
                        <div className="col-md-8">
                            {listLevel && listLevel.length > 0 &&
                                listLevel.map((item: any, index: number) => {
                                    return (
                                        <div className="card-body" key={index}>
                                            <p className="card-title text-primary fw-bold">No: {index + 1}</p>
                                            <p className="card-text"><span className="fw-bold">Id:</span> {item.id} </p>
                                            <p className="card-text"><span className="fw-bold">Name:</span> {item.name} </p>
                                            <p className="card-text"><span className="fw-bold">Description:</span> {item.description} </p>
                                            <div className="action">
                                                <p className="card-text fw-bold">Action: </p>
                                                <Link href="" className="btn btn-warning d-block d-sm-inline" onClick={() => handleEditLevel(item)}>Edit</Link>
                                                <Link href="" className="btn btn-danger mx-0 my-2 mx-sm-2 d-block d-sm-inline" onClick={() => hanldeDeleteLevel(item)}>Delete</Link>
                                            </div>
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
                <hr />
                <div className="role-paginate alert alert-primary">
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={4}
                        pageCount={2}
                        previousLabel="< previous"
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

            <ModalLevel
                show={isShow} 
                onHide={handleCloseModal}
                dataModalLevel={dataModalLevel}
            />
        </>
    )
})

TableLevel.displayName = 'TableLevel'

export default TableLevel