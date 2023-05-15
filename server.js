const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

//calling routes
const dashboardRoutes = require('./routes/superAdmin/dashboard');
const manageAdminsRoutes = require('./routes/superAdmin/manageAdmins');
const manageHotelsRoutes = require('./routes/superAdmin/manageHotels');
const manageUsersRoutes = require('./routes/superAdmin/manageUsers');
const reportsAnalyticsRoutes = require('./routes/superAdmin/reportAnalytics'); 



// Your MongoDB connection string
 
const dbURI = process.env.dbURI; 

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000, () => console.log('Server is running on port 3000 and DB is connected')))
    .catch((err) => console.log(err));

// Middleware
app.use(cors());
app.use(express.json())


// Routes
app.use('/dashboard', dashboardRoutes);
app.use('/manageAdmins', manageAdminsRoutes);
app.use('/manageHotels',manageHotelsRoutes);
app.use('/manageUsers', manageUsersRoutes);
app.use('/reportsAnalytics', reportsAnalyticsRoutes);

// 404 route
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
