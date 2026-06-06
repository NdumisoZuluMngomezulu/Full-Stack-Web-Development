const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console = require('console'));
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.listen(3000, () => console.log('Server on 3000'));