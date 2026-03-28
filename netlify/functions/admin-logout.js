const cookie = require("cookie");
const { COOKIE_NAME } = require("./_lib/auth");

exports.handler = async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ ok: false, error: "Metodo no permitido" })
    };
  }

  return {
    statusCode: 200,
    headers: {
      "Set-Cookie": cookie.serialize(COOKIE_NAME, "", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 0,
        path: "/"
      }),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ok: true })
  };
};
