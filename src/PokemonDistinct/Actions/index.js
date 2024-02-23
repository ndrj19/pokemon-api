const { connectToMongo } = require("../DbConn");
const { pokemonResponse } = require("../Services");

const getAllPokemonNamesAction = async (req, res) => {
  try {
    const db = await connectToMongo();
    const pokemon = db.collection("pokemon");

    const pokemonNames = await pokemon.distinct("name");
    res.json(pokemonResponse(pokemonNames, "name"));
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Unexpected error", data: [] });
  }
};

module.exports = { getAllPokemonNamesAction };
