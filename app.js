const express = require('express');
// const mysql = require('mysql2');
// const pool = require('./config/keys');

const app = express();
app.use(express.json());

app.use('/api/tasks', require('./routes/api/tasks'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Port configuration and listening
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
