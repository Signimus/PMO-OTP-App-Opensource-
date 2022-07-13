import React from 'react'
import '../../App.css'
import { useGlobalContext } from '../../context'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Alert from '../../Alert'
import Otp from './Otp'
import { url } from '../../globalurl'

const Login = () => {
//   let navigate = useNavigate()
const {alert,isOtp,setisOtp ,email,setemail,showAlert,password,setpassword,username,setusername,} = useGlobalContext() || {}
    // 
    // //
    const submitLogin = async(e) =>{
        e.preventDefault()
        const userData = {username}
            if(!username){
                showAlert(true,'Fill username','danger')
            }
            else{
                try{
                    const res = await axios.post(`${url}/sendopt/`,userData)
            
                  console.log(res)
                  if(res.data){
                    setisOtp(true)
                  }
                    showAlert(
                      true,
                      `${res.data.mess}`,
                      'success'
                    )
                       
                        console.log('login')
                }
                catch(err){
                    console.log(err)
                    showAlert(
                        true,
                        `${err.message}`,
                        'danger'
                      )
                }
            }
    } 
    // 
  return (
    <>
    <div className=' justify-content-center'>
            {
                !isOtp ?
            
            <div className='form-box'>
                {
                    alert.show && <Alert  />
                }
                    <div className='d-flex justify-content-center fw-bold'>
                        <h4>Login</h4>
                    </div>
                <form className='p-4 '>
                
                    {/* <input type='text' placeholder='Enter Your email'
                    className='form-control my-2'
                    value={email}
                    onChange={e=>setemail(e.target.value)}
                   
                    /> */}
                    <input type='text' placeholder='Enter username'
                        className='form-control my-2'
                        value={username}
                        onChange={e=>setusername(e.target.value)}
                    />

                    {/* <input type='password' placeholder='Enter Password'
                        className='form-control my-2'
                        value={password}
                        onChange={e=>setpassword(e.target.value)}
                    /> */}

                    <button  onClick={(e)=>submitLogin(e)}
                     className='btn btn-primary'
                    >Login</button>
                </form>
            </div>
       : <Otp/>}
    </div> 
</>
  )
}

export default Login