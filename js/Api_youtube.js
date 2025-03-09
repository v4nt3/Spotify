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

function onPlayerReady(event) {
    console.log("Reproductor listo");
  }

function changeVideo(videoId) {
    if (player) {
      player.loadVideoById(videoId);
    } else {
      player = new YT.Player('video-player', {
        height: '360',
        width: '640',
        videoId: videoId
      });
    }
  }
console.log("✅ El script JavaScript se está ejecutando correctamente.");
async function loadVideos() {
  console.log("Cargando videos...");
  try {
      const response = await fetch("js/videos.json");
      const videos = await response.json();
      console.log(videos);

      // Buscar el carrusel
      const carousel = document.querySelector(".video-carousel");

      if (!carousel) {
          console.error("⚠ No se encontró el carrusel de videos en el DOM.");
          return;
      }

      // Limpiar contenido previo
      carousel.innerHTML = "";

      // Agregar videos al carrusel
      videos.forEach(video => {
          const videoCar = document.createElement("div");
          videoCar.className = "video-card";

          const img = document.createElement("img");
          img.src = `https://img.youtube.com/vi/${video.id}/0.jpg`;
          img.alt = video.title;
          img.onclick = () => changeVideo(video.id);

          videoCar.appendChild(img);
          carousel.appendChild(videoCar);
      });

      // Asegurar que los botones de navegación aparezcan
      document.querySelector(".video-prev").style.display = "block";
      document.querySelector(".video-next").style.display = "block";

      // 🚀 Una vez cargados los videos, inicializar los eventos del carrusel
      setupVideoCarousel();

  } catch (error) {
      console.error("Error al cargar los videos", error);
  }
}

function setupVideoCarousel() {
  const carousel = document.querySelector(".video-carousel");
  const prevBtn = document.querySelector(".video-prev");
  const nextBtn = document.querySelector(".video-next");

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

  function checkButtonsVisibility() {
      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
      prevBtn.style.display = carousel.scrollLeft > 0 ? "block" : "none";
      nextBtn.style.display = carousel.scrollLeft < maxScrollLeft ? "block" : "none";
  }

  carousel.addEventListener("scroll", checkButtonsVisibility);
  checkButtonsVisibility();
}

document.addEventListener("DOMContentLoaded", loadVideos);