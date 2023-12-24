import { UserContext } from "@/context/UserContext"
import { fechAllVocal, fechAllVocalByUser } from "@/services/vocalService"
import { useSession } from "next-auth/react"
import { useContext, useEffect, useState } from "react"

const VocalbularyFavorite = () => {
    const { data: session }: any = useSession()
    const { user }: any = useContext(UserContext)

    const [vocalByUserList, setVocalByUserList] = useState([])
    const [vocalList, setVocalList] = useState([])

    const getAllVocalList = async () => {
        let response:any = await fechAllVocal()
        if (response && response.DT) setVocalList(response.DT)
    }

    useEffect(() => {
        (user.isAuthenticated || (session?.user !== undefined)) && getAllVocalList()
    }, [])

    const getAllVocalByUser = async () => {
        let res: any = await fechAllVocalByUser()
        res && res.EC === 0 && setVocalByUserList(res.DT)
    }

    useEffect(() => {
        (user.isAuthenticated || (session?.user !== undefined)) && getAllVocalByUser()
    }, [])

    const vocalListFavorite = vocalByUserList.reduce((accumulator: any, currentValue: any) => {
        if (currentValue.userId === user.account?.id) {
            let vocalFavorite = vocalList.filter((item: any) => item.id === currentValue.vocalId)
            accumulator.push(...vocalFavorite)
        }
        return accumulator
    }, [])

    if (user.isLoading) return <></>

    return (
        <div className="h-100">
            {
                ((user.isAuthenticated || session?.user !== undefined))
                    ?
                    <div className="card rounded-0">
                        <h5 className="card-header text-uppercase alert alert-primary">List Favorite Vocalbulary</h5>
                        <div className="card-body">
                            <div className="d-none d-sm-block">
                                <table className="table table-hover text-center">
                                    <thead>
                                        <tr className="table-primary">
                                            <th scope="col">No</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">English</th>
                                            <th scope="col">Spelling</th>
                                            <th scope="col">Pronunciation</th>
                                            <th scope="col">Vietnamese</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vocalListFavorite && vocalListFavorite.length > 0
                                            &&
                                            vocalListFavorite.map((item: any, index: number) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td><button className="btn btn-outline-warning"><i className="fas fa-star"></i></button></td>
                                                    <th>{item.en}</th>
                                                    <td>{item.spelling}</td>
                                                    <td>{item.pronunciation}</td>
                                                    <td>{item.vn}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Reponsive mobile */}
                            <div className="card mb-3 d-block d-sm-none" style={{ maxWidth: '540px' }}>
                                <div className="row g-0">
                                    <div className="col-md-8">
                                        {vocalListFavorite && vocalListFavorite.length > 0 &&
                                            vocalListFavorite.map((item: any, index: number) => {
                                                return (
                                                    <div className="card-body" key={index}>
                                                        <p className="card-title text-primary fw-bold">No: {index + 1}</p>
                                                        <p className="card-text"><span className="fw-bold me-2">Spelling:</span>{item.en}</p>
                                                        <p className="card-text"><span className="fw-bold">English:</span> {item.vn} </p>
                                                        <p className="card-text"><span className="fw-bold">Vietnamese:</span> {item.spelling} </p>
                                                        <button className="btn btn-outline-warning"><i className="fas fa-star"></i></button>
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
                    : <div className="alert alert-primary text-center">No Data...!</div>
            }
        </div>
    )
}

export default VocalbularyFavorite