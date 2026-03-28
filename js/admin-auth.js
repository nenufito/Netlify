(function () {
  var loginPath = "/admin-login";
  var verifyUrl = "/api/admin-verify";
  var logoutUrl = "/api/admin-logout";
  var isAdminPage =
    window.location.pathname === "/admin" ||
    window.location.pathname.endsWith("/html/admin.html");

  async function verifySession() {
    try {
      var response = await fetch(verifyUrl, {
        method: "GET",
        credentials: "include"
      });
      if (!response.ok) {
        window.location.replace(loginPath);
      }
    } catch (error) {
      window.location.replace(loginPath);
    }
  }

  async function logout() {
    try {
      await fetch(logoutUrl, {
        method: "POST",
        credentials: "include"
      });
    } catch (error) {
      // No-op: aun con error local, forzamos salida visual.
    } finally {
      window.location.replace(loginPath);
    }
  }

  if (isAdminPage) {
    verifySession();
    var logoutBtn = document.getElementById("adminLogoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", logout);
    }
  }
})();
