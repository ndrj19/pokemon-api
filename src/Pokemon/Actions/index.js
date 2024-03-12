const { connectToMongo } = require("../DbConn");
const errors = require("../Utils/errors");
const { findBestMatch } = require("string-similarity");

const getAllPokemonDataAction = async (req, res) => {
  let status = 200;
  try {
    const db = await connectToMongo();
    const pokemon = db.collection("pokemon2");

    const type = req.query.type;
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

const getPokemonByIdAction = async (req, res) => {
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

const listPokemonNamesAction = async (req, res) => {
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

const searchPokemonByNameAction = async (req, res) => {
  let status = 200;

  try {
    const db = await connectToMongo();
    const pokemon = db.collection("pokemon2");
    const name = req.query.name;

    const pokemonNames = await pokemon.distinct("name");

    const matches = findBestMatch(name, pokemonNames);
    const bestMatch = matches.bestMatch;

    if (bestMatch.rating < 0.3) {
      return res.status(404).json({ error: "No matching Pokémon found" });
    }
    const matchedPokemon = await pokemon
      .find({ name: bestMatch.target })
      .toArray();
    return res.status(status).json({
      message: "Successfully found Pokémon",
      data: matchedPokemon,
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

const listPokemonTypesAction = async (req, res) => {
  let status = 200;
  try {
    const db = await connectToMongo();
    const pokemon = db.collection("pokemon2");

    const pokemonData = await pokemon.distinct("type");
    return res.status(status).json({
      message: `Successfully retrieved all Pokémon types`,
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

// new action: all types

module.exports = {
  getAllPokemonDataAction,
  getPokemonByIdAction,
  listPokemonNamesAction,
  searchPokemonByNameAction,
  listPokemonTypesAction,
};
