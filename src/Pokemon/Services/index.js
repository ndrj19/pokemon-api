const pokemonResponse = (data, category) => {
  return {
    message: "Successfully retrieved pokemon data",
    data: data,
  };
};

module.exports = { pokemonResponse };
