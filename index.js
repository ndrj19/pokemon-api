const express = require("express");

const {
  getAllPokemonAction,
  getAllPokemonNamesAction,
  getPokemonByIdAction,
  getAllPokemonByTypeAction,
  getPokemonByNameAction,
} = require("./src/Pokemon/Actions");

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Here you will find Pokémon");
});

app.get("/pokemon", getAllPokemonAction);
app.get("/pokemon/names", getAllPokemonNamesAction);
app.get("/pokemon/type/:type", getAllPokemonByTypeAction);
app.get("/pokemon/:pokemonId", getPokemonByIdAction);
app.get("/pokemon/name/:name", getPokemonByNameAction);

app.listen(port, () => {
  console.log(`Pokémon API listening on port ${port}`);
});
