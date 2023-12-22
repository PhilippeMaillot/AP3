require("dotenv").config(); // Add this line to load environment variables from .env file
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const model = require("../models/testModel");

class TestController {
  static testCookie(req, res) {
    try {
      let token = jwt.sign({ userId: 1 } ,'trst', { expiresIn: '1d' });      
      res.cookie('token', token, { expires: new Date(Date.now() + 604800000), httpOnly: true, secure: false})
      res.json({ token: token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = TestController;