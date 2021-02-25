// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

fetch('http://localhost:3000/api/mileageList').then(function (response) {
  return response.json();
}).then(function (data) {
  setMileageEventContents(data);
  return data;
}).then(function (status) {
  return console.log('Request successful', status.code);
}).catch(function (error) {
  return console.log('Request failed', error);
});
fetch('http://localhost:3000/api/mallEventList').then(function (response) {
  return response.json();
}).then(function (data) {
  getMallEventContentLists(data);
  return data;
}).then(function (status) {
  return console.log('Request successful', status.code);
}).catch(function (error) {
  return console.log('Request failed', error);
});
var $mileageEventSlide = document.querySelector('.event--slide');
var $mileageSlidePage = document.querySelector('#mileageSlidePage');
var $prevEventButton = document.querySelector('.slide--button--prev');
var $nextEventButton = document.querySelector('.slide--button--next');
var $mallEventList = document.querySelector('#mallEventList');
var $topMileageSlide = document.querySelector('#topMileageSlide');
var $mallEventSlide = document.querySelector('#mallEventSlide');

var EventSlider = /*#__PURE__*/function () {
  function EventSlider(target) {
    _classCallCheck(this, EventSlider);

    this.target = target;
  }

  _createClass(EventSlider, [{
    key: "init",
    value: function init() {
      if (this.target) this.addEvent();
    }
  }, {
    key: "addEvent",
    value: function addEvent() {
      var _this = this;

      // 여기에서 this: EventSlider 객체
      // this.target: $mileageSlider
      console.log(this, this.target);
      this.target.addEventListener('mouseover', this.overEventSlider.bind(this));
      this.target.addEventListener('mouseout', function (e) {
        return _this.outEventSlider(e);
      });
      this.target.addEventListener('click', function (e) {
        return _this.clickEventSlider(e);
      });
    }
  }, {
    key: "overEventSlider",
    value: function overEventSlider(e) {
      console.log(this, e.target);

      if (e.target.classList.contains('adela') || e.target.getAttribute('data-index')) {
        this.pageHover(e);
      }

      $prevEventButton.querySelector('.ico--prev').classList.replace('ico--prev', 'ico--prev__slide--hover');
      $nextEventButton.querySelector('.ico--next').classList.replace('ico--next', 'ico--next__slide--hover');
    }
  }, {
    key: "outEventSlider",
    value: function outEventSlider() {
      $prevEventButton.querySelector('.ico--prev__slide--hover').classList.replace('ico--prev__slide--hover', 'ico--prev');
      $nextEventButton.querySelector('.ico--next__slide--hover').classList.replace('ico--next__slide--hover', 'ico--next');
    }
  }, {
    key: "clickPrev",
    value: function clickPrev() {
      var _this2 = this;

      $topMileageSlide.classList.replace('slide', 'slide--click--prev');
      setTimeout(function () {
        $topMileageSlide.insertBefore($topMileageSlide.lastElementChild, $topMileageSlide.firstElementChild);
        $topMileageSlide.classList.replace('slide--click--prev', 'slide');

        _this2.pagePrev();
      }, 300);
    }
  }, {
    key: "clickNext",
    value: function clickNext() {
      var _this3 = this;

      $topMileageSlide.classList.replace('slide', 'slide--click--next');
      setTimeout(function () {
        $topMileageSlide.insertBefore($topMileageSlide.firstElementChild, null);
        $topMileageSlide.classList.replace('slide--click--next', 'slide');

        _this3.pageNext();
      }, 300);
    }
  }, {
    key: "clickEventSlider",
    value: function clickEventSlider(e) {
      var isClickPrev = function isClickPrev() {
        return e.target.classList.contains('slide--button--prev') || e.target.classList.contains('ico--prev__slide--hover');
      };

      var isClickNext = function isClickNext() {
        return e.target.classList.contains('slide--button--next') || e.target.classList.contains('ico--next__slide--hover');
      };

      if (isClickPrev()) {
        this.clickPrev();
      }

      if (isClickNext()) {
        this.clickNext();
      }
    }
  }, {
    key: "pagePrev",
    value: function pagePrev() {
      $mileageSlidePage.insertBefore($mileageSlidePage.firstElementChild, null);
    }
  }, {
    key: "pageNext",
    value: function pageNext() {
      $mileageSlidePage.insertBefore($mileageSlidePage.lastElementChild, $mileageSlidePage.firstElementChild);
    }
  }, {
    key: "pageHoverPrev",
    value: function pageHoverPrev() {
      $topMileageSlide.insertBefore($topMileageSlide.lastElementChild, $topMileageSlide.firstElementChild);
      this.pagePrev();
    }
  }, {
    key: "pageHoverNext",
    value: function pageHoverNext() {
      $topMileageSlide.insertBefore($topMileageSlide.firstElementChild, null);
      this.pageNext();
    }
  }, {
    key: "pageHover",
    value: function pageHover(e) {
      if (e.target.classList.contains('first')) return;

      if (e.target.getAttribute('data-index') === '1') {
        this.pageHoverNext();
      }

      if (e.target.getAttribute('data-index') === '2') {
        this.pageHoverPrev();
      }
    }
  }]);

  return EventSlider;
}();

