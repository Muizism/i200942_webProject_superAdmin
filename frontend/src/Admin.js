import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAdmin,
} from './api/backendAPI';
import './App.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '' });
  const [editMode, setEditMode] = useState(false);
  const [editingAdminId, setEditingAdminId] = useState('');

  useEffect(() => {
    // Fetch admins from the backend API
    getAllAdmins()
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCreateAdmin = (event) => {
    event.preventDefault();

    if (editMode) {
      handleUpdateAdmin(editingAdminId, newAdmin);
      setEditMode(false);
      setEditingAdminId('');
      showToast('Admin updated successfully!');
    } else {
      createAdmin(newAdmin)
        .then((response) => {
          setAdmins([...admins, response.data]);
          setNewAdmin({ name: '', email: '' });
          showToast('Admin created successfully!');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleUpdateAdmin = (id, updatedAdmin) => {
    updateAdmin(id, updatedAdmin)
      .then(() => {
        const updatedAdmins = admins.map((admin) =>
          admin._id === id ? { ...admin, ...updatedAdmin } : admin
        );
        setAdmins(updatedAdmins);
        setNewAdmin({ name: '', email: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteAdmin = (id) => {
    deleteAdmin(id)
      .then(() => {
        const filteredAdmins = admins.filter((admin) => admin._id !== id);
        setAdmins(filteredAdmins);
        showToast('Admin deleted successfully!');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditAdmin = (admin) => {
    setEditMode(true);
    setEditingAdminId(admin._id);
    setNewAdmin({ name: admin.name, email: admin.email });
  };
  const showToast = (message) => {
    toast.success(message, { autoClose: 2000 });
  };

  return (
    <div className="container-fluid bg-dark text-light min-vh-100">
      <header className="py-4 bg-black">
        <nav className="navbar navbar-expand-lg navbar-dark bg-black justify-content-between">
          <div className="d-flex align-items-center">
            <img
              src="/admin.png"
              alt="Admin Icon"
              className="icon"
              style={{ width: '80px', height: '80px' }}
            />
            <i className="bi bi-person-fill fs-4 me-2 text-white"></i>
            <h1 className="navbar-brand fs-3 ms-2">Manage Admins</h1>
          </div>
          <div className="d-flex">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  <i className="bi bi-people-fill me-2"></i>Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/users" className="nav-link">
                  <i className="bi bi-person-badge-fill me-2"></i>Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/hotels" className="nav-link">
                  <i className="bi bi-building-fill me-2"></i>Hotels
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <br />

      {/* Create/Edit Admin Form */}
      <form onSubmit={handleCreateAdmin}>
        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={newAdmin.name}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, name: e.target.value })
              }
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={newAdmin.email}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, email: e.target.value })
              }
            />
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-primary">
              {editMode ? 'Update' : 'Create Admin'}
            </button>
            {editMode && (
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => {
                  setEditMode(false);
                  setEditingAdminId('');
                  setNewAdmin({ name: '', email: '' });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Display Admins */}
      <div className="table-responsive">
        <table className="table table-striped table-dark mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={admin._id}>
                <td>{index + 1}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => handleEditAdmin(admin)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteAdmin(admin._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
    </div>
  );
};

export default Admins;
