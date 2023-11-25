import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import { InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'


console.log(axios.defaults.baseURL);


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const LOGIN_URL = 'user/login'

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Create a FormData object to store the input values
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        // Send a POST request to the backend using Axios
        try {
            const response = await axios.post(LOGIN_URL, formData);
            // Handle the response from the backend
            if (response.status === 200) {
                alert('login success!')
                localStorage.setItem('token', response.data.token,);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/')
            } else {
                alert('Incorrect email or password!')
            }
        } catch (err) {
            if (!err?.response) {
                alert("No server response.")
            } else if (err?.response?.status === 400) {
                alert("Missing Username or Password.")
            } else if (err?.response.status === 401) {
                alert("Incorrect email or password. Please check your credentials.")
            } else {
                alert("Login failed. Please try again later.")
            }
        }
    };
    return (
        <div className='content-wrapper d-flex flex-column justify-content-center align-items-center'>
            <div className='login-container row'>
                <div className="col-12 ">
                    <h1 className='Title'>Login</h1>
                    <div className='input-container'>
                        <InputGroup>
                            <input className='form-control' onChange={(e) => {
                                setEmail(e.target.value)
                            }} type="email" placeholder='email' />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <input className='form-control' onChange={(e) => {
                                setPassword(e.target.value)
                            }} type={showPassword ? "text" : "password"} placeholder='password' />
                            <span className='eye-icon' onClick={() => { setShowPassword(!showPassword) }}>
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </InputGroup>
                        <br />
                        <button onClick={handleSubmit} className='shadow-button' type='submit'>Login</button>
                    </div>
                </div>
            </div>
            <p className='mt-3'>Don't have an account? <Link to='/signup'>Signup</Link> </p>
        </div>
    )
}

export default Login