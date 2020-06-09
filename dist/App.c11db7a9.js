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
})({"../src/VinHistory.ts":[function(require,module,exports) {
"use strict"; // import Ui from "./Ui";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", {
  value: true
}); // console.log(" działą w pliku  z klasa infoVin");
// //1GNALDEK9FZ108495 example number vin

var VinHistory = function VinHistory() {
  _classCallCheck(this, VinHistory);

  this.saveItemToLocalStorage = function (vinCode, data) {
    localStorage.setItem(vinCode, JSON.stringify(data));
  };

  this.getItemsFromLocalStorage = function () {
    var items = _objectSpread({}, localStorage); //console.log(items);


    var tabtest = [];

    if (items.length != 0) {
      Object.entries(items).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        tabtest.push(JSON.parse(value));
      });
      return tabtest;
    } else {
      return [];
    }
  };
};

exports.default = VinHistory;
},{}],"../src/Ui.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Ui = function Ui(data) {
  var _this = this;

  _classCallCheck(this, Ui);

  this.printData = function () {
    // console.log(this.data);
    var _this$data = _this.data,
        engine = _this$data.engine,
        make = _this$data.make,
        manufacturer = _this$data.manufacturer,
        model = _this$data.model,
        transmission = _this$data.transmission,
        trim = _this$data.trim,
        year = _this$data.year,
        vin = _this$data.vin,
        img = _this$data.img; // if (this.mainIsCreated != null && this.mainIsCreated != undefined) {
    //   this.updateData();
    // } else {
    //   this.printData();
    // }

    var aside = document.querySelector("aside");
    var main = document.createElement("main");
    var headerRaport = document.createElement("div");
    var mainRaport = document.createElement("div");
    var infoRaport = document.createElement("div");
    var imgRaport = document.createElement("div");
    var detailsRaport = document.createElement("div");
    var ContainerDetailsRaport = document.createElement("div");
    var nameCarHeader = document.createElement("h3");
    var infoRaportWrapper = document.createElement("div");
    var vinLocationIMG = document.createElement("img");
    headerRaport.className = "headerRaport";
    mainRaport.className = "mainRaport";
    infoRaport.className = "infoRaport";
    imgRaport.className = "imgRaport";
    ContainerDetailsRaport.className = "ContainerDetailsRaport";
    nameCarHeader.className = "NameCarHeader";
    infoRaportWrapper.className = "infoRaportWrapper";
    detailsRaport.className = "detailsRaport";
    vinLocationIMG.className = "vinImg";
    var imgSrc = "../IMG/vinLocation.png";
    var describeBtn = "POKA\u017B SZCZEG\xD3\u0141Y ";
    var btnDetails = "<button class=\"detailsBtn\">\n    <span>".concat(describeBtn, "<i class=\"fas fa-check\"></i></span>\n    </button>");
    nameCarHeader.innerText = "".concat(make, " ").concat(model);
    infoRaportWrapper.innerHTML = "<ul>\n    <li>".concat(vin, "</li>\n      <li>").concat(make, "</li>\n      <li><i class='fas fa-industry'></i>").concat(manufacturer, "</li>\n      <li><i class=\"fas fa-car\"></i>").concat(model, "</li>\n      <li><img src='./IMG/car.png' alt='car_transmission' height='100px' width='100px'>").concat(transmission, "</li>\n      <li><i class=\"fas fa-code-branch\"></i>equipment ").concat(trim, "</li>\n      <li><i class=\"fas fa-calendar-alt\"></i>").concat(year, "</li>\n      </ul>"); //`<img src='../IMG/car.png' alt='carv_service' id='carServices'>`

    if (aside != null) {
      aside.before(main);
      main.appendChild(headerRaport);
      headerRaport.after(mainRaport);
      mainRaport.appendChild(infoRaport);
      infoRaport.after(imgRaport);
      mainRaport.after(detailsRaport);
      infoRaport.appendChild(nameCarHeader);
      nameCarHeader.after(infoRaportWrapper);
      detailsRaport.innerHTML = btnDetails;
      imgRaport.appendChild(vinLocationIMG);
      main.after(ContainerDetailsRaport);
      headerRaport.innerHTML = "<p>TW\xD3J RAPORT POJAZDU</p><i class='fas fa-info-circle'></i>";
      var imgLocation = document.querySelector(".vinImg");

      if (imgLocation != null) {
        // console.log("testImg");
        imgLocation.setAttribute("src", img);
      }
    }
  };

  this.updateData = function () {
    //console.log(this.data);
    var _this$data2 = _this.data,
        engine = _this$data2.engine,
        make = _this$data2.make,
        manufacturer = _this$data2.manufacturer,
        model = _this$data2.model,
        transmission = _this$data2.transmission,
        trim = _this$data2.trim,
        year = _this$data2.year,
        vin = _this$data2.vin,
        img = _this$data2.img;
    var infoRaportWrapper = document.querySelector(".infoRaportWrapper");
    var nameCarHeader = document.querySelector(".NameCarHeader");

    if (infoRaportWrapper && nameCarHeader) {
      nameCarHeader.innerText = "".concat(make, " ").concat(model);
      infoRaportWrapper.innerHTML = "<ul>\n        <li>".concat(vin, "</li>\n          <li><i class='fas fa-industry'></i>").concat(manufacturer, "</li>\n          <li><i class=\"fas fa-car\"></i>").concat(model, "</li>\n          <li><img src='./IMG/car.png' alt='car_transmission' height='100px' width='100px'>").concat(transmission, "</li>\n          <li><i class=\"fas fa-code-branch\"></i>equipment ").concat(trim, "</li>\n          <li><i class=\"fas fa-calendar-alt\"></i>").concat(year, "</li>\n          </ul>");
    }

    var imgLocation = document.querySelector(".vinImg");
    imgLocation ? imgLocation.setAttribute("src", img) : null;
  };

  this.data = data, this.mainIsCreated = document.querySelector("main");

  if (this.mainIsCreated != null && this.mainIsCreated != undefined) {
    this.updateData();
  } else {
    this.printData();
  }
};

