
// import './App.css'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { Routes, Route } from 'react-router'
import VerifyOtp from './pages/VerifyOtp'
import VerifyForgetPassword from './pages/VerifyForgetPassword'
import ForgetPassword from './pages/ForgetPassword'
import ChangePassword from './pages/ChangePassword'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path='/verify-forget-passsword' element={<VerifyForgetPassword />} />
        <Route path='/forget-passsword' element={<ForgetPassword />} />
        <Route path='/change-passsword' element={<ChangePassword />} />
      </Routes>
    </>
  )
}

export default App

