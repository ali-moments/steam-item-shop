const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');

const config = require('./config');

const app = express();
const port = 3000;



// MongoDB connection
const username = config.mongodb.username;
const password = config.mongodb.password;
const dbIP = config.mongodb.ip;
const dbPort = config.mongodb.port;
const dbName = config.mongodb.name; 

mongoose.connect(`mongodb://${username}:${password}@${dbIP}:${dbPort}/${dbName}`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Middlewares
const allowedOrigins = [config.cors.allowedOrigins];
const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));

app.use(bodyParser.json());

// Routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});