const express = require('express');
const balanceRoute = require('./routes/balanceRoute');
const pythonRoutes = require('./routes/pythonRoutes');

const app = express();
app.use(express.json());

app.use('/api', balanceRoute);
app.use('/api', pythonRoutes);

// Default error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

module.exports = app;
