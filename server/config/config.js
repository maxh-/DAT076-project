module.exports = {
  development: {
    username: "adlm",
    password: "pass",
    database: "receptify",
    host: "localhost",
    dialect: "mysql",
    clientLocation: "localhost:3000"
  },
  test: {
    username: "adlm",
    password: "pass",
    database: "receptify",
    host: "localhost",
    dialect: "mysql",
    clientLocation: "localhost:3000"
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    clientLocation: process.env.clientLocation
  }
};
