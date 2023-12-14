import ReactPaginate from "react-paginate";
import Link from 'next/link';
interface AppPaginate {
    totalPages: number,
    handlePageClick: any,
    pathName:string
}

const AppPaginate = ({totalPages, handlePageClick, pathName}: AppPaginate) => {
    return (
        <div className="app-pagination">
            {pathName && pathName !== '#' && <Link href={pathName} className="btn btn-primary float-start me-2"><i className="fa fa-backward me-2"></i>Go back</Link>}
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
    )
}

export default AppPaginate