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
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [users]);

  const fetchUsers = () => {
    getAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCreateUser = (event) => {
    event.preventDefault();

    if (editMode) {
      handleUpdateUser(editingUserId, newUser);
      setEditMode(false);
      setEditingUserId('');
      setPopupMessage('User updated successfully!');
    } else {
      createUser(newUser)
        .then((response) => response.json())
        .then((data) => {
          setUsers([...users, data]);
          setNewUser({ name: '', email: '' });
          setPopupMessage('User created successfully!');
          fetchUsers(); // Fetch updated users
        })
        .catch((error) => {
          console.error(error);
        });
    }
    showPopupMessage();
  };

  const handleUpdateUser = (id, updatedUser) => {
    updateUser(id, updatedUser)
      .then(() => {
        const updatedUsers = users.map((user) =>
          user.id === id ? { ...user, ...updatedUser } : user
        );
        setUsers(updatedUsers);
        setNewUser({ name: '', email: '' });
        setPopupMessage('User updated successfully!');
        fetchUsers(); // Fetch updated users
      })
      .catch((error) => {
        console.error(error);
      });
    showPopupMessage();
  };

  const handleDeleteUser = (id) => {
    deleteUser(id)
      .then(() => {
        const filteredUsers = users.filter((user) => user.id !== id);
        setUsers(filteredUsers);
        setPopupMessage('User deleted successfully!');
        fetchUsers(); // Fetch updated users
      })
      .catch((error) => {
        console.error(error);
      });
    showPopupMessage();
  };

  const showPopupMessage = () => {
    setPopupMessage('');
    setTimeout(() => {
      setPopupMessage('');
    }, 9000);
  };

  const handleEditUser = (user) => {
    setEditMode(true);
    setEditingUserId(user._id);
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
                <button onClick={() => handleEditUser(user)}>Edit</button>
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

      {/* Popup Message */}
      {popupMessage && <div className="popup-message">{popupMessage}</div>}
    </div>
  );
};

export default Users;
