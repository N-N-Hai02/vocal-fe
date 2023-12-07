import Link from "next/link"

interface TableVocal {
    vocalList: []
    handleEditVocal: (value :any) => void
    handleDeleteVocal: (value :any) => void
}

const TableVocal = ({vocalList, handleEditVocal, handleDeleteVocal}: TableVocal) => {
    return (
        <table className="table">
            <thead className="table-dark">
                <tr className="text-end text-sm-center">
                    <th scope="col">No</th>
                    <th scope="col">English</th>
                    <th scope="col">Vietnamese</th>
                    <th scope="col">spelling</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody className="text-center">
                {vocalList && vocalList.length > 0 &&
                    vocalList.map((item: any, index: number) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.en}</td>
                                <td>{item.vn}</td>
                                <td>{item.spelling}</td>
                                <td>
                                    <Link href="" className="btn btn-warning d-block d-sm-inline" onClick={() => handleEditVocal(item)}>Edit</Link>
                                    <Link href="" className="btn btn-danger mx-0 mx-sm-2 d-block d-sm-inline" onClick={() => handleDeleteVocal(item)}>Delete</Link>
                                    <Link href="" className="btn btn-info d-block d-sm-inline">View</Link>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
export default TableVocal