(() => {
  const btn = document.getElementById("navToggle");
  const menu = document.getElementById("sideMenu");
  const overlay = document.getElementById("menuOverlay");

  if (!btn || !menu || !overlay) return;

  const openMenu = () => {
    document.body.classList.add("menu-open");
    overlay.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
  };

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    btn.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");

    setTimeout(() => {
      if (!document.body.classList.contains("menu-open")) overlay.hidden = true;
    }, 260);
  };

  const toggleMenu = () => {
    document.body.classList.contains("menu-open") ? closeMenu() : openMenu();
  };

  btn.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", closeMenu);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) closeMenu();
  });

  menu.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) closeMenu();
  });
})();
