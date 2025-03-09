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

//console.log("✅ El script JavaScript se está ejecutando correctamente.");
async function loadVideos() {
    //console.log("Cargando videos...");
    try {
        // Cargar la lista de videos desde el json
        const response = await fetch("js/videos.json");
        const videos = await response.json();
        //console.log(videos);

        // crear el carrusel de videos
        const carousel = document.querySelector(".video-carousel");
        
        

        // crear un contenedor para cada video
        videos.forEach(video => {
        const videoCar = document.createElement("div");
        videoCar.className = "video-card";

        // crear un miniatura del video
        const img = document.createElement("img");
        img.src = `https://img.youtube.com/vi/${video.id}/0.jpg`;
        img.alt = video.title;
        img.onclick = () => changeVideo(video.id);

        // agregar la miniatura al cont
        videoCar.appendChild(img);
        carousel.appendChild(videoCar);
        });
        document.querySelector(".nav-button.prev").style.display = "block";
        document.querySelector(".nav-button.next").style.display = "block";
    } catch (error) {
        console.error("Error al cargar los videos", error);
        
    }
}

document.addEventListener("DOMContentLoaded", loadVideos);