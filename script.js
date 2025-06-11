document.addEventListener('DOMContentLoaded', () => {
  // HERO SLIDER
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.querySelector('.hero-dots');
  let current = 0;
  let interval;
  function createDots() {
    slides.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => showSlide(idx));
      dotsContainer.appendChild(dot);
    });
  }
  function showSlide(idx) {
    slides[current].classList.remove('active');
    dotsContainer.children[current].classList.remove('active');
    current = idx;
    slides[current].classList.add('active');
    dotsContainer.children[current].classList.add('active');
    resetInterval();
  }
  function nextSlide() {
    let next = (current + 1) % slides.length;
    showSlide(next);
  }
  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 4000);
  }
  createDots();
  interval = setInterval(nextSlide, 4000);
});

document.addEventListener('DOMContentLoaded', function () {
  // COUNTERS
  const counters = document.querySelectorAll('.jc-counter-number');
  let animated = false;
  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1400;
      const frameRate = 18;
      let current = 0;
      const steps = Math.ceil(duration / frameRate);
      const increment = Math.ceil(target / steps);
      function update() {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
        } else {
          counter.textContent = current;
          setTimeout(update, frameRate);
        }
      }
      update();
    });
  }
  function isSectionInView() {
    const section = document.querySelector('.jc-counter-section');
    const rect = section.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }
  function onScroll() {
    if (!animated && isSectionInView()) {
      animateCounters();
      animated = true;
      window.removeEventListener('scroll', onScroll);
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
});

// SIDEBAR
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('closeSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

// Open sidebar
function openSidebar() {
  sidebar.classList.add('open');
  sidebarOverlay.style.display = "block";
  document.body.style.overflow = "hidden";
}
// Close sidebar
function closeSidebarFn() {
  sidebar.classList.remove('open');
  sidebarOverlay.style.display = "none";
  document.body.style.overflow = "";
}

// Click events
menuToggle.addEventListener('click', openSidebar);
menuToggle.addEventListener('keydown', e => {
  if (e.key === "Enter" || e.key === " ") openSidebar();
});
closeSidebar.addEventListener('click', closeSidebarFn);
sidebarOverlay.addEventListener('click', closeSidebarFn);

// ESC key closes sidebar
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && sidebar.classList.contains('open')) {
    closeSidebarFn();
  }
});

// Play button hide for "about-tjc-play-btn" element
document.querySelector('.about-tjc-play-btn').addEventListener('click', function() {
  this.style.display = 'none';
});

// EXPERT TEAM SLIDER
document.addEventListener('DOMContentLoaded', function () {
  const expertSection = document.querySelector('.jc-expert-team-section');
  if (!expertSection) return; // Exit if section not found

  const slider = expertSection.querySelector('.jc-expert-team-slider');
  const slides = expertSection.querySelectorAll('.jc-expert-team-slide');
  const dotsContainer = expertSection.querySelector('.jc-expert-team-slider-dots');
  const dots = Array.from(dotsContainer.querySelectorAll('.jc-expert-team-dot')); 
  const leftArrow = expertSection.querySelector('.jc-expert-team-slider-arrow-left');
  const rightArrow = expertSection.querySelector('.jc-expert-team-slider-arrow-right');

  let currentIndex = 0;
  let slideInterval;
  const slideDuration = 5000; // 5 seconds
  let isPaused = false;

  // Calculate how many slides to show based on screen width
  function getSlidesToShow() {
    if (window.innerWidth < 576) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  // Update slider position and dot states
  function updateSlider() {
    const slidesToShow = getSlidesToShow();
    const slideWidth = slides[0].offsetWidth + 20; // width + gap
    const newPosition = -currentIndex * slideWidth;
    slider.style.transform = `translateX(${newPosition}px)`;

    // Calculate total groups (number of positions)
    const totalGroups = slides.length - slidesToShow + 1;
    // Adjust dots: show only for available groups and update active states
    dots.forEach((dot, index) => {
      if (index < totalGroups) {
        dot.style.display = "inline-block";
        dot.classList.toggle('active', index === currentIndex);
      } else {
        dot.style.display = "none";
      }
    });
  }

  // Go to specific slide
  function goToSlide(index) {
    const slidesToShow = getSlidesToShow();
    const maxIndex = slides.length - slidesToShow;
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    updateSlider();
  }

  // Next slide
  function nextSlide() {
    const slidesToShow = getSlidesToShow();
    if (currentIndex < slides.length - slidesToShow) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateSlider();
  }

  // Previous slide
  function prevSlide() {
    const slidesToShow = getSlidesToShow();
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = slides.length - slidesToShow;
    }
    updateSlider();
  }

  // Start auto sliding
  function startAutoSlide() {
    slideInterval = setInterval(() => {
      if (!isPaused) nextSlide();
    }, slideDuration);
  }

  // Pause auto sliding when hovering over slider
  slider.addEventListener('mouseenter', () => {
    isPaused = true;
  });
  slider.addEventListener('mouseleave', () => {
    isPaused = false;
  });

  // Arrow controls
  leftArrow.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
  });
  rightArrow.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  });

  // Dot controls
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetAutoSlide();
    });
  });

  // Reset auto slide timer
  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  // Handle window resize
  window.addEventListener('resize', () => {
    updateSlider();
  });

  // Initialize
  updateSlider();
  startAutoSlide();

  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      resetAutoSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      resetAutoSlide();
    }
  });
});