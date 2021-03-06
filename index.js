const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const dbConfig = process.env.MONGODB_URI;
require('dotenv').config();

// Express route
const studentRoute = require('./routes/student.route');

// Connecting MongoDB Database
// mongoose.Promise = global.Promise; // deleteable? no longer use?
mongoose
  .connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Database successfully connected');
  }, err => {
    console.log('Could not connect to database:', err);
  })

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') app.use(cors());
app.use('/api', studentRoute);

app.use((err, req, res, next) => {
  // console.log('error this error handler =', err)
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
})

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Connected to port ${port}...`);
  console.log(`http://localhost:${port}`);
})