import React, { useState } from "react";
import "../../styles/Auth.css";

// Assets
import cat from "../../assets/avatars/cat.png"; //<= included in starter code

// Services
import { addStudent } from "../../services/authService";

//Components

const AddStudent = ({user}) => {
  const [msg, setMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: user.email,
    // password: "",
    grade: 1,
    role: "student",
    avatar: cat,
  });

  const handleChange = (e) => {
    setMsg("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStudent(formData);
      // props.handleSignupOrLogin();
    } catch (error) {
      setMsg(error.message);
    }
  };

  return (
    <div className="add-student-page">
      <div className="form-container">
        <div className="title-container">
          <h1>Add a Student</h1>
          {msg ? <h3>{msg}</h3> : ""}
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            required
            name="name"
            type="text"
            autoComplete="off"
            placeholder="name"
            onChange={handleChange}
            value={formData.name}
          />
          {/*
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
          /> */}
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

          <button autoComplete="off" id="submit-button" type="submit">
            ADD STUDENT
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
