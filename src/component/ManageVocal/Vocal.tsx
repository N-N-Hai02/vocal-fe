"use client"
import Link from "next/link"
import AppPaginate from "@/component/app.paginate"
import { useEffect, useState } from "react"
import _ from 'lodash'
import { toast } from "react-toastify"
import { levelVocal } from '@/contants/level'
import { createNewVocal, deleteVocal, fechAllVocal } from "@/services/vocalService"
import TableVocal from "./TableVocal"
import ModalVocal from "./ModalVocal"
import * as XLSX from 'xlsx'
import './Vocal.scss'
import ModalImportExcel from "./ModalImportExcel"

const Vocal = () => {
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
    const [vocalList, setVocalList] = useState<[]>([])
    const [dataModalVocal, setDataModalVocal] = useState({})

    // -------------import using file excel, csv

    const [excelFile, setExcelFile] = useState(null)
    const [typeError, setTypeError] = useState<string>('')
    const [excelData, setExcelData] = useState(null)
    const [modalShowExcel, setModalShowExcel] = useState(false)

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

    // submit event
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

    // -------------

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

    const handleOnChangeInput = (value: string, name: string) => {
        const _vocalData: any = _.cloneDeep(vocalData)
        _vocalData[name] = value
        setVocalData(_vocalData)
    }
    const checkValidInputs = () => {
        setValidInputs(validInputsDefault)
        let arr: string[] = ['en', 'vn', 'spelling', 'example_en', 'example_vn']
        let arrChanges: any = {
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

    const handleSubmitVocal = async () => {
        if (modalShowExcel === false) {
            let check = checkValidInputs()
            if (check === true) {
                let res: any = await createNewVocal([{ ...vocalData, levelId: vocalData.levelId === "" ? 1 : +vocalData.levelId }])
                if (res && +res.EC === 0) {
                    setVocalData(defaultVocalData)
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
            } else {
                toast.error(res.EM)
            }
        }

    }

    // handle Edit..!
    const [isShowModalEdit, setIsShowModalEdit] = useState(false)

    const handleEditVocal = (vocal: any) => {
        setIsShowModalEdit(true)
        setDataModalVocal(vocal)
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
            <div className="admin-vocal">
                <div className="row">
                    <form className="d-sm-flex col-12 col-sm-6 form-group custom-form custom-file-button" onSubmit={handleFileSubmit}>
                        <label className="input-group-text fw-bold bg-warning" htmlFor="inputGroupFile">Import Excel File</label>
                        <input type="file" id="inputGroupFile" className="form-control me-2" required onChange={handleFile} />
                        <button
                            type="submit"
                            className="my-2 my-sm-0 btn btn-outline-warning btn-md w-100 w-sm-0"
                            onClick={() => setModalShowExcel(true)}
                        >
                            PRIVEW
                        </button>
                    </form>
                    <div className="col-12 py-2">
                        {typeError && <div className="alert alert-danger" role="alert">{typeError}</div>}
                    </div>
                </div>
                <hr />
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
                        <label htmlFor="levelId">Level (<span className="text-danger">*</span>) </label>
                        <select
                            className="form-select"
                            value={vocalData.levelId}
                            onChange={(event) => handleOnChangeInput(event.target.value, "levelId")}
                        >
                            {levelVocal[0]?.map((item: any, index: number) => <option value={item.id} key={index}>{item.name}</option>)}
                        </select>
                    </div>
                    <div className="col-12 col-sm-6 mt-2">
                        <button className="btn btn-primary w-100" onClick={() => handleSubmitVocal()}>
                            Add <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                <hr />
                <div className="vocal-list-table mt-5">
                    <div className="d-none d-sm-block">
                        <TableVocal vocalList={vocalList} handleEditVocal={handleEditVocal} handleDeleteVocal={handleDeleteVocal} />
                        <AppPaginate pathName="#" totalPages={5} handlePageClick={handlePageClick} />
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
                                                <p className="card-text"><span className="fw-bold">Vietnamese:</span> {item.vn} </p>
                                                <p className="card-text"><span className="fw-bold">Spelling:</span> {item.spelling} </p>
                                                <div className="action">
                                                    <p className="card-text fw-bold">Action: </p>
                                                    <Link href="" className="btn btn-warning d-block d-sm-inline"
                                                    onClick={() => handleEditVocal(item)}>Edit</Link>
                                                    <Link href="" className="btn btn-danger mx-0 my-2 mx-sm-2 d-block d-sm-inline"
                                                    onClick={() => handleDeleteVocal(item)}>Delete</Link>
                                                    <Link href="" className="btn btn-info d-block d-sm-inline">View</Link>
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
                </div>
            </div>
            <ModalVocal isShowModalEdit={isShowModalEdit} onHide={handleCloseModalEdit} dataModalVocal={dataModalVocal} />

            <ModalImportExcel
                show={modalShowExcel}
                onHide={() => setModalShowExcel(false)}
                onSave={() => handleSubmitVocal()}
                dataPrivew={excelData}
            />
        </>
    )
}

export default Vocal