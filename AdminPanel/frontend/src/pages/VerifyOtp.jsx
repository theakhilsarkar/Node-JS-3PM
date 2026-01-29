import React, { useState } from 'react'
import OTPInput, { ResendOTP } from 'otp-input-react'
import axios from 'axios';
import { base_uri } from '../utils/global_variable';
import { useLocation, useNavigate } from 'react-router'


export default function VerifyOtp() {
    const navigate = useNavigate()
    const [otp, setOtp] = useState("");
    const { state } = useLocation(); // {state:email}
    console.log(state);

    const handleVerifyOtp = async () => {
        try {
            const res = await axios.post(`${base_uri}/auth/verifyOtp`, { email: state, otp: Number(otp) }, { withCredentials: true })
            if (res.data.status) {
                alert(res.data.message)
                navigate("/home");
            }

        } catch (err) {
            alert(err.message);
        }
    }
    return (
        <div className='container vh-100 d-flex justify-content-center align-items-center'>
            <div className='col-4 shadow p-3 d-flex flex-column justify-content-center align-items-center'>
                <h3 className='my-4'>Verify OTP</h3>
                <OTPInput value={otp} onChange={setOtp} autoFocus OTPLength={6} otpType="number" disabled={false} />
                {/* <ResendOTP onResendClick={() => console.log("Resend clicked")} /> */}
                <div className='mt-3 d-flex justify-content-end w-100'>
                    <a className='' href="">Resent OTP</a>
                </div>
                <button onClick={handleVerifyOtp} className='w-100 mt-4 btn btn-primary'>Verify & Signin</button>
            </div>
        </div>
    )
}
