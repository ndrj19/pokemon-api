const { connectToMongo } = require("../DbConn");
const errors = require("../Utils/errors");

const getAllPokemon2DataAction = async (req, res) => {
  let status = 200;
  try {
    const db = await connectToMongo();
    const pokemon = db.collection("pokemon2");

    let type = req.query.type;
    const filter = {};
    if (type) {
      filter["type"] = type;
    }

    const pokemonData = await pokemon.find(filter).toArray();
    return res.status(status).json({
      message: `Successfully retrieved all ${
        type ? type + " type " : ""
      }Pokémon data`,
      data: pokemonData,
    });
  } catch (error) {
    status = 500;
    if (error instanceof errors.ValidationError) status = 400;
    return res.status(status).json({
      message: `Oops, something went wrong${
        status === 500 ? " on our end" : ""
      }.`,
    });
  }
};

const getPokemon2ByIdAction = async (req, res) => {
  let status = 200;
  try {
    const db = await connectToMongo();
    const pokemon = db.collection("pokemon2");
    const id = Number(req.params.id);

    const pokemonData = await pokemon.find({ id: id }).toArray();
    return res.status(status).json({
      message: `Successfully retrieved Pokémon #${id}`,
      data: pokemonData,
    });
  } catch (error) {
    status = 500;
    if (error instanceof errors.ValidationError) status = 400;
    return res.status(status).json({
      message: `Oops, something went wrong${
        status === 500 ? " on our end" : ""
      }.`,
    });
  }
};

const listAllPokemon2NamesAction = async (req, res) => {
  let status = 200;

  try {
    const db = await connectToMongo();
    const pokemon = db.collection("pokemon2");

    let type = req.query.type;
    const filter = {};
    if (type) {
      filter["type"] = type;
    }

    let sortField = req.query.sortField || "num";
    let sortOrder = parseInt(req.query.sortOrder) || 1;

    const sortOptions = {};
    sortOptions[sortField] = sortOrder;

    const pokemonData = await pokemon
      .find(filter)
      .project({ _id: 0, name: 1 })
      .sort(sortOptions)
      .toArray();

    const pokemonNames = pokemonData.map((pkmn) => pkmn.name);

    return res.status(status).json({
      message: "Successfully retrieved Pokémon names",
      data: pokemonNames,
    });
  } catch (error) {
    status = 500;
    if (error instanceof errors.ValidationError) status = 400;
    return res.status(status).json({
      message: `Oops, something went wrong${
        status === 500 ? " on our end" : ""
      }.`,
    });
  }
};

module.exports = {
  getAllPokemon2DataAction,
  getPokemon2ByIdAction,
  listAllPokemon2NamesAction,
};
