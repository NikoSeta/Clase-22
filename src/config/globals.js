require('dotenv').config()

const mongoUri = `${process.env.MONGO_URI}`;
const PORT = process.env.PORT;

module.exports = {
  mongoUri,
  PORT
}