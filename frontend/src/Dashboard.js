import React, { useEffect, useState } from 'react';
import { getDashboardStats } from './api/backendAPI';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard stats from the backend API
    getDashboardStats()
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
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
