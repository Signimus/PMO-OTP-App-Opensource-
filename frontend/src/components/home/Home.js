import React from 'react'
// import { useNavigate} from 'react-router-dom'
import '../../App.css'
import { useGlobalContext } from '../../context'
import Login from '../auth/Login'
import Signup from '../auth/Signup'

const Home = () => {
//   let navigate = useNavigate()
  // 
  const {loginToggleFun,
      loginToggle,
    } = useGlobalContext()
    //  
  return (
    <div className='container mt-4'>
        <div className='row'>
           <div className='col-lg-5'>
               <div className='authBox'>
                   <ul className='authBoxUl'>
                        <li className='authBoxLi'>
                       
                            <span className= {`authBoxLiSpan ${!loginToggle ? 'fw-bold' : ''}`} onClick={loginToggleFun}>Login</span>
                        </li>
                        <li className='authBoxLi'>
                            <span className={`authBoxLiSpan ${loginToggle ? 'fw-bold' :''}`} onClick={loginToggleFun}>Registration</span>
                        </li>
                   </ul>
               </div>
           </div>
           <div className='col-lg-7'>
             {
               loginToggle ? <Signup/> :<Login/> 
             }
           </div>
        </div>
    </div>
  )
}

export default Home