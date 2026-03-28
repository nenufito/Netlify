const bcrypt = require("bcryptjs");
const { getSql } = require("./_lib/db");

exports.handler = async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ ok: false, error: "Metodo no permitido" })
    };
  }

  try {
    const expectedSecret = process.env.ADMIN_SETUP_SECRET;
    const sentSecret = event.headers["x-setup-secret"];
    if (!expectedSecret || sentSecret !== expectedSecret) {
      return {
        statusCode: 401,
        body: JSON.stringify({ ok: false, error: "No autorizado" })
      };
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || "Administrador";

    if (!adminEmail || !adminPassword) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          ok: false,
          error: "Faltan ADMIN_EMAIL o ADMIN_PASSWORD en variables"
        })
      };
    }

    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT NOT NULL DEFAULT 'Administrador',
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `;

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

    const existing = await sql`
      SELECT id FROM admin_users WHERE email = ${adminEmail} LIMIT 1;
    `;

    if (existing.length === 0) {
      const passwordHash = await bcrypt.hash(adminPassword, 12);
      await sql`
        INSERT INTO admin_users (email, password_hash, full_name, is_active)
        VALUES (${adminEmail}, ${passwordHash}, ${adminName}, TRUE);
      `;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        message: "Base de datos inicializada y admin listo"
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: error.message })
    };
  }
};
