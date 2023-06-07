import axios from 'axios';

const backendAPI = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your actual backend URL
});

export const getDashboardStats = () => {
  return backendAPI.get('/dashboard');
};

// Admins routes
export const getAllAdmins = () => {
  return backendAPI.get('/manageAdmins');
};

export const getAdmin = (id) => {
  return backendAPI.get(`/manageAdmins/${id}`);
};

export const createAdmin = (adminData) => {
  return backendAPI.post('/manageAdmins/createAdmin', adminData);
  
};


export const updateAdmin = (id, adminData) => {
  return backendAPI.put(`/manageAdmins/${id}`, adminData);
};

export const deleteAdmin = (id) => {
  return backendAPI.delete(`/manageAdmins/${id}`);
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
  return backendAPI.get('/manageHotels');
};

export const getHotel = (id) => {
  return backendAPI.get(`/manageHotels/${id}`);
};

export const createHotel = (hotelData) => {
  return backendAPI.post('/manageHotels/create', hotelData);
};

export const updateHotel = (id, hotelData) => {
  return backendAPI.put(`/manageHotels/${id}`, hotelData);
};

export const deleteHotel = (id) => {
  return backendAPI.delete(`/manageHotels/${id}`);
};

// Users routes
export const getAllUsers = () => {
  return backendAPI.get('/manageUsers');
};

export const getUser = (id) => {
  return backendAPI.get(`/manageusers/${id}`);
};

export const createUser = (userData) => {
  return backendAPI.post('/manageusers', userData);
};

export const updateUser = (id, userData) => {
  return backendAPI.put(`/manageusers/${id}`, userData);
};

export const deleteUser = (id) => {
  return backendAPI.delete(`/manageusers/${id}`);
};

// Report analytics route
export const getReports = () => {
  return backendAPI.get('/reportsAnalytics');
};
