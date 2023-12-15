import { useContext, useEffect, useState } from 'react'
// import { assignRolesToGroup, fetchAllRoles, fetchRolesByGroup } from '../../services/roleService'
// import { fetchGroup } from '../../services/userService'
import { toast } from 'react-toastify'
import _ from 'lodash'
import { fetchGroup } from '@/services/userService'
import { assignRolesToGroup, fetchAllRoles, fetchRolesByGroup } from '@/services/roleService'
import { UserContext } from '@/context/UserContext'

const GroupRole = () => {
    const { user } = useContext(UserContext)
    const [userGroups, setUserGroups] = useState([])
    const [listRoles, setListRoles] = useState([])
    const [selectGroup, setSelectGroup] = useState("")
    const [assignRolesByGroup, setAssignRolesByGroup] = useState([])

    useEffect(() => {
        getGroups()
        getAllRoles()
    }, [])

    const getGroups = async () => {
        let res: any = await fetchGroup()
        if (res && +res.EC === 0) {
            setUserGroups(res.DT)
        } else {
            toast.error(res.EM)
        }
    }

    const getAllRoles = async () => {
        let data: any = await fetchAllRoles()
        if (data && +data.EC === 0) {
            setListRoles(data.DT)
        }
    }

    const handleChangeGroup = async (value: string) => {
        setSelectGroup(value)
        if (value) {
            let data: any = await fetchRolesByGroup(value)
            if (data && +data.EC === 0) {
                let result = buildDataRolesByGroup(data.DT.Roles, listRoles)
                setAssignRolesByGroup(result)
            }
        }
    }

    const buildDataRolesByGroup = (groupRoles: any, allRoles: any) => {
        let result: any = []
        if (allRoles && allRoles.length > 0) {
            allRoles.map((role: any) => {
                let object: any = {}
                object.id = role.id
                object.url = role.url
                object.description = role.description
                object.isAssigned = false
                if (groupRoles && groupRoles.length > 0) {
                    object.isAssigned = groupRoles.some((item: any) => item.url === object.url)
                }
                result.push(object)
            })
        }
        return result
    }

    const handleSelectRole = (value: string) => {
        const _assignRoleByGroup: any = _.cloneDeep(assignRolesByGroup)
        let foundIndex = _assignRoleByGroup.findIndex((item: any) => + item.id === +value)
        if (foundIndex > -1) {
            _assignRoleByGroup[foundIndex].isAssigned = !_assignRoleByGroup[foundIndex].isAssigned
        }
        setAssignRolesByGroup(_assignRoleByGroup)
    }

    const buildDataToSave = () => {
        // data = {groupId: 4, groupRoles: [ {...}, {...} ]} // ---> data server cần nhận
        let result: any = {}
        const _assignRoleByGroup = _.cloneDeep(assignRolesByGroup)
        result.groupId = selectGroup
        let groupRolesFilter = _assignRoleByGroup.filter((item: any) => item.isAssigned === true)
        let finalGroupRoles = groupRolesFilter.map((item: any) => {
            let data = { groupId: +selectGroup, roleId: +item.id }
            return data
        })
        result.groupRoles = finalGroupRoles
        return result
    }

    const handleSave = async () => {
        let data = buildDataToSave()
        let res: any = await assignRolesToGroup(data)
        if (res && res.EC === 0) {
            toast.success(res.EM)
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <>
            {
                user.isAuthenticated && listRoles && listRoles.length > 0
                    ?
                    <div className='group-role-container'>
                        <span className='title-role fs-6 fs-sm-4 fw-bold alert alert-primary p-2 my-4'>Group-Roles Management</span><hr />
                        <div className='alert alert-primary'>
                            <div className='assign-group-role'>
                                <div className='col-12 col-sm-6 form-group'>
                                    <select
                                        className={'form-select'}
                                        onChange={(event) => handleChangeGroup(event.target.value)}
                                    >
                                        <option value="">Please select your group</option>
                                        {userGroups.length > 0 &&
                                            userGroups.map((userGroup: any, index: number) => <option key={`group-${index}`} value={userGroup.id}>{userGroup.name}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <hr />
                        {
                            selectGroup &&
                            <div className='roles'>
                                <h5>Assign Roles:</h5>
                                {
                                    assignRolesByGroup && assignRolesByGroup.length > 0
                                    && assignRolesByGroup.map((item: any, index: number) => {
                                        return (
                                            <div className="form-check" key={`list-role-${index}`}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value={item.id}
                                                    id={`list-role-${index}`}
                                                    checked={item.isAssigned}
                                                    onChange={(event) => handleSelectRole(event.target.value)}
                                                />
                                                <label className="form-check-label" htmlFor={`list-role-${index}`}>
                                                    {item.url}
                                                </label>
                                            </div>
                                        )
                                    })
                                }
                                <div className='mt-3'>
                                    <button className='btn btn-warning' onClick={() => handleSave()}>Save</button>
                                </div>
                            </div>
                        }
                    </div>
                    : <div className="alert alert-primary text-center">No Data...!</div>
            }
        </>
    )
}

export default GroupRole