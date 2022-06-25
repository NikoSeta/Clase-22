require('dotenv').config()

const mongoUri = `${process.env.MONGO_URI}`;
const PORT = process.env.PORT;
const TIEMPO_EXPIRACION = process.env.TIEMPO_EXPIRACION;

module.exports = {
  mongoUri,
  PORT,
  TIEMPO_EXPIRACION
}