(function () {
  var form = document.querySelector("form[name='quote']");
  if (!form) return;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    var submitButton = form.querySelector("button[type='submit']");
    var originalText = submitButton ? submitButton.textContent : "";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "ENVIANDO...";
    }

    var fullName = String(form.fullName ? form.fullName.value : "").trim();
    var email = String(form.email ? form.email.value : "").trim();
    var carModel = String(form.brandModel ? form.brandModel.value : "").trim();
    var budget = String(form.budget ? form.budget.value : "").trim();
    var message = String(form.message ? form.message.value : "").trim();

    try {
      var response = await fetch("/api/quote-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName,
          email: email,
          carModel: carModel,
          budget: budget,
          message: message
        })
      });

      var data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "No se pudo enviar la solicitud");
      }

      window.location.href = "/html/thank-you.html";
    } catch (error) {
      alert("No se pudo enviar el formulario. Inténtalo de nuevo.");
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    }
  });
})();
