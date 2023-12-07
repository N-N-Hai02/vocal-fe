import { updateCurrentLevel } from "@/services/levelServices"
import _ from "lodash"
import { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { toast } from "react-toastify"

interface ModalLevel {
    show:boolean,
    onHide: () => void,
    dataModalLevel: any
}

const ModalLevel = ({show, onHide, dataModalLevel}: ModalLevel) => {
    const defaultLevelData:any = {
        name: "",
        description: "",
    }

    const validInputsDefault = {
        name: true,
        description: true,
    }

    const [levelData, setLevelData] = useState(defaultLevelData)
    const [validInputs, setValidInputs] = useState(validInputsDefault)

    useEffect(() => {
        setLevelData({ ...dataModalLevel })
    }, [dataModalLevel])

    const handleOnchangeInput = (value:any, name:string) => {
        let _rolerData = _.cloneDeep(levelData)
        _rolerData[name] = value
        setLevelData(_rolerData)
    }

    const checkValidInputs = () => {
        setValidInputs(validInputsDefault)
        let arr = ['name', 'description']
        let check = true
        for (let i = 0; i < arr.length; i++) {
            if (!levelData[arr[i]]) {
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

    const handleConfirmLevel = async () => {
        let check = checkValidInputs()
        if (check === true) {
            let res:any = await updateCurrentLevel({ ...levelData })
            if (res && res.EC === 0) {
                onHide()
                setLevelData({ ...defaultLevelData })
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

    const handleCloseModalLevel = () => {
        onHide()
        setLevelData(defaultLevelData)
        setValidInputs(validInputsDefault)
    }
    return (
        <>
            <Modal
                size="lg"
                show={show}
                className='modal-role'
                onHide={() => handleCloseModalLevel()}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>EDIT LEVEL</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-body'>
                        <div className='row'>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>NAME (<span className='text-danger'>*</span>):</label>
                                <input
                                    type='text'
                                    className={validInputs.name ? 'form-control' : 'form-control is-invalid'}
                                    value={levelData.name}
                                    onChange={(event) => handleOnchangeInput(event.target.value, "name")}
                                />
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>DESCRIPTION (<span className='text-danger'>*</span>):</label>
                                <input
                                    type='text'
                                    className={validInputs.description ? 'form-control' : 'form-control is-invalid'}
                                    value={levelData.description}
                                    onChange={(event) => handleOnchangeInput(event.target.value, "description")}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModalLevel()}>
                        Close
                    </Button>
                    <Button variant='warning' onClick={() => handleConfirmLevel()}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalLevel