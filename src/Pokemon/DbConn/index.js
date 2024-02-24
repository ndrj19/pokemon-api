const { MongoClient } = require("mongodb");

async function connectToMongo() {
  const connection = await MongoClient.connect(
    "mongodb://root:password@localhost:27017"
  );
  return connection.db("pokemonDB");
}

module.exports = { connectToMongo };
