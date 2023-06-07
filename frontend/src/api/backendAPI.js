import axios from 'axios';

const backendAPI = axios.create({
  baseURL: 'http://localhost:3000',
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
  return backendAPI.get('/manageHotels/hotels');
};

// export const getHotel = (id) => {
//   return backendAPI.get(`/manageHotels/${id}`);
// };

export const createHotel = (hotelData) => {
  return backendAPI.post('/manageHotels/create', hotelData);
};

export const updateHotel = (id, hotelData) => {
  console.log(id);
  return backendAPI.put(`/manageHotels/hotels/${id}`, hotelData);
};

export const deleteHotel = (id) => {
  console.log(id);
  return backendAPI.delete(`/manageHotels/delete/${id}`);
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
  console.log(id);
  return backendAPI.delete(`/manageusers/${id}`);
};

// Report analytics route
export const getReports = () => {
  return backendAPI.get('/reportsAnalytics');
};
