import React from 'react'
import { SignIn } from '@clerk/clerk-react'

function Login() {
  return (

    <div className="flex w-full h-[calc(100vh-80px)] justify-center items-center">
        <SignIn signUpUrl="register"/>
    </div>
  )
}

export default Login