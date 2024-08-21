window.addEventListener("scroll", () => {
  const volver = document.getElementById("volver-al-inicio");

  if (window.scrollY > 100) {
    volver.classList.add("show");
  } else {
    volver.classList.remove("show");
  }
});

document
  .getElementById("volver-al-inicio")
  .addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
