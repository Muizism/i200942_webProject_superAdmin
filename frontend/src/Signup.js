import React, { useState } from 'react';
import { signUp } from './api/backendAPI';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });
  const [showWarning, setShowWarning] = useState(false); // State for showing warning message

  const handleSignup = () => {
    if (!userData.name || !userData.email || !userData.password) {
      setShowWarning(true); // Show warning if any field is empty
      return;
    }

    signUp(userData)
      .then((response) => {
        console.log(response.data); // Handle success
        toast.success('Signup successful', { autoClose: 1000 });
        setTimeout(() => {
          window.location.href = '/'; // Navigate to the '/' route
        }, 1000);
      })
      .catch((error) => {
        console.error(error); // Handle error
      });
  };

  return (
    <div className="bg-dark text-light min-vh-100">
      <div className="container py-4">
        <h2>Signup</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
          </div>
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
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
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
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
          </div>
          {showWarning && (
            <p className="text-danger">Please fill in all fields.</p>
          )}{' '}
          {/* Show warning message */}
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
          <p className="login-text">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
      <footer className="mt-auto py-3 text-center">
        <p>&copy; 2023 Muezism. All rights reserved.</p>
      </footer>
      <ToastContainer /> {/* React-Toastify container */}
    </div>
  );
};

export default Signup;
