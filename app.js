const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const app = express();
const counterRoutes = require('./routes/index');
var MONGODB_URI = "mongodb+srv://andyugbawa:utXW8UXhMNSXq8g4@cluster0.sfypk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// MongoDB Connection
// const MONGODB_URI = process.env.VERCEL_ENV === 'production' 
//     ? process.env.MONGODB_URI_PROD
//     : process.env.MONGODB_URI_PROD;
//     console.log(MONGODB_URI);
mongoose.connect(MONGODB_URI, { dbName: 'counter' })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Middleware and Routes
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.use('/api', counterRoutes);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port`);
});
module.exports = app;
