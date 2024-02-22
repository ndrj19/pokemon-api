const express = require("express");
const { getPokemonAction } = require("./src/Pokemon/Actions");

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Ebba! Here you will find Pokémon");
});

app.get("/pokemon", getPokemonAction);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
