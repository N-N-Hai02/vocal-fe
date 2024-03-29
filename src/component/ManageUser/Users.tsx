"use client"
import { useCallback, useContext, useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import ModalDelete from "./ModalDelete"
import ModalUser from "./ModalUser"
import { deleteUser, fetchAllUser } from "@/services/userService"
import { toast } from "react-toastify"
import Link from "next/link"
import { UserContext } from "@/context/UserContext"

const Users = () => {
    const { user }: any = useContext(UserContext)
    const [userLists, setUserList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(3)
    const [totalPages, setTotalPages] = useState(0)

    // modal delete
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataModal, setDataModal] = useState({})

    // modal update/create user
    const [isShowModalUser, setIsShowModalUser] = useState(false)
    const [actionModalUser, setActionModalUser] = useState("CREATE")
    const [dataModalUser, setDataModalUser] = useState({})

    const getUsers = useCallback(async () => {
        let response: any = await fetchAllUser(currentPage, currentLimit)
        if (response && response.EC === 0) {
            setTotalPages(response.DT.totalPages)
            setUserList(response.DT.users)
        }
        setCurrentLimit(2)
    }, [currentPage, currentLimit])

    useEffect(() => {
        getUsers()
    }, [getUsers])

    const handlePageClick = (event: any) => setCurrentPage(+event.selected + 1)

    const hanldeDeleteUser = (user: any) => {
        setDataModal(user)
        setIsShowModalDelete(true)
    }

    const handleClose = () => {
        setIsShowModalDelete(false)
        setDataModal({})
    }
    const comfirmDeleteUser = async () => {
        let response: any = await deleteUser(dataModal)
        if (response && response.EC === 0) {
            toast.success(response.EM)
            await getUsers()
            setIsShowModalDelete(false)
        } else {
            toast.error(response.EM)
            setIsShowModalDelete(false)
        }
    }

    const onHideModalUser = async () => {
        setIsShowModalUser(false)
        setDataModalUser({})
        await getUsers()
    }

    const handleEditUser = (user: any) => {
        setActionModalUser('UPDATE')
        setDataModalUser(user)
        setIsShowModalUser(true)
    }
    return (
        <>
            {user.isAuthenticated 
            && user.account.groupWithRoles.id === 2 
            && user.account.groupWithRoles.name === 'admin' 
            && userLists && userLists.length > 0
                ? <div className="manage-users-container">
                    <div className="user-header mt-2">
                        <span className='title-role fs-6 fw-bold alert alert-primary p-2 my-4'>Users Management</span><hr />
                        <div className="row mx-1">
                            <div className="col-12 col-lg-6 alert alert-primary d-lg-flex justify-content-around m-0">
                                <button
                                    className="col-12 col-lg-6 btn btn-success me-2 mb-2 mb-lg-0"
                                    onClick={() => window.location.reload()}
                                >
                                    <i className="fa fa-refresh me-2" />
                                    Refesh
                                </button>
                                <button
                                    className="col-12 col-lg-6 btn btn-primary"
                                    onClick={() => {
                                        setIsShowModalUser(true);
                                        setActionModalUser('CREATE');
                                    }}
                                >
                                    <i className="fa fa-plus me-2" />
                                    Add new user
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="user-body">
                        <div className="d-none d-sm-block">
                            <table className="table table-hover table-bordered mt-3">
                                <thead className="table-primary">
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Id</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">UserName</th>
                                        <th scope="col">Group Role</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userLists && userLists.length > 0
                                        ? userLists.map((userList: any, index: number) =>
                                            <tr key={`row-${index}`}>
                                                <th>{(currentPage - 1) * currentLimit + index + 1}</th>
                                                <th>{userList.id}</th>
                                                <td>{userList.email}</td>
                                                <td>{userList.phone}</td>
                                                <td>{userList.username}</td>
                                                <td>{userList.Group ? userList.Group.name : null}</td>
                                                {
                                                    !(userList.email === user.account.email)
                                                        ?
                                                        <td className="text-center w-25">
                                                            <button
                                                                className="btn btn-outline-warning me-2"
                                                                type="submit"
                                                                onClick={() => handleEditUser(userList)}
                                                            >
                                                                <i className="fa fa-pen me-2" />
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="btn btn-outline-danger"
                                                                type="submit"
                                                                onClick={() => hanldeDeleteUser(userList)}
                                                            >
                                                                <i className="fa fa-trash me-2" />
                                                                Delete
                                                            </button>
                                                        </td>
                                                        :
                                                        <td><div className="alert alert-primary text-center m-0 p-0">no action</div></td>
                                                }
                                            </tr>
                                        )
                                        : <tr>
                                            <td>Not found users</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>

                        {/* Reponsive mobile */}
                        <div className="card mb-3 d-block d-sm-none mt-4" style={{ maxWidth: '540px' }}>
                            <div className="row g-0">
                                <div className="col-md-8">
                                    {userLists && userLists.length > 0 &&
                                        userLists.map((item: any, index: number) => {
                                            return (
                                                <div className="card-body" key={index}>
                                                    <p className="card-title text-primary fw-bold">No: {index + 1}</p>
                                                    <p className="card-text"><span className="fw-bold">Id:</span> {item.id} </p>
                                                    <p className="card-text"><span className="fw-bold">Email:</span> {item.email} </p>
                                                    <p className="card-text"><span className="fw-bold">Phone:</span> {item.phone} </p>
                                                    <p className="card-text"><span className="fw-bold">UserName:</span> {item.username} </p>
                                                    <p className="card-text"><span className="fw-bold">Group Role:</span> {item.Group ? item.Group.name : null} </p>
                                                    {
                                                        !(item.email === user.account.email)
                                                            ?
                                                            <div className="action">
                                                                <p className="card-text fw-bold">Actions: </p>
                                                                <Link href=""
                                                                    onClick={() => handleEditUser(item)}
                                                                    className="btn btn-warning d-block d-sm-inline"
                                                                >Edit</Link>
                                                                <Link href=""
                                                                    onClick={() => hanldeDeleteUser(item)}
                                                                    className="btn btn-danger mx-0 my-2 mx-sm-2 d-block d-sm-inline"
                                                                >Delete</Link>
                                                            </div>
                                                            : <div className="alert alert-primary text-center m-0 p-0">no action</div>
                                                    }

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
                    <hr />
                    {totalPages > 0 &&
                        <div className="user-footer alert alert-primary">
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
                    }
                </div>
                : <div className="alert alert-primary text-center">No Data...!</div>
            }

            <ModalDelete
                show={isShowModalDelete}
                dataModal={dataModal}
                handleClose={handleClose}
                comfirmDeleteUser={comfirmDeleteUser}
            />

            <ModalUser
                show={isShowModalUser}
                onHide={onHideModalUser}
                action={actionModalUser}
                dataModalUser={dataModalUser}
            />
        </>
    )
}

export default Users