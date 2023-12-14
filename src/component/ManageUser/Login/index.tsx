"use client"
import { useContext, useState } from "react";
import { useRouter } from 'next/navigation'
import "./index.scss"
import { toast } from "react-toastify";
import { UserContext } from "@/context/UserContext";
import { loginUser } from "@/services/userService";

const Login = () => {
    const { user, loginContext } = useContext(UserContext)
    const router = useRouter()

    const [valueLogin, setValueLogin] = useState("")
    const [password, setPassword] = useState("")
    const defaultObjValidInput = {
        isValidvalueLogin: true,
        isValidPassword: true
    }
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput)

    user && user.isAuthenticated === true && router.push("/vocalbulary")

    const handleCreateNewAccount = () => router.push("/register")

    const handleLogin = async () => {
        setObjValidInput(defaultObjValidInput)
        if (!valueLogin) {
            toast.error("email or phone required!")
            setObjValidInput({...defaultObjValidInput, isValidvalueLogin: false})
            return false
        }
        if (!password) {
            toast.error("password is required!")
            setObjValidInput({...defaultObjValidInput, isValidPassword: false})
            return false
        }

        let response:any = await loginUser(valueLogin, password)

        if (response && +response.EC === 0) {
            // success
            let { groupWithRoles, email, username, access_token } = response.DT
            let data = {
                isAuthenticated: true,
                token: access_token,
                account: { groupWithRoles, email, username }
            }
            localStorage.setItem('jwt', access_token)
            loginContext(data)
            router.push("/vocalbulary")
        }
        if (response &&  response.EC !== 0) {
            // error
            toast.error(response.EM)
        }
    }

    const handlePressEnter = (event:any) => {
        if (event && event.charCode === 13 && event.code === "Enter") {
            handleLogin()
        }
    }

    return (
        <div className="login-container py-3">
            <div className="container d-flex flex-column justify-content-center">
                <div className="row mx-3">
                    <div className="content-left d-none col-lg-7 d-lg-block">
                        <div className="content-brand fs-2 fw-bold text-primary alert alert-primary">
                            Learn English Website
                        </div>
                        <div className="content-detail fs-4">
                            Learn English Website helps you connect and share with the people in your life
                        </div>
                    </div>
                    <div className="content-right col-12 col-lg-5 d-flex flex-column gap-3 py-3">
                        <div className="content-brand text-center fs-6 fw-bold text-primary d-lg-none alert alert-primary">
                            Learn English Website
                        </div>
                        <input
                            type="text"
                            className={objValidInput.isValidvalueLogin ? "form-control" : "form-control is-invalid"}
                            placeholder="Email address or phone number"
                            value={valueLogin}
                            onChange={(event) => setValueLogin(event.target.value)}
                        />
                        <input
                            type="password"
                            className={objValidInput.isValidPassword ? "form-control" : "form-control is-invalid"}
                            placeholder="Password" 
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyPress={(event) => handlePressEnter(event)}
                        />
                        <button className="btn btn-primary fw-bold" onClick={() => handleLogin()}>Log in</button>
                        <span className="text-center">
                            <a href="/#" className="forgotten-password">Forgotten password?</a>
                        </span>
                        <hr />
                        <div className="text-center">
                            <button className="btn btn-outline-success fw-bold" onClick={() => handleCreateNewAccount()}>Create new account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;