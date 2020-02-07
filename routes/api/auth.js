//Routes for authentification
//Auth for users

const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const pool = require("../../config/keys");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//Route /api/auth

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  //Simple Validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const query1 = `SELECT * FROM user_list where email="${email}"`;
    const [response1] = await pool.query(query1);

    //Check for existing user
    if (response1.length === 0) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const user1 = response1[0];
    const user_id = response1[0].user_id;
    const name = response1[0].name;

    //Validate password
    const match = await bcrypt.compare(password, user1.password);
    if (!match) return res.status(400).json({ msg: "Invalid Credentials" });

    jwt.sign(
      {
        id: user_id,
        name,
        email
      },
      "Secret",
      { expiresIn: 3600 },
      (err, token) => {
        const info = {
          token,
          user: {
            id: user_id,
            name,
            email
          }
        };
        console.log(info);
        res.json(info);
      }
    );
  } catch (e) {
    console.log(e);
    return res.send("Error fetching data");
  }
});

//Get query to authenticate user
//Private Route

router.get("/user", auth, async (req, res) => {
  const query = `SELECT user_id, name, email FROM user_list WHERE user_id = ${req.user.id};`;
  try {
    const [response] = await pool.query(query);
    const user = {
      user_id: response[0].user_id,
      name: response[0].name,
      email: response[0].email
    };
    console.log(user);
    return res.json(user);
  } catch (e) {
    console.log(e);
    return res.send("Error AUTHENTIFICATING");
  }
});

module.exports = router;
