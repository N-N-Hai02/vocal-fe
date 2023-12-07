import { levelVocal } from "@/contants/level"
import { updateCurrentVocal } from "@/services/vocalService"
import _ from "lodash"
import { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { toast } from "react-toastify"

interface ModalVocal {
    isShowModalEdit: boolean
    onHide: () => void
    dataModalVocal: any
}

const ModalVocal = ({ isShowModalEdit, onHide, dataModalVocal }: ModalVocal) => {
    const defaultVocalData: any = {
        en: "",
        vn: "",
        spelling: "",
        example_en: "",
        example_vn: "",
        levelId: ""
    }
    const validInputsDefault = {
        en: true,
        vn: true,
        spelling: true,
        example_en: true,
        example_vn: true,
        levelId: true
    }
    const [vocalData, setVocalData] = useState(defaultVocalData)
    const [validInputs, setValidInputs] = useState(validInputsDefault)

    useEffect(() => {
        setVocalData({ ...dataModalVocal, levelId: dataModalVocal.levelId ? dataModalVocal.levelId : '' })
    }, [dataModalVocal])

    const handleOnChangeInput = (value: string, name: string) => {
        const _vocalData: any = _.cloneDeep(vocalData)
        _vocalData[name] = value
        setVocalData(_vocalData)
    }
    const checkValidInputs = () => {
        setValidInputs(validInputsDefault)
        let arr: string[] = ['en', 'vn', 'spelling', 'example_en', 'example_vn']
        let arrChanges:any = {
            en: 'English', 
            vn: 'Vietnamese', 
            spelling: 'Spelling', 
            example_en: 'Example_English',
            example_vn: 'Example_Vietnamese'
        }
        let check = true
        for (let i = 0; i < arr.length; i++) {
            if (!vocalData[arr[i]]) {
                let _ValidInputs: any = _.cloneDeep(validInputsDefault)
                _ValidInputs[arr[i]] = false;
                setValidInputs(_ValidInputs)
                toast.error(`Empty input ${arrChanges[arr[i]]}`)
                check = false
                break;
            }
        }
        return check
    }

    const handleConfirmEdit = async () => {
        let check = checkValidInputs()
        if (check === true) {
            let res: any = await updateCurrentVocal({ ...vocalData, levelId: vocalData['levelId'] })
            if (res && res.EC === 0) {
                onHide()
                setVocalData({ ...defaultVocalData })
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

    return (
        <Modal
        size="lg"
        show={isShowModalEdit}
        className='modal-user'
        onHide={() => onHide()}
        backdrop="static"
    >
        <Modal.Header closeButton>
            <Modal.Title>EDIT VOCAL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='modal-body'>
                <div className="row mb-5">
                    <div className="col-12 col-sm-6 form-group my-2">
                        <label htmlFor="en">English (<span className="text-danger">*</span>) </label>
                        <input
                            className={validInputs.en ? 'form-control' : 'form-control is-invalid'}
                            type="text"
                            id="en"
                            name="en"
                            value={vocalData.en}
                            onChange={(event) => handleOnChangeInput(event.target.value, "en")}
                        />
                    </div>
                    <div className="col-12 col-sm-6 form-group my-2">
                        <label htmlFor="vn">Vietnamese (<span className="text-danger">*</span>) </label>
                        <input
                            className={validInputs.vn ? 'form-control' : 'form-control is-invalid'}
                            type="text"
                            id="vn"
                            name="vn"
                            value={vocalData.vn}
                            onChange={(event) => handleOnChangeInput(event.target.value, "vn")}
                        />
                    </div>
                    <div className="col-12 col-sm-6 form-group my-2">
                        <label htmlFor="spelling">Spelling (<span className="text-danger">*</span>) </label>
                        <input
                            className={validInputs.spelling ? 'form-control' : 'form-control is-invalid'}
                            type="text"
                            id="spelling"
                            name="spelling"
                            value={vocalData.spelling}
                            onChange={(event) => handleOnChangeInput(event.target.value, "spelling")}
                        />
                    </div>
                    <div className="col-12 col-sm-6 form-group my-2">
                        <label htmlFor="example_en">Example_English (<span className="text-danger">*</span>) </label>
                        <input
                            className={validInputs.example_en ? 'form-control' : 'form-control is-invalid'}
                            type="text"
                            id="example_en"
                            name="example_en"
                            value={vocalData.example_en}
                            onChange={(event) => handleOnChangeInput(event.target.value, "example_en")}
                        />
                    </div>
                    <div className="col-12 col-sm-6 form-group my-2">
                        <label htmlFor="example_vn">Example_Vietnamese (<span className="text-danger">*</span>) </label>
                        <input
                            className={validInputs.example_vn ? 'form-control' : 'form-control is-invalid'}
                            type="text"
                            id="example_vn"
                            name="example_vn"
                            value={vocalData.example_vn}
                            onChange={(event) => handleOnChangeInput(event.target.value, "example_vn")}
                        />
                    </div>
                    <div className="col-12 col-sm-6 form-group my-2">
                        <label htmlFor="langueId">Level (<span className="text-danger">*</span>) </label>
                        <select
                            className="form-select"
                            value={vocalData.levelId}
                            onChange={(event) => handleOnChangeInput(event.target.value, "levelId")}
                        >
                            {levelVocal[0]?.map((item:any, index:number) => <option value={item.id} key={index}>{item.name}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => onHide()}>
                Close
            </Button>
            <Button variant='warning' onClick={() => handleConfirmEdit()}>
                Update
            </Button>
        </Modal.Footer>
    </Modal>
    )
}

export default ModalVocal