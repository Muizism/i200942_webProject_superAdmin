import React, { useEffect, useState } from 'react';
import { getAllAdmins, createAdmin, updateAdmin, deleteAdmin } from './api/backendAPI';
import './App.css';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '' });
  const [editingAdminId, setEditingAdminId] = useState(null);

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

  const handleCreateAdmin = () => {
   
    console.log(newAdmin)
      .then((response) => {
        setAdmins([...admins, response.data]);
        setNewAdmin({ name: '', email: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditAdmin = (admin) => {
    setEditingAdminId(admin.id);
    setNewAdmin({ name: admin.name, email: admin.email });
  };

  const handleUpdateAdmin = () => {
    if (editingAdminId) {
      updateAdmin(editingAdminId, newAdmin)
        .then(() => {
          const updatedAdmins = admins.map((admin) =>
            admin.id === editingAdminId ? { ...admin, ...newAdmin } : admin
          );
          setAdmins(updatedAdmins);
          setEditingAdminId(null);
          setNewAdmin({ name: '', email: '' });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleDeleteAdmin = (id) => {
    deleteAdmin(id)
      .then(() => {
        const filteredAdmins = admins.filter((admin) => admin.id !== id);
        setAdmins(filteredAdmins);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="admins-container">
      <h2>Admins</h2>

      {/* Create/Edit Admin Form */}
      <div className="form-container">
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
        {editingAdminId ? (
          <button className="edit-button" onClick={handleUpdateAdmin}>Update Admin</button>
        ) : (
          <button className="create-button" onClick={handleCreateAdmin}>Create Admin</button>
        )}
      </div>

      {/* Display Admins */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>
                <button className="edit-button" onClick={() => handleEditAdmin(admin)}>Edit</button>
              </td>
              <td>
                <button className="delete-button" onClick={() => handleDeleteAdmin(admin.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admins;
