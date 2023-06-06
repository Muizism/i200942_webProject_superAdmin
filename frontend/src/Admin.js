import React, { useEffect, useState } from 'react';
import { getAllAdmins, createAdmin, updateAdmin, deleteAdmin } from './api/backendAPI';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '' });

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
    <div>
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
      {admins.map((admin) => (
        <div key={admin.id}>
          <p>Name: {admin.name}</p>
          <p>Email: {admin.email}</p>
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
            <button type="submit">Update Admin</button>
          </form>

          <button onClick={() => handleDeleteAdmin(admin.id)}>Delete Admin</button>
        </div>
      ))}
    </div>
  );
};

export default Admins;
