document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".video-carousel");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  const scrollAmount = 450; 

  prevBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  // ocultar flechas si no hay mas videos en esa dirección
  function checkButtonsVisibility() {
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    prevBtn.style.display = carousel.scrollLeft > 0 ? "block" : "none";
    nextBtn.style.display = carousel.scrollLeft < maxScrollLeft ? "block" : "none";
  }

  carousel.addEventListener("scroll", checkButtonsVisibility);
  checkButtonsVisibility();
});
