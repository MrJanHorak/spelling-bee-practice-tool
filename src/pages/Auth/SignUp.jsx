import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/Auth.css";

// Assets
import cat from "../../assets/avatars/cat.png"; //<= included in starter code

// Services
import { signup } from "../../services/authService";

//Components
import AvatarSelection from "./AvatarSelection";

const SignUp = (props) => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const [msg, setMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    grade: null,
    avatar: cat,
  });

  const handlePopup = () => {
    setPopup(!popup);
  };

  const handleChange = (e) => {
    setMsg("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      props.handleSignupOrLogin();
      navigate("/posts");
    } catch (error) {
      setMsg(error.message);
    }
  };

  return (
    <div className="signup-page">
      {popup && (
        <AvatarSelection
          formData={formData}
          handleChange={handleChange}
          handlePopup={handlePopup}
        />
      )}

      <div className="form-container">
        <div className="title-container">
          <h1>Create an Account</h1>
          {msg ? <h3>{msg}</h3> : <h3>A spelling bee for on the road.</h3>}
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            required
            name="name"
            type="text"
            autoComplete="off"
            placeholder="Username"
            onChange={handleChange}
            value={formData.name}
          />
          <input
            required
            name="email"
            type="email"
            autoComplete="off"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            required
            name="password"
            type="password"
            autoComplete="off"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
          />
          <input
            required
            name="grade"
            type="number"
            min="1"
            max="8"
            autoComplete="off"
            placeholder="grade"
            onChange={handleChange}
            value={formData.grade}
          />

          <button
            type="button"
            autoComplete="off"
            id="avatar-button"
            onClick={handlePopup}
          >
            Select Avatar
          </button>

          <button autoComplete="off" id="submit-button" type="submit">
            SIGN UP
          </button>
        </form>
        <div className="redirect-container">
          <p>Already have an account?</p>
          <Link className="redirect-link" to="/signin">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
