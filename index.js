const express = require("express");
const { getAllPokemonDataAction } = require("./src/PokemonAll/Actions");
const {
  getAllPokemonNamesAction,
  getAllPokemonTypesAction,
} = require("./src/PokemonDistinct/Actions");

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Ebba! Here you will find Pokémon");
});

app.get("/pokemon", getAllPokemonDataAction);
app.get("/pokemon-names", getAllPokemonNamesAction);
app.get("/pokemon-types", getAllPokemonTypesAction);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
