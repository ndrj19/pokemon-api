const pokemonResponse = (pokemon) => {
  return {
    message: "Successfully found pokemon.",
    data: pokemon,
  };
};

module.exports = { pokemonResponse };
