import React, { useEffect, useState } from 'react';
import { getAllHotels, createHotel, updateHotel, deleteHotel } from './api/backendAPI';
import './App.css';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [newHotel, setNewHotel] = useState({ name: '', location: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingHotelId, setEditingHotelId] = useState(null);

  useEffect(() => {
    // Fetch hotels from the backend API
    console.log('Fetching hotels from the backend API');
    getAllHotels()
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCreateHotel = () => {
    createHotel(newHotel)
      .then((response) => {
        setHotels([...hotels, response.data]);
        setNewHotel({ name: '', location: '' });
      })
      .catch((error) => {
        console.error(error);
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
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteHotel = (id) => {
    deleteHotel(id)
      .then(() => {
        const filteredHotels = hotels.filter((hotel) => hotel.id !== id);
        setHotels(filteredHotels);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditHotel = (hotel) => {
    setNewHotel({ name: hotel.name, location: hotel.location });
    setEditingHotelId(hotel.id);
    setIsEditing(true);
  };

  return (
    <div className="hotels">
      <h2>Hotels</h2>

      {/* Create/Update Hotel Form */}
      <form onSubmit={isEditing ? () => handleUpdateHotel(editingHotelId, newHotel) : handleCreateHotel}>
        <input
          type="text"
          placeholder="Name"
          value={newHotel.name}
          onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={newHotel.location}
          onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })}
        />
        <button type="submit">{isEditing ? 'Update Hotel' : 'Create Hotel'}</button>
      </form>

      {/* Display Hotels */}
      <table className="hotels-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.id}>
              <td>{hotel.name}</td>
              <td>{hotel.location}</td>
              <td>
                {isEditing && editingHotelId === hotel.id ? (
                  <button onClick={() => handleUpdateHotel(hotel.id, newHotel)}>Update</button>
                ) : (
                  <>
                    <button onClick={() => handleEditHotel(hotel)}>Edit</button>
                    <button onClick={() => handleDeleteHotel(hotel.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Hotels;
