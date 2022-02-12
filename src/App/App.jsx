import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

//Services
import { getUser, logout } from '../services/authService'

// Pages + Components
import Nav from '../components/Nav/Nav'
import SignUp from '../pages/Auth/SignUp'
import SignIn from '../pages/Auth/SignIn'
import Study from '../pages/Study/Study'
import Spellingbee from '../pages/Spellingbee/Spellingbee'

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
      <Nav user={user} handleLogout={handleLogout} />
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

        <Route path="/study" element={<Study />}/>
        <Route path="/spellingbee" element={<Spellingbee />}/>

      </Routes>

    </div>
  )
}

export default App