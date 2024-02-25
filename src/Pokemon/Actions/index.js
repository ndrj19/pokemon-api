const { connectToMongo } = require("../DbConn");
const { pokemonResponse } = require("../Services");

const getAllPokemonAction = async (req, res) => {
  try {
    const db = await connectToMongo();
    const pokemon = db.collection("pokemon");

    let field = req.query.fields;
    if (field) {
      if (field === "classification") field = "misc." + field;
      const pokemonData = await pokemon.distinct(field);
      res.json(pokemonResponse(pokemonData, field));
    } else {
      const pokemonData = await pokemon.find().toArray();
      res.json(pokemonResponse(pokemonData, "collection"));
    }
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
    res.json(pokemonResponse(pokemonData, pokemonId));
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

module.exports = {
  getAllPokemonAction,
  getPokemonByIdAction,
  getAllPokemonByTypeAction,
};
