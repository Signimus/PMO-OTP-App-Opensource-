import React from 'react'
import { useGlobalContext } from '../../context'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Alert from '../../Alert'
import { url } from '../../globalurl'

const Signup = () => {
  let navigate = useNavigate()
    // 
    const {username
      ,password,
      setusername,
      setpassword,
      showAlert,
      email,setemail,
      alert,
      mobileNo,
      setmobile,
      confirm_password,
      setconfirm_password,
    } = useGlobalContext() || {}
    //
    const submitSign = async(e) =>{
        e.preventDefault()
        const userData = {username,email,mobileNo}
            if( !username || !email || !mobileNo){
                showAlert(true,'Fill all fields', 'danger')
            }
            else if(password!==confirm_password){
                    showAlert(true,'password not match', 'danger')
            }
            else{
                try{
                  const res = await axios.post(`${url}/signup/`,userData)
            
                  console.log(res)
                    showAlert(
                      true,
                      `${res.data.msg}`,
                      'success'
                    )
                }
                catch(err){
                    console.log(err.message)
                    showAlert(
                      true,
                      `${err.message}`,
                      'danger'
                    )
                }
            }
          
            setemail('')
            setmobile('')
          
    }
    // 
  return (
    <>
    <div className=' justify-content-center'>
     
     <div className='form-box'>
         {
             alert.show && <Alert  />
         }
         <div className='d-flex justify-content-center fw-bold '>
               <h4>Registration</h4> 
         </div>

         <form>

             <input type='text' placeholder='Enter Your Email'
             className='form-control my-2'
            
             onChange={e=>setemail(e.target.value)}
             />


            {/*  */}
            <input type='number'
            
               placeholder='mobile number'
               className='form-control my-2'
              //  value={mobile}
               onChange={e=>setmobile(e.target.value)}
             />
            {/*  */}
             <input type='text' placeholder='Enter Your Username'
             className='form-control my-2'
             value={username}
             onChange={e=>setusername(e.target.value)}
             />

            
             {/* <input type='password'
               placeholder='Password'
               className='form-control my-2'
               value={password}
               onChange={e=>setpassword(e.target.value)}
             />
             
             <input type='password'
               placeholder='Confirm Password'
               className='form-control my-2'
               value={confirm_password}
               onChange={e=>setconfirm_password(e.target.value)}
             /> */}
             
             <button  onClick={(e)=> submitSign(e)}
              className='btn btn-primary'
             >Sign Up</button>
         </form>
     </div>

</div>
    </>
  )
}

export default Signup