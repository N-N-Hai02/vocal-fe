"use client"
import { useContext, useState, useEffect } from 'react'
import { DataContexts } from '@/context/dataContext'
import { levelVocal } from '@/contants/level'
import * as XLSX from 'xlsx';
import { UserContext } from '@/context/UserContext'
import { useSession } from "next-auth/react"
import _ from 'lodash'

export default function VocalbularyTest() {
    const { data: session }: any = useSession()
    const { data, setLevelEnglish } = useContext(DataContexts)
    const { user }: any = useContext(UserContext)

    useEffect(() => setLevelEnglish(1), [])

    const [language, setLanguage] = useState("en")
    const handleChangeLanguage = (value: string) => setLanguage(value)
    const [count, setCount] = useState(1)
    const [saveTheCheckList, setSaveTheCheckList] = useState<any>([])
    const [showViewTest, setShowViewTest] = useState<boolean>(false)
    const [rawData, setRawData] = useState([])

    useEffect(() => {
        setRawData([...data])
    }, [data])

    const orderSortData = rawData.sort((a: any, b: any) => a.id - b.id)
    const getFirstElement: any = orderSortData.shift()
    const getRand_5: any = _.shuffle(orderSortData).slice(0, 5)
    const groupIntoArray_6 = [...getRand_5, getFirstElement]
    const getRand_6 = _.shuffle(groupIntoArray_6).slice(0, 6)

    const handleClickedValue = (value: number) => {
        setCount(count + 1)
        if (getFirstElement && getRand_6) {
            let compareValue = language === 'en' ? getFirstElement.en.includes(value) : getFirstElement.vn.includes(value)
            let resultCompareValue = {
                ...getFirstElement,
                compareValue,
                clickedValue: value
            }
            setSaveTheCheckList([...saveTheCheckList, resultCompareValue])
        }
    }
    const handleViewTest = () => (saveTheCheckList && saveTheCheckList.length > 0 && setShowViewTest(true))

    const handleNext = () => {
        setCount(1)
        setSaveTheCheckList([])
        setShowViewTest(false)
        setRawData([...data])
    }

    const downloadExcel = (dataExports: any) => {
        let newDataPrints = dataExports.map((dataExport: any) => {
            return {
                Question: language === 'en' ? dataExport.vn : dataExport.en,
                Answered: dataExport.clickedValue,
                Resulted: dataExport.compareValue === true ? "Đúng" : "Sai",
                TheResultIsCorrect: language === 'en' ? dataExport.en : dataExport.vn
            }
        })
        if (saveTheCheckList && showViewTest) {
            const worksheet = XLSX.utils.json_to_sheet(newDataPrints);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "practiceTest.xlsx");
        }
    }
    
    const handleGetTotalTrueOrFalse = (value:boolean) => {
        let checkTotal = saveTheCheckList.filter((item:any) => item.compareValue === value)
        return checkTotal.length
    }

    const totalCheckTrue = handleGetTotalTrueOrFalse(true)
    const totalCheckFalse = handleGetTotalTrueOrFalse(false)

    return (
        <div className="h-100">
            {
                ((user.isAuthenticated && levelVocal[0] && levelVocal[0].length > 0 && orderSortData && orderSortData.length > 1) || (session !== null && session?.user !== undefined))
                    ?
                    <div className="card rounded-0 m-4" style={{ marginTop: "4.5rem!important" }}>
                        <h5 className="card-header text-uppercase alert alert-primary">Example Test</h5>
                        <div className="card-body">
                            <div className="row input-group mb-3 mx-1 mx-lg-3">
                                <div className='col-12 col-lg-8 d-lg-flex justify-content-around alert alert-primary'>
                                    <div className="col-12 col-lg-4">
                                        <label className="my-2 fw-bold text-warning">Level - english</label>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            onChange={(e) => setLevelEnglish(+e.target.value)}
                                            disabled={showViewTest && saveTheCheckList && saveTheCheckList.length > 0 && true}
                                        >
                                            {levelVocal[0]?.map((item: any, index: number) => <option value={item.id} key={index}>{item.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-12 col-lg-4">
                                        <label className="my-2 fw-bold text-warning">Language</label>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            onChange={(event) => handleChangeLanguage(event.target.value)}
                                        >
                                            <option value="en">English</option>
                                            <option value="vn">Vietnamese</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row input-group mx-1">
                                    {
                                        saveTheCheckList && showViewTest && showViewTest === true
                                            ? 
                                            <div className='col-12 col-lg-6 alert alert-primary d-lg-flex justify-content-around text-warning fw-bold'>
                                                <h4 className='text-success m-0'>Hoàn Thành:</h4>
                                                <p className='m-0 px-lg-2 pt-1'>Tổng câu đúng: <span className='text-secondary'>{totalCheckTrue}</span></p>
                                                <p className='m-0 px-lg-2 pt-1'>Tổng câu sai: <span className='text-secondary'>{totalCheckFalse}</span></p>
                                            </div>
                                            : <h4>{count} - {(language === 'en') ? getFirstElement?.vn : getFirstElement?.en}</h4>
                                    }
                                </div>
                                {
                                    showViewTest && showViewTest === true
                                        ? <div>
                                            <div className='text-center d-none d-sm-block'>
                                                <table className="table table-bordered border-primary">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">No</th>
                                                            <th scope="col">Question</th>
                                                            <th scope="col">Answered</th>
                                                            <th scope="col">Resulted</th>
                                                            <th scope="col">The result is correct</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            saveTheCheckList && saveTheCheckList.length > 0
                                                            &&
                                                            saveTheCheckList.map((item: any, index: number) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <th scope="row">{index + 1}</th>
                                                                        <td>{language === 'en' ? item.vn : item.en}</td>
                                                                        <td>{item.clickedValue}</td>
                                                                        <td>
                                                                            {
                                                                                item.compareValue && item.compareValue === true
                                                                                    ? <i className="fa fa-check text-success" aria-hidden="true"></i>
                                                                                    : <i className="fa fa-times text-danger" aria-hidden="true"></i>
                                                                            }
                                                                        </td>
                                                                        <td>{language === 'en' ? item.en : item.vn}</td>
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
                                                        {saveTheCheckList && saveTheCheckList.length > 0 &&
                                                            saveTheCheckList.map((item: any, index: number) => {
                                                                return (
                                                                    <div className="card-body" key={index}>
                                                                        <p className="card-title text-primary fw-bold">No: {index + 1}</p>
                                                                        <p className="card-text"><span className="fw-bold">Question:</span>
                                                                            {language === 'en' ? item.vn : item.en}
                                                                        </p>
                                                                        <p className="card-text"><span className="fw-bold">Answered:</span>{item.clickedValue}</p>
                                                                        <p className="card-text"><span className="fw-bold me-2">Resulted:</span>
                                                                            {
                                                                                item.compareValue && item.compareValue === true
                                                                                    ? <i className="fa fa-check text-success" aria-hidden="true"></i>
                                                                                    : <i className="fa fa-times text-danger" aria-hidden="true"></i>
                                                                            }
                                                                        </p>
                                                                        <p className="card-text"><span className="fw-bold">The result is correct:</span>
                                                                            {language === 'en' ? item.en : item.vn}
                                                                        </p>
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
                                        : <div className="row row-cols-3 gy-2">
                                            {
                                                getRand_6 && getRand_6.length < 6
                                                    ? <button onClick={() => handleViewTest()}>Diểm số bài test</button>
                                                    : getRand_6.map((item: any, index: number) => {
                                                        return (
                                                            <div className="col-lg-4 col-sm-6 col-md-6 col-12" key={index}>
                                                                <button
                                                                    className="w-100 btn btn-outline-primary"
                                                                    onClick={() => handleClickedValue((language === 'en') ? item?.en : item?.vn)}
                                                                >
                                                                    {(language === 'en') ? item?.en : item?.vn}
                                                                </button>
                                                            </div>
                                                        )
                                                    })
                                            }
                                        </div>
                                }
                            </div>
                            <hr />
                            {
                                showViewTest && saveTheCheckList.length > 0
                                &&
                                <div className='alert alert-primary'>
                                    <div className='row'>
                                        <button
                                            className='col-12 col-lg-2 fw-bold btn btn-primary text-warning me-2 mb-2 mb-lg-0'
                                            onClick={() => handleNext()}
                                        >
                                            Next 
                                            <i className="ms-2 fa fa-forward"></i>
                                        </button>
                                        <button className='col-12 col-lg-6 fw-bold btn btn-outline-warning' onClick={() => downloadExcel(saveTheCheckList)}>
                                            Export Result As Excel
                                            <i className="ms-2 fa fa-file-export"></i>
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    : <div className="alert alert-primary text-center">No Data...!</div>
            }
        </div>
    )
}

