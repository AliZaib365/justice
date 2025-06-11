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

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
function openSidebar() {
  sidebar.classList.add("open");
  sidebarOverlay.style.display = "block";
  document.body.style.overflow = "hidden";
}
function closeSidebarFn() {
  sidebar.classList.remove("open");
  sidebarOverlay.style.display = "none";
  document.body.style.overflow = "";
}
if (menuToggle)
  menuToggle.addEventListener("click", openSidebar);
if (menuToggle)
  menuToggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") openSidebar();
  });
if (closeSidebar) closeSidebar.addEventListener("click", closeSidebarFn);
if (sidebarOverlay)
  sidebarOverlay.addEventListener("click", closeSidebarFn);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && sidebar.classList.contains("open"))
    closeSidebarFn();
});

// Mobile Sidebar Logic
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileSidebar = document.getElementById("mobileSidebar");
const closeMobileSidebar = document.getElementById("closeMobileSidebar");
const mobileSidebarOverlay = document.getElementById(
  "mobileSidebarOverlay"
);
function openMobileSidebar() {
  mobileSidebar.classList.add("open");
  mobileSidebarOverlay.style.display = "block";
  document.body.style.overflow = "hidden";
}
function closeMobileSidebarFn() {
  mobileSidebar.classList.remove("open");
  mobileSidebarOverlay.style.display = "none";
  document.body.style.overflow = "";
}
if (mobileMenuToggle)
  mobileMenuToggle.addEventListener("click", openMobileSidebar);
if (closeMobileSidebar)
  closeMobileSidebar.addEventListener("click", closeMobileSidebarFn);
if (mobileSidebarOverlay)
  mobileSidebarOverlay.addEventListener("click", closeMobileSidebarFn);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && mobileSidebar.classList.contains("open"))
    closeMobileSidebarFn();
});
// Dropdown logic for mobile
function setupDropdown(dropdownId, listId) {
  const btn = document.getElementById(dropdownId);
  const list = document.getElementById(listId);
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    btn.classList.toggle("open");
    list.style.display =
      list.style.display === "flex" ? "none" : "flex";
  });
  btn.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      btn.classList.toggle("open");
      list.style.display =
        list.style.display === "flex" ? "none" : "flex";
    }
  });
}
setupDropdown("practiceDropdown", "practiceDropdownList");
setupDropdown("sectorsDropdown", "sectorsDropdownList");