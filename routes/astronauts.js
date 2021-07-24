const express = require("express");
const router = express.Router();
const astronautsController = require("../controllers/astronauts");
const { body } = require("express-validator");
const { ensureAuthenticated } = require("../utils/isAuth");
const wrapAsync = require("../utils/wrapAsync");

router
  .route("/all")
  .get(ensureAuthenticated, wrapAsync(astronautsController.showAllAstronauts));

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
    wrapAsync(astronautsController.addNewAstronaut)
  );

router
  .route("/:id/edit")
  .get(ensureAuthenticated, wrapAsync(astronautsController.showEditForm));

router
  .route("/:id")
  .delete(ensureAuthenticated, wrapAsync(astronautsController.deleteAstronaut))
  .put(
    ensureAuthenticated,
    body("astronaut.firstName")
      .isAlpha()
      .withMessage("Only letters are allowed in astronaut name."),
    body("astronaut.lastName")
      .isAlpha()
      .withMessage("Only letters are allowed in astronaut name."),
    body("astronaut.birthday").isDate().withMessage("Enter valid date format."),
    wrapAsync(astronautsController.editAstronaut)
  );

module.exports = router;
