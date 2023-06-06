import React, { useEffect, useState } from 'react';
import { getDashboardStats } from './api/backendAPI';
import './App.css';
import { Link } from 'react-router-dom';

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
          totalHotels: hotelCount,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='dashboard-container'>
      

      <main className='dashboard-main'>
        <div className='dashboard-content'>
          <h2>Dashboard</h2>
          <nav className='dashboard-nav'>
            <Link to='/users'>Users</Link>
            <Link to='/admins'>Admins</Link>
            <Link to='/hotels'>Hotels</Link>
            <Link to='/report-analytics'>Report Analytics</Link>
          </nav>
          {loading ? (
            <p className='dashboard-loading'>Loading dashboard stats...</p>
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
      </main>

      <footer className='dashboard-footer'>
        <p>&copy; 2023 My App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
