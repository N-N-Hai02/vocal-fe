import { Button, Modal } from "react-bootstrap"

interface ModalDelete {
    show: boolean,
    dataModal: object,
    handleClose: () => void,
    comfirmDeleteUser: () => void
}

const ModalDelete = ({ show, dataModal,handleClose,comfirmDeleteUser }: ModalDelete) => {
    return (
        <>
           <Modal
                show={show}
                onHide={() => handleClose()}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, are you sure to delete this user: <b>{'dataModal.email'}</b> ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => comfirmDeleteUser()}>
                        Confirm Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDelete