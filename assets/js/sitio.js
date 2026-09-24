/* Análisis de contexto · IAGen y currículo
   Mejoras progresivas: el sitio funciona sin JavaScript. */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  /* Menú móvil */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
  }

  /* Índice "En esta página" a partir de los h2 del contenido */
  var tocHost = document.getElementById("toc");
  if (tocHost) {
    var heads = document.querySelectorAll(".content h2[id]");
    if (heads.length > 2) {
      var h = document.createElement("h2");
      h.textContent = "En esta página";
      var ul = document.createElement("ul");
      heads.forEach(function (el) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "#" + el.id;
        a.textContent = el.textContent;
        li.appendChild(a);
        ul.appendChild(li);
      });
      tocHost.appendChild(h);
      tocHost.appendChild(ul);
      tocHost.hidden = false;
    }
  }

  /* Botones "Copiar" en los prompts */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.hidden = false;
    btn.addEventListener("click", function () {
      var target = document.getElementById(btn.getAttribute("data-copy"));
      if (!target) return;
      var text = target.innerText.trim();
      var done = function () {
        var old = btn.textContent;
        btn.textContent = "Copiado";
        setTimeout(function () { btn.textContent = old; }, 1800);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, function () { fallback(text); done(); });
      } else { fallback(text); done(); }
    });
  });
  function fallback(text) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", "");
    ta.style.position = "absolute"; ta.style.left = "-9999px";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
  }

})();
