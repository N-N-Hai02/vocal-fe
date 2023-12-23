import { UserContext } from "@/context/UserContext"
import { useSession } from "next-auth/react"
import { useContext } from "react"
import ReactPaginate from "react-paginate"


const VocalbularyFavorite = () => {
    const { data: session }: any = useSession()
    const { user } = useContext(UserContext)

    const handlePageClick = () => { }

    return (
        <div className="h-100">
            {
                ((user.isAuthenticated || session?.user !== undefined))
                    ?
                    <div className="card rounded-0">
                        <h5 className="card-header text-uppercase alert alert-primary">List Favorite Vocalbulary</h5>
                        <div className="card-body">
                            <div className="d-none d-sm-block">
                                <table className="table table-hover text-center">
                                    <thead>
                                        <tr className="table-primary">
                                            <th scope="col">No</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">English</th>
                                            <th scope="col">Spelling</th>
                                            <th scope="col">Pronunciation</th>
                                            <th scope="col">Vietnamese</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {vocalList && vocalList.length > 0
                                        && 
                                        vocalList.map((item: any, index: number) => (
                                            <tr key={index}>
                                                <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                <td>{item.id}</td>
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
                                        ))} */}
                                    </tbody>
                                </table>
                            </div>

                            {/* Reponsive mobile */}
                            <div className="card mb-3 d-block d-sm-none" style={{ maxWidth: '540px' }}>
                                <div className="row g-0">
                                    <div className="col-md-8">
                                        {/* {vocalList && vocalList.length > 0 &&
                                            vocalList.map((item: any, index: number) => {
                                                return (
                                                    <div className="card-body" key={index}>
                                                        <p className="card-title text-primary fw-bold">No: {(currentPage - 1) * currentLimit + index + 1}</p>
                                                        <p className="card-text" onClick={() => checkClickVocalbulary(index)}><span className="fw-bold me-2">Spelling:</span>
                                                            <Link href="/vocalbulary/Detail">{item.en}</Link>
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
                                        } */}
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
                                    pageCount={5}
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

export default VocalbularyFavorite