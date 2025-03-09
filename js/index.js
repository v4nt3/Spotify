

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


