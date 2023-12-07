import { useState, useRef } from 'react'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import TableLevel from './TableLevel'
import { createNewLevel } from '@/services/levelServices'

const Level = () => {
    const dataChildDefault = { name: '', description: '', isValidName: true }
    const [listChild, setListChild] = useState({
        child_1: dataChildDefault
    })

    const childRef: any = useRef();

    const handleOnchangeInput = (name: string, value: string, key: string) => {
        let _listChild: any = _.cloneDeep(listChild)
        _listChild[key][name] = value
        if (value && name === 'name') {
            _listChild[key]['isValidName'] = true
        }
        setListChild(_listChild)
    }

    const handleAddNewLevel = () => {
        let _listChild: any = _.cloneDeep(listChild)
        let id = uuidv4()
        _listChild[`child_${id}`] = dataChildDefault
        setListChild(_listChild)
    }

    const handleRemoveLevel = (key: string) => {
        let _listChild: any = _.cloneDeep(listChild)
        delete _listChild[key]
        setListChild(_listChild)
    }

    const buildDataToPersist = () => {
        let _listChild = _.cloneDeep(listChild)
        let result: any = []
        Object.entries(_listChild).map(([key, child]) => result.push({ name: child.name, description: child.description }))
        return result
    }

    const handleSave = async () => {
        let invalidObj = Object.entries(listChild).find(([key, child]) => {
            return child && !child.name
        })

        if (!invalidObj) {
            // cal APi
            let data = buildDataToPersist()
            let res: any = await createNewLevel(data)
            if (res && +res.EC === 0) {
                toast.success(res.EM)
                childRef.current.fetchChildTableLevel()
            } else {
                toast.error(res.EM)
            }
        } else {
            toast.error("Input NAME must not be empty...!")
            let _listChild: any = _.cloneDeep(listChild)
            const key = invalidObj[0]
            _listChild[key]['isValidName'] = false
            setListChild(_listChild)
        }
    }

    return (
        <div className='role-container'>
            <div className='title-role'><h4>Add a new Level...</h4></div>
            <div className='role-parent'>
                {
                    Object.entries(listChild).map(([key, child], index) => {
                        return (
                            <div className={`row role-child ${key}`} key={`child-${key}`}>
                                <div className='col-12 col-sm-5 form-group'>
                                    <label>Name:</label>
                                    <input
                                        type='text'
                                        className={child.isValidName ? 'form-control' : 'form-control is-invalid'}
                                        value={child.name}
                                        onChange={(event) => handleOnchangeInput("name", event.target.value, key)}
                                    />
                                </div>
                                <div className='col-12 col-sm-5 form-group'>
                                    <label>Description:</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        value={child.description}
                                        onChange={(event) => handleOnchangeInput("description", event.target.value, key)}
                                    />
                                </div>
                                <div className='col-2 mt-4'>
                                    {key && key === "child_1"
                                        ?
                                        <i className="fa fa-plus-circle text-success px-2 fs-2" onClick={() => handleAddNewLevel()}></i>
                                        :
                                        <i className="fa fa-trash me-2 text-danger ps-2 fs-2" onClick={() => handleRemoveLevel(key)} />
                                    }
                                </div>
                            </div>
                        )
                    })}
                <div className='role-save mt-2'>
                    <button className='btn btn-warning px-5' onClick={() => handleSave()}>save</button>
                </div>
            </div>
            <div className='table-role mt-3'>
                <TableLevel ref={childRef} />
            </div>
        </div>
    )
}

export default Level