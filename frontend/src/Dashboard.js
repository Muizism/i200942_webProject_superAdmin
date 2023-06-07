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
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <img
              src="/Dashboardd.png"
              alt="Dashboard Icon"
              className="icon"
              style={{ width: '130px', height: '80px' }}
            />
            <i className="bi bi-person-fill fs-4 me-2 text-white"></i>
            <h1 className="navbar-brand fs-5 ms-2 fw-bold">Super Admin Dashboard</h1>
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/users" className="nav-link">
                  <i className="bi bi-people-fill me-2"></i>Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admins" className="nav-link">
                  <i className="bi bi-person-badge-fill me-2"></i>Admins
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/hotels" className="nav-link">
                  <i className="bi bi-building-fill me-2"></i>Hotels
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Logout
                </Link>
              </li>
            </ul>
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
