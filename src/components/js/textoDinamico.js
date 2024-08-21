const textoDinamico = document.getElementById("texto-dinamico");
const texto = [
  "Somos Clan, Somos Familia",
  "Somos Clan, Somos Comida",
  "Somos Clan, Somos Bros",
  "Somos Clan, Somos Familia",
  "Somos Clan, Somos Familia",
  "Somos Clan, Somos Familia",
];

function efectoTyping(elemento, texto, i = 0, reverse = false) {
  if (!reverse) {
    elemento.textContent += texto[i];
    if (i === texto.length - 1) {
      setTimeout(() => efectoTyping(elemento, texto, i, true), 4000); // Espera antes de empezar a borrar
    } else {
      setTimeout(() => efectoTyping(elemento, texto, ++i), 150);
    }
  } else {
    elemento.textContent = elemento.textContent.slice(0, -1);
    if (elemento.textContent.length === 0) {
      setTimeout(() => efectoTyping(elemento, texto), 4000); // Espera antes de empezar a escribir de nuevo
    } else {
      setTimeout(() => efectoTyping(elemento, texto, i, true), 150);
    }
  }
}

let i = Math.floor(Math.random() * 6);

efectoTyping(textoDinamico, texto[i]);
