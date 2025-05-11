import iconMap from "/iconMap.js";

const menuItems = ["about", "success stories", "get started"];
const bulletPoints = [
  "Proven strategies tailored to your business goals",
  "One-on-one coaching from experienced business mentors",
  "Boost productivity, confidence, and decision-making skills",
];
const advantages = [
  "Cut through the noise and prioritize what truly moves your business forward",
  "Stay on track and follow through on your goals with expert guidance",
  "Gain fresh insights and strategies tailored to your unique challenges",
  "Accelerate progress with proven tools designed for long-term success",
];

const navbar = document.querySelector(".navbar_position_fixed");

addEventListener("scroll", () => {
  if (innerWidth < 700) return;

  checkPageOffset();
});

addEventListener("DOMContentLoaded", () => {
  const openMenuBtn = document.querySelector(".mobile-menu-button_open");
  const closeMenuBtn = document.querySelector(".mobile-menu-button_close");
  const mobileMenu = document.querySelector(".mobile-menu");

  checkPageOffset();

  insertNavigation();
  insertHeroBullets();
  insertAdvantages();

  openMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("open");
  });

  closeMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });

  const icons = document.querySelectorAll("icon");

  // replace icon tags with real icon svg's
  icons.forEach((icon) => {
    const iconType = icon.getAttribute("type");
    const parent = icon.parentElement;
    const iconHTML = iconMap[iconType];

    if (!iconHTML) {
      console.warn(`Icon not found: ${iconType}`);
      return;
    }

    if (!parent) {
      console.warn(`Parent not found for icon: ${icon}`);
    }

    const newEl = createSVGElement();
    newEl.innerHTML = iconHTML;

    if (icon.classList.length) {
      newEl.classList.add(icon.className);
    }

    parent.replaceChild(newEl, icon);
  });
});

function checkPageOffset() {
  if (pageYOffset > 110 && !navbar.classList.contains("visible")) {
    navbar.classList.add("visible");
  } else if (pageYOffset === 0 && navbar.classList.contains("visible")) {
    navbar.classList.remove("visible");
  }
}

function createSVGElement() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("fill", "none");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  return svg;
}

function insertNavigation() {
  const navLists = document.querySelectorAll(".navigation__list");

  navLists.forEach((navList) => {
    navList.innerHTML = menuItems.map((item) => `<li><a href="#">${item}</a></li>`).join("");
  });
}

function insertHeroBullets() {
  const bulletParent = document.querySelector(".hero__bullets");

  bulletParent.innerHTML = bulletPoints
    .map(
      (pointText) => `
  <li class="hero__bullet">
    <img class="tick" src="/assets/icons/tick.svg" />
    <span>${pointText}</span>
  </li>`
    )
    .join("");
}

function insertAdvantages() {
  const advantageParent = document.querySelector(".advantages__list");

  advantageParent.innerHTML = advantages
    .map(
      (advantageText) => `
    <li class="advantages__list-item">
      <img class="advantages__list-item-image" src="/assets/icons/bullet.svg" />
      <span>${advantageText}</span>
    </li>
  `
    )
    .join("");
}
