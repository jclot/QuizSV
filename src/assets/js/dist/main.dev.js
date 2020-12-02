"use strict";

(function () {
  var doc = document;
  var rootEl = doc.documentElement;
  var body = doc.body;
  var lightSwitch = doc.getElementById('lights-toggle');
  /* global ScrollReveal */

  var sr = window.sr = ScrollReveal();
  rootEl.classList.remove('no-js');
  rootEl.classList.add('js');
  window.addEventListener('load', function () {
    body.classList.add('is-loaded');
  }); // Reveal animations

  function revealAnimations() {
    sr.reveal('.feature', {
      duration: 600,
      distance: '20px',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      origin: 'right',
      viewFactor: 0.2
    });
  }

  if (body.classList.contains('has-animations')) {
    window.addEventListener('load', revealAnimations);
  } // Light switcher


  if (lightSwitch) {
    window.addEventListener('load', checkLights);
    lightSwitch.addEventListener('change', checkLights);
  }

  function checkLights() {
    var labelText = lightSwitch.parentNode.querySelector('.label-text');

    if (lightSwitch.checked) {
      body.classList.remove('lights-off');

      if (labelText) {
        labelText.innerHTML = 'dark';
      }
    } else {
      body.classList.add('lights-off');

      if (labelText) {
        labelText.innerHTML = 'light';
      }
    }
  }
})();