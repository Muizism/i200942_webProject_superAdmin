import React, { useEffect, useState } from 'react';
import { getAllAdmins, createAdmin, updateAdmin, deleteAdmin, getAdminById } from './api/backendAPI';
import './App.css';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '' });
  const [searchId, setSearchId] = useState('');
  const [searchedAdmin, setSearchedAdmin] = useState(null);

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
    createAdmin(newAdmin)
      .then((response) => {
        setAdmins([...admins, response.data]);
        setNewAdmin({ name: '', email: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateAdmin = (id, updatedAdmin) => {
    updateAdmin(id, updatedAdmin)
      .then(() => {
        const updatedAdmins = admins.map((admin) =>
          admin.id === id ? { ...admin, ...updatedAdmin } : admin
        );
        setAdmins(updatedAdmins);
      })
      .catch((error) => {
        console.error(error);
      });
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

      {/* Create Admin Form */}
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
        <button type="submit">Create Admin</button>
      </form>

   

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
                {/* Update Admin Form */}
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateAdmin(admin.id, newAdmin);
                }}>
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
                  <button type="submit">Update</button>
                </form>
              </td>
              <td>
                <button onClick={() => handleDeleteAdmin(admin.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display Searched Admin */}
      {searchedAdmin && (
        <div className="searched-admin">
          <h3>Searched Admin</h3>
          <p>ID: {searchedAdmin.id}</p>
          <p>Name: {searchedAdmin.name}</p>
          <p>Email: {searchedAdmin.email}</p>
        </div>
      )}
    </div>
  );
};

export default Admins;
