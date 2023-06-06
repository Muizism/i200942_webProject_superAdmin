import React, { useEffect, useState } from 'react';
import { getAllHotels, createHotel, updateHotel, deleteHotel } from './api/backendAPI';
import './App.css';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [newHotel, setNewHotel] = useState({ name: '', location: '' });

  useEffect(() => {
    // Fetch hotels from the backend API
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

  return (
    <div className='hotels'>
      <h2>Hotels</h2>

      {/* Create Hotel Form */}
      <form onSubmit={handleCreateHotel}>
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
        <button type="submit">Create Hotel</button>
      </form>

      {/* Display Hotels */}
      {hotels.map((hotel) => (
        <div key={hotel.id}>
          <p>Name: {hotel.name}</p>
          <p>Location: {hotel.location}</p>
          {/* Update Hotel Form */}
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpdateHotel(hotel.id, newHotel);
          }}>
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
            <button type="submit">Update Hotel</button>
          </form>

          <button onClick={() => handleDeleteHotel(hotel.id)}>Delete Hotel</button>
        </div>
      ))}
    </div>
  );
};

export default Hotels;