exports.default = Ui;
},{}],"../src/VinHistoryUI.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var VinHistory_1 = __importDefault(require("./VinHistory"));

var Ui_1 = __importDefault(require("./Ui"));

var VinHistoryUI = function VinHistoryUI() {
  var _this = this;

  _classCallCheck(this, VinHistoryUI);

  this.DisplayVinHeader = function (HistoryVin) {
    HistoryVin.map(function (el) {
      var vin = el.vin;
      var li = document.createElement("li");
      var shortDescVin = document.createElement("p");
      var HeaderHistoryVin = document.createElement("div");
      HeaderHistoryVin.addEventListener("mousedown", function (e) {
        return _this.handleMouseDownListElem(e);
      });
      shortDescVin.innerHTML = "testVin-HISTORY";
      HeaderHistoryVin.className = "vinHistory-test";
      HeaderHistoryVin.setAttribute("id", vin);

      if (_this.listVinEl) {
        _this.listVinEl.appendChild(li);

        HeaderHistoryVin.innerHTML = " <p>".concat(vin, "</p><a href='usun'>X</a>");
        li.appendChild(HeaderHistoryVin);
      }
    });
  };

  this.handleMouseDownListElem = function (e) {
    console.log(e);
    var id = e.target.id;
    console.log(id);
    console.log(id);
    var testduba = new VinHistory_1.default().getItemsFromLocalStorage();
    console.log(testduba);
    var catchElemList = testduba.filter(function (el) {
      return el.vin == id;
    });
    catchElemList.map(function (el) {
      return new Ui_1.default(el);
    });
  };

  this.listVinEl = document.querySelector(".hitoryVin-Bar");
  this.ElemHistoryVin = null;
};

exports.default = VinHistoryUI;
},{"./VinHistory":"../src/VinHistory.ts","./Ui":"../src/Ui.ts"}],"../src/App.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var VinHistory_1 = __importDefault(require("./VinHistory"));

var VinHistoryUI_1 = __importDefault(require("./VinHistoryUI"));

var Ui_1 = __importDefault(require("./Ui"));

