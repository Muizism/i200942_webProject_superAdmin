import React, { useEffect, useState } from 'react';
import { getAllUsers, createUser, updateUser, deleteUser, getUser } from './api/backendAPI';
import './App.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [searchUserId, setSearchUserId] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);

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

  const handleSearchUser = () => {
    if (searchUserId) {
      getUser(searchUserId)
        .then((response) => {
          setSearchedUser(response.data);
        })
        .catch((error) => {
          console.error(error);
          setSearchedUser(null);
        });
    }
  };

  return (
    <div className='users-container'>
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

      {/* Search User Form */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by User ID"
          value={searchUserId}
          onChange={(e) => setSearchUserId(e.target.value)}
        />
        <button type="button" onClick={handleSearchUser}>Search</button>
      </div>

      {/* Display Users */}
      <table className="users-table">
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleUpdateUser(user.id, newUser)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Searched User */}
      {searchedUser && (
        <div className="searched-user">
          <h3>Searched User:</h3>
          <p>Name: {searchedUser.name}</p>
          <p>Email: {searchedUser.email}</p>
        </div>
      )}
    </div>
  );
};

export default Users;
