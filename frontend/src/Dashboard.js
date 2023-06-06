import React, { useEffect, useState } from 'react';
import { getDashboardStats } from './api/backendAPI';
import './App.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard stats from the backend API
    getDashboardStats()
      .then((response) => {
        const { adminCount, userCount, hotelCount } = response.data;
        setStats({
          totalAdmins: adminCount,
          totalUsers: userCount,
          totalHotels: hotelCount
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='dashboard'>
      <h2>Dashboard</h2>

      {loading ? (
        <p>Loading dashboard stats...</p>
      ) : (
        stats && (
          <div>
            <p>Total Admins: {stats.totalAdmins}</p>
            <p>Total Hotels: {stats.totalHotels}</p>
            <p>Total Users: {stats.totalUsers}</p>
            {/* Display additional dashboard stats as needed */}
          </div>
        )
      )}
    </div>
  );
};

export default Dashboard;
