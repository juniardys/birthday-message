require('dotenv').config()

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: process.env.DB_DIALECT || 'mysql',
  dialectOptions: {
    ssl: process.env.DB_SSL_MODE === 'true',
    decimalNumbers: true,
  },
  pool: {
    max: Number(process.env.DB_POOL_MAX) || 100,
    min: Number(process.env.DB_POOL_MIN) || 0,
    acquire: Number(process.env.DB_POOL_ACQUIRE) || 30000,
    idle: Number(process.env.DB_POOL_IDLE) || 20000,
  },
  logging: Number(process.env.DB_LOGGING),
}