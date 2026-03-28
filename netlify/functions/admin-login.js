const bcrypt = require("bcryptjs");
const cookie = require("cookie");
const { getSql } = require("./_lib/db");
const { COOKIE_NAME, signAdminToken } = require("./_lib/auth");

exports.handler = async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ ok: false, error: "Metodo no permitido" })
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ ok: false, error: "Email y password obligatorios" })
      };
    }

    const sql = getSql();
    const result = await sql`
      SELECT id, email, password_hash, full_name, is_active
      FROM admin_users
      WHERE email = ${email}
      LIMIT 1;
    `;

    if (result.length === 0) {
      return {
        statusCode: 401,
        body: JSON.stringify({ ok: false, error: "Credenciales invalidas" })
      };
    }

    const admin = result[0];
    if (!admin.is_active) {
      return {
        statusCode: 403,
        body: JSON.stringify({ ok: false, error: "Usuario desactivado" })
      };
    }

    const validPassword = await bcrypt.compare(password, admin.password_hash);
    if (!validPassword) {
      return {
        statusCode: 401,
        body: JSON.stringify({ ok: false, error: "Credenciales invalidas" })
      };
    }

    const token = signAdminToken({
      sub: admin.id,
      email: admin.email,
      fullName: admin.full_name
    });

    return {
      statusCode: 200,
      headers: {
        "Set-Cookie": cookie.serialize(COOKIE_NAME, token, {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          maxAge: 60 * 60 * 12,
          path: "/"
        }),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ok: true })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: error.message })
    };
  }
};
