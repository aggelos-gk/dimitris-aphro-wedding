// Slideshow functionality
document.addEventListener('DOMContentLoaded', function() {
  const images = [
    "home/images/hp1.webp",
    "home/images/hp2.webp",
    "home/images/hp3.webp",
    "home/images/hp4.webp"
  ];
  
  const slides = document.querySelectorAll(".slideshow-image");
  let current = 0;
  
  // Preload first two images
  if (slides.length >= 2) {
    slides[0].style.backgroundImage = `url('${images[0]}')`;
    slides[1].style.backgroundImage = `url('${images[1]}')`;
  }
  
  // Start slideshow if we have slides
  if (slides.length > 0) {
    setInterval(() => {
      const next = (current + 1) % images.length;
      
      const currentSlide = slides[current % 2];
      const nextSlide = slides[(current + 1) % 2];
      
      nextSlide.style.backgroundImage = `url('${images[next]}')`;
      
      currentSlide.classList.remove("active");
      nextSlide.classList.add("active");
      
      current = next;
    }, 5000);
  }
});