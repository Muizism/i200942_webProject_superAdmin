import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      showToast('User updated successfully!');
    } else {
      createUser(newUser)
        .then((response) => {
          setUsers([...users, response.data]);
          setNewUser({ name: '', email: '' });
          showToast('User created successfully!');
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
      //  showToast('User updated successfully!');
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
        showToast('User deleted successfully!');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const showToast = (message) => {
    toast.success(message, { autoClose: 2000 });
  };

  const handleEditUser = (user) => {
    setEditMode(true);
    setEditingUserId(user._id); // Set the editingUserId before entering edit mode
    setNewUser({ name: user.name, email: user.email });
  };
  return (
    <div className="container-fluid bg-dark text-light min-vh-100">
      <header className="py-4 bg-black">
        <nav className="navbar navbar-expand-lg navbar-dark bg-black justify-content-between">
          <div className="d-flex align-items-center">
          <img
                src="/user.png"
                alt="User Icon"
                className="icon"
                style={{ width: '80px', height: '80px' }}
              />
            <i className="bi bi-person-fill fs-4 me-2 text-white"></i>
            <h1 className="navbar-brand fs-3 ms-2">Manage Users</h1>
          </div>
          <div className="d-flex">
            <Link to="/dashboard" className="nav-link btn btn-light mx-3">
              <i className="bi bi-people-fill me-2"></i>Dashboard
            </Link>
            <Link to="/admins" className="nav-link btn btn-light mx-3">
              <i className="bi bi-person-badge-fill me-2"></i>Admins
            </Link>
            <Link to="/hotels" className="nav-link btn btn-light mx-3">
              <i className="bi bi-building-fill me-2"></i>Hotels
            </Link>
            <Link to="/" className="nav-link btn btn-light mx-3">
              Logout
            </Link>
          </div>
        </nav>
      </header>
      <br />
      {/* Create/Edit User Form */}
      <form onSubmit={handleCreateUser} className="mb-4">
        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({ ...newUser, name: e.target.value })
              }
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-primary">
              {editMode ? 'Update' : 'Create User'}
            </button>
            {editMode && (
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => {
                  setEditMode(false);
                  setEditingUserId('');
                  setNewUser({ name: '', email: '' });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Display Users */}
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Searched User */}
      {searchedUser && (
        <div className="card mt-4">
          <div className="card-header">
            <h3 className="card-title">Searched User:</h3>
          </div>
          <div className="card-body">
            <p>Name: {searchedUser.name}</p>
            <p>Email: {searchedUser.email}</p>
          </div>
        </div>
      )}

      {/* Popup Message */}
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
    </div>
  );
};

export default Users;
