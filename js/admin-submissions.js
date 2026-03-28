(function () {
  var bodyTarget = document.getElementById("submissionsBody");
  if (!bodyTarget) return;

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderRows(rows) {
    if (!rows || rows.length === 0) {
      bodyTarget.innerHTML =
        "<tr><td colspan='5'>Sin envíos todavía.</td></tr>";
      return;
    }

    bodyTarget.innerHTML = rows
      .map(function (row) {
        return (
          "<tr>" +
          "<td>" + esc(row.full_name) + "</td>" +
          "<td>" + esc(row.email) + "</td>" +
          "<td>" + esc(row.message || "-") + "</td>" +
          "<td>" + esc(row.car_model) + "</td>" +
          "<td>" + esc(row.budget) + "</td>" +
          "</tr>"
        );
      })
      .join("");
  }

  fetch("/api/admin-submissions", { credentials: "include" })
    .then(function (res) {
      return res.json().then(function (data) {
        if (!res.ok || !data.ok) {
          throw new Error(data.error || "No se pudo cargar");
        }
        return data;
      });
    })
    .then(function (data) {
      renderRows(data.submissions);
    })
    .catch(function () {
      bodyTarget.innerHTML =
        "<tr><td colspan='5'>No se pudieron cargar los envíos.</td></tr>";
    });
})();
