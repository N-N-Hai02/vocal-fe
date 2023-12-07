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
            {pathName && pathName !== '#' && <Link href={pathName} className="btn btn-primary float-start me-2">Go back</Link>}
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                marginPagesDisplayed={0}
                pageCount={totalPages}
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
    )
}

export default AppPaginate