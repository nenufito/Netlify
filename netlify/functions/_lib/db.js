const { neon } = require("@neondatabase/serverless");

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL no configurada");
  }
  return neon(databaseUrl);
}

module.exports = { getSql };
