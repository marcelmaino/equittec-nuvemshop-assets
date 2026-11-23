/*! Equittec footer links — privacy + shipping icons */
(function () {
  "use strict";

  var PRIVACY_URL = "/pagina/politica-de-privacidade/";
  var SHIPPING_URL = "/pagina/metodos-de-envio/";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function ensureMenuLink(list, href, label) {
    if (!list) return;
    var exists = false;
    var links = list.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) {
      var h = (links[i].getAttribute("href") || "").toLowerCase();
      if (h.indexOf("politica-de-privacidade") !== -1 || h.indexOf("metodos-de-envio") !== -1) {
        if (
          (label.indexOf("Privacidade") !== -1 && h.indexOf("privacidade") !== -1) ||
          (label.indexOf("envio") !== -1 && h.indexOf("envio") !== -1)
        ) {
          exists = true;
          break;
        }
      }
      if ((links[i].textContent || "").trim().toLowerCase() === label.toLowerCase()) {
        exists = true;
        break;
      }
    }
    if (exists) return;
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = href;
    a.textContent = label;
    li.appendChild(a);
    list.appendChild(li);
  }

  function linkShippingIcons() {
    var groups = document.querySelectorAll(".footer-payment-group");
    for (var g = 0; g < groups.length; g++) {
      var labelEl = groups[g].querySelector(".footer-payment-shipping-label");
      var labelText = labelEl ? (labelEl.textContent || "").toLowerCase() : "";
      if (labelText.indexOf("envio") === -1 && labelText.indexOf("shipping") === -1) continue;

      var wrapper = groups[g].querySelector(".footer-logos-wrapper");
      if (!wrapper) continue;

      // Make the whole shipping logos block clickable
      if (!wrapper.closest("a.equittec-shipping-link")) {
        var wrapLink = document.createElement("a");
        wrapLink.href = SHIPPING_URL;
        wrapLink.className = "equittec-shipping-link";
        wrapLink.setAttribute("aria-label", "Métodos de envio");
        wrapLink.title = "Ver métodos de envio";
        wrapLink.style.display = "inline-flex";
        wrapLink.style.alignItems = "center";
        wrapLink.style.gap = "6px";
        wrapLink.style.textDecoration = "none";
        while (wrapper.firstChild) {
          wrapLink.appendChild(wrapper.firstChild);
        }
        wrapper.appendChild(wrapLink);
      }

      // Also make the label clickable
      if (labelEl && !labelEl.closest("a")) {
        var labelLink = document.createElement("a");
        labelLink.href = SHIPPING_URL;
        labelLink.className = "equittec-shipping-label-link";
        labelLink.textContent = labelEl.textContent;
        labelLink.style.color = "inherit";
        labelLink.style.textDecoration = "none";
        labelEl.textContent = "";
        labelEl.appendChild(labelLink);
      }
    }
  }

  function injectFooterLinks() {
    var menus = document.querySelectorAll(
      "footer .footer-menu-list, footer .footer-menu-accordion-content ul"
    );
    for (var i = 0; i < menus.length; i++) {
      ensureMenuLink(menus[i], PRIVACY_URL, "Política de Privacidade");
      ensureMenuLink(menus[i], SHIPPING_URL, "Métodos de envio");
    }

    // Legal strip under copyright, if present
    var legal = document.querySelector("footer .footer-legal-container, footer .footer-secondary-info");
    if (legal && !document.querySelector(".equittec-legal-links")) {
      var box = document.createElement("div");
      box.className = "equittec-legal-links";
      box.style.margin = "12px 0";
      box.style.fontSize = "13px";
      box.innerHTML =
        '<a href="' +
        PRIVACY_URL +
        '">Política de Privacidade</a>' +
        ' &nbsp;|&nbsp; ' +
        '<a href="' +
        SHIPPING_URL +
        '">Métodos de envio</a>';
      var powered = legal.querySelector(".footer-powered-by, .powered-by-logo");
      if (powered && powered.parentNode) {
        powered.parentNode.insertBefore(box, powered);
      } else {
        legal.appendChild(box);
      }
    }
  }

  ready(function () {
    injectFooterLinks();
    linkShippingIcons();
  });
})();
