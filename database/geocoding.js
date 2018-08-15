/*jshint esversion: 6 */

module.exports = {
  connectionString: {
    user: process.env.PG_SUPER_USERNAME,
    host: "localhost",
    database: "geocoding",
    password: process.env.PG_SUPER_PASSWORD,
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
