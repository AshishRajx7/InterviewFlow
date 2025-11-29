import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("Loading...")

  useEffect(() => {
    const api = import.meta.env.VITE_API_URL

    console.log("Calling backend:", api)

    fetch(`${api}/books`)
      .then(res => res.json())
      .then(data => setMessage(data.msg))
      .catch(err => {
        console.error(err)
        setMessage("Error connecting to backend")
      })
  }, [])

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>InterviewFlow</h1>
      <h3>Backend says: {message}</h3>
    </div>
  )
}

export default App
