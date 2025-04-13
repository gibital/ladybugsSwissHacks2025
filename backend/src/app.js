const express = require('express');
// const balanceRoute = require('./routes/balanceRoute');
const router = require('./routes/pythonRoutes');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json());

// app.use('/api', balanceRoute);
app.use('/api', router);

// Default error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

module.exports = app;
