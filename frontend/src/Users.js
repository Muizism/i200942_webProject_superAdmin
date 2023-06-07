import React, { useEffect, useState } from 'react';
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
} from './api/backendAPI';
import './App.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [searchUserId, setSearchUserId] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState('');

  useEffect(() => {
    // Fetch users from the backend API
    getAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [users]);

  const handleCreateUser = () => {
    if (editMode) {
      handleUpdateUser(editingUserId, newUser);
      setEditMode(false);
      setEditingUserId('');
    } else {
      createUser(newUser)
        .then((response) => {
          setUsers([...users, response.data]);
          setNewUser({ name: '', email: '' });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleUpdateUser = (id, updatedUser) => {
    updateUser(id, updatedUser)
      .then(() => {
        const updatedUsers = users.map((user) =>
          user.id === id ? { ...user, ...updatedUser } : user
        );
        setUsers(updatedUsers);
        setNewUser({ name: '', email: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteUser = (id) => {
  //  console.log(id);
    // console.log("Moiz");
    // const response=deleteUser(id);
    // if(response.status===200)
    // {
    //   console.log("Deleted");
    // }
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

  const handleEditUser = (user) => {
    setEditMode(true);
    setEditingUserId(user.id);
    setNewUser({ name: user.name, email: user.email });
  };

  return (
    <div className="users-container">
      <h2>Users</h2>

      {/* Create/Edit User Form */}
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
        <button type="submit">{editMode ? 'Update' : 'Create User'}</button>
        {editMode && (
          <button
            type="button"
            onClick={() => {
              setEditMode(false);
              setEditingUserId('');
              setNewUser({ name: '', email: '' });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Search User Form */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by User ID"
          value={searchUserId}
          onChange={(e) => setSearchUserId(e.target.value)}
        />
        <button type="button" onClick={handleSearchUser}>
          Search
        </button>
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
                <button onClick={() => handleEditUser(user._id)}>Edit</button>
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
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
