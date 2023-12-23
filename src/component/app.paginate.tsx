import ReactPaginate from "react-paginate";
import Link from 'next/link';
import './app.paginate.scss'
interface AppPaginate {
    totalPages: number,
    handlePageClick: (value: any) => void
}

const AppPaginate = ({totalPages, handlePageClick}: AppPaginate) => {
    return (
        <div className="app-pagination row">
            <div className="col-12 col-sm-6">
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
            <div className="col-12 col-sm-6">
                <Link href="/user/List-Vocal" className="btn btn-outline-primary w-100 mt-2 mt-sm-0">
                    <i className="fa fa-backward me-2"></i>
                    Go back
                </Link>
            </div>
        </div>
    )
}

export default AppPaginate