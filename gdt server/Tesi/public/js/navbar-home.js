"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Seleziona l'elemento con l'ID "navbarTogglerDemo01"
  var nav = document.getElementById("navbarTogglerDemo01");

  // Seleziona tutti gli elementi <a> all'interno del menu di navigazione
  var navLinks = nav.querySelectorAll(".nav-link");

  // Aggiungi un gestore di eventi a ciascun elemento <a>
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      // Rimuovi la classe "active" da tutti gli elementi <a>
      navLinks.forEach(function (el) {
        el.classList.remove("active");
      });

      // Aggiungi la classe "active" solo all'elemento <a> cliccato
      link.classList.add("active");
    });
  });
});
