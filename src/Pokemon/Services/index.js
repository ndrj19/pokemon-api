const pokemonResponse = (data) => {
  return {
    message: "Successfully retrieved pokemon data",
    data: data,
  };
};

module.exports = { pokemonResponse };
