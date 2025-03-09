document.addEventListener("DOMContentLoaded", () => {

    // Song Carousel
    const songCarousel = document.querySelector(".song-container");
    const songPrevBtn = document.querySelector(".song-prev");
    const songNextBtn = document.querySelector(".song-next");
  
    
    const scrollAmount = 450;
  
    if (songCarousel && songPrevBtn && songNextBtn) {
      songPrevBtn.addEventListener("click", () => {
        songCarousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      });
  
      songNextBtn.addEventListener("click", () => {
        songCarousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
  
      function checkSongButtonsVisibility() {
        const maxScrollLeft = songCarousel.scrollWidth - songCarousel.clientWidth;
        songPrevBtn.style.display = songCarousel.scrollLeft > 0 ? "block" : "none";
        songNextBtn.style.display = songCarousel.scrollLeft < maxScrollLeft ? "block" : "none";
      }
  
      songCarousel.addEventListener("scroll", checkSongButtonsVisibility);
      checkSongButtonsVisibility();
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  const playerSection = document.querySelector(".player-section");
  const songTitle = document.querySelector(".song-title");
  const songCover = document.querySelector(".song-cover");
  const closePlayer = document.getElementById("close-player"); // Botón de cerrar

  const songs = document.querySelectorAll(".song"); // Seleccionamos todas las canciones

  songs.forEach(song => {
      song.addEventListener("click", function () {
          const title = this.querySelector("p").textContent; // Extraemos el título
          const cover = this.querySelector("img").src; // Extraemos la imagen

          songTitle.textContent = title;
          songCover.src = cover;

          // Mostrar la barra de reproducción si está oculta
          playerSection.style.display = "flex";
      });
  });

  // Ocultar el reproductor al hacer clic en el botón de cerrar
  closePlayer.addEventListener("click", function () {
      playerSection.style.display = "none";
  });
});


