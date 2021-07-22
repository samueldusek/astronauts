const Astronaut = require("../models/astronaut");

module.exports.showAllAstronauts = async (req, res) => {
  const astronauts = await Astronaut.find({});
  res.render("astronauts/index", {
    pageTitle: "All Astronauts",
    astronauts: astronauts,
  });
};

module.exports.showAddForm = (req, res) => {
  res.render("astronauts/add", {
    pageTitle: "Add new astronaut",
    isEditing: false,
  });
};

module.exports.showEditForm = async (req, res) => {
  const { id } = req.params;
  const editedAstronaut = await Astronaut.findById(id);
  res.render("astronauts/add", {
    pageTitle: "Edit astronaut",
    isEditing: true,
    astronaut: editedAstronaut,
  });
};

module.exports.addNewAstronaut = async (req, res) => {
  const { astronaut } = req.body;
  const newAstronaut = new Astronaut(astronaut);
  const savedAstronaut = await newAstronaut.save();
  res.redirect("/astronauts/all");
};

module.exports.deleteAstronaut = async (req, res) => {
  const { id } = req.params;
  const deletedAstronaut = await Astronaut.findByIdAndDelete(id);
  res.redirect("/astronauts/all");
};

module.exports.editAstronaut = async (req, res) => {
  const { id } = req.params;
  const { astronaut } = req.body;
  const editedAstronaut = await Astronaut.findByIdAndUpdate(id, astronaut, {
    useFindAndModify: false,
  });
  res.redirect("/astronauts/all");
};
