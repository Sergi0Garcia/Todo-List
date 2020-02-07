//Routes for users

const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const pool = require("../../config/keys");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const query = `INSERT INTO user_list SET ?`;
  const { name, email, password } = req.body;

  //Simple Validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //Create salt & hash
  try {
    const hashpassword = await bcrypt.hash(password, 10);
    const [queryResult] = await pool.query(query, {
      name,
      email,
      password: hashpassword
    });
    jwt.sign(
      {
        id: queryResult.insertId,
        name,
        email
      },
      "Secret",
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        const info = {
          token,
          user: {
            id: queryResult.insertId,
            name,
            email
          }
        };
        res.json(info);
      }
    );
  } catch (e) {
    console.log(e);
    return res.send("Error fetching data");
  }
});

module.exports = router;
