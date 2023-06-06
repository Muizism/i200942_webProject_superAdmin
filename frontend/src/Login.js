import React, { useState } from 'react';
import { signIn } from './api/backendAPI';

const Login = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });

  const handleLogin = () => {
    signIn(userData)
      .then((response) => {
        console.log(response.data); // Handle success
      })
      .catch((error) => {
        console.error(error); // Handle error
      });
  };

  return (
    <div>
      <h2>Login</h2>

      {/* Login Form */}
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
    </div>
  );
};

export default Login;
