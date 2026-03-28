(function () {
  var form = document.getElementById("adminLoginForm");
  var feedback = document.getElementById("loginFeedback");

  if (!form || !feedback) return;

  function setFeedback(message) {
    feedback.textContent = message;
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    setFeedback("Validando acceso...");

    var formData = new FormData(form);
    var email = String(formData.get("email") || "").trim();
    var password = String(formData.get("password") || "");

    try {
      var response = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email, password: password })
      });

      var data = await response.json();
      if (!response.ok) {
        setFeedback(data.error || "No se pudo iniciar sesion");
        return;
      }

      window.location.href = "/admin";
    } catch (error) {
      setFeedback("Error de conexion. Intentalo otra vez.");
    }
  });
})();
