let player;
  // Cargar la API de YouTube
function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-player', {
      height: '360',
      width: '640',
      videoId: '', // No carga video inicialmente
      events: {
        'onReady': onPlayerReady
      }
    });
  }
  // Reproducir video cuando el reproductor esté listo
function onPlayerReady(event) {
    console.log("Reproductor listo");
    event.player.playVideo();
  }
  // Cambiar el video que se está reproduciendo en el reproductor
function changeVideo(videoId) {
    if (player) {
      player.loadVideoById(videoId);
    } else {
      player = new YT.Player('video-player', { // Crear un nuevo reproductor si no existe
        height: '360',
        width: '640',
        videoId: videoId
      });
    }
  }


  //Insertar el videos en el carrusel 
async function loadVideos() {
    console.log("Cargando videos...");
    try {
        // Cargar la lista de videos desde el json
      const response = await fetch("js/videos.json");
      const videos = await response.json();
      console.log(videos);

      // Seleccionar los elementos del DOM
      const carousel = document.querySelector(".video-carousel");
      const playlistContainer = document.getElementById("playlist-container");

      // Verificar si los elementos existen
      if (!carousel || !playlistContainer) {
          console.error("No se encontró el contenedor del carrusel o la playlist.");
          return;
      }

      carousel.innerHTML = "";
      playlistContainer.innerHTML = "";
      
      // Recorrer la lista de videos el json y agregarlos al carrusel y la playlist lateral
      videos.forEach(video => {
          
          const playlistItem = document.createElement("li");
          playlistItem.innerHTML = `
              <img src="https://img.youtube.com/vi/${video.id}/0.jpg" alt="${video.title}">
              <span>${video.title}</span>
          `;
          playlistItem.onclick = () => changeVideo(video.id);
          playlistContainer.appendChild(playlistItem);


          const videoCar = document.createElement("div");
          videoCar.className = "video-card";
          
          const img = document.createElement("img");
          img.src = `https://img.youtube.com/vi/${video.id}/0.jpg`;
          img.alt = video.title;
          img.onclick = () => changeVideo(video.id);

          videoCar.appendChild(img);
          carousel.appendChild(videoCar);
      });

      // Mostrar los botones de navegación
      document.querySelector(".video-prev").style.display = "block";
      document.querySelector(".video-next").style.display = "block";

      setupVideoCarousel();

  } catch (error) {
      console.error("Error al cargar los videos", error);
  }
}

// Configurar el cuadro de videos
function setupVideoCarousel() {

  // Seleccionar los elementos del DOM
  const carousel = document.querySelector(".video-carousel");
  const prevBtn = document.querySelector(".video-prev");
  const nextBtn = document.querySelector(".video-next");

  // Verificar si los elementos existen
  if (!carousel || !prevBtn || !nextBtn) {
      console.error("⚠ No se encontraron elementos del carrusel.");
      return;
  }

  const scrollAmount = 450;

  prevBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  // Mostrar u ocultar los botones de navegación
  function checkButtonsVisibility() {
      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
      prevBtn.style.display = carousel.scrollLeft > 0 ? "block" : "none";
      nextBtn.style.display = carousel.scrollLeft < maxScrollLeft ? "block" : "none";
  }

  carousel.addEventListener("scroll", checkButtonsVisibility);
  checkButtonsVisibility();
}

// Cargar los videos cuando el la pagina haya cargado
document.addEventListener("DOMContentLoaded", loadVideos);