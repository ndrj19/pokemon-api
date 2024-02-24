const express = require("express");

const {
  getAllPokemonAction,
  getPokemonByIdAction,
  getAllPokemonByTypeAction,
} = require("./src/Pokemon/Actions");

const {
  getAllPokemonNamesAction,
  getAllPokemonTypesAction,
  getAllPokemonClassificationsAction,
} = require("./src/PokemonDistinct/Actions");

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Ebba! Here you will find Pokémon");
});

app.get("/pokemon", getAllPokemonAction);
app.get("/pokemon/type/:type", getAllPokemonByTypeAction);
app.get("/pokemon/:pokemonId", getPokemonByIdAction);
app.get("/pokemon-names", getAllPokemonNamesAction);
app.get("/pokemon-types", getAllPokemonTypesAction);
app.get("/pokemon-classifications", getAllPokemonClassificationsAction);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
