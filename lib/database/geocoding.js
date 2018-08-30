require("dotenv").config();

const {Pool} = require("pg");

module.exports = (() => {
  const connectionString = {
    user: process.env.DB_USER_1,
    host: "localhost",
    database: process.env.DB_NAME_1,
    password: process.env.DB_PWD_1,
    port: 5432,
  };

  const pool = new Pool(connectionString);

  let cityQuery = `SELECT id, city, province, country
                  FROM cities
                  WHERE city % $1 OR city ILIKE $2
                  ORDER BY similarity(city, $1) DESC, city
                  LIMIT 10`;

  let coordinatesQuery = `SELECT city, province, country, latitude, longitude
                         FROM cities
                         WHERE id = $1`;

  let query = async (query, params) => {
    const client = await pool.connect();
    try {
      let dbres = await client.query(query, params);
      return dbres;
    } finally {
      client.release();
    }
  };

  return {
    query: query,
    cityQuery: cityQuery,
    coordinatesQuery: coordinatesQuery
  };
})();
