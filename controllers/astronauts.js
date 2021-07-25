const Astronaut = require("../models/astronaut");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const AppError = require("../utils/AppError");

module.exports.showAllAstronauts = async (req, res, next) => {
  const { _id: userId } = req.user;
  const user = await User.findById(userId).populate("astronauts");
  if (!user) {
    throw new AppError("User not found!", 404);
  }
  res.render("astronauts/index", {
    pageTitle: "All Astronauts",
    astronauts: user.astronauts,
    path: "/astronauts/all",
  });
};

module.exports.showAddForm = (req, res) => {
  res.render("astronauts/add", {
    pageTitle: "Add new astronaut",
    isEditing: false,
    isFixing: false,
    errors: [],
    path: "/astronauts/add",
  });
};

module.exports.showEditForm = async (req, res, next) => {
  const { id } = req.params;
  const editedAstronaut = await Astronaut.findById(id);
  if (!editedAstronaut) {
    throw new AppError("Astronaut not found!", 404);
  }
  res.render("astronauts/add", {
    pageTitle: "Edit astronaut",
    isEditing: true,
    isFixing: false,
    astronaut: {
      ...editedAstronaut._doc,
      birthday: editedAstronaut.birthday.toISOString().slice(0, 10),
    },
    errors: [],
    path: "/astronauts/add",
  });
};

module.exports.addNewAstronaut = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { astronaut } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.render("astronauts/add", {
      pageTitle: "Add new astronaut",
      isFixing: true,
      isEditing: false,
      errors: errors.array().map((error) => {
        return { msg: error.msg, param: error.param };
      }),
      astronaut: astronaut,
      path: "/astronauts/add",
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not Found!", 404);
  }
  const newAstronaut = new Astronaut(astronaut);
  const savedAstronaut = await newAstronaut.save();
  user.astronauts.push(savedAstronaut);
  await user.save();
  res.redirect("/astronauts/all");
};

module.exports.deleteAstronaut = async (req, res, next) => {
  const { id: astronautId } = req.params;
  const deletedAstronaut = await Astronaut.findByIdAndDelete(astronautId);
  res.redirect("/astronauts/all");
};

module.exports.editAstronaut = async (req, res, next) => {
  const { id: astronautId } = req.params;
  const { astronaut } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("astronauts/add", {
      pageTitle: "Add new astronaut",
      isFixing: true,
      isEditing: true,
      errors: errors.array().map((error) => {
        return { msg: error.msg, param: error.param };
      }),
      astronaut: { ...astronaut, _id: astronautId },
      path: "/astronauts/add",
    });
  }

  const editedAstronaut = await Astronaut.findByIdAndUpdate(
    astronautId,
    astronaut,
    {
      useFindAndModify: false,
    }
  );
  res.redirect("/astronauts/all");
};
