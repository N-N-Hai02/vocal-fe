import { useState, useRef, useContext } from 'react'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import TableRole from './TableRole';
import { createNewRoles } from '@/services/roleService';
import { UserContext } from '@/context/UserContext';

const Role = () => {
    const { user } = useContext(UserContext)
    const dataChildDefault = { url: '', description: '', isValidUrl: true }
    const [listChild, setListChild] = useState({
        child_1: dataChildDefault
    })

    const childRef: any = useRef();

    const handleOnchangeInput = (name: string, value: string, key: string) => {
        let _listChild: any = _.cloneDeep(listChild)
        _listChild[key][name] = value
        if (value && name === 'url') {
            _listChild[key]['isValidUrl'] = true
        }
        setListChild(_listChild)
    }

    const handleAddNewRole = () => {
        let _listChild: any = _.cloneDeep(listChild)
        let id = uuidv4()
        _listChild[`child_${id}`] = dataChildDefault
        setListChild(_listChild)
    }

    const handleRemoveRole = (key: string) => {
        let _listChild: any = _.cloneDeep(listChild)
        delete _listChild[key]
        setListChild(_listChild)
    }

    const buildDataToPersist = () => {
        let _listChild = _.cloneDeep(listChild)
        let result: any = []
        Object.entries(_listChild).map(([key, child]) => result.push({ url: child.url, description: child.description }))
        return result
    }

    const handleSave = async () => {
        let invalidObj = Object.entries(listChild).find(([key, child]) => {
            return child && !child.url
        })

        if (!invalidObj) {
            // cal APi
            let data = buildDataToPersist()
            let res: any = await createNewRoles(data)
            if (res && +res.EC === 0) {
                toast.success(res.EM)
                childRef.current.fetchChildTableRole()
            } else {
                toast.error(res.EM)
            }
        } else {
            toast.error("Input URL must not be empty...!")
            let _listChild: any = _.cloneDeep(listChild)
            const key = invalidObj[0]
            _listChild[key]['isValidUrl'] = false
            setListChild(_listChild)
        }
    }

    return (
        <>
            {user.isAuthenticated ?
                <div className='role-container'>
                    <div className='title-role'><h4>Add a new role...</h4></div>
                    <div className='role-parent'>
                        {
                            Object.entries(listChild).map(([key, child], index) => {
                                return (
                                    <div className={`row role-child ${key}`} key={`child-${key}`}>
                                        <div className='col-12 col-sm-5 form-group'>
                                            <label>URL:</label>
                                            <input
                                                type='text'
                                                className={child.isValidUrl ? 'form-control' : 'form-control is-invalid'}
                                                value={child.url}
                                                onChange={(event) => handleOnchangeInput("url", event.target.value, key)}
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
                                                <i className="fa fa-plus-circle text-success px-2 fs-2" onClick={() => handleAddNewRole()}></i>
                                                :
                                                <i className="fa fa-trash me-2 text-danger ps-2 fs-2" onClick={() => handleRemoveRole(key)} />
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
                        <TableRole ref={childRef} user={user} />
                    </div>
                </div>
                : <div className="alert alert-primary text-center">No Data...!</div>
            }
        </>
    )
}

export default Role