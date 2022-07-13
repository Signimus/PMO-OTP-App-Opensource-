
import React,{useState} from 'react'
import Alert from '../../Alert'
import { useGlobalContext } from '../../context'
import { url } from '../../globalurl'
import axios from 'axios'

const Otp = () => {
    const {alert,showAlert,username} = useGlobalContext() || {}
    const [otp,setotp] = useState('')
    // 
    const submitOtp = async(e) =>{
            e.preventDefault()
            //
            const userData = {otp,username}
            //
            if(!otp){
                showAlert(true,'Fill OTP','danger')
            }
            else{
                try{
                    const res = await axios.post(`${url}/login/`,userData)
                  console.log(res)
                  
                    showAlert(
                      true,
                      `${res.data.mess}`,
                      'success'
                    )
                       
                        
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
    {
        alert.show  && <Alert/>
    }
         <div className='d-flex justify-content-center fw-bold'>
                        <h4>Fill OTP</h4>
                    </div>
                <form className='p-4 '>
                
                    <input type='text' placeholder='Fill OTP'
                    className='form-control my-2'
                    value={otp}
                    onChange={e=>setotp(e.target.value)}
                   
                    />

                    <button  onClick={(e)=>submitOtp(e)}
                     className='btn btn-primary'
                    >Login</button>
                </form>
    </>
  )
}

export default Otp