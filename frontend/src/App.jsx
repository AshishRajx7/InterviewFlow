import { useState, useEffect } from 'react'
import './App.css'
import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, UserButton } from "@clerk/clerk-react";

function App() {
  const [message, setMessage] = useState("Loading...")

  useEffect(() => {
    const api = import.meta.env.VITE_API_URL
    console.log("Local env API:", import.meta.env.VITE_API_URL)

    fetch(`${api}/books`)
      .then(res => res.json())
      .then(data => setMessage(data.msg))
      .catch(() => setMessage("Error connecting to backend"))
  }, [])

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>InterviewFlow</h1>
      <h3>Backend says: {message}</h3>
    <SignedOut>
      <SignInButton mode="modal"/>
    </SignedOut>

    <SignedIn>
      <SignOutButton />
    </SignedIn>

    <UserButton/>
    </div>
  )
}

export default App
