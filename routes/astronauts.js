const express = require("express");
const router = express.Router();
const astronautsController = require("../controllers/astronauts");
const { body } = require("express-validator");
const { ensureAuthenticated } = require("../utils/isAuth");

router
  .route("/all")
  .get(ensureAuthenticated, astronautsController.showAllAstronauts);

router
  .route("/add")
  .get(ensureAuthenticated, astronautsController.showAddForm)
  .post(
    ensureAuthenticated,
    body("astronaut.firstName")
      .isAlpha()
      .withMessage("Only letters are allowed in astronaut name."),
    body("astronaut.lastName")
      .isAlpha()
      .withMessage("Only letters are allowed in astronaut name."),
    body("astronaut.birthday").isDate().withMessage("Enter valid date format."),
    astronautsController.addNewAstronaut
  );

router
  .route("/:id/edit")
  .get(ensureAuthenticated, astronautsController.showEditForm);

router
  .route("/:id")
  .delete(ensureAuthenticated, astronautsController.deleteAstronaut)
  .put(
    ensureAuthenticated,
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
