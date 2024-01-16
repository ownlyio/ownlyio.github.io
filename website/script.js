const primaryHeader = document.querySelector(".header");
const navToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".navigation");

navToggle.addEventListener('click', () => {
  primaryNav.hasAttribute("data-visible") 
  ? navToggle.setAttribute("aria-expanded", false)
  : navToggle.setAttribute("aria-expanded", true)
  primaryNav.toggleAttribute("data-visible");
  primaryHeader.toggleAttribute("data-overlay");
});

