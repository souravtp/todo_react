import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from '../../api/axios'
import './SignUp.css'

function SignUp() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [usernameError, setUsernameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const navigate = useNavigate()

    const SIGNUP_URL = 'user/signup'

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('username', username)
        formData.append('email', email)
        formData.append('password', password)

        try {
            const response = await axios.post(SIGNUP_URL, formData)

            if (response.status === 201) {
                alert('user created successfully')
                navigate('/login')
                console.log(response.data)
            }
        } catch (err) {
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error response from server:', err.response.data);

                if (err.response.data && err.response.data.username) {
                    setUsernameError(err.response.data.username.join(', '));
                } else {
                    setUsernameError(''); // Clear the error if no specific error
                }

                if (err.response.data && err.response.data.email) {
                    setEmailError(err.response.data.email.join(', '));
                } else {
                    setEmailError(''); // Clear the error if no specific error
                }

                if (err.response.data && err.response.data.password) {
                    setPasswordError(err.response.data.password.join(', '));
                } else {
                    setPasswordError('')
                }

            } else if (err.request) {
                // The request was made but no response was received
                console.error('No response received:', err.request);
                alert('No response received from the server.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Request setup error:', err.message);
                alert('An error occurred while setting up the request.');
            }
        }
    }

    return (
        <div className='content-wrapper d-flex flex-column justify-content-center align-items-center'>
            <div className='signup-container row'>
                <div className='col col-sm-12 col-md-12'>
                    <h1>Signup</h1>
                    <div className="input-container d-flex flex-column">
                        <input className='input-field form-control' onChange={(e) => { setUsername(e.target.value) }} type="text" placeholder='Enter Username' />
                        <br />
                        <small className='warning-text'>{usernameError && <div className="error-message">{usernameError}</div>}</small>
                        <br />
                        <input className='input-field form-control' onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='Enter Email' />
                        <br />
                        <small className='warning-text'>{emailError && <div className="error-message">{emailError}</div>}</small>
                        <br />
                        <input className='input-field form-control' onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='Enter Password' />
                        <br />
                        <small className='warning-text'>{passwordError && <div className="error-message">{passwordError}</div>}</small>
                        <button  className='mt-3 signup-button' onClick={handleSubmit} >Create User</button>
                    </div>
                </div>
            </div>
            <p className='mt-3'>Already have an account? <Link to='/login'>Login</Link></p>
        </div>
    )
}

export default SignUp