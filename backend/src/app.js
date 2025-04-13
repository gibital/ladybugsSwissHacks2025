const express = require('express');
const balanceRoute = require('./routes/balanceRoute');
const pythonRoutes = require('./routes/pythonRoutes');

const app = express();
app.use(express.json());

app.use('/api', balanceRoute);
app.use('/api', pythonRoutes);

const loanRoutes = require("./routes/loanRoutes");
app.use("/api", loanRoutes);

const rlusdRoutes = require("./routes/rlusdRoute");
app.use("/api", rlusdRoutes);

const trustlineRoute = require("./routes/trustlineRoute");
app.use("/api", trustlineRoute);


// Default error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

module.exports = app;
