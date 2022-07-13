import React,{useEffect} from 'react'
import './App.css'
import {useGlobalContext} from './context'

function Alert() {
    const{showAlert,alert} = useGlobalContext()
    const {cName,msg} = alert ||{}
    useEffect(()=>{
        let removeAlert = setTimeout(()=>{
            showAlert()
        },3000)
        return ()=> clearTimeout(removeAlert)   
    },[showAlert,alert])
    return (
        <div  className={`alert alert-${cName}`}>{msg} 
        </div>
    )
}

export default Alert