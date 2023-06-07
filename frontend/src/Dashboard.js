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
    <div className="container-fluid bg-dark text-light min-vh-100">
      <header className="py-4 bg-black">
        <nav className="navbar navbar-expand-lg navbar-dark bg-black justify-content-between">
          <div className="d-flex align-items-center">
            <i className="bi bi-person-fill fs-4 me-2 text-white"></i>
            <h1 className="navbar-brand fs-3 ms-2">Super Admin Dashboard</h1>
          </div>
          <div className="d-flex">
            <Link to="/users" className="nav-link btn btn-light mx-3">
              <i className="bi bi-people-fill me-2"></i>Users
            </Link>
            <Link to="/admins" className="nav-link btn btn-light mx-3">
              <i className="bi bi-person-badge-fill me-2"></i>Admins
            </Link>
            <Link to="/hotels" className="nav-link btn btn-light mx-3">
              <i className="bi bi-building-fill me-2"></i>Hotels
            </Link>
            <Link to="/" className="nav-link btn btn-light mx-3">
              Logout
            </Link>
          </div>
        </nav>
      </header>

      <main className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {loading ? (
                <p className="mt-4">Loading dashboard stats...</p>
              ) : (
                stats && (
                  <div>
                    <h3 className="mt-4 text-center">Dashboard Stats</h3>
                    <p className="text-center">Total Admins: {stats.totalAdmins}</p>
                    <p className="text-center">Total Hotels: {stats.totalHotels}</p>
                    <p className="text-center">Total Users: {stats.totalUsers}</p>
                    {/* Display additional dashboard stats as needed */}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-3 text-center">
        <p>&copy; 2023 Muezism. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
