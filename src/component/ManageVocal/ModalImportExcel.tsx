import { Button, Modal } from "react-bootstrap"
import Table from 'react-bootstrap/Table'

interface ModalImportExcel {
    show: boolean,
    onHide: () => void,
    onSave: () => void,
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
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    PRIVEW DATA IMPORT
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table responsive="lg">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>EN</th>
                            <th>VN</th>
                            <th>Seplling</th>
                            <th>Example English</th>
                            <th>Example VietNam</th>
                            <th>LevelID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas && datas.length > 0
                        && datas.map((data:any, index:number) => {
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={props.onSave}>save</Button>
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalImportExcel