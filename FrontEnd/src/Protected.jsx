import React from 'react'
import { Navigate } from 'react-router-dom'
import { useLogin } from './Login/LoginContext';


export default function Protected({ children }) {
	const { isLoggedIn } = useLogin();
    console.log(useLogin())
    if (!isLoggedIn) return <Navigate to='../login' replace={true} />
	else return <>{children}</>;
   
}