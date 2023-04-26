import React, { useState, useEffect, useRef } from 'react'
import userService from '../Services/userService'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faGoogle, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import './comps/navbar/'


export const Register = () => {
    let navigate = useNavigate()

    const [isContainerActive, setIsContainerActive] = useState(false);

    const signUpButton = () => {
        setIsContainerActive(true);
    };
    const signInButton = () => {
        setIsContainerActive(false);
    };

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState(
        {
            email: '',
            password: '',
        }
    )

    const formValidation = () => {

        let localErrors = { ...errors }
        let status = true

        if (email == "") {
            localErrors.email = 'Email Required'
            status = false
        }
        if (password == "") {
            localErrors.password = 'Password Required'
            status = false
        }

        setErrors(localErrors)
        console.log(localErrors)
        return status

    }


    const register = async (e) => {        //should be asynchrone
        e.preventDefault()   //to prevent page reload

        if (formValidation()) {
            const data = {
                email: email,
                password: password,
            }

            try {
                const response = await userService.register(data)   //to remove await you need to put async
                console.log("Response => ", response)
                toast.success('User Successfully Created!');
                console.log("Form Submitted !");
                setTimeout(() => {
                    navigate('/login')
                }, 2000);

            } catch (err) {
                console.log(err)
                toast.error('User Failed To Be Created!');
            }
        } else {
            console.log("Form Invalid")
        }

    }

    return (
        <div id='container' className={`container${isContainerActive ? " right-panel-active" : ""}`} >

            <Toaster />
            <div className="form-container sign-up-container">
                <form onSubmit={register}>
                    <h1>Create Account</h1>
                    <div className="social-container">
                        <a href="#" className="social"><FontAwesomeIcon icon={faFacebook} size="xl" /></a>
                        <a href="#" className="social"><FontAwesomeIcon icon={faGoogle} size="xl" /></a>
                        <a href="#" className="social"><FontAwesomeIcon icon={faLinkedin} size="xl" /></a>
                    </div>
                    <span>or use your email for registration</span>


                    <input className='input' type="email" placeholder='Email'
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        } />
                    {
                        (errors.email) != "" ?
                            <h5 style={{ marginLeft: "-11rem", color: "red", fontSize: "12px" }}>
                                * {errors.email}
                            </h5> : ''
                    }

                    <input className='input' type="password" placeholder='Password'
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        } />
                    {
                        (errors.password) != "" ?
                            <h5 style={{ marginLeft: "-9.5rem", color: "red", fontSize: "12px" }}>
                                * {errors.password}
                            </h5> : ''
                    }

                    <button type='submit'>Sign Up</button>
                </form>
            </div>

            <div className='form-container sign-in-container'>
                <form action="#">
                    <h1>Sign in</h1>
                    <div className="social-container">
                        <a href="#" className="social"><FontAwesomeIcon icon={faFacebook} size="xl" /></a>
                        <a href="#" className="social"><FontAwesomeIcon icon={faGoogle} size="xl" /></a>
                        <a href="#" className="social"><FontAwesomeIcon icon={faLinkedin} size="xl" /></a>
                    </div>
                    <span>or use your account</span>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <a href="#" className='passsword_text'>Forgot your password?</a>
                    <button contenteditable="true" >Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="signIn" onClick={signInButton}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" id="signUp" onClick={signUpButton}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Register;