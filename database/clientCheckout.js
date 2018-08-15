module.exports = async (pool, query, params) => {
  const client = await pool.connect();
  try {
    let dbres = await client.query(query, params);
    if (dbres.rows.length != 0) {
      return dbres;
    } else {
      throw new TypeError("Database query has no results");
    }
  } finally {
    client.release();
  }
};
