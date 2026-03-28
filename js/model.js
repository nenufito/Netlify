(() => {
  const cars = [
    {
      model: "Audi R8",
      tagline: "Would you like an R8?",
      image: "/img/audir8.png",
      detailsUrl: "/html/audir8.html",
      brochureUrl: "/html/presupuesto.html",
      fineprint: "The Audi R8 combines iconic design with a naturally aspirated engine and quattro all-wheel drive, delivering a pure and engaging driving experience."
    },
    {
      model: "Ferrari F40",
      tagline: "Wouldn't you like to hear a V12 engine?",
      image: "/img/ferrarif40.png",
      detailsUrl: "/html/ferrarif40.html",
      brochureUrl: "/html/presupuesto.html",
      fineprint: "The Ferrari F40 is an absolute legend: lightweight, raw, and uncompromising, built to deliver driving in its purest and most extreme form."
    },
    {
      model: "BMW E30",
      tagline: "Do you want to be a gangster?",
      image: "/img/bmwe30.png",
      detailsUrl: "/html/bmwe30.html",
      brochureUrl: "/html/presupuesto.html",
      fineprint: "The BMW E30 is a true automotive icon, celebrated for its perfect balance, sporty character, and timeless presence."
    },
    {
      model: "Bugatti Chiron",
      tagline: "Secrecy, what is that?",
      image: "/img/bugattichiron.png",
      detailsUrl: "/html/bugatti.html",
      brochureUrl: "/html/presupuesto.html",
      fineprint: "The Bugatti Chiron redefines the hypercar concept, combining extreme luxury with unmatched power and performance figures."
    },
    {
      model: "G-Wagon",
      tagline: "can withstand even missiles",
      image: "/img/g-wagon.png",
      detailsUrl: "/html/g-wagon.html",
      brochureUrl: "/html/presupuesto.html",
      fineprint: "The Mercedes-Benz G-Wagon blends legendary off-road capability with luxury, commanding presence, and an indestructible character."
    },
    {
      model: "Mercedes Evo II",
      tagline: "elegance is her middle name",
      image: "/img/mercedesevo.png",
      detailsUrl: "/html/mercedes.html",
      brochureUrl: "/html/presupuesto.html",
      fineprint: "The Mercedes 190E Evo II is a mythical homologation special, born to dominate racetracks and admired for its aggressive design."
    },
    {
      model: "Pagani Zonda",
      tagline: "beauty in two words.",
      image: "/img/paganizonda.png",
      detailsUrl: "/html/pagani.html",
      brochureUrl: "/html/presupuesto.html",
      fineprint: "The Pagani Zonda is a work of art on wheels, handcrafted in every detail and powered by an engine that delivers truly unique sensations."
    },
    {
      model: "Porche GT3-RS",
      tagline: "TRACK-BRED. ROAD-READY.",
      image: "/img/porchegt3rs.png",
      detailsUrl: "/html/porche.html",
      brochureUrl: "/html/presupuesto.html",
      fineprint: "The Porsche GT3 RS is engineered for the track, featuring extreme aerodynamics and a finely tuned chassis built for maximum performance."
    }
  ];

  const modelName = document.getElementById("modelName");
  const modelTagline = document.getElementById("modelTagline");
  const carCenter = document.getElementById("carCenter");
  const detailsBtn = document.getElementById("detailsBtn");
  const brochureBtn = document.getElementById("brochureBtn");
  const fineprint = document.getElementById("fineprint");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!cars.length) return;

  let index = 0;
  const mod = (n, m) => ((n % m) + m) % m;

  function setImg(imgEl, src, alt) {
    if (!imgEl) return;
    imgEl.style.opacity = "0";
    requestAnimationFrame(() => {
      imgEl.src = src;
      imgEl.alt = alt || "";
      imgEl.onload = () => (imgEl.style.opacity = "");
      imgEl.onerror = () => (imgEl.style.opacity = "");
    });
  }

  function render() {
    const current = cars[index];

    if (modelName) modelName.textContent = current.model || "";
    if (modelTagline) modelTagline.textContent = current.tagline || "";

    setImg(carCenter, current.image, current.model);

    if (detailsBtn) detailsBtn.href = current.detailsUrl || "#";
    if (brochureBtn) brochureBtn.href = current.brochureUrl || "#";
    if (fineprint) fineprint.textContent = current.fineprint || "";

    const disabled = cars.length <= 1;
    if (prevBtn) prevBtn.disabled = disabled;
    if (nextBtn) nextBtn.disabled = disabled;
  }

  function next() {
    index = mod(index + 1, cars.length);
    render();
  }

  function prev() {
    index = mod(index - 1, cars.length);
    render();
  }

  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  render();
})();
