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
  });
};

module.exports.addNewAstronaut = async (req, res) => {
  const { astronaut } = req.body;
  const newAstronaut = new Astronaut(astronaut);
  const savedAstronaut = await newAstronaut.save();
  res.redirect("/astronauts/all");
};