var eventSliderListener = new EventSlider($mileageEventSlide);
eventSliderListener.init();
/*
$mileageEventSlide.addEventListener('mouseover', eventSliderListener.overEventSlider);
$mileageEventSlide.addEventListener('mouseout', eventSliderListener.outEventSlider);
$mileageEventSlide.addEventListener('click', eventSliderListener.clickEventSlider);
*/

function overEventSlider(e) {
  if (e.target.classList.contains('adela') || e.target.getAttribute('data-index')) {
    pageHover(e);
  }

  $prevEventButton.querySelector('.ico--prev').classList.replace('ico--prev', 'ico--prev__slide--hover');
  $nextEventButton.querySelector('.ico--next').classList.replace('ico--next', 'ico--next__slide--hover');
}

function outEventSlider() {
  $prevEventButton.querySelector('.ico--prev__slide--hover').classList.replace('ico--prev__slide--hover', 'ico--prev');
  $nextEventButton.querySelector('.ico--next__slide--hover').classList.replace('ico--next__slide--hover', 'ico--next');
}

function clickEventSlider(e) {
  var isClickPrev = function isClickPrev() {
    return e.target.classList.contains('slide--button--prev') || e.target.classList.contains('ico--prev__slide--hover');
  };

  var isClickNext = function isClickNext() {
    return e.target.classList.contains('slide--button--next') || e.target.classList.contains('ico--next__slide--hover');
  };

  if (isClickPrev()) {
    clickPrev();
  }

  if (isClickNext()) {
    clickNext();
  }
} // slide 내부 동적으로 그려보기


function setMileageEventContents(contents) {
  $topMileageSlide.insertAdjacentHTML('afterbegin', getMileageEventContents(contents));
}

function getMileageEventContents(jsonData) {
  var imgurlArr = jsonData.mileageList.map(function (el) {
    return el.imgurl;
  });
  var linkurlArr = jsonData.mileageList.map(function (el) {
    return el.linkurl;
  });
  var panelDiv = "";

  for (var i = 0; i < imgurlArr.length; i++) {
    panelDiv += "\n    <div class=\"panel\">\n    <a href=\"".concat(linkurlArr[i], "\" class=\"link--event\"\n      ><img src=\"").concat(imgurlArr[i], "\" width=\"485\" height=\"340\" class=\"img_g\" alt=\"\"\n    /></a>\n    </div>");
  }

  return panelDiv;
}

function getMallEventContents(jsonData) {
  return "\n<div class=\"panel\" aria-hidden=\"true\">\n<ul class=\"list--item\">\n</ul>\n</div>\n";
}

function getMallEventContentLists(jsonData) {
  console.log(jsonData.mallEventList[0]);
  var imgurl = jsonData.mallEventList.map(function (el) {
    return el.imgurl;
  });
  var linkurl = jsonData.mallEventList.map(function (el) {
    return el.linkurl;
  });
  var text1 = jsonData.mallEventList.map(function (el) {
    return el.text1;
  });
  var text2 = jsonData.mallEventList.map(function (el) {
    return el.text2;
  });
  var lists = "";

  for (var i = 0; i < imgurl.list; i++) {}

  return "\n  <li class=\"goods\">\n  <a href=\"\" class=\"link--product\"\n    ><span class=\"info--thumb\"\n      ><img\n        src=\"//shop1.daumcdn.net/thumb/S318x318/?fname=http%3A%2F%2Fshop1.daumcdn.net%2Fshophow%2Fp%2FF11929626306.jpg%3Fut%3D20210114041340&amp;scode=talkgift\"\n        width=\"200\"\n        height=\"200\"\n        class=\"imgage--top\"\n        alt=\"\uC548\uC804\uC744 \uC0DD\uAC01\uD55C\uB2E4\uBA74, \uCC3D\uBB38 \uC7A0\uAE08\uC7A5\uCE58\" /></span\n    ><strong class=\"info--title\">\uC548\uC804\uC744 \uC0DD\uAC01\uD55C\uB2E4\uBA74, \uCC3D\uBB38 \uC7A0\uAE08\uC7A5\uCE58</strong><span class=\"info--txt\">\uCE68\uC785\uC740 \uBB3C\uB860 \uB099\uD558\uC0AC\uACE0 \uC608\uBC29\uD574\uC694</span\n    ><span class=\"ico--background2 ico--theme\">\uD14C\uB9C8</span></a\n  >\n</li>\n  ";
}
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "4772" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map