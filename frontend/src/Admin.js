import React, { useEffect, useState } from 'react';
import {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAdmin,
} from './api/backendAPI';
import './App.css';

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
  }, [admins, newAdmin]);

  const handleCreateAdmin = (event) => {
    event.preventDefault();

    if (editMode) {
      handleUpdateAdmin(editingAdminId, newAdmin);
      setEditMode(false);
      setEditingAdminId('');
      window.alert('Admin updated successfully!');
    } else {
      createAdmin(newAdmin)
        .then((response) => {
          setAdmins([...admins, response.data]);
          setNewAdmin({ name: '', email: '' });
          window.alert('Admin created successfully!');
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
        window.alert('Admin deleted successfully!');
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

  return (
    <div className="admins-container">
      <h2>Admins</h2>

      {/* Create/Edit Admin Form */}
      <form onSubmit={handleCreateAdmin}>
        <input
          type="text"
          placeholder="Name"
          value={newAdmin.name}
          onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newAdmin.email}
          onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
        />
        <button type="submit">{editMode ? 'Update' : 'Create Admin'}</button>
        {editMode && (
          <button
            type="button"
            onClick={() => {
              setEditMode(false);
              setEditingAdminId('');
              setNewAdmin({ name: '', email: '' });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Display Admins */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Number</th>
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
                <button onClick={() => handleEditAdmin(admin)}>Edit</button>
                <button onClick={() => handleDeleteAdmin(admin._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admins;
