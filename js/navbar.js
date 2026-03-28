(() => {
  const navbar = document.getElementById("navbar");
  const hero = document.getElementById("hero");

  if (!navbar || !hero) return;

  const update = () => {
    const heroBottom = hero.getBoundingClientRect().bottom;
    const navH = navbar.offsetHeight;

    if (heroBottom <= navH) navbar.classList.add("navbar--solid");
    else navbar.classList.remove("navbar--solid");
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
