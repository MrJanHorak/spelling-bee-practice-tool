import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

//Services
import { getUser, logout } from "../services/authService";

// Pages + Components
import Nav from "../components/Nav/Nav";
import SignUp from "../pages/Auth/SignUp";
import SignIn from "../pages/Auth/SignIn";
import Study from "../pages/Study/Study";
import Spellingbee from "../pages/Spellingbee/Spellingbee";
import Admin from "../pages/Admin/Admin";
import Landing from "../pages/Landing/Landing";
import Profile from "../pages/Profile/Profile";

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUser());

  const handleSignupOrLogin = async () => {
    const currentUser = await getUser();
    setUser(currentUser);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/");
  };

  return (
    <div className="App">
      <Nav user={user} handleLogout={handleLogout} />
      <Routes>        
        <Route path="/" element={<Landing user = { user }/> } />
        <Route path="/signin" element={<SignIn handleSignupOrLogin={handleSignupOrLogin} />} />
        <Route path="/signup" element={<SignUp handleSignupOrLogin={handleSignupOrLogin} />} />
        <Route path="/study" element={<Study user = { user }/>} />
        <Route path="/spellingbee" element={<Spellingbee user = { user } />} />
        <Route path="/profile" element={<Profile user = { user } />} />
        <Route path="/admin" element={<Admin user = { user } />} />
      </Routes>
    </div>
  );
};

export default App;