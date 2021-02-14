(function (window, document) {
  'use strict';

  const $toggles = document.querySelectorAll('.toggle'); // NodeList(Arraylike)
  const $toggleBtn = document.getElementById('toggle-btn');

  $toggleBtn.addEventListener('click', function () {
    toggleElements();
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 1024) {
      offElements();
    }
  });

  function toggleElements() {
    // 유사배열 반복
    [].forEach.call($toggles, function (toggle) {
      toggle.classList.toggle('on');
    });
  }

  function offElements() {
    [].forEach.call($toggles, function (toggle) {
      toggle.classList.remove('on');
    });
  }
})(window, document);
