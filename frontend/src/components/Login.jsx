import React from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useState } from 'react'
import userService from '../Services/userService'
import { useNavigate } from 'react-router-dom'

const Login = () => {


    const navigate = useNavigate()
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

    const signin = async (e) => {
        e.preventDefault()
        console.log('Form Submitted')
        if (formValidation()) {
            const data = {
                email: email,
                password: password
            }
            try {
                const response = await userService.signin(data)   //to remove await you need to put async
                console.log("Response => ", response)
                //save user data localstorage
                localStorage.setItem("user_data", JSON.stringify(response.data.user)) //to convert them from object into string 
                localStorage.setItem("token", response.data.token)

                toast.success('User Successfully Logged In!');
                setEmail('')
                setPassword('')
                //redirect to homepage
                navigate('/home')

            } catch (err) {
                console.log(err)
                toast.error(err.response.data.message)
            }

        } else {
            console.log('Form Invalid')
        }
    }


    return (
        <div className='login'>
            <Toaster />
            <div className='login-cover'>

            </div>
            <div
                className='login-content'>
                <div>
                    <h1>DARK SPACE</h1>
                    <p>Dark Space Social Media Application</p>
                </div>
                <div>
                    <form onSubmit={signin}>
                        <div className='form-group'>
                            <label>Email</label>
                            <input className='input' type="email" placeholder={errors.email}
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                } />

                        </div>
                        <div className='form-group'>
                            <label>Password</label>
                            <input className='input' type="password" placeholder={errors.password}
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                } />
                        </div>
                        <button className='btn signin' type='submit'>Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login