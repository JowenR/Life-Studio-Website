document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------
     0. PRELOAD IMAGES (fast loading)
  ---------------------------------------- */
  const preloadImages = [
    "School ID\School_ID(1).png",
    "School ID\School_ID(2).png",
    "School ID\School_ID(3).png",
    "School ID\School_ID(4).png",
    "School ID\School_ID(5).png",
    "School ID\School_ID(6).png"
  ];
  preloadImages.forEach(src => { const img = new Image(); img.src = src; });

  /* ----------------------------------------
     1. SELECT ELEMENTS
  ---------------------------------------- */
  const track = document.querySelector('.carousel-track');
  if (!track) return console.error('No .carousel-track found');

  let images = Array.from(track.querySelectorAll('img'));
  if (images.length === 0) return console.error('No images found inside .carousel-track');

  const gap = parseFloat(getComputedStyle(track).gap) || 10;

  /* ----------------------------------------
     2. CLONE FIRST + LAST IMAGE
  ---------------------------------------- */
  const firstClone = images[0].cloneNode(true);
  const lastClone = images[images.length - 1].cloneNode(true);

  track.appendChild(firstClone);                // clone at end
  track.insertBefore(lastClone, images[0]);     // clone at beginning

  // refresh images
  images = Array.from(track.querySelectorAll('img'));

  /* ----------------------------------------
     3. INITIAL VALUES
  ---------------------------------------- */
  let currentIndex = 1;
  let moveAmount = 0;

  function computeMove() {
    moveAmount = images[0].getBoundingClientRect().width + gap;
  }

  /* ----------------------------------------
     4. POSITIONING FUNCTION
  ---------------------------------------- */
  function setPosition({ noTransition = false } = {}) {
    if (noTransition) {
      track.style.transition = 'none';
    } else {
      track.style.transition = 'transform .32s ease-in-out';
    }

    track.style.transform = `translateX(-${currentIndex * moveAmount}px)`;

    if (noTransition) {
      requestAnimationFrame(() => {
        void track.offsetWidth; // force reflow
        track.style.transition = 'transform .32s ease-in-out';
      });
    }
  }

  /* ----------------------------------------
     5. INITIAL LOAD — WAIT FOR IMAGES
  ---------------------------------------- */
  window.addEventListener("load", () => {
    computeMove();
    setPosition({ noTransition: true });
  });

  /* ----------------------------------------
     6. RESIZE HANDLER
  ---------------------------------------- */
  window.addEventListener('resize', () => {
    computeMove();
    setPosition({ noTransition: true });
  });

  /* ----------------------------------------
     7. TRANSITION END — LOOPING LOGIC
  ---------------------------------------- */
  track.addEventListener('transitionend', () => {

    // If we moved to the append clone-of-first
    if (images[currentIndex] === firstClone) {
      currentIndex = 1;
      setPosition({ noTransition: true });
      return;
    }

    // If we moved to the prepended clone-of-last
    if (images[currentIndex] === lastClone) {
      currentIndex = images.length - 2;
      setPosition({ noTransition: true });
    }
  });

  /* ----------------------------------------
     8. BUTTON CONTROLS
  ---------------------------------------- */
  window.moveLeft = function() {
    currentIndex--;
    setPosition();
  };

  window.moveRight = function() {
    currentIndex++;
    setPosition();
  };

  /* ----------------------------------------
     9. POPUP FUNCTIONS (kept from your code)
  ---------------------------------------- */
  window.openImagePopup = function(src) {
    const popup = document.getElementById('imagePopup');
    const img = document.getElementById('popupImage');
    img.src = src;
    popup.style.display = 'flex';
  };

  window.closeImagePopup = function(e) {
    if (e.target.id === 'imagePopup') {
      e.target.style.display = 'none';
    }
  };

  window.openPopup = function() {
    document.getElementById('popupOverlay').style.display = 'flex';
  };

  window.closePopupOutside = function(e) {
    if (e.target.id === 'popupOverlay')
      e.target.style.display = 'none';
  };

});
