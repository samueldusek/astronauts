const express = require("express");
const router = express.Router();
const astronautsController = require("../controllers/astronauts");
const { body } = require("express-validator");

router.route("/all").get(astronautsController.showAllAstronauts);

router
  .route("/add")
  .get(astronautsController.showAddForm)
  .post(
    body("astronaut.firstName")
      .isAlpha()
      .withMessage("Only letters are allowed in astronaut name."),
    body("astronaut.lastName")
      .isAlpha()
      .withMessage("Only letters are allowed in astronaut name."),
    body("astronaut.birthday").isDate().withMessage("Enter valid date format."),
    astronautsController.addNewAstronaut
  );

router.route("/:id/edit").get(astronautsController.showEditForm);

router
  .route("/:id")
  .delete(astronautsController.deleteAstronaut)
  .put(
    body("astronaut.firstName")
      .isAlpha()
      .withMessage("Only letters are allowed in astronaut name."),
    body("astronaut.lastName")
      .isAlpha()
      .withMessage("Only letters are allowed in astronaut name."),
    body("astronaut.birthday").isDate().withMessage("Enter valid date format."),
    astronautsController.editAstronaut
  );

module.exports = router;
