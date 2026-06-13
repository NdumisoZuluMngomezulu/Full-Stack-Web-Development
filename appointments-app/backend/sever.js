const express = require('express');
const mongoose = requre('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express(); //server that i will attach routes and middleware to
app.use(cors()); //allows cross origin requests so the front end(html and js can talk to the front end)
app.use(express.json()) //parses in json requests. Without this req.boyd would be empty

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

app.use('/api/auth', require('./routes/auth')); //tells express that any request starting with /api/auth should be handled by auth.js in routes folder
app.use('/api/appointments'), require('./routes/appointment');
app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
