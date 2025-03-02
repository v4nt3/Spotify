document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".video-carousel");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  const scrollAmount = 450; // Cantidad de desplazamiento

  prevBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  // Verificar si se oculta la flecha derecha
  function checkButtonsVisibility() {
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    prevBtn.style.display = carousel.scrollLeft > 0 ? "block" : "none";
    nextBtn.style.display = carousel.scrollLeft < maxScrollLeft ? "block" : "none";
  }

  carousel.addEventListener("scroll", checkButtonsVisibility);
  checkButtonsVisibility();
});
