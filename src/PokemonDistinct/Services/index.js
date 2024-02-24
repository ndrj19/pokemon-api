const pokemonResponse = (data, category) => {
  return {
    message: `Successfully found all pokemon ${
      category + category[category.length - 1] === "s" ? "" : "s"
    }.`,
    data: data,
  };
};

module.exports = { pokemonResponse };
