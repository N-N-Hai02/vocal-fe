import Link from 'next/link'
import { useContext } from 'react'
import { Dropdown } from 'react-bootstrap'
import { UserContext } from '@/context/UserContext'
import './subMenu.scss'
import { useSession } from "next-auth/react"

const SubMenu = () => {
    const { user } = useContext(UserContext)
    const { data: session }: any = useSession()

    return (
        <>
            {user.isLoading && user.isLoading === true &&
                <div>
                    Is the loading..!
                </div>
            }
            {(user.isAuthenticated && user.isAuthenticated === true || session?.user) &&
                <div className="fixed-bottom">
                    <div className="dropdown position-absolute bottom-0 end-0 m-4">
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-warning" id="dropdown-basic" className="rounded-circle">
                                <i className="fas fa-home"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{ minWidth: "2rem", backgroundColor: "rgb(0 0 0 / 0%)", border: "none", right: "1px", top: "-65px" }}>
                                <li className="item-1 position-relative mb-2">
                                    <span
                                        className="position-fixed text-success d-none"
                                        style={{ width: "120px", right: "25px", bottom: "60px" }}
                                    >
                                        Bài kiểm tra
                                    </span>
                                    <Link href="/user/Test-Vocal" className='btn btn-outline-success rounded-circle'>
                                        <i className="fas fa-pen"></i>
                                    </Link>
                                </li>
                                <li className="item-2 position-relative">
                                    <span
                                        className="position-fixed text-danger d-none"
                                        style={{ width: "120px", right: "25px", bottom: "15px" }}
                                    >
                                        Tra cứu từ
                                    </span>
                                    <Link href="/user/Flashcard-Vocal" className='btn btn-outline-danger rounded-circle'>
                                        <i className="fas fa-book"></i>
                                    </Link>
                                </li>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            }
        </>
    )
}

export default SubMenu