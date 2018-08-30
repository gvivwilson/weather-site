module.exports = async (pool, query, params) => {
	const client = await pool.connect();
  try {
    let dbres = await client.query(query, params);
    return dbres;
  } finally {
    client.release();
  }
};
