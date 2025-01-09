import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";  // Import Materialize CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      if (response.data.token && response.data.user) {
        alert("Login successful!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user details in localStorage
        navigate("/home"); // Redirect to the home page after successful login
      } else {
        alert("Invalid login response. Please try again.");
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.error || "Login failed. Please try again.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="row">
        <div className="col s12 m8 l6 offset-l3 offset-m2">
          <div className="card">
            <div className="card-content">
              <span className="card-title center-align">Welcome Back!</span>
              <p className="center-align">Log in to your account</p>

              <form onSubmit={handleSubmit}>
                <div className="input-field">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="validate"
                    required
                  />
                  <label htmlFor="email" className={email ? "active" : ""}>
                    Email Address
                  </label>
                </div>

                <div className="input-field">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="validate"
                    required
                  />
                  <label htmlFor="password" className={password ? "active" : ""}>
                    Password
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn waves-effect waves-light teal darken-2"
                  style={{ width: "100%" }}
                >
                  Login
                </button>
              </form>
            </div>
            <div className="card-action center-align">
              <a href="#" className="teal-text">Forgot Password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
