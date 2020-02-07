//Database credentials
const mysql = require("mysql2/promise");

const config = {
  host: "localhost",
  user: "root",
  password: "password",
  database: "todo_list"
};

const pool = mysql.createPool(config);

//Connect MySQL
pool.query("SELECT 1 + 1 AS SOLUTION;", err => {
  if (err) {
    console.log("Database failed to connect");
    throw err;
  } else {
    console.log("Database connected with Successs");
  }
});

module.exports = pool;
