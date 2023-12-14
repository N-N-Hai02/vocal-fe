import { levelVocal } from "@/contants/level"
import _ from "lodash"
import { Button, Modal } from "react-bootstrap"

interface ModalVocalAdd {
    isShowModalAdd: boolean
    onHide: () => void
    handleConfirmAdd: () => void
    handleOnChangeInput: (value:string, name:string) => void
    validInputs: any
    vocalDataNew: any
}

const ModalVocalAdd = ({ isShowModalAdd, onHide, handleConfirmAdd, handleOnChangeInput, validInputs, vocalDataNew }: ModalVocalAdd) => {
    return (
        <Modal
            size="lg"
            show={isShowModalAdd}
            className='modal-user'
            onHide={() => onHide()}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>ADD VOCAL</Modal.Title>
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
                                value={vocalDataNew.en}
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
                                value={vocalDataNew.vn}
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
                                value={vocalDataNew.spelling}
                                onChange={(event) => handleOnChangeInput(event.target.value, "spelling")}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group my-2">
                            <label htmlFor="spelling">Pronunciation (<span className="text-danger">*</span>) </label>
                            <input
                                className={validInputs.pronunciation ? 'form-control' : 'form-control is-invalid'}
                                type="text"
                                id="pronunciation"
                                name="pronunciation"
                                value={vocalDataNew.pronunciation}
                                onChange={(event) => handleOnChangeInput(event.target.value, "pronunciation")}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group my-2">
                            <label htmlFor="example_en">Example_English (<span className="text-danger">*</span>) </label>
                            <input
                                className={validInputs.example_en ? 'form-control' : 'form-control is-invalid'}
                                type="text"
                                id="example_en"
                                name="example_en"
                                value={vocalDataNew.example_en}
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
                                value={vocalDataNew.example_vn}
                                onChange={(event) => handleOnChangeInput(event.target.value, "example_vn")}
                            />
                        </div>
                        <div className="col-12 form-group my-2">
                            <label htmlFor="levelId">Level (<span className="text-danger">*</span>) </label>
                            <select
                                className="form-select"
                                value={vocalDataNew.levelId}
                                onChange={(event) => handleOnChangeInput(event.target.value, "levelId")}
                            >
                                {levelVocal[0]?.map((item: any, index: number) => <option value={item.id} key={index}>{item.name}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={() => onHide()}>
                    Close
                    <i className="ms-2 fa fa-lock"></i>
                </Button>
                <Button variant='primary' onClick={() => handleConfirmAdd()}>
                    Add <i className="fa fa-plus"></i>
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalVocalAdd