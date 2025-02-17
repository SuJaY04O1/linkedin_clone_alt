import React, { useState, useEffect } from "react";
import "../styles/Userlogin.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";



 export default function UserRegistration() {
  const [isSignUpMode, setIsSignUpMode] = useState(false); // State to track sign-up mode
  const toggleMode = () => {
    setIsSignUpMode(!isSignUpMode); // Toggle between sign-in and sign-up mode
  };

  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConPassword] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDob] = useState("");

  const [firstnameMessage, setFirstnameMessage] = useState("");
  const [messagePassword, setMessage] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [showError, setShowError] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const [logUser, setLogUser] = useState("");
  const [logPass, setLogPas] = useState("");

  useEffect(() => {
    const regExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!regExp.test(password)) {
      setMessage("Password is weak");
    } else {
      setMessage("");
    }
    if (password === "") setMessage("");

    const nameExp = /^[A-Za-z]+$/;
    if (!nameExp.test(firstname) || !nameExp.test(lastname))
      setFirstnameMessage("Firstname or lastname has invalid characters");
    else setFirstnameMessage("");
    if (firstname === "" || lastname === "") setFirstnameMessage("");

    if (password !== conpassword && conpassword !== "") {
      setErrorPass("Password doesn't match");
    } else {
      setErrorPass("");
    }
  }, [password, firstname, lastname, username, email, conpassword]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/users/signup", {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        contact: contact,
        date: dob,
      });

      console.log(username);
      setUsername("");
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setContact("");
      setDob("");
      setErrorPass("");
      localStorage.setItem("sessionToken", response.data.user_id);
      navigate("/home");
    } catch (error) {
      setUsernameError(error.response.data.error);
      setShowError(true);
      console.log("User Registration failed:", error.response.data.error);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:8080/users/login", {
        username: logUser,
        password: logPass,
      })
      .then((res) => {
        localStorage.setItem("sessionToken", res.data.user_id);
        navigate("/home");
      })
      .catch((error) => {
        setLoginError(error.response.data.error);
      });
  }
return(
    <>
      <Helmet>
        <script
          src="https://kit.fontawesome.com/64d58efce2.js"
          crossorigin="anonymous"
        />
      </Helmet>
      <div className={`form-container ${isSignUpMode ? "sign-up-mode" : ""}`}>
        <div className="forms-container">
          <div className="signin-signup">
            {/* Sign-in Form */}
            <form
              action="#"
              className={`sign-in-form ${isSignUpMode ? "hidden" : ""}`}
            >
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Username"
                  value={logUser}
                  onChange={(e) => {
                    setLogUser(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={logPass}
                  onChange={(e) => {
                    setLogPas(e.target.value);
                  }}
                  required
                />
              </div>
              <div>
                <h5>{loginError}</h5>
              </div>
              <input
                type="submit"
                value="Login"
                className="btn solid"
                onClick={handleLogin}
              />
              <p>Don't have an account?</p>
              <button className="btn transparent" onClick={toggleMode}>
                              Sign up
              </button>
            </form>

            {/* Sign-up Form */}
            <form
              action="#"
              className={`sign-up-form ${isSignUpMode ? "" : "hidden"}`}
              onSubmit={handleSubmit}
            >
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required
                />
              </div>
              {showError && (
                <div>
                  <h5>{usernameError}</h5>
                </div>
              )}
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="nameError">
                <h5>{firstnameMessage}</h5>
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastname}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="passError">
                <h5>{messagePassword}</h5>
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={conpassword}
                  onChange={(e) => {
                    setConPassword(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="passError">
                <h5>{errorPass}</h5>
              </div>
              <div className="input-field">
                <i className="fas fa-phone"></i>
                <input
                  type="tel"
                  placeholder="Phone no."
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-Time"></i>
                <input
                  type="date"
                  placeholder='DD/MM/YY'
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                  required
                />
              </div>
              <input type="submit" className="btn" value="Sign up" />
              <p>Already have an account?</p>
              <button className="btn transparent" onClick={toggleMode}>
                              Sign in
              </button>
            </form>
          </div>
        </div>


       </div>
     </>
)
}