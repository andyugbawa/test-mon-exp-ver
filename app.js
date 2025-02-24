const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const app = express();
const counterRoutes = require('./routes/index');



// MongoDB Connection
const MONGODB_URI = process.env.VERCEL_ENV === 'production' 
    ? process.env.MONGODB_URI_PROD 
    : process.env.MONGODB_URI_PROD;
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
app.listen(3001,()=>{
    console.log("LISTEN 3001 APP")
})
module.exports = app;

