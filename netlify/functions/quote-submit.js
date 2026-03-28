const { getSql } = require("./_lib/db");

exports.handler = async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ ok: false, error: "Metodo no permitido" })
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const fullName = String(body.fullName || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const message = String(body.message || "").trim();
    const carModel = String(body.carModel || "").trim();
    const budget = String(body.budget || "").trim();

    if (!fullName || !email || !carModel || !budget) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          ok: false,
          error: "Nombre, email, coche y presupuesto son obligatorios"
        })
      };
    }

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

    await sql`
      INSERT INTO quote_requests (full_name, email, message, car_model, budget)
      VALUES (${fullName}, ${email}, ${message}, ${carModel}, ${budget});
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: error.message })
    };
  }
};
