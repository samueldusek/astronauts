const Astronaut = require('../models/astronaut');

module.exports.showAllAstronauts = async (req, res) => {
    const astronauts = await Astronaut.find({});
    res.render('astronauts/index', {
        pageTitle: "All Astronauts",
        astronauts: astronauts,
    })
}