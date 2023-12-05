const express = require('express');
const router = express.Router();
const db = require('../config/db');
const testController = require('../controllers/testController');

router.post('/cookie', async (req, res) => {testController.testCookie(req, res)});

module.exports = router;