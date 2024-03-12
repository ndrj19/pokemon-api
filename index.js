const express = require("express");

const {
  getAllPokemonDataAction,
  getPokemonByIdAction,
  listPokemonNamesAction,
  searchPokemonByNameAction,
  listPokemonTypesAction,
} = require("./src/Pokemon/Actions");

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Here you will find Pokémon");
});

app.get("/pokemon", getAllPokemonDataAction);
app.get("/pokemon/names", listPokemonNamesAction);
app.get("/pokemon/search", searchPokemonByNameAction);
app.get("/pokemon/types", listPokemonTypesAction);
app.get("/pokemon/:id", getPokemonByIdAction);

app.listen(port, () => {
  console.log(`Pokémon API listening on port ${port}`);
});
