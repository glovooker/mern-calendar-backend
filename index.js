const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Create Express server
const app = express();

// Database
dbConnection();

// CORS configuration
const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://localhost:3000', 'https://mern-calendar-gamma.vercel.app'], // Add other domains as needed
    optionsSuccessStatus: 200 // For legacy browser support
  };

// CORS
app.use(cors(corsOptions));

// Public directory
app.use(express.static('public'));
app.use('/assets', express.static('public/assets'));

// Read and parse body
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.get('*', (req,res) => {
    res.sendFile(__dirname + '/public/index.html');
})

// Listen requests
app.listen( process.env.PORT, () => {
    console.log(`Listening on port ${ process.env.PORT }`);
});
