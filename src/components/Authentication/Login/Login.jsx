import React, { useState, useEffect, Suspense } from 'react';
import './style.css'
import { useTranslation } from 'react-i18next';
import Header from '../../Header/Header';
import {useNavigate} from 'react-router-dom'
import CONFIG from '../../../config.json'
const Login=({setIsAuth, isAuth})=>{
    const {t} = useTranslation(["Login"])

    const[eye,seteye]=useState(true);
    const[password,setpassword]=useState("password");
    const[warning,setwarning]=useState(false);
    const[password_warning,set_password_warning]=useState(false);
    
    const[username,setusername]=useState("");
    const[inputs_password,set_inputpassword]=useState("");
    
    const[warning_username,set_warning_username]=useState(false);
    const[warning_valid_password,set_warning_password]=useState(false);
    const navigate = useNavigate()
    const Eye=()=>{
        if(password=="password"){ 
            setpassword("text");
            seteye(false); 
            setwarning(true);
            set_password_warning(true);
        }      
        else{   
            setpassword("password");   
            seteye(true);
            setwarning(false);
            set_password_warning(false);
        }
    }
    
    const input_username=(username_event)=>{
        setusername(username_event.target.value); 
    }
    const input_password=(password_event)=>{
        set_inputpassword(password_event.target.value);
    }  
    
    
    const Login=()=>{
        set_warning_username(false);
        set_warning_password(false);
        setIsAuth(false)
        if(username==""){
            set_warning_username(true);
        }
        else if(inputs_password==""){
            set_warning_password(true);
        }
        else{
            Authorization()
        }
    }
     useEffect(()=>{
        localStorage.setItem('isAuth', isAuth)
     }, [isAuth])
    const Authorization = ()=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName: username,password: inputs_password  })
        };
        fetch(`${CONFIG.HOST}/api/Auth/Login`, requestOptions)
            .then(response => response.json())
            .then(data => {if(data.success){
                    setIsAuth(true)
                    localStorage.setItem('jwt', data.value)
                    setIsAuth(true)
                    // navigate("Map")
            }
        else{
            setIsAuth(false)
        }});
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
}
    return(  
        <Suspense fallback={<h1>Loading...</h1>}>    
        <Header/>
           <div className="container">
               <div className="card">
                   <h3>{t("hajj fleet managment system")}</h3>
                   <div className="input_text">
                       <input type="text" className={`${warning_username ? "text_warning" : "" }`} value={username} onChange={input_username} required/> 
                       <label>{t("username")}</label>
                   </div>
                   <div className="input_text">
                       <input type={password} className={` ${warning_valid_password ? "text_warning" : "" } ${warning ? "warning" : "" }`} value={inputs_password} onChange={input_password} required/> 
                        <label>{t("password")}</label>
                        <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}></i>
                   </div>
                   <div className="button">
                      <button  onClick={Login} ><label>{t("login")}</label></button>
                   </div>
               </div>
           
           </div>
        
        
           </Suspense >
        );
}
export default Login