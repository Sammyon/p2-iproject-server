const express = require('express')
const router = express.Router()
const ControllerLogin = require('../controllers/users');

router.post("/login", ControllerLogin.login);
router.post("/register", ControllerLogin.register);

module.exports = router