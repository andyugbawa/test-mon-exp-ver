const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const counterRoutes = require('./routes/index');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI_DEV);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// app.use(express.json());
app.use('/api', counterRoutes);
app.use(express.static('src/public')); // Serve static files

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});