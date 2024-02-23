const { connectToMongo } = require("../DbConn");
const { pokemonResponse } = require("../Services");

const getAllPokemonDataAction = async (req, res) => {
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

module.exports = { getAllPokemonDataAction };
