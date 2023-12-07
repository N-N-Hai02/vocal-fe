import { createNewUser, fetchGroup, updateCurrentUser } from "@/services/userService"
import _ from "lodash"
import { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { toast } from "react-toastify"

interface ModalUser {
    show:boolean,
    onHide: () => void,
    action: string,
    dataModalUser: any
}

const ModalUser = ({show, onHide, action, dataModalUser}: ModalUser) => {
    const defaultUserData:any = {
        email: "",
        phone: "",
        username: "",
        password: "",
        address: "",
        sex: "",
        group: ""
    }

    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true
    }

    const [userData, setUserData] = useState(defaultUserData)
    const [validInputs, setValidInputs] = useState(validInputsDefault)

    const [userGroups, setUserGroups] = useState<any[]>([])

    useEffect(() => {
        getGroups()
    }, [])

    useEffect(() => {
        if (action === "UPDATE") {
            setUserData({ ...dataModalUser, group: dataModalUser.Group ? dataModalUser.Group.id : '' })
        }
    }, [dataModalUser])

    useEffect(() => {
        if (action === 'CREATE') {
            if (userGroups && userGroups.length > 0) {
                setUserData({ ...userData, group: userGroups[0].id })
            }
        }
    }, [action])

    const getGroups = async () => {
        let res:any = await fetchGroup()
        if (res && res.EC === 0) {
            setUserGroups(res.DT)
            if (res.DT && res.DT.length > 0) {
                let groups = res.DT
                setUserData({ ...userData, group: groups[0].id })
            }
        } else {
            toast.error(res.EM)
        }
    }

    const handleOnchangeInput = (value:any, name:string) => {
        let _userData = _.cloneDeep(userData)
        _userData[name] = value
        setUserData(_userData)
    }

    const checkValidInputs = () => {
        // create user
        if (action === 'UPDATE') return true

        setValidInputs(validInputsDefault)
        let arr = ['email', 'phone', 'password', 'group']
        let check = true
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _ValidInputs:any = _.cloneDeep(validInputsDefault)
                _ValidInputs[arr[i]] = false;
                setValidInputs(_ValidInputs)

                toast.error(`Empty input ${arr[i]}`)
                check = false
                break;
            }
        }
        return check
    }

    const handleConfirmUser = async () => {
        // create user
        let check = checkValidInputs()
        if (check === true) {
            let res: any = action ==='CREATE' 
            ? await createNewUser({ ...userData, groupId: userData['group'] }) 
            : await updateCurrentUser({ ...userData, groupId: userData['group'] })

            if (res && res.EC === 0) {
                onHide()
                setUserData({ ...defaultUserData, group: userGroups && userGroups.length > 0 ? userGroups[0].id : '' })
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

    const handleCloseModalUser = () => {
        onHide()
        setUserData(defaultUserData)
        setValidInputs(validInputsDefault)
    }
    return (
        <>
            <Modal
                size="lg"
                show={show}
                className='modal-user'
                onHide={() => handleCloseModalUser()}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{action === 'CREATE' ? 'Crate new user' : 'Edit a user'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-body'>
                        <div className='row'>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>Email (<span className='text-danger'>*</span>):</label>
                                <input
                                    disabled={action === 'CREATE' ? false : true}
                                    type='email'
                                    className={validInputs.email ? 'form-control' : 'form-control is-invalid'}
                                    value={userData.email}
                                    onChange={(event) => handleOnchangeInput(event.target.value, "email")}
                                />
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>Phone (<span className='text-danger'>*</span>):</label>
                                <input
                                    disabled={action === 'CREATE' ? false : true}
                                    type='text'
                                    className={validInputs.phone ? 'form-control' : 'form-control is-invalid'}
                                    value={userData.phone}
                                    onChange={(event) => handleOnchangeInput(event.target.value, "phone")}
                                />
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>Username:</label>
                                <input
                                    type='text'
                                    className={validInputs.username ? 'form-control' : 'form-control is-invalid'}
                                    value={userData.username}
                                    onChange={(event) => handleOnchangeInput(event.target.value, "username")}
                                />
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                {action === 'CREATE' &&
                                    <>
                                        <label>Password (<span className='text-danger'>*</span>):</label>
                                        <input
                                            type='password'
                                            className={validInputs.password ? 'form-control' : 'form-control is-invalid'}
                                            value={userData.password}
                                            onChange={(event) => handleOnchangeInput(event.target.value, "password")}
                                        />
                                    </>
                                }
                            </div>
                            <div className='col-12 form-group'>
                                <label>Address:</label>
                                <textarea
                                    className={validInputs.address ? 'form-control' : 'form-control is-invalid'}
                                    value={userData.address}
                                    onChange={(event) => handleOnchangeInput(event.target.value, "address")}
                                />
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>Gender:</label>
                                <select
                                    className='form-select'
                                    onChange={(event) => handleOnchangeInput(event.target.value, "sex")}
                                    value={userData.sex}
                                >
                                    <option defaultValue="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Orther">Orther</option>
                                </select>
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>Group (<span className='text-danger'>*</span>):</label>
                                {userGroups.length > 0 &&
                                    <select
                                        className={validInputs.group ? 'form-select' : 'form-select is-invalid'}
                                        onChange={(event) => handleOnchangeInput(event.target.value, "group")}
                                        value={userData.group}
                                    >
                                        {userGroups.map((userGroup, index) => <option key={`group-${index}`} value={userGroup.id}>{userGroup.name}</option>)}
                                    </select>
                                }
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModalUser()}>
                        Close
                    </Button>
                    <Button variant={`${action === 'CREATE' ? 'primary' : 'warning'}`} onClick={() => handleConfirmUser()}>
                        {action === 'CREATE' ? 'Save' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUser