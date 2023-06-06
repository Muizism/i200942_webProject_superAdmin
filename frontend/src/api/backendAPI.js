import axios from 'axios';

const backendAPI = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your actual backend URL
});

export const getDashboardStats = () => {
  return backendAPI.get('/dashboard');
};

// Admins routes
export const getAllAdmins = () => {
  return backendAPI.get('/admins');
};

export const getAdmin = (id) => {
  return backendAPI.get(`/admins/${id}`);
};

export const createAdmin = (adminData) => {
  return backendAPI.post('/admins/createAdmin', adminData);
};

export const updateAdmin = (id, adminData) => {
  return backendAPI.put(`/admins/${id}`, adminData);
};

export const deleteAdmin = (id) => {
  return backendAPI.delete(`/admins/${id}`);
};

// Authentication routes
export const signUp = (userData) => {
  return backendAPI.post('/manageAdmins/signup', userData);
};


export const signIn = (userData) => {
  return backendAPI.post('/manageAdmins/signin', userData);
};

// Hotels routes
export const getAllHotels = () => {
  return backendAPI.get('/hotels');
};

export const getHotel = (id) => {
  return backendAPI.get(`/hotels/${id}`);
};

export const createHotel = (hotelData) => {
  return backendAPI.post('/hotels/create', hotelData);
};

export const updateHotel = (id, hotelData) => {
  return backendAPI.put(`/hotels/${id}`, hotelData);
};

export const deleteHotel = (id) => {
  return backendAPI.delete(`/hotels/${id}`);
};

// Users routes
export const getAllUsers = () => {
  return backendAPI.get('/users');
};

export const getUser = (id) => {
  return backendAPI.get(`/users/${id}`);
};

export const createUser = (userData) => {
  return backendAPI.post('/users', userData);
};

export const updateUser = (id, userData) => {
  return backendAPI.put(`/users/${id}`, userData);
};

export const deleteUser = (id) => {
  return backendAPI.delete(`/users/${id}`);
};

// Report analytics route
export const getReports = () => {
  return backendAPI.get('/reports');
};
