import { updateCurrentRole } from "@/services/roleService"
import _ from "lodash"
import { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { toast } from "react-toastify"

interface ModalRole {
    show:boolean,
    onHide: () => void,
    dataModalRole: any
}

const ModalRole = ({show, onHide, dataModalRole}: ModalRole) => {
    const defaultRoleData:any = {
        url: "",
        description: "",
    }

    const validInputsDefault = {
        url: true,
        description: true,
    }

    const [roleData, setRoleData] = useState(defaultRoleData)
    const [validInputs, setValidInputs] = useState(validInputsDefault)

    useEffect(() => {
        setRoleData({ ...dataModalRole })
    }, [dataModalRole])

    const handleOnchangeInput = (value:any, name:string) => {
        let _rolerData = _.cloneDeep(roleData)
        _rolerData[name] = value
        setRoleData(_rolerData)
    }

    const checkValidInputs = () => {
        setValidInputs(validInputsDefault)
        let arr = ['url', 'description']
        let check = true
        for (let i = 0; i < arr.length; i++) {
            if (!roleData[arr[i]]) {
                let _ValidInputs:any = _.cloneDeep(validInputsDefault)
                _ValidInputs[arr[i]] = false
                setValidInputs(_ValidInputs)
                toast.error(`Empty input ${arr[i]}`)
                check = false
                break
            }
        }
        return check
    }

    const handleConfirmRole = async () => {
        // create user
        let check = checkValidInputs()
        if (check === true) {
            let res:any = await updateCurrentRole({ ...roleData })
            if (res && res.EC === 0) {
                onHide()
                setRoleData({ ...defaultRoleData })
                toast.success(res.EM)
            }
            if (res && res.EC !== 0) {
                toast.error(res.EM)
                let _ValidInputs: any = _.cloneDeep(validInputsDefault)
                _ValidInputs[res.DT] = false;
                setValidInputs(_ValidInputs)
            }
        }
    }

    const handleCloseModalRole = () => {
        onHide()
        setRoleData(defaultRoleData)
        setValidInputs(validInputsDefault)
    }
    return (
        <>
            <Modal
                size="lg"
                show={show}
                className='modal-role'
                onHide={() => handleCloseModalRole()}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>EDIT ROLE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-body'>
                        <div className='row'>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>URL (<span className='text-danger'>*</span>):</label>
                                <input
                                    type='text'
                                    className={validInputs.url ? 'form-control' : 'form-control is-invalid'}
                                    value={roleData.url}
                                    onChange={(event) => handleOnchangeInput(event.target.value, "url")}
                                />
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>DESCRIPTION (<span className='text-danger'>*</span>):</label>
                                <input
                                    type='text'
                                    className={validInputs.description ? 'form-control' : 'form-control is-invalid'}
                                    value={roleData.description}
                                    onChange={(event) => handleOnchangeInput(event.target.value, "description")}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModalRole()}>
                        Close
                    </Button>
                    <Button variant='warning' onClick={() => handleConfirmRole()}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalRole