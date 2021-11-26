module.exports = {
  database:{
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      dialect: process.env.DB_DIALECT
  }
}

