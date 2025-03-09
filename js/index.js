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
