import { useEffect, useState, forwardRef, useImperativeHandle } from "react"
import { deleteRole, fetchAllRoles } from "@/services/roleService";
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";
import ModalRole from "./ModalRole";
import Link from "next/link";

const TableRole = forwardRef((props, ref) => {
    const [roleLists, setRoleLists] = useState([])
    const [isShow, setIsShow] = useState(false)
    const [dataModalRole, setDataModalRole] = useState({})

    const getAllRoles = async () => {
        let res: any = await fetchAllRoles()
        if (res && +res.EC === 0) {
            setRoleLists(res.DT)
        }
    }

    useEffect(() => {
        getAllRoles()
    }, [])

    useImperativeHandle(ref, () => ({
        fetchChildTableRole() {
            getAllRoles()
        }
    }));

    const handleEditRole = (role: any) => {
        setDataModalRole(role)
        setIsShow(true)
    }
    const hanldeDeleteRole = async (role: any) => {
        if (role && confirm(`Delete this role: ${role.url}`) == true) {
            let res: any = await deleteRole(role)
            if (res && +res.EC === 0) {
                toast.success(res.EM)
                getAllRoles()
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
        getAllRoles()
    }

    return (
        <>
            <div className="table-content">
                <div className="d-none d-sm-block">
                    <table className="table table-hover table-bordered mt-3">
                        <thead>
                            <tr className="text-center table-dark">
                                <th colSpan={7}>ROLES LIST</th>
                            </tr>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">URL</th>
                                <th scope="col">Description</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roleLists && roleLists.length > 0
                                ? roleLists.map((roleList: any, index: number) =>
                                    <tr key={`row-${index}`}>
                                        <th>{roleList.id}</th>
                                        <td>{roleList.url}</td>
                                        <td>{roleList.description}</td>
                                        <td className="text-center w-25">
                                            <button
                                                className="btn btn-outline-warning me-2"
                                                type="submit"
                                                onClick={() => handleEditRole(roleList)}
                                            >
                                                <i className="fa fa-pencil-square-o me-2" />
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-outline-danger"
                                                type="submit"
                                                onClick={() => hanldeDeleteRole(roleList)}
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
                            {roleLists && roleLists.length > 0 &&
                                roleLists.map((item: any, index: number) => {
                                    return (
                                        <div className="card-body" key={index}>
                                            <p className="card-title text-primary fw-bold">No: {index + 1}</p>
                                            <p className="card-text"><span className="fw-bold">Id:</span> {item.id} </p>
                                            <p className="card-text"><span className="fw-bold">URL:</span> {item.url} </p>
                                            <p className="card-text"><span className="fw-bold">Description:</span> {item.description} </p>
                                            <div className="action">
                                                <p className="card-text fw-bold">Action: </p>
                                                <Link href="" className="btn btn-warning d-block d-sm-inline" onClick={() => handleEditRole(item)}>Edit</Link>
                                                <Link href="" className="btn btn-danger mx-0 my-2 mx-sm-2 d-block d-sm-inline" onClick={() => hanldeDeleteRole(item)}>Delete</Link>
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

                <div className="role-paginate">
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

            <ModalRole
                show={isShow} 
                onHide={handleCloseModal}
                dataModalRole={dataModalRole}
            />
        </>
    )
})

TableRole.displayName = 'TableRole'

export default TableRole