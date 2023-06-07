import React, { useState } from 'react';
import { signIn } from './api/backendAPI';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [showWarning, setShowWarning] = useState(false); // State for showing warning message
  const [showError, setShowError] = useState(false); // State for showing error message
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!userData.email || !userData.password) {
      setShowWarning(true); // Show warning if fields are empty
      return;
    }

    signIn(userData)
      .then((response) => {
        console.log(response.data); // Handle success
        toast.success('Login successful', { autoClose: 1000 });
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error(error); // Handle error
        setShowError(true); // Show error message
        navigator.vibrate(200); // Vibrate the device
      });
  };

  return (
    <div className="bg-dark text-light min-vh-100">
      <header className="py-4">
        <h2>Login</h2>
      </header>

      <main className="container py-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>
          {showWarning && (
            <p className="text-danger">Please fill in all fields.</p>
          )}
          {showError && (
            <p className="text-danger shake">Invalid username or password.</p>
          )}
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>

        <p className="signup-text">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </main>

      <footer className="mt-auto py-3 text-center">
        <p>&copy; 2023 Muezism. All rights reserved.</p>
      </footer>

      <ToastContainer /> {/* React-Toastify container */}
    </div>
  );
};

export default Login;
