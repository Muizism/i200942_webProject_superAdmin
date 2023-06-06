import React, { useEffect, useState } from 'react';
import { getAllUsers, createUser, updateUser, deleteUser } from './api/backendAPI';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  useEffect(() => {
    // Fetch users from the backend API
    getAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCreateUser = () => {
    createUser(newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        setNewUser({ name: '', email: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateUser = (id, updatedUser) => {
    updateUser(id, updatedUser)
      .then(() => {
        const updatedUsers = users.map((user) =>
          user.id === id ? { ...user, ...updatedUser } : user
        );
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteUser = (id) => {
    deleteUser(id)
      .then(() => {
        const filteredUsers = users.filter((user) => user.id !== id);
        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Users</h2>

      {/* Create User Form */}
      <form onSubmit={handleCreateUser}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button type="submit">Create User</button>
      </form>

      {/* Display Users */}
      {users.map((user) => (
        <div key={user.id}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Update User Form */}
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpdateUser(user.id, newUser);
          }}>
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <button type="submit">Update User</button>
          </form>

          <button onClick={() => handleDeleteUser(user.id)}>Delete User</button>
        </div>
      ))}
    </div>
  );
};

export default Users;
