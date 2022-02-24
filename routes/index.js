const express = require("express");
const Controller = require("../controllers");
const router = express.Router();
// const authenticator = require("../middlewares/authenticator");
const user = require ("./user")

router.use ('/users', user)
router.get ('/news', Controller.getTopNews)
router.get ('/covidDatas', Controller.getCovidData)
router.get ('/weathers', Controller.getWeathers)
// router.use(authenticator);


module.exports = router;