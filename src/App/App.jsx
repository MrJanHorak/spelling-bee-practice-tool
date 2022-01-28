import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

//Services
import { getUser, logout } from '../services/authService'

// Pages + Components
import SignUp from '../pages/Auth/SignUp'
import SignIn from '../pages/Auth/SignIn'

const App = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(getUser())

  const handleSignupOrLogin = async () => {
    const currentUser = getUser()
    setUser(currentUser)
  }


  const handleLogout = () => {
    logout()
    setUser(null)
    navigate('/')
  }



  return (
    <div className="App">
      <Routes>

        <Route path="/"
          element={<h1>Landing</h1>}
        />

        <Route path="/signin"
          element={<SignIn handleSignupOrLogin={handleSignupOrLogin} />}
        />

        <Route path="/signup"
          element={<SignUp handleSignupOrLogin={handleSignupOrLogin} />}
        />

      </Routes>

    </div>
  )
}

export default App