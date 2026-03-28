(() => {
  const btn = document.getElementById("engineSoundBtn");
  const audio = document.getElementById("engineAudio");

  if (!btn || !audio) return;

  btn.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        btn.textContent = "PAUSE ENGINE SOUND →";
      } else {
        audio.pause();
        btn.textContent = "PLAY ENGINE SOUND →";
      }
    } catch (err) {
      console.warn("Audio play blocked:", err);
    }
  });

  audio.addEventListener("ended", () => {
    btn.textContent = "PLAY ENGINE SOUND →";
  });
})();
