const { connectToMongo } = require("../DbConn");
const { pokemonResponse } = require("../Services");
const { findBestMatch } = require("string-similarity");

const getAllPokemonAction = async (req, res) => {
  try {
    const db = await connectToMongo();
    const pokemon = db.collection("pokemon");

    const pokemonData = await pokemon.find().toArray();
    res.json(pokemonResponse(pokemonData));
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Unexpected error", data: [] });
  }
};

const getAllPokemonNamesAction = async (req, res) => {
  try {
    const db = await connectToMongo();
    const pokemon = db.collection("pokemon");

    const pokemonData = await pokemon.distinct("name");
    res.json(pokemonResponse(pokemonData));
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Unexpected error", data: [] });
  }
};

const getPokemonByIdAction = async (req, res) => {
  try {
    const db = await connectToMongo();
    const pokemon = db.collection("pokemon");

    const pokemonId = req.params.pokemonId.padStart(3, "0");
    const pokemonData = await pokemon.find({ id: pokemonId }).toArray();
    res.json(pokemonResponse(pokemonData));
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Unexpected error", data: [] });
  }
};

const getAllPokemonByTypeAction = async (req, res) => {
  try {
    const db = await connectToMongo();
    const pokemon = db.collection("pokemon");
    const type = req.params.type;

    const pokemonData = await pokemon.find({ type: type }).toArray();
    res.json(pokemonResponse(pokemonData));
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Unexpected error", data: [] });
  }
};

const getPokemonByNameAction = async (req, res) => {
  try {
    const db = await connectToMongo();
    const pokemon = db.collection("pokemon");
    const name = req.params.name;

    const pokemonNames = await pokemon.distinct("name");
    const matches = findBestMatch(name, pokemonNames);
    const bestMatch = matches.bestMatch;
    if (bestMatch.rating < 0.3) {
      return res.status(404).json({ error: "No matching Pokémon found" });
    }
    const matchedPokemon = await pokemon
      .find({ name: bestMatch.target })
      .toArray();
    res.json(pokemonResponse(matchedPokemon));
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Unexpected error", data: [] });
  }
};

module.exports = {
  getAllPokemonAction,
  getAllPokemonNamesAction,
  getPokemonByIdAction,
  getAllPokemonByTypeAction,
  getPokemonByNameAction,
};
