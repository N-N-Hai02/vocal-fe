import { Button, Modal } from "react-bootstrap"
import Table from 'react-bootstrap/Table'

interface ModalImportExcel {
    show: boolean,
    onHide: () => void,
    onSave: () => void,
    HandleClearDataExcel: () => void,
    dataPrivew: any
}

const ModalImportExcel = (props: ModalImportExcel) => {
    const datas = props.dataPrivew

    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    REVIEW DATA IMPORT
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {datas && datas.length > 0
                    ?
                    <Table responsive="lg">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>EN</th>
                                <th>VN</th>
                                <th>Spelling</th>
                                <th>Example English</th>
                                <th>Example VietNam</th>
                                <th>LevelID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datas && datas.length > 0
                                && datas.map((data: any, index: number) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{data.en}</td>
                                            <td>{data.vn}</td>
                                            <td>{data.spelling}</td>
                                            <td>{data.example_en}</td>
                                            <td>{data.example_vn}</td>
                                            <td>{data.levelId}</td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </Table>
                    :
                    <div className="alert alert-warning my-2 text-center" role="alert">Not Yet Data..!</div>
                }
            </Modal.Body>
            <Modal.Footer>
                { 
                    datas && datas.length > 0
                    &&
                    <>
                        <Button variant="primary" onClick={props.onSave}>Save</Button>
                        <Button variant="warning" onClick={() => props.HandleClearDataExcel()}>Clear</Button>
                    </>
                }
                
                <Button variant="outline-secondary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalImportExcel