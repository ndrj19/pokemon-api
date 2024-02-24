const { connectToMongo } = require("../DbConn");
const { pokemonResponse } = require("../Services");

const getPokemonData = async (field, res) => {
  try {
    const db = await connectToMongo();
    const pokemon = db.collection("pokemon");

    const pokemonData = await pokemon.distinct(field);
    res.json(pokemonResponse(pokemonData, field));
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Unexpected error", data: [] });
  }
};

const getAllPokemonNamesAction = async (req, res) => {
  await getPokemonData("name", res);
};

const getAllPokemonTypesAction = async (req, res) => {
  await getPokemonData("type", res);
};

const getAllPokemonClassificationsAction = async (req, res) => {
  await getPokemonData("misc.classification", res);
};

module.exports = {
  getAllPokemonNamesAction,
  getAllPokemonTypesAction,
  getAllPokemonClassificationsAction,
};
