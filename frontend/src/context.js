import React ,{useState,useEffect,useContext} from 'react'


//

const AppContext = React.createContext()

// 
const getEmail = () =>{
    let getemail = localStorage.getItem('getemail')
    if(getemail){
        return JSON.parse(localStorage.getItem('getemail'))
    }
    else{
        return ''
    }
}
// 
const AppProvider = ({children}) =>{
    
    // 
    const [alert, setalert] = useState({show:false,msg:'',cName:''})  // alert state
    const [loginToggle, setloginToggle] = useState(false) // login toggle
    const [isOtp,setisOtp] = useState(false) // otp state
    const [email,setemail] = useState()
    const [password,setpassword] = useState('')
    const [mobileNo,setmobile] = useState(Number)
    const [username,setusername] = useState(getEmail())
    const [confirm_password,setconfirm_password] = useState('')
    // 
    // alert function
     const showAlert = (show=false,msg='',cName='')=>{
        setalert({show,msg,cName})
    }
    // alert funtion end
    // 
     // loginToggleFun
     const  loginToggleFun = () =>{
        setloginToggle(!loginToggle)
    }
   // loginToggleFun end
   //
   useEffect(()=>{
     localStorage.setItem('getemail',JSON.stringify(username))
   })
   // 
    return(
        <AppContext.Provider
         value={{
           alert,
           setalert,
           showAlert,
           loginToggleFun,
           loginToggle,
           isOtp,
           setisOtp,
           email,
           setemail,
           username,
           setusername,
           password,
           setpassword,
           mobileNo,
           setmobile,
           confirm_password,
           setconfirm_password,
        }}>
            {children}
        </AppContext.Provider>
    )
}
// 
export const useGlobalContext=()=>{
    return useContext(AppContext)
}
// 
export {AppContext,AppProvider}