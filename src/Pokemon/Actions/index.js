const { connectToMongo } = require("../DbConn");
const { pokemonResponse } = require("../Services");

const getPokemonAction = async (req, res) => {
  try {
    const db = await connectToMongo();
    const pokemon = db.collection("pokemon");

    const pokemonNames = await pokemon.distinct("name");
    res.json(pokemonResponse(pokemonNames));
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Unexpected error", data: [] });
  }
};

module.exports = { getPokemonAction };
