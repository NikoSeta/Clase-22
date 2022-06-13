require('dotenv').config()

const mongoDb = `${process.env.MONGO}://${process.env.HOST}:${process.env.MONGO_URI}`;
const PORT = process.env.PORT;

module.exports = {
  mongoDb,
  PORT
}