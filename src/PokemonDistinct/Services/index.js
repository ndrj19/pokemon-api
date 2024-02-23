const pokemonResponse = (data, category) => {
  return {
    message: `Successfully found all pokemon ${category}s.`,
    data: data,
  };
};

module.exports = { pokemonResponse };
