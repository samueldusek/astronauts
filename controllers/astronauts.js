const Astronaut = require("../models/astronaut");
const User = require("../models/user");

module.exports.showAllAstronauts = async (req, res) => {
  const { _id: userId } = req.user;
  const user = await User.findById(userId).populate("astronauts");
  res.render("astronauts/index", {
    pageTitle: "All Astronauts",
    astronauts: user.astronauts,
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
  const { _id: userId } = req.user;
  const { astronaut } = req.body;
  const user = await User.findById(userId);
  const newAstronaut = new Astronaut(astronaut);
  const savedAstronaut = await newAstronaut.save();
  user.astronauts.push(savedAstronaut);
  await user.save();
  res.redirect("/astronauts/all");
};

module.exports.deleteAstronaut = async (req, res) => {
  const { id: astronautId } = req.params;
  const deletedAstronaut = await Astronaut.findByIdAndDelete(astronautId);
  res.redirect("/astronauts/all");
};

module.exports.editAstronaut = async (req, res) => {
  const { id: astronautId } = req.params;
  const { astronaut } = req.body;
  const editedAstronaut = await Astronaut.findByIdAndUpdate(
    astronautId,
    astronaut,
    {
      useFindAndModify: false,
    }
  );
  res.redirect("/astronauts/all");
};
