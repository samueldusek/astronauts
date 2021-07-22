const express = require("express");
const router = express.Router();
const astronautsController = require("../controllers/astronauts");

router.route('/all').get(astronautsController.showAllAstronauts);

router.route('/add').get(astronautsController.showAddForm).post(astronautsController.addNewAstronaut);

module.exports = router;