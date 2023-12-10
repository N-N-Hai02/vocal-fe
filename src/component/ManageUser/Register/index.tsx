"use client"
import Link from "next/link";
import { useRouter } from 'next/navigation'
import "./index.scss"
import { useContext, useState } from "react";
import { toast } from 'react-toastify';
import { UserContext } from "@/context/UserContext";
import { registerNewUser } from "@/services/userService";

const Register = () => {
    const { user } = useContext(UserContext)
    const router = useRouter()

    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [conformPassword, setConformPassword] = useState<string>("");

    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConformPassword: true,
    }
    const [objValidateInput, setObjValidateinput] = useState(defaultValidInput)
    
    user && user.isAuthenticated === true && router.push("/")

    const isValidInputs = () => {
        setObjValidateinput(defaultValidInput)

        if (!email) {
            toast.error("Email is require!")
            setObjValidateinput({ ...defaultValidInput, isValidEmail: false })
            return false
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error("Please enter a valid email address!")
            setObjValidateinput({ ...defaultValidInput, isValidEmail: false })
            return false
        }
        if (!phone) {
            toast.error("Phone is require!")
            setObjValidateinput({ ...defaultValidInput, isValidPhone: false })
            return false
        }
        if (!password) {
            toast.error("Password is require!")
            setObjValidateinput({ ...defaultValidInput, isValidPassword: false })
            return false
        }
        if (password !== conformPassword) {
            toast.error("Your password is not the same!")
            setObjValidateinput({ ...defaultValidInput, isValidConformPassword: false })
            return false
        }
        return true
    }

    const handleRegister = async () => {
        let check = isValidInputs()
        if (check === true) {
            let response:any = await registerNewUser(email, phone, username, password, conformPassword)
            if (+response.EC === 0) {
                toast.success(response.EM)
                router.push("/login");
            } else {
                toast.error(response.EM)
                let check = response.DT
                let isValidate = {
                    [check]: false
                }
                setObjValidateinput({ ...defaultValidInput, ...isValidate })
            }
        }
    }

    return (
        <div className="register-container">
            <div className="container d-flex flex-column justify-content-center vh-100">
                <div className="row mx-3">
                    <div className="content-left d-none col-sm-7 d-sm-block">
                        <div className="content-brand fs-1 fw-bold text-primary">
                            Register Vocalbulary
                        </div>
                        <div className="content-detail fs-3">
                            Register Vocalbulary helps you connect and share with the people in your life
                        </div>
                    </div>
                    <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
                        <div className="content-brand text-center fs-6 fw-bold text-primary d-sm-none">
                            Register Nguyen Hai
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="text" className={objValidateInput.isValidEmail ? "form-control" : "form-control is-invalid"} placeholder="Email address"
                                value={email} onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone number:</label>
                            <input type="text" className={objValidateInput.isValidPhone ? "form-control" : "form-control is-invalid"} placeholder="Phone number"
                                value={phone} onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Username:</label>
                            <input type="text" className="form-control" placeholder="Username"
                                value={username} onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" className={objValidateInput.isValidPassword ? "form-control" : "form-control is-invalid"} placeholder="Password"
                                value={password} onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Re-enter Password:</label>
                            <input type="password" className={objValidateInput.isValidConformPassword ? "form-control" : "form-control is-invalid"} placeholder="Password"
                                value={conformPassword} onChange={(event) => setConformPassword(event.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary" type="button" onClick={() => handleRegister()}>Register</button>
                        <hr />
                        <div className="text-center">
                            <Link href='/login' className="btn btn-success">Already have a login form</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;