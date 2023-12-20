import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { UserContext } from '@/context/UserContext'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logoutUser } from '@/services/userService'
import { toast } from 'react-toastify'
import { useRouter, usePathname } from 'next/navigation'
import logo from '../app/logo_2.svg'
import './app.header.scss'
import Image from 'next/image'
import { DataContexts } from '@/context/dataContext'
import { useSession, signOut } from "next-auth/react"

const AppHeader = (): JSX.Element | any => {
    const { data: session }: any = useSession()
    const router = useRouter()
    const pathname = usePathname()

    const { user, logoutContext } = useContext(UserContext)
    const { toggle, setToggle } = useContext(DataContexts)
    const [expanded, setExpanded] = useState(false)
    useEffect(() => setExpanded(toggle), [toggle])

    const handleLogoutUser = async () => {
        let res: any = await logoutUser() // clear cookies
        localStorage.removeItem('jwt') // clear localstorage
        logoutContext() // clear context

        if (res && res.EC === 0 || session?.user) {
            router.push('/login')
            session?.user ? toast.success("Logout google successfully..!") : toast.success("Logout successfully..!")
        } else {
            toast.error(res.EM)
        }

        session?.user && signOut({ redirect: false })
    }

    const handleClickNavhiden = () => toggle && setToggle(false)

    const showMenuAdmin = user.account.groupWithRoles

    if (user.isLoading && user.isLoading === true) {
        return <div>Is the loading..!</div>
    }

    if ((user.isAuthenticated && user.isAuthenticated === true || session?.user) || pathname === '/' || pathname === '/vocalbulary') {
        return (
            <div className='navbar-header'>
                <Navbar expand="lg" className="bg-primary fixed-top" expanded={expanded}>
                    <Container>
                        <Navbar.Brand href="#" className='d-flex align-center'>
                            <Image
                                src={logo}
                                width="30"
                                height="30"
                                className="d-inline-block py-1"
                                alt=''
                            />
                            <div className='ms-2 text-light'>VOCALBULARY</div>
                        </Navbar.Brand>
                        <Navbar.Toggle onClick={() => setToggle(!toggle)} />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="nav-body me-auto my-2 my-lg-0">
                                {
                                    ((user && user.isAuthenticated === true) || (session !== null && session?.user !== undefined)) &&
                                    <>
                                        <Link onClick={handleClickNavhiden} href="/vocalbulary" className='text-light py-2 text-decoration-none'>
                                            Home Vocalbulary
                                        </Link>
                                        <Link onClick={handleClickNavhiden} href="/vocalbulary/List" className='text-light py-2 text-decoration-none'>Vocalbulary List</Link>
                                    </>
                                }
                                {
                                    showMenuAdmin && showMenuAdmin.name === "admin"
                                    &&
                                    <NavDropdown title="Admin Menu" id="AdminMenu-dropdown">
                                        <NavDropdown.Item>
                                            <Link onClick={handleClickNavhiden} href="/admin/vocal" className='text-dark py-2 text-decoration-none'>Admin Vocalbulary</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <Link onClick={handleClickNavhiden} href="/admin/users" className='text-dark py-2 text-decoration-none'>Admin Users</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <Link onClick={handleClickNavhiden} href="/admin/roles" className='text-dark py-2 text-decoration-none'>Admin Roles</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <Link onClick={handleClickNavhiden} href="/admin/group-role" className='text-dark py-2 text-decoration-none'>Admin Group Roles</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <Link onClick={handleClickNavhiden} href="/admin/level" className='text-dark py-2 text-decoration-none'>Admin levels</Link>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                }
                            </Nav>
                            {user && user.isAuthenticated === true || session?.user
                                ?
                                <Nav className='mt-lg-auto'>
                                    <Nav.Item className='nav-link mt-lg-auto text-light'>Welcome, { session?.user ? session?.user.name : user.account.username }!</Nav.Item>
                                    <NavDropdown title="Action" id="Action-dropdown">
                                        <NavDropdown.Item href="#">Change Password</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item>
                                            <Link
                                                href="#"
                                                className={`${!session?.user ? 'w-100 btn btn-success text-light py-2 text-decoration-none' : 'w-100 btn btn-warning text-light py-2 text-decoration-none'}`}
                                                onClick={() => handleLogoutUser()}
                                            >
                                                Log out user
                                            </Link>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                :
                                <Link href="/login" className='btn btn-danger text-light py-2 text-decoration-none'>Log in</Link>
                            }
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default AppHeader