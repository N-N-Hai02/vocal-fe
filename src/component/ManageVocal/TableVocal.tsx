import Link from "next/link"

interface TableVocal {
    vocalList: []
    handleEditVocal: (value: any) => void
    handleDeleteVocal: (value: any) => void
}

const TableVocal = ({ vocalList, handleEditVocal, handleDeleteVocal }: TableVocal) => {
    return (
        <>
            <div className="d-none d-sm-block">
                <table className="table">
                    <thead className="table-primary">
                        <tr className="text-end text-sm-center">
                            <th scope="col">No</th>
                            <th scope="col">English</th>
                            <th scope="col">Spelling</th>
                            <th scope="col">Pronunciation</th>
                            <th scope="col">Vietnamese</th>
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
                                        <td>{item.spelling}</td>
                                        <td>{item.pronunciation}</td>
                                        <td>{item.vn}</td>
                                        <td>
                                            <Link href="" className="btn btn-warning d-block d-sm-inline" onClick={() => handleEditVocal(item)}>Edit</Link>
                                            <Link href="" className="btn btn-danger mx-0 mx-sm-2 d-block d-sm-inline" onClick={() => handleDeleteVocal(item)}>Delete</Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
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
                                        <p className="card-title text-primary fw-bold">No: {index + 1}</p>
                                        <p className="card-text"><span className="fw-bold">English:</span> {item.en} </p>
                                        <p className="card-text"><span className="fw-bold">Spelling:</span> {item.spelling} </p>
                                        <p className="card-text"><span className="fw-bold">Pronunciation:</span> {item.pronunciation} </p>
                                        <p className="card-text"><span className="fw-bold">Vietnamese:</span> {item.vn} </p>
                                        <div className="action">
                                            <p className="card-text fw-bold">Action: </p>
                                            <Link href="" className="btn btn-warning d-block d-sm-inline"
                                                onClick={() => handleEditVocal(item)}>Edit</Link>
                                            <Link href="" className="btn btn-danger mx-0 my-2 mx-sm-2 d-block d-sm-inline"
                                                onClick={() => handleDeleteVocal(item)}>Delete</Link>
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
        </>
    )
}
export default TableVocal