import axios from 'axios';
import React, { useState } from 'react'
import { base_uri } from '../utils/global_variable.js'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'

export default function SignIn() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignin = async () => {
        const user = { email, password }
        try {
            const res = await axios.post(`${base_uri}/auth/signin`, user);
            alert(res.data.message);
            if (res.data.status) {
                navigate("/verify-otp", { state: email });
            }
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className='vh-100 container d-flex justify-content-center align-items-center'>
            <div className='col-4 shadow p-5 rounded'>
                <div className='mb-3'>
                    <h2 className='text-center'>Sign In</h2>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput2" className="form-label">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleFormControlInput2" placeholder="Password" />
                </div>
                <div className='mb-4 text-end'>
                    <Link to="/forget-password">Forget Password?</Link>
                </div>
                <div className='mb-3'>
                    <button onClick={handleSignin} className='w-100 btn btn-primary'>Sign In</button>
                </div>
                <div className='mb-3 text-center'>
                    <Link to="/signup">Dont have an account? Sign Up</Link>
                </div>
            </div>
        </div>
    )
}


// auth frontend + backend