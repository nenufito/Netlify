(() => {
  const toast = document.getElementById("toast");

  const showToast = (msg = "Copied") => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-visible");
    toast.setAttribute("aria-hidden", "false");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => {
      toast.classList.remove("is-visible");
      toast.setAttribute("aria-hidden", "true");
    }, 1200);
  };

  document.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-copy]");
    if (!btn) return;

    const selector = btn.getAttribute("data-copy");
    const el = document.querySelector(selector);
    const text = el ? el.textContent.trim() : "";

    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      showToast("Copied");
    }
  });
})();
