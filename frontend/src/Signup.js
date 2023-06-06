import React, { useState } from 'react';
import { signUp } from './api/backendAPI';
import { Link } from "react-router-dom"; 

const Signup = () => {
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });

  const handleSignup = () => {
    signUp(userData)
      .then((response) => {
        console.log(response.data); // Handle success
      })
      .catch((error) => {
        console.error(error); // Handle error
      });
  };

  return (
    <div className='signup-container'>
    <h2>Signup</h2>

    <form onSubmit={(e) => {
      e.preventDefault();
      handleSignup();
    }}>
      <input
        type="text"
        placeholder="Name"
        value={userData.name}
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
      />
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
      <button type="submit">Sign Up</button>
      <p className='login-text'>Already have an account? <Link to="/">Login</Link></p>
    </form>
  </div>
  );
};

export default Signup;
