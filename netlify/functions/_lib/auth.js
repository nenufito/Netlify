const jwt = require("jsonwebtoken");

const COOKIE_NAME = "admin_session";

function getJwtSecret() {
  const jwtSecret = process.env.ADMIN_JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("ADMIN_JWT_SECRET no configurada");
  }
  return jwtSecret;
}

function signAdminToken(payload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "12h" });
}

function verifyAdminToken(token) {
  return jwt.verify(token, getJwtSecret());
}

module.exports = {
  COOKIE_NAME,
  signAdminToken,
  verifyAdminToken
};
