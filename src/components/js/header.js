const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
const header = document.getElementById("header");

burger.addEventListener("click", () => {
  nav.classList.toggle("opacity-100");
  nav.classList.toggle("pointer-events-auto");
  nav.classList.toggle("nav-open");
  burger.classList.toggle("animate-rotate-x");
});

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const navIsOpen = nav.classList.contains("nav-open");

  // Si el navbar está desplegado, no hacer nada
  if (navIsOpen) return;

  // Verifica si el navbar está desplegado
  const navIsVisible = nav.classList.contains("top-[0%]");

  // Si el navbar está desplegado, no hacer nada
  if (navIsVisible) return;

  if (window.scrollY > lastScrollY) {
    // Scrolling down
    header.classList.add("opacity-0");
    header.classList.remove("opacity-100");
  } else {
    // Scrolling up
    header.classList.add("opacity-100");
    header.classList.remove("opacity-0");
  }

  if (window.scrollY > 50) {
    header.classList.add("bg-black"); // Cambia el color de fondo aquí
  } else {
    header.classList.remove("bg-black");
  }
  lastScrollY = window.scrollY;
});
