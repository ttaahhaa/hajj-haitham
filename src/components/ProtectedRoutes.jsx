import React, {useState} from 'react'
import {Routes, Route} from "react-router-dom"

import Login from './Authentication/Login/Login'
import App from '../App'
function ProtectedRoutes() {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("jwt") !== null)

    return (
        <Routes>
            {isAuth && (
            <Route path="/" element={<App setIsAuth={setIsAuth} isAuth={isAuth}/>} />
            )}
            {!isAuth&&(<Route path="/" element={<Login setIsAuth={setIsAuth} isAuth={isAuth}/>} />)}
            <Route path="*" element={<div>Page is Not Found 404</div>} />
        </Routes>

    )
}

export default ProtectedRoutes