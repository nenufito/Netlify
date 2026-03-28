const cookie = require("cookie");
const { getSql } = require("./_lib/db");
const { COOKIE_NAME, verifyAdminToken } = require("./_lib/auth");

exports.handler = async function handler(event) {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ ok: false, error: "Metodo no permitido" })
    };
  }

  try {
    const cookies = cookie.parse(event.headers.cookie || "");
    const token = cookies[COOKIE_NAME];
    if (!token) {
      return {
        statusCode: 401,
        body: JSON.stringify({ ok: false, error: "No autenticado" })
      };
    }
    verifyAdminToken(token);

    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS quote_requests (
        id SERIAL PRIMARY KEY,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT,
        car_model TEXT NOT NULL,
        budget TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `;

    const rows = await sql`
      SELECT id, full_name, email, message, car_model, budget, created_at
      FROM quote_requests
      ORDER BY created_at DESC
      LIMIT 200;
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, submissions: rows })
    };
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ ok: false, error: "Sesion invalida o expirada" })
    };
  }
};
