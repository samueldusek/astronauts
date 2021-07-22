const express = require("express");
const router = express.Router();
const astronautsController = require("../controllers/astronauts");

router.route("/all").get(astronautsController.showAllAstronauts);

router
  .route("/add")
  .get(astronautsController.showAddForm)
  .post(astronautsController.addNewAstronaut);

router.route("/:id/edit").get(astronautsController.showEditForm);

router
  .route("/:id")
  .delete(astronautsController.deleteAstronaut)
  .put(astronautsController.editAstronaut);

module.exports = router;
