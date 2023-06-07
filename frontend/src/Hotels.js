import React, { useEffect, useState } from 'react';
import { getAllHotels, createHotel, updateHotel, deleteHotel } from './api/backendAPI';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Link } from 'react-router-dom';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [newHotel, setNewHotel] = useState({ name: '', location: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingHotelId, setEditingHotelId] = useState(null);

  useEffect(() => {
    getAllHotels()
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [hotels, newHotel]);

  const handleCreateHotel = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    createHotel(newHotel)
      .then((response) => {
        setHotels([...hotels, response.data]);
        setNewHotel({ name: '', location: '' });
        showToast('Hotel created successfully!');
      })
      .catch((error) => {
        console.error(error);
        showToast('Failed to create hotel.');
      });
  };

  const handleUpdateHotel = (id, updatedHotel) => {
    updateHotel(id, updatedHotel)
      .then(() => {
        const updatedHotels = hotels.map((hotel) =>
          hotel.id === id ? { ...hotel, ...updatedHotel } : hotel
        );
        setHotels(updatedHotels);
        setEditingHotelId(null);
        setIsEditing(false);
        showToast('Hotel updated successfully!');
      })
      .catch((error) => {
        console.error(error);
        showToast('Failed to update hotel.');
      });
  };

  const handleDeleteHotel = (id) => {
    deleteHotel(id)
      .then(() => {
        const filteredHotels = hotels.filter((hotel) => hotel.id !== id);
        setHotels(filteredHotels);
        showToast('Hotel deleted successfully!');
      })
      .catch((error) => {
        console.error(error);
        showToast('Failed to delete hotel.');
      });
  };

  const handleEditHotel = (hotel) => {
    setNewHotel({ name: hotel.name, location: hotel.location });
    setEditingHotelId(hotel._id);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setNewHotel({ name: '', location: '' });
    setEditingHotelId(null);
    setIsEditing(false);
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
                src="/hotel.png"
                alt="Hotel Icon"
                className="icon"
                style={{ width: '80px', height: '80px' }}
              />
            <i className="bi bi-person-fill fs-4 me-2 text-white"></i>
            <h1 className="navbar-brand fs-3 ms-2">Manage Hotels</h1>
          </div>
          <div className="d-flex">
            <Link to="/dashboard" className="nav-link btn btn-light mx-3">
              <i className="bi bi-people-fill me-2"></i>Dashboard
            </Link>
            <Link to="/admins" className="nav-link btn btn-light mx-3">
              <i className="bi bi-person-badge-fill me-2"></i>Admins
            </Link>
            <Link to="/users" className="nav-link btn btn-light mx-3">
              <i className="bi bi-building-fill me-2"></i>Users
            </Link>
            <Link to="/" className="nav-link btn btn-light mx-3">
              Logout
            </Link>
          </div>
        </nav>
      </header>
      <br />
      <form
        className="hotel-form"
        onSubmit={
          isEditing
            ? (e) => {
                e.preventDefault();
                handleUpdateHotel(editingHotelId, newHotel);
              }
            : handleCreateHotel
        }
      >
         <div className="col-md-4">
        <input
          className="form-control"
          type="text"
          placeholder="Name"
          value={newHotel.name}
          onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
        />
        </div>
        <div className="col-md-4">
        <input
          className="form-control"
          type="text"
          placeholder="Location"
          value={newHotel.location}
          onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })}
        />
          </div>
        {isEditing ? (
          <>
            <button className="btn btn-primary me-2" type="submit">
              Update Hotel
            </button>
            <button className="btn btn-secondary" onClick={handleCancelEdit}>
              Cancel
            </button>
          </>
        ) : (
          <button className="btn btn-primary" type="submit">
            Create Hotel
          </button>
        )}
      </form>

      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
       
<tbody>
  {hotels.map((hotel,index) => (
    <tr key={hotel._id}>
      <th scope="row">{index + 1}</th>
      <td>{hotel.name}</td>
      <td>{hotel.location}</td>
      <td>
        {isEditing && editingHotelId === hotel._id ? (
          <button
            className="btn btn-primary"
            onClick={() => handleUpdateHotel(hotel._id, newHotel)}
          >
            Update
          </button>
        ) : (
          <>
            <button className="btn btn-secondary" onClick={() => handleEditHotel(hotel)}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={() => handleDeleteHotel(hotel._id)}>
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  ))}
</tbody>
      </table>

      <ToastContainer />
    </div>
  );
};

export default Hotels;
