const pokemonResponse = (pokemon) => {
  return {
    message: "Successfully retrieved all pokemon data.",
    data: pokemon,
  };
};

module.exports = { pokemonResponse };
