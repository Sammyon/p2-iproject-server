const express = require("express");
const router = express.Router();
// const authenticator = require("../middlewares/authenticator");
const user = require ("./user")

router.use ('/users', user)

// router.use(authenticator);


module.exports = router;