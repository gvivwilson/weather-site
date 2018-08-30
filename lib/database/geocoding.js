require("dotenv").config();

module.exports = {
  connectionString: {
    user: process.env.DB_USER_1,
    host: "localhost",
    database: "geocoding",
    password: process.env.DB_PWD_1,
    port: 5432,
  },
  cityQuery: `SELECT id, city, province, country
             FROM cities
             WHERE city % $1 OR city ILIKE $2
             ORDER BY similarity(city, $1) DESC, city
             LIMIT 10`,
  coordinatesQuery: `SELECT city, province, country, latitude, longitude
            FROM cities
            WHERE id = $1`
};
