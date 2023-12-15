"use client"
import AppPaginate from "@/component/app.paginate"
import { useContext, useEffect, useRef, useState } from "react"
import _ from 'lodash'
import { toast } from "react-toastify"
import { createNewVocal, deleteVocal, fechAllVocal } from "@/services/vocalService"
import TableVocal from "./TableVocal"
import ModalVocalEdit from "./ModalVocalEdit"
import * as XLSX from 'xlsx'
import './Vocal.scss'
import ModalImportExcel from "./ModalImportExcel"
import ModalVocalAdd from "./ModalVocalAdd"
import { UserContext } from "@/context/UserContext"

const Vocal = () => {
    const { user } = useContext(UserContext)
    const defaultVocalDataNew: any = {
        en: "",
        vn: "",
        spelling: "",
        pronunciation: "",
        example_en: "",
        example_vn: "",
        levelId: ""
    }
    const validInputsDefault = {
        en: true,
        vn: true,
        spelling: true,
        pronunciation: true,
        example_en: true,
        example_vn: true,
        levelId: true
    }
    const [vocalDataNew, setVocalDataNew] = useState(defaultVocalDataNew)
    const [validInputs, setValidInputs] = useState(validInputsDefault)
    const [vocalList, setVocalList] = useState<[]>([])
    const [isShowModalAdd, setIsShowModalAdd] = useState(false)
    const [isShowModalEdit, setIsShowModalEdit] = useState(false)
    const [dataModalVocalEdit, setDataModalVocalEdit] = useState({})

    // import using file excel, csv
    const [excelFile, setExcelFile] = useState(null)
    const [typeError, setTypeError] = useState<string>('')
    const [excelData, setExcelData] = useState(null)
    const [modalShowExcel, setModalShowExcel] = useState(false)

    const fileInputRef: any = useRef();

    const handleFile = (e: any) => {
        let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
        let selectedFile = e.target.files[0];

        if (selectedFile) {
            if (selectedFile && fileTypes.includes(selectedFile.type)) {
                setTypeError("");
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e: any) => {
                    setExcelFile(e.target.result);
                }
            }
            else {
                setTypeError('Please select only excel file types');
                setExcelFile(null);
            }
        }
        else {
            console.log('Please select your file');
        }
    }
    const handleFileSubmit = (e: any) => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data: any = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(data.slice(0, 10));
        }
    }
    const handleCloseModalExcel = () => setModalShowExcel(false)
    const HandleClearDataExcel = () => {
        setModalShowExcel(false)
        setExcelFile(null)
        setExcelData(null)
        fileInputRef && (fileInputRef.current.value = null)
    }
    // end import excel

    const handlePageClick = () => { }

    const getAllVocal = async () => {
        let res: any = await fechAllVocal()
        if (res && res.DT) {
            let datas = res.DT
            setVocalList(datas)
        }
    }

    useEffect(() => {
        getAllVocal()
    }, [])

    // -------------------------- handle Add..! ---------------------------------
    const handleOnChangeInput = (value: string, name: string) => {
        const _vocalData: any = _.cloneDeep(vocalDataNew)
        _vocalData[name] = value
        setVocalDataNew(_vocalData)
    }
    const checkValidInputs = () => {
        setValidInputs(validInputsDefault)
        let arr: string[] = ['en', 'vn', 'spelling', 'pronunciation', 'example_en', 'example_vn']
        let arrChanges: any = {
            en: 'English',
            vn: 'Vietnamese',
            spelling: 'Spelling',
            pronunciation: 'Pronunciation',
            example_en: 'Example_English',
            example_vn: 'Example_Vietnamese'
        }
        let check = true
        for (let i = 0; i < arr.length; i++) {
            if (!vocalDataNew[arr[i]]) {
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

    const handleCloseModalAdd = () => {
        setIsShowModalAdd(false)
        setVocalDataNew(defaultVocalDataNew)
        setValidInputs(validInputsDefault)
    }

    const handleConfirmAdd = async () => {
        if (modalShowExcel === false) {
            let check = checkValidInputs()
            if (check === true) {
                let res: any = await createNewVocal([{ ...vocalDataNew, levelId: vocalDataNew.levelId === "" ? 1 : +vocalDataNew.levelId }])
                if (res && +res.EC === 0) {
                    setVocalDataNew(defaultVocalDataNew)
                    setIsShowModalAdd(false)
                    await getAllVocal()
                    toast.success(res.EM)
                }
                if (res && +res.EC !== 0) {
                    let _ValidInputs: any = _.cloneDeep(validInputsDefault)
                    _ValidInputs[res.DT] = false;
                    setValidInputs(_ValidInputs)
                    toast.error(res.EM)
                }                
            }
        } else if (modalShowExcel === true) {
            let res: any = await createNewVocal(excelData)
            if (res && +res.EC === 0) {
                await getAllVocal()
                toast.success(res.EM)
                setModalShowExcel(false)
                setExcelData(null)
                fileInputRef && (fileInputRef.current.value = null)
            } else {
                toast.error(res.EM)
            }
        }
    }

    // -------------------------- handle Edit..! ---------------------------------
    const handleEditVocal = (vocal: any) => {
        setIsShowModalEdit(true)
        setDataModalVocalEdit(vocal)
    }
    const handleDeleteVocal = async (vocal: any) => {
        if (vocal && confirm(`Delete this vocal: ${vocal.en}`) == true) {
            let res: any = await deleteVocal(vocal)
            if (res && +res.EC === 0) {
                toast.success(res.EM)
                getAllVocal()
            } else {
                toast.error(res.EM)
            }
        }
    }
    const handleCloseModalEdit = () => {
        setIsShowModalEdit(false)
        getAllVocal()
    }

    return (
        <>
            {   
                user.isAuthenticated && user.account.groupWithRoles.id === 2 
                && user.account.groupWithRoles.name === 'admin' 
                && vocalList && vocalList.length > 0
                ? 
                <div className="admin-vocal">
                    <span className='title-role fs-6 fw-bold alert alert-primary p-2 my-4'>Users Management</span><hr />
                    <div className="row alert alert-primary mx-1 mb-0">
                        <div className="d-lg-flex">
                            <form className="d-lg-flex col-12 col-lg-6 form-group custom-form custom-file-button" onSubmit={handleFileSubmit}>
                                <label className="input-group-text fw-bold bg-warning" htmlFor="inputGroupFile">Import Excel File</label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    id="inputGroupFile"
                                    name="excelFile"
                                    className="form-control"
                                    required
                                    onChange={handleFile}
                                />
                                <button
                                    type="submit"
                                    className="my-2 mx-lg-2 my-lg-0 btn btn-outline-warning btn-md w-100 w-lg-0 fw-bold"
                                    onClick={() => setModalShowExcel(true)}
                                >
                                    REVIEW
                                    <i className="ms-2 fa fa-eye"></i>
                                </button>
                            </form>
                            <div className="col-lg-3"></div>
                            <div className="col-12 col-lg-3">
                                <button className="btn btn-primary w-100 float-end" onClick={() => setIsShowModalAdd(true)}>
                                    Create New Vocal <i className="fa fa-plus" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>

                        <div className="col-12">
                            {typeError && <div className="alert alert-danger my-2" role="alert">{typeError}</div>}
                        </div>
                    </div>
                    <hr />
                    <div className="vocal-list-table">
                        <TableVocal vocalList={vocalList} handleEditVocal={handleEditVocal} handleDeleteVocal={handleDeleteVocal} />
                        <hr />
                        <div className="alert alert-primary">
                            <AppPaginate totalPages={5} handlePageClick={handlePageClick} />
                        </div>
                    </div>
                </div>
                : <div className="alert alert-primary text-center">No Data...!</div>
            }
            
            <ModalVocalAdd
                isShowModalAdd={isShowModalAdd}
                onHide={handleCloseModalAdd}
                handleConfirmAdd={handleConfirmAdd}
                handleOnChangeInput={handleOnChangeInput}
                validInputs={validInputs}
                vocalDataNew={vocalDataNew}
            />

            <ModalVocalEdit
                isShowModalEdit={isShowModalEdit}
                onHide={handleCloseModalEdit}
                dataModalVocalEdit={dataModalVocalEdit}
            />

            <ModalImportExcel
                show={modalShowExcel}
                onHide={() => handleCloseModalExcel()}
                onSave={() => handleConfirmAdd()}
                HandleClearDataExcel={() => HandleClearDataExcel()}
                dataPrivew={excelData}
            />
        </>
    )
}

export default Vocal