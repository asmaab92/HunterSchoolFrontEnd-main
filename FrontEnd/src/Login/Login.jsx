import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Login.css";
import Background from "../assets/Background.png";
import RegisterModal from "../Login/Register.jsx";
import { useLogin } from "../Login/LoginContext.jsx";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { isLoggedIn, saveLoginInfo } = useLogin(); // Destructure the correct function
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an admin

  const loginRequest = async () => {
    const adminUrl = "https://localhost:7211/Admin/login";
    const userUrl = "https://localhost:7211/User/login";
    const requestBody = {
      userName: userName,
      password: password,
    };

    try {
      // Try logging in as admin
      const adminResponse = await fetch(adminUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (adminResponse.ok) {
        const data = await adminResponse.json();
        console.log("Admin login successful", data);
        setIsAdmin(true); // Set the admin flag
        saveLoginInfo(data);
      } else {
        // If admin login fails, try logging in as user
        const userResponse = await fetch(userUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (userResponse.ok) {
          const data = await userResponse.json();
          console.log("User login successful", data);
          setIsAdmin()// Set the admin flag to false
          
          saveLoginInfo(data);
        } else {
          console.error("Login failed:", userResponse.status);
          setError("Invalid username or password. Please try again.");
        }
      }
    } catch (error) {
      console.error("Failed to connect", error);
      setError("Failed to connect to the server.");
    }
  };

  const handleCreateAccountClick = () => {
    setOpenRegisterModal(true);
  };

  const handleCloseRegisterModal = () => {
    setOpenRegisterModal(false);
  };

  if (isLoggedIn) {
    return <Navigate to={isAdmin ? "/Admin" : "/"} replace />;
  }

  return (
    <>
      <div className="container">
        <div className="Hunterimage">
          <img src={Background} alt="Login" className="login-image" />
        </div>

        <div className="login-form">
          <form>
            <h1>Login</h1>

          
            <TextField
              id="username"
              label="Username"
              variant="standard"
              fullWidth
              margin="normal"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="standard"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <a href="#" className="login-link"  onClick={loginRequest}>
              SIGN IN
            </a>
            <div className="create-account-container">
            <span>Don't have an account? </span>
             <a href="#" onClick={handleCreateAccountClick} className="login-link">
             REGISTER HERE
              </a>
            </div>
          </form>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>

      <RegisterModal
        open={openRegisterModal}
        onClose={handleCloseRegisterModal}
      />
    </>
  );
}