var App = function App() {
  var _this = this;

  _classCallCheck(this, App);

  this.startAppEvent = function () {
    //const ElemHistoryVin = document.querySelector(".hitoryVin-Bar");
    //console.log(ElemHistoryVin);
    // console.log(item);
    // const testUIHIS = new HistoryUI();
    // testUIHIS.DisplayVinHeader("1GNALDEK9FZ108495");
    // console.log(testUIHIS);
    // const listVinEl: HTMLElement | null = document.querySelector(
    //   ".hitoryVin-Bar"
    // );
    // console.log(listVinEl);
    // listVinEl?.addEventListener<"click">("click", (e) => console.log(e.target));
    // const element1 = document.querySelector(".a-class");
    // const element2 = document.querySelector(".another-class");
    // body.addEventListener('click', event => {
    //   if (event.target !== element1 && event.target !== element2) {
    //     return
    //   }
    //   //handle click
    // }
    // document.querySelectorAll(".vinHistory-test").forEach((item) => {
    //   item.addEventListener("click", (e) => {
    //     console.log(e.target);
    //   });
    // });
    if (_this.btnCheck) {
      if (_this.vinCodeEl != null) {
        _this.vinCodeEl.addEventListener("keyup", function () {
          return _this.handleKeyUp();
        });

        _this.btnCheck.addEventListener("click", function () {
          return _this.handleClickCheck();
        });
      } else {
        throw new Error("vin not found");
      }
    } else {
      throw new Error("Button not found");
    }
  };

  this.validationInput = function () {};

  this.handleKeyUp = function () {
    var _a;

    (_a = _this.vinCodeEl) === null || _a === void 0 ? void 0 : _a.value.toUpperCase();
  };

  this.handleClickCheck = function () {
    var _a;

    if (_this.vinCodeEl) {
      var vinCodeUpper = _this.vinCodeEl.value.toUpperCase();

      if (vinCodeUpper.length == 17 && vinCodeUpper.indexOf(" ") == -1 && vinCodeUpper.indexOf("I") == -1 && vinCodeUpper.indexOf("O") == -1 && vinCodeUpper.indexOf("Q") == -1) {
        _this.vinCode = (_a = _this.vinCodeEl) === null || _a === void 0 ? void 0 : _a.value;
      } else {
        throw new Error("inncorect vin format");
      }
    }

    _this.handleVinInfo("img");

    _this.handleVinInfo("maintanceList");

    _this.handleVinInfo("carData");

    document.querySelector("input[name=vinCode]").value = "";
  };

  this.handleClickDetails = function () {
    if (_this.btnDetailsRaport) {
      _this.btnDetailsRaport.addEventListener("click", function () {
        return _this.handleClickDetailsRaport();
      });
    }
  };

  this.mergeObjectData = function (data, data1) {
    return Object.assign({}, data, data1);
  };

  this.handleClickDetailsRaport = function () {
    var _a;

    (_a = _this.ContainerDetailsRaport) === null || _a === void 0 ? void 0 : _a.setAttribute("style", "display:flex");
  };

  this.newGetRapportEl = function () {
    _this.btnDetailsRaport = document.querySelector(".detailsBtn");
    _this.ContainerDetailsRaport = document.querySelector(".ContainerDetailsRaport");
  };

  this.handleVinInfo = function (param) {
    var apiArray = ["http://api.carmd.com/v3.0/image?vin", "http://api.carmd.com/v3.0/maintlist?vin", "http://api.carmd.com/v3.0/decode?vin"];
    var test = "";

    switch (param) {
      case "img":
        test = apiArray[0];
        break;

      case "maintanceList":
        test = apiArray[1];
        break;

      case "carData":
        test = apiArray[2];
        break;
    }

    fetch("".concat(test, "=").concat(_this.vinCode), {
      method: "GET",
      headers: {
        authorization: "Basic ZTY2YzE0ZDgtMDYzMS00NDM0LTlkMDMtY2JmNzJiZjkwMDkz",
        "partner-token": "41b91927b6104c9199daf05ff511368f"
      }
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      var data = response.data,
          message = response.message;

      switch (param) {
        case "img":
          _this.testDuba = _this.mergeObjectData({
            img: data.image
          }, _this.testDuba);
          break;

        case "maintanceList":
          _this.testDuba = _this.mergeObjectData(data, _this.testDuba);
          break;

        case "carData":
          _this.testDuba = _this.mergeObjectData(_this.testDuba, data);

          _this.newGetRapportEl();

          _this.handleClickDetails();

          break;
      }

      _this.testDuba = _this.mergeObjectData(_this.testDuba, {
        vin: _this.vinCode
      });

      if (_this.testDuba) {
        console.log(_this.testDuba);

        _this.saveDataToLocal(_this.testDuba);

        new Ui_1.default(_this.testDuba);
      }
    }).catch(function (err) {
      console.log(err);
      return new Error("sry api not works");
    });
  };

  this.saveDataToLocal = function (data) {
    if (_this.vinCode) _this.VinHistory.saveItemToLocalStorage(_this.vinCode, data); // this.handleDataFromLocal();
  };

  this.handleDataFromLocal = function () {
    var testData = _this.VinHistory.getItemsFromLocalStorage(); //console.log(testData);


    if (testData) {
      _this.HistoryUi.DisplayVinHeader(testData);
    } else {
      console.log("your histry vin not found!");
    }
  };

  this.btnCheck = document.querySelector(".checkBtn"), this.ContainerDetailsRaport = document.querySelector(".ContainerDetailsRaport"), this.btnDetailsRaport = document.querySelector(".detailsBtn"), this.vinCodeEl = document.querySelector("input[name=vinCode]"), this.vin = null, this.vinCode = "", this.testDuba = {}, this.VinHistory = new VinHistory_1.default();
  this.HistoryUi = new VinHistoryUI_1.default();
  this.handleDataFromLocal();
  this.startAppEvent();
};

new App();
},{"./VinHistory":"../src/VinHistory.ts","./VinHistoryUI":"../src/VinHistoryUI.ts","./Ui":"../src/Ui.ts"}],"C:/Users/Michal/AppData/Roaming/npm-cache/_npx/13512/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51245" + '/');

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
},{}]},{},["C:/Users/Michal/AppData/Roaming/npm-cache/_npx/13512/node_modules/parcel/src/builtins/hmr-runtime.js","../src/App.ts"], null)
//# sourceMappingURL=/App.c11db7a9.js.map