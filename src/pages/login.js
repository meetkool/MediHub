import Link from "next/link"
import React, { useState } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"


import Image from "next/image"
import app, { auth } from "@/configs/firebase"
import { Router, useRouter } from "next/router"

import logo from '../assets/logo.png'

const Login = () => {
  const [email, setEmail] = useState("allenshibu@outlook.in")
  const [password, setPassword] = useState("hello123")
  const router = useRouter()

  const login = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user, "signed in")
        router.push("/dashboard")
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  return (
    <div className="h-[100vh] flex  flex-row justify-evenly ">
      <div className="flex flex-col items-center  justify-center h-[100vh]">
        <div className="flex flex-col gap-4 mt-10 shadow-lg p-8  rounded-lg">
          <div className="flex flex-row justify-center items-center gap-4">
            <Image src={logo} alt="Logo" width={40} height={40} />
            <h1 className="text-4xl font-bold tracking-wider text-slate-500">
              EzyCare
            </h1>
          </div>
          <h3 className="text-3xl font-bold text-center">Login</h3>
          <label className="text-xl ">Email</label>
          <input
            type="text"
            placeholder="johndoe@gmail.com"
            className="w-80 h-10 mb-5 "
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
          <label className="text-xl ">Password</label>
          <input
            type="password"
            placeholder="********"
            className="w-80 h-10  mb-5 "
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <button
            onClick={login}
            className="w-[120px] bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Login
          </button>
          <p>
            New User? Register{" "}
            <Link href="/signup" className="my-3 py-3 underline">
              here
            </Link>{" "}
          </p>
        </div>
      </div>
      <img
        className=""
        src="https://stories.freepiklabs.com/api/vectors/health-professional-team/amico/render?color=407BFFFF&background=complete&hide="
      />
    </div>
  )
}

export default Login
