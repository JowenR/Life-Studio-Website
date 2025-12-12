let currentIndex = 0;
const track = document.querySelector(".carousel-track");
const images = document.querySelectorAll(".carousel-track img");
const visibleCount = 3;
const moveAmount = images[0].clientWidth + 20;

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * moveAmount}px)`;
}

function moveLeft() {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
}

function moveRight() {
  if (currentIndex < images.length - visibleCount) {
    currentIndex++;
    updateCarousel();
  }
}

function openImagePopup(src) {
  const popup = document.getElementById('imagePopup');
  const img = document.getElementById('popupImage');
  img.src = src;
  popup.style.display = 'flex';
}

function closeImagePopup(e) {
  if(e.target.id === 'imagePopup') {
    e.target.style.display = 'none';
  }
}

function openPopup() {
  document.getElementById('popupOverlay').style.display = 'flex';
}

function closePopupOutside(e) {
  if(e.target.id === 'popupOverlay') 
    e.target.style.display = 'none';
}
