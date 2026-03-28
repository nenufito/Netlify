const cookie = require("cookie");
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

    const payload = verifyAdminToken(token);
    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        user: {
          id: payload.sub,
          email: payload.email,
          fullName: payload.fullName
        }
      })
    };
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ ok: false, error: "Sesion invalida o expirada" })
    };
  }
};
