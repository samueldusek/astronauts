const express = require("express");
const router = express.Router();
const astronautsController = require("../controllers/astronauts");

router.route('/all').get(astronautsController.showAllAstronauts);

module.exports = router;