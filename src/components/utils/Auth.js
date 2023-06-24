import React from 'react'
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
    const Token = localStorage.getItem("TOKEN");
    return (
        <div>
            {Token ? children : <Navigate to="/" />}
        </div>
    )
}
export default Protected;