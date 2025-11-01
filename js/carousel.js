// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".carousel-dot");
const totalSlides = slides.length;

function showSlide(index) {
  // Remove active class from all slides and dots
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  // Add active class to current slide and dot
  slides[index].classList.add("active");
  dots[index].classList.add("active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

// Event listeners for carousel
document
  .querySelector(".carousel-arrow.next")
  .addEventListener("click", nextSlide);
document
  .querySelector(".carousel-arrow.prev")
  .addEventListener("click", prevSlide);

// Dots navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

// Auto-play carousel
setInterval(nextSlide, 5000);
