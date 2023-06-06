import React, { useState } from 'react';
import { signIn } from './api/backendAPI';
import './App.css';
import { Link } from "react-router-dom"; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const handleLogin = () => {
    signIn(userData)
      .then((response) => {
        console.log(response.data); // Handle success
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error(error); // Handle error
      });
  };

  return (
    <div className='login-container'>
    <h2>Login</h2>

    <form onSubmit={(e) => {
      e.preventDefault();
      handleLogin();
    }}>
      <input
        type="email"
        placeholder="Email"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>

    <p className='signup-text'>Don't have an account? <Link to="/signup">Signup</Link></p>
  </div>
  );
};

export default Login;
