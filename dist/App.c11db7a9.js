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
})({"../src/Api.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Api = function Api(vinCode) {
  var _this = this;

  _classCallCheck(this, Api);

  this.mergeObjectData = function (data, data1) {
    return Object.assign({}, data, data1);
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

    fetch("".concat(test, "=").concat(_this.vin), {
      method: "GET",
      headers: {
        authorization: "Basic YmZkZTkzMWEtNWI4NS00NTg5LTkxYmEtYWVkZjRhMWQzNmZi",
        "partner-token": "38300df0932f4ae697b9822965d7f129"
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
          break;
      }

      _this.testDuba = _this.mergeObjectData(_this.testDuba, {
        vin: _this.vin
      });

      if (_this.testDuba) {//console.log(this.testDuba);
        //   this.saveDataToLocal(this.testDuba);
        //   new Ui(this.testDuba as ApiObject);
      }
    }).catch(function (err) {
      console.log(err);
      return new Error("sry api not works");
    });
  };

  this.handleApiData = function () {
    return _this.testDuba;
  };

  this.vin = vinCode;
  this.testDuba = {}; //this.vinsDB = this.handleVinsFromLocal();
};

exports.default = Api;
},{}],"../src/VinHistory.ts":[function(require,module,exports) {
"use strict";

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
//
//

var VinHistory = function VinHistory() {
  var _this = this;

  _classCallCheck(this, VinHistory);

  this.saveItemToLocalStorage = function (vinCode, data) {
    var CopyVinsArray = _this.vinsDB;
    var bagno = CopyVinsArray.some(function (el) {
      return el.vin === vinCode;
    });

    if (bagno != true) {
      localStorage.setItem(vinCode, JSON.stringify(data));
    }

    return bagno;
  };

  this.handleVinsFromLocal = function () {
    var items = _objectSpread({}, localStorage);

    var VinsArrayFromLocal = [];

    if (items.length != 0) {
      Object.entries(items).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        VinsArrayFromLocal.push(JSON.parse(value)); ////  zamiast push  użycie jakiegos unshift() ?
      });
      return VinsArrayFromLocal;
    }
  };

  this.vinsDB = this.handleVinsFromLocal();
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

  this.createElem = function (elem) {
    return document.createElement("".concat(elem));
  };

  this.handleBtnClick = function (ContainerDetailsRaport) {
    if (ContainerDetailsRaport) {
      !_this.handleBtnClickIsActive ? ContainerDetailsRaport.setAttribute("style", "display:flex") : ContainerDetailsRaport.setAttribute("style", "display:none");
      _this.handleBtnClickIsActive = !_this.handleBtnClickIsActive;
    }
  };

  this.setListDataElem = function () {
    var _this$data = _this.data,
        make = _this$data.make,
        manufacturer = _this$data.manufacturer,
        model = _this$data.model,
        transmission = _this$data.transmission,
        trim = _this$data.trim,
        year = _this$data.year,
        vin = _this$data.vin;
    return "<ul>\n    <li>".concat(vin, "</li>\n      <li>").concat(make, "</li>\n      <li><i class='fas fa-industry'></i>").concat(manufacturer, "</li>\n      <li><i class=\"fas fa-car\"></i>").concat(model, "</li>\n      <li>").concat(_this.TransmissionIcon, " ").concat(transmission, "</li>\n      <li><i class=\"fas fa-code-branch\"></i>equipment ").concat(trim, "</li>\n      <li><i class=\"fas fa-calendar-alt\"></i>").concat(year, "</li>\n      </ul>");
  };

  this.printData = function () {
    // console.log(this.data);
    var _this$data2 = _this.data,
        make = _this$data2.make,
        model = _this$data2.model,
        img = _this$data2.img,
        engine = _this$data2.engine;
    var aside = document.querySelector("aside");

    var main = _this.createElem("main");

    var headerRaport = _this.createElem("div");

    var mainRaport = _this.createElem("div");

    var infoRaport = _this.createElem("div");

    var imgRaport = _this.createElem("div");

    var detailsRaport = _this.createElem("div");

    var ContainerDetailsRaport = _this.createElem("div");

    var nameCarHeader = _this.createElem("h3");

    var infoRaportWrapper = _this.createElem("div");

    var detailsBtn = _this.createElem("button");

    var vinLocationIMG = _this.createElem("img");

    headerRaport.className = "headerRaport";
    mainRaport.className = "mainRaport";
    infoRaport.className = "infoRaport";
    imgRaport.className = "imgRaport";
    ContainerDetailsRaport.className = "ContainerDetailsRaport";
    nameCarHeader.className = "NameCarHeader";
    infoRaportWrapper.className = "infoRaportWrapper";
    detailsRaport.className = "detailsRaport";
    vinLocationIMG.className = "vinImg";
    detailsBtn.className = "detailsBtn";
    detailsBtn.innerHTML = "Check <i class=\"fas fa-check\"></i>";
    var imgSrc = "../IMG/vinLocation.png";
    nameCarHeader.innerText = "".concat(make, " ").concat(model);
    infoRaportWrapper.innerHTML = _this.setListDataElem();

    if (aside) {
      headerRaport.innerHTML = "<p>TW\xD3J RAPORT POJAZDU</p><i class='fas fa-info-circle'></i>";
      aside.before(main);
      main.appendChild(headerRaport);
      headerRaport.after(mainRaport);
      mainRaport.appendChild(infoRaport);
      infoRaport.after(imgRaport);
      mainRaport.after(detailsRaport);
      infoRaport.appendChild(nameCarHeader);
      nameCarHeader.after(infoRaportWrapper);
      detailsRaport.appendChild(detailsBtn);
      imgRaport.appendChild(vinLocationIMG);
      main.after(ContainerDetailsRaport); //details -Engine

      var engineDesc = _this.createElem("div");

      engineDesc.className = "engineDesc";
      engineDesc.innerHTML = "<div><p>ENGINE</p>".concat(_this.EngineIcon, "</div>");

      var engineDetails = _this.createElem("div");

      engineDetails.className = "engineDetails";

      var carRaportPDF = _this.createElem("div");

      carRaportPDF.className = "carRaportPDF";
      carRaportPDF.innerHTML = '<div><p>Generate <span>PDF</span> Rapport</p><i class="fas fa-file-pdf"></i></div>';

      var engineSpec = _this.createElem("div");

      var engineIcons = _this.createElem("div");

      engineIcons.innerHTML = "".concat(_this.literIcon, " ").concat(_this.cylinderIcon, " ").concat(_this.turboIcon);
      engineSpec.className = "engineSpec";
      engineIcons.className = "engineIcons";
      engineDetails.appendChild(engineSpec);
      engineSpec.appendChild(engineIcons);

      var engineDataBar = _this.createElem("div");

      engineDataBar.className = "engineDataBar";
      engineIcons.after(engineDataBar);
      engineDataBar.innerHTML = "<p>".concat(engine, "</p>");
      ContainerDetailsRaport.appendChild(engineDesc);
      engineDesc.after(engineDetails);
      engineDetails.after(carRaportPDF);
      detailsBtn.addEventListener("click", function () {
        return _this.handleBtnClick(ContainerDetailsRaport);
      });
      var imgLocation = document.querySelector(".vinImg");

      if (imgLocation) {
        imgLocation.setAttribute("src", img);
      }
    }
  };

  this.updateData = function () {
    var _this$data3 = _this.data,
        make = _this$data3.make,
        model = _this$data3.model,
        img = _this$data3.img,
        engine = _this$data3.engine;
    var ContainerDetailsRaport = document.querySelector(".ContainerDetailsRaport"); //this.handleBtnClickIsActive = true;

    _this.handleBtnClickIsActive = true;

    _this.handleBtnClick(ContainerDetailsRaport);

    _this.handleBtnClickIsActive = false;
    var infoRaportWrapper = document.querySelector(".infoRaportWrapper");
    var nameCarHeader = document.querySelector(".NameCarHeader");
    var engineDataBar = document.querySelector(".engineDataBar");

    if (infoRaportWrapper && nameCarHeader && engineDataBar) {
      nameCarHeader.innerText = "".concat(make, " ").concat(model);
      infoRaportWrapper.innerHTML = _this.setListDataElem();
      engineDataBar.innerHTML = "<p>".concat(engine, "</p>");
    }

    var imgLocation = document.querySelector(".vinImg");
    imgLocation ? imgLocation.setAttribute("src", img) : null;
  };

  this.TransmissionIcon = '<img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00MzcuMDIsNzQuOThDMzg4LjY2NywyNi42MjksMzI0LjM4LDAsMjU2LDBTMTIzLjMzMywyNi42MjksNzQuOTgsNzQuOThDMjYuNjI5LDEyMy4zMzMsMCwxODcuNjIsMCwyNTYgICAgczI2LjYyOSwxMzIuNjY3LDc0Ljk4LDE4MS4wMkMxMjMuMzMzLDQ4NS4zNzEsMTg3LjYyLDUxMiwyNTYsNTEyczEzMi42NjctMjYuNjI5LDE4MS4wMi03NC45OCAgICBDNDg1LjM3MSwzODguNjY3LDUxMiwzMjQuMzgsNTEyLDI1NlM0ODUuMzcxLDEyMy4zMzMsNDM3LjAyLDc0Ljk4eiBNMjU5LjExOSwxMjYuNDk3Yy0xLjk4LTEuMDg5LTUuMjE1LTEuNjM0LTkuNzAyLTEuNjM0aC0zLjA2OSAgICB2LTEzLjA2OGgzLjQ2NWMzLjE2OCwwLDUuNzA4LTAuNjA5LDcuNjIzLTEuODMyYzEuOTE0LTEuMjIsMi44NzEtMi44ODYsMi44NzEtNWMwLTEuNTg0LTAuNTYyLTIuODIxLTEuNjgzLTMuNzEyICAgIGMtMS4xMjMtMC44OTEtMi43MDctMS4zMzYtNC43NTItMS4zMzZjLTIuMzEyLDAtNC40NzMsMC41NzktNi40ODQsMS43MzJjLTIuMDE1LDEuMTU2LTMuNzc5LDIuODg4LTUuMjk3LDUuMTk4bC0xMS44OC0xMy45NTkgICAgYzEuMTg4LTEuMzIsMi42ODgtMi41MjUsNC41MDUtMy42MTRjMS44MTQtMS4wODksMy44Ni0yLjAyOSw2LjEzOC0yLjgyMWMyLjI3Ni0wLjc5Miw0LjcwMi0xLjQwMiw3LjI3Ni0xLjgzMiAgICBjMi41NzQtMC40MjksNS4yMTMtMC42NDQsNy45Mi0wLjY0NGMzLjYyOSwwLDYuOTYzLDAuNDEzLDkuOTk5LDEuMjM3YzMuMDM1LDAuODI2LDUuNjA5LDEuOTk3LDcuNzIyLDMuNTE1ICAgIGMyLjExMiwxLjUxOSwzLjc2MywzLjM1MSw0Ljk1LDUuNDk1YzEuMTg4LDIuMTQ2LDEuNzgyLDQuNTM5LDEuNzgyLDcuMTc3YzAsMS45OC0wLjMzMSwzLjg2MS0wLjk5LDUuNjQzICAgIGMtMC42NiwxLjc4Mi0xLjU1MiwzLjQtMi42NzMsNC44NTFjLTEuMTIzLDEuNDUzLTIuNDYsMi42NzMtNC4wMSwzLjY2M2MtMS41NTEsMC45OS0zLjI1MSwxLjY1LTUuMDk5LDEuOTggICAgYzIuMDQ1LDAuMzMxLDMuOTExLDEuMDI0LDUuNTk0LDIuMDc5YzEuNjg0LDEuMDU2LDMuMTM0LDIuMzc2LDQuMzU2LDMuOTZjMS4yMiwxLjU4NCwyLjE3OCwzLjM4MywyLjg3MSw1LjM5NiAgICBjMC42OTIsMi4wMTQsMS4wMzksNC4xNDMsMS4wMzksNi4zODVjMCwzLjEwMy0wLjY2LDUuOTA2LTEuOTc5LDguNDE1Yy0xLjMyMSwyLjUwNy0zLjE4Niw0LjYzNi01LjU5NCw2LjM4NiAgICBjLTIuNDEsMS43NDgtNS4zNjMsMy4wODQtOC44Niw0LjAwOWMtMy40OTksMC45MjMtNy40MjYsMS4zODYtMTEuNzgxLDEuMzg2Yy01LjA4MywwLTkuNTctMC42NDQtMTMuNDY0LTEuOTMxICAgIGMtMy44OTYtMS4yODctNy40MjUtMy4yODQtMTAuNTkzLTUuOTlsOS42MDMtMTMuNjYyYzEuOTEzLDEuNTE5LDMuOTQzLDIuNjI0LDYuMDg5LDMuMzE2YzIuMTQ0LDAuNjkzLDQuNjA0LDEuMDQsNy4zNzUsMS4wNCAgICBjMy4zNjYsMCw1LjgyNC0wLjUxMSw3LjM3Ni0xLjUzNWMxLjU1LTEuMDIyLDIuMzI2LTIuNjU2LDIuMzI2LTQuOUMyNjIuMDg5LDEyOS4zODQsMjYxLjA5OSwxMjcuNTg1LDI1OS4xMTksMTI2LjQ5N3ogICAgIE0xMjIuOTgyLDEwNy44NzZjMC45MjQsMCwyLjIxMS0wLjM0NywzLjg2MS0xLjA0YzEuNjQ5LTAuNjkzLDMuMy0xLjUxOCw0Ljk1LTIuNDc1YzEuNjQ4LTAuOTU2LDMuMTUtMS45OCw0LjUwNC0zLjA2OSAgICBjMS4zNTMtMS4wODksMi4yMjgtMi4wMjksMi42MjQtMi44MjFoMTkuMjA2djM5LjY5OUgxNzAuN1YxNTVoLTQ1LjgzN3YtMTYuODNoMTQuMDU4di0xOS43MDEgICAgYy0wLjU5NCwwLjc5Mi0xLjUyLDEuNTY4LTIuNzcyLDIuMzI2Yy0xLjI1NCwwLjc2LTIuNjU3LDEuNDctNC4yMDcsMi4xMjhjLTEuNTUyLDAuNjYxLTMuMTE4LDEuMTg4LTQuNzAyLDEuNTg0ICAgIGMtMS41ODQsMC4zOTYtMy4wMDUsMC41OTQtNC4yNTgsMC41OTRWMTA3Ljg3NnogTTExOS40NjksNDEzYzAtMy4yOTksMC4yNjMtNi4yMDMsMC43OTItOC43MTIgICAgYzAuNTI3LTIuNTA4LDEuMzg2LTQuNzY4LDIuNTc0LTYuNzgyYzEuMTg4LTIuMDEyLDIuNzIzLTMuODEyLDQuNjA0LTUuMzk2YzEuODgxLTEuNTg0LDQuMjA3LTMuMTM0LDYuOTc5LTQuNjUzICAgIGMzLjU2My0xLjkxNCw2LjM4Ni0zLjQ0OCw4LjQ2NC00LjYwNGMyLjA3OS0xLjE1NCwzLjY0Ni0yLjA5NCw0LjcwMy0yLjgyMWMxLjA1NS0wLjcyNiwxLjczMi0xLjMzNywyLjAyOS0xLjgzMiAgICBzMC40NDUtMS4wNCwwLjQ0NS0xLjYzNGMwLTEuNjQ5LTAuNTI5LTIuODcxLTEuNTg0LTMuNjYzYy0xLjA1Ny0wLjc5Mi0yLjUwOS0xLjE4OC00LjM1NS0xLjE4OGMtMi4xNzksMC00LjI0MiwwLjU2Mi02LjE4OCwxLjY4MyAgICBjLTEuOTQ4LDEuMTIzLTMuOTc4LDIuOTM4LTYuMDg5LDUuNDQ1bC0xMS44OC0xMy45NTljMS4yNTMtMS4zODYsMi44NzEtMi42NTYsNC44NTEtMy44MTJjMS45OC0xLjE1NCw0LjE3NC0yLjE0NCw2LjU4NC0yLjk3ICAgIGMyLjQwOC0wLjgyNSw0Ljk2NS0xLjQ2OCw3LjY3Mi0xLjkzMWMyLjcwNi0wLjQ2MSw1LjQ3OC0wLjY5Myw4LjMxNi0wLjY5M2M3LjU4OSwwLDEzLjM0OCwxLjU2OCwxNy4yNzUsNC43MDMgICAgYzMuOTI2LDMuMTM1LDUuODkxLDcuNTA4LDUuODkxLDEzLjExN2MwLDIuMDQ3LTAuMjY1LDMuODYxLTAuNzkyLDUuNDQ1Yy0wLjUyOSwxLjU4NC0xLjIzNywzLjAyLTIuMTI5LDQuMzA3ICAgIGMtMC44OTEsMS4yODctMS45NjQsMi40NTktMy4yMTcsMy41MTRjLTEuMjU1LDEuMDU3LTIuNTc0LDIuMDQ2LTMuOTYsMi45N2MtMS42NSwxLjEyMy0zLjM4NCwyLjE5NS01LjE5OCwzLjIxNyAgICBjLTEuODE1LDEuMDI0LTMuNjEzLDIuMTYzLTUuMzk2LDMuNDE2aDIxLjc4VjQxM0gxMTkuNDY5eiBNMjgyLjI4NSw0MTMuMjk3aC04LjcxMnYxMi4yNzZoLTE4LjgxMXYtMTIuMjc2SDIyOS4zMnYtMTYuODMgICAgbDMxLjM4My0zOS45OTZoMTIuODd2MzkuOTk2aDguNzEyVjQxMy4yOTd6IE0zODEsMjcxSDI3MXY2NWgtMzB2LTY1aC04MHY2NWgtMzBWMTc2aDMwdjY1aDgwdi02NWgzMHY2NWg4MHYtNjVoMzBWMjcxeiAgICAgTTM3OC45NzksMTU2bC0xMy4zNjQtMjEuNTgyaC03LjIyOFYxNTZoLTE5LjMwNVY4NS43MWgzMi4yNzRjMy40MzEsMCw2LjU5OSwwLjcxLDkuNTA0LDIuMTI4ICAgIGMyLjkwMywxLjQyLDUuMzk2LDMuMjY3LDcuNDc0LDUuNTQ0YzIuMDc5LDIuMjc3LDMuNzEzLDQuODg1LDQuOTAxLDcuODIxYzEuMTg4LDIuOTM4LDEuNzgxLDUuODkxLDEuNzgxLDguODYgICAgYzAsNC4wOTMtMC44OTEsNy45MDUtMi42NzMsMTEuNDM1Yy0xLjc4MiwzLjUzMS00LjI1Nyw2LjQxOS03LjQyNSw4LjY2M0w0MDAuNzYsMTU2SDM3OC45Nzl6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzczLjYzMywxMDQuNDcxYy0xLjE4Ny0xLjI4Ny0yLjM3NS0xLjkzMS0zLjU2My0xLjkzMWgtMTEuNjgzdjE1LjA0OGgxMi4xNzhjMS4xODgsMCwyLjI5Mi0wLjY1OSwzLjMxNi0xLjk4ICAgIGMxLjAyMi0xLjMxOSwxLjUzNC0zLjE2OCwxLjUzNC01LjU0NEMzNzUuNDE1LDEwNy42MjMsMzc0LjgyMSwxMDUuNzU3LDM3My42MzMsMTA0LjQ3MXoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwb2x5Z29uIHBvaW50cz0iMjQ3LjgzMywzOTYuNDY3IDI1Ni45NCwzOTYuNDY3IDI1Ni45NCwzODQuNTg3ICAgIiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />';
  this.EngineIcon = '<img src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PGc+PHBhdGggZD0ibTMxMS42NDYgMjA4Ljc1Ny0yNi4yMjMtMjEuNDk4Yy02LjE3NSAxOC42NzQtMjMuNzgzIDMyLjE5LTQ0LjUgMzIuMTktNS45NDUgMC0xMS42MjktMS4xMjQtMTYuODY3LTMuMTUydjY2LjM4OWMxNi43NjUtNi40NDEgMzYuNTExLTIuOTI2IDUwLjAwOCAxMC41NyA1LjMyNiA1LjMyNiA5LjA4NyAxMS42MjkgMTEuMzA5IDE4LjMzNGwyNi4xNjItMjEuNDNjLTMuNTI4LTIuMDE4LTYuODUyLTQuNTIxLTkuODYxLTcuNTMtMTguMjczLTE4LjI3My0xOC4yNzMtNDguMDA3IDAtNjYuMjggMy4wMzktMy4wNDEgNi40MDItNS41NjQgOS45NzItNy41OTN6Ii8+PHBhdGggZD0ibTI0MC45MjMgMzA5LjUzOGMtNC4zMiAwLTguNjQgMS42NDQtMTEuOTI4IDQuOTMzLTYuNTc2IDYuNTc2LTYuNTc2IDE3LjI3NiAwIDIzLjg1NCA2LjU3OCA2LjU3NyAxNy4yOCA2LjU3NiAyMy44NTQgMCA2LjU3Ni02LjU3NiA2LjU3Ni0xNy4yNzgtLjAwMS0yMy44NTQtMy4yODYtMy4yODktNy42MDctNC45MzMtMTEuOTI1LTQuOTMzeiIvPjxjaXJjbGUgY3g9IjI0MC45MjIiIGN5PSIxNzIuNTgyIiByPSIxNi44NjciLz48cGF0aCBkPSJtMzM0LjgxMyAyMzIuNjMxYy00LjMxOSAwLTguNjM5IDEuNjQ0LTExLjkyNyA0LjkzMi02LjU3NiA2LjU3Ny02LjU3NiAxNy4yNzcgMCAyMy44NTQgNS42NDQgNS42NDQgMTQuMzE5IDYuNDI5IDIwLjgyNSAyLjM4NWwzLjM2MS0yLjc1M2M2LjIyNi02LjYwMiA2LjEyNS0xNy4wMjctLjMzMy0yMy40ODYtMy4yODgtMy4yODktNy42MDctNC45MzItMTEuOTI2LTQuOTMyeiIvPjxwYXRoIGQ9Im0xMS43MzggMzY1LjM0NmMtMTIuNDQ1IDEyLjQ0NS0xMi40NDUgMzIuNjIyIDAgNDUuMDY3czMyLjYyMiAxMi40NDUgNDUuMDY3IDBsMjIuMzctMjIuMzdjLTEyLjM2OCAxMi40NTEtMTIuMzQ1IDMyLjU3LjA3NCA0NC45ODkgOS43NTYgOS43NTYgMjQuMjYyIDExLjg2MSAzNi4wNzEgNi4zMjF2LTgxLjkzMWwtNDcuODI5LTQ3LjgyOXoiLz48cGF0aCBkPSJtMzY2LjY4IDMxLjg2N2MwLTE3LjYtMTQuMjY4LTMxLjg2Ny0zMS44NjgtMzEuODY3aC0xNTcuNjI0Yy0xNy42IDAtMzEuODY3IDE0LjI2Ny0zMS44NjcgMzEuODY3djE2Ljg2N2gyMjEuMzU5eiIvPjxwYXRoIGQ9Im00NjIuNTUzIDE2NS4wOTkgMzMuMTg2LTMzLjE4Ni0yMS4yMTMtMjEuMjEzLTMzLjE4NiAzMy4xODYtMzQuODY3LTM0Ljg2Ny0zOC43OTMgMzkuNjY3aC0xdi02OS45NTJoLTIyMS4zNnY2OS45NTJoLTFsLTM4LjQyNy00MC4wMzMtMzguNjIyIDM4LjYyMi0zMy4xODYtMzMuMTg1LTIxLjIxMyAyMS4yMTMgMzMuMTg2IDMzLjE4Ni0zOC42MjIgMzguNjIyIDEzNy44ODQgMTM3Ljg4NXY3My43MjVoMjIxLjM2di03My43MjZsMTM3Ljg4NS0xMzcuODg0em0tOTQuNjAxIDExNy41MzFjLTIuMDA0IDIuMDA0LTk0LjYxMSA3Ny41OTMtOTQuNjExIDc3LjU5My05LjA0MyA4LjY3MS0yMC43MjcgMTMuMDItMzIuNDE4IDEzLjAyLTEyLjAwMiAwLTI0LjAwNC00LjU2OC0zMy4xNDEtMTMuNzA1cy0xMy43MDUtMjEuMTM4LTEzLjcwNS0zMy4xNGgtLjAyMnYtMTUzLjgxNmMwLTI1Ljg0MyAyMS4wMjQtNDYuODY3IDQ2Ljg2Ny00Ni44NjcgMTEuNDczIDAgMjEuOTkxIDQuMTUxIDMwLjE0NiAxMS4wMmwuMDE4LS4wMjFzOTUuMjI1IDc3Ljk5NCA5Ni44NjYgNzkuNjM2YzE4LjI3NCAxOC4yNzMgMTguMjc0IDQ4LjAwNiAwIDY2LjI4eiIvPjxwYXRoIGQ9Im0xNDUuMzIgNDgwLjEzM2MwIDE3LjYgMTQuMjY4IDMxLjg2NyAzMS44NjcgMzEuODY3aDE1Ny42MjVjMTcuNiAwIDMxLjg2Ny0xNC4yNjcgMzEuODY3LTMxLjg2N3YtMzEuNDEyaC0yMjEuMzU5eiIvPjxwYXRoIGQ9Im01MDAuMjYyIDM2NS4zNDYtNTUuNzUzLTU1Ljc1My00Ny44MjkgNDcuODI5djgxLjkzMmMxMS44MDkgNS41NCAyNi4zMTYgMy40MzQgMzYuMDcxLTYuMzIxIDEyLjQxOS0xMi40MTkgMTIuNDQzLTMyLjUzOC4wNzQtNDQuOTg5bDIyLjM3IDIyLjM3YzEyLjQ0NSAxMi40NDUgMzIuNjIyIDEyLjQ0NSA0NS4wNjcgMHMxMi40NDUtMzIuNjIzIDAtNDUuMDY4eiIvPjwvZz48L2c+PC9zdmc+" />';
  this.cylinderIcon = "<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAACthAAArYQGsiVTaAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAuVQTFRF////AQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACUPWvuAAAAPZ0Uk5TAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8g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\" />";
  this.literIcon = "<img src=\"data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSItMTcgMCA1MTEgNTEyIiB3aWR0aD0iNTEycHQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTQyMy41OTc2NTYgMGMtMjQuNjEzMjgxIDAtNDUuNDQ5MjE4IDE2LjQ3MjY1Ni01Mi4xNTYyNSAzOWgtMzU1Ljk0MTQwNmMtNS45ODgyODEgMC0xMS4zOTg0MzggMy41NTg1OTQtMTMuNzY5NTMxIDkuMDU0Njg4LTIuMzc1IDUuNS0xLjI1IDExLjg3ODkwNiAyLjg1NTQ2OSAxNi4yMzQzNzRsNzcuMjY1NjI0IDgxLjk1MzEyNnYyODkuODU1NDY4YzAgNDEuODUxNTYzIDMzLjkzNzUgNzUuOTAyMzQ0IDc1LjY1NjI1IDc1LjkwMjM0NGgxNjZjNDEuNzE4NzUgMCA3NS42NTYyNS0zNC4wNTA3ODEgNzUuNjU2MjUtNzUuOTAyMzQ0di0zODEuNTA3ODEyYzAtMTMuNTU4NTk0IDEwLjk2MDkzOC0yNC41ODk4NDQgMjQuNDMzNTk0LTI0LjU4OTg0NHMyNC40Mjk2ODggMTEuMDMxMjUgMjQuNDI5Njg4IDI0LjU4OTg0NHYyMDAuMTMyODEyYzAgOC4yODUxNTYgNi43MTg3NSAxNSAxNSAxNSA4LjI4NTE1NiAwIDE1LTYuNzE0ODQ0IDE1LTE1di0yMDAuMTMyODEyYzAtMzAuMTAxNTYzLTI0LjQxNzk2OS01NC41ODk4NDQtNTQuNDI5Njg4LTU0LjU4OTg0NHptLTg1LjQ0NTMxMiA0MTYuMjM4MjgxYzAgOC4yODEyNS02LjcxODc1IDE1LTE1IDE1LTguMjg1MTU2IDAtMTUtNi43MTg3NS0xNS0xNXYtMTUuMDAzOTA2aC0xMDYuMzE2NDA2Yy04LjI4NTE1NyAwLTE1LTYuNzE0ODQ0LTE1LTE1czYuNzE0ODQzLTE1IDE1LTE1aDEwNi4zMTY0MDZ2LTMwLjkwNjI1aC00NS42NTYyNWMtOC4yODUxNTYgMC0xNS02LjcxNDg0NC0xNS0xNSAwLTguMjgxMjUgNi43MTQ4NDQtMTUgMTUtMTVoNDUuNjU2MjV2LTMwLjkwMjM0NGgtNDUuNjU2MjVjLTguMjg1MTU2IDAtMTUtNi43MTQ4NDMtMTUtMTUgMC04LjI4NTE1NiA2LjcxNDg0NC0xNSAxNS0xNWg0NS42NTYyNXYtMzAuOTA2MjVoLTEwNi4zMTY0MDZjLTguMjg1MTU3IDAtMTUtNi43MTQ4NDMtMTUtMTUgMC04LjI4NTE1NiA2LjcxNDg0My0xNSAxNS0xNWgxMDYuMzE2NDA2di0xNWMwLTguMjg1MTU2IDYuNzE0ODQ0LTE1IDE1LTE1IDguMjgxMjUgMCAxNSA2LjcxNDg0NCAxNSAxNXptMCAwIi8+PC9zdmc+\" />";
  this.turboIcon = "<img src=\"data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDY0IDY0IiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGlkPSJ0dXJibyI+PHBhdGggZD0ibTIyLjM5IDI0LjMyYTQuMDE4IDQuMDE4IDAgMCAxIC4yNC0uNDYgOS41OTIgOS41OTIgMCAwIDAgLTcuOC00LjUyIDE0IDE0IDAgMCAwIC0xLjcgNS4wOCA4Ljk0OSA4Ljk0OSAwIDAgMSAzLjgyLTEuMTggMTEuNjgzIDExLjY4MyAwIDAgMSA1LjQ0IDEuMDh6Ii8+PHBhdGggZD0ibTI1LjA4IDMwLjg1YTQuMDE4IDQuMDE4IDAgMCAxIC0uNDYtLjI0IDkuNTkyIDkuNTkyIDAgMCAwIC00LjUyIDcuOCAxNCAxNCAwIDAgMCA1LjA4IDEuNyA4Ljk0OSA4Ljk0OSAwIDAgMSAtMS4xOC0zLjgyIDExLjY4MyAxMS42ODMgMCAwIDEgMS4wOC01LjQ0eiIvPjxwYXRoIGQ9Im0yMy45OCAyMi4yOGE0LjQzNCA0LjQzNCAwIDAgMSAuNDItLjI5IDkuNjkgOS42OSAwIDAgMCAtMS41MS00Ljg3IDkuOCA5LjggMCAwIDAgLTIuOTctMi45NCAxMy44MjUgMTMuODI1IDAgMCAwIC0zLjgxIDMuMjkgMTEuNDg1IDExLjQ4NSAwIDAgMSAzLjY5IDEuMTUgMTEuOCAxMS44IDAgMCAxIDQuMTggMy42NnoiLz48cGF0aCBkPSJtMjMuMDQgMjkuMjZjLS4xLS4xNC0uMi0uMjgtLjI5LS40MmE5LjY2MiA5LjY2MiAwIDAgMCAtNC44NyAxLjUxIDkuOCA5LjggMCAwIDAgLTIuOTQgMi45NyAxNC4xMDcgMTQuMTA3IDAgMCAwIDMuMjggMy44MSAxMS40MjYgMTEuNDI2IDAgMCAxIDEuMTYtMy42OSAxMS43MDkgMTEuNzA5IDAgMCAxIDMuNjYtNC4xOHoiLz48cGF0aCBkPSJtMjguOTIgMjEuNjNhNC4wMTggNC4wMTggMCAwIDEgLjQ2LjI0IDkuNTkyIDkuNTkyIDAgMCAwIDQuNTItNy44IDE0IDE0IDAgMCAwIC01LjA4LTEuNyA4Ljk0OSA4Ljk0OSAwIDAgMSAxLjE4IDMuODIgMTEuNjgzIDExLjY4MyAwIDAgMSAtMS4wOCA1LjQ0eiIvPjxwYXRoIGQ9Im0yNS45NiA0OC45MmMtMS4xNi0uMS0yLjMuNzItMy40Mi40N2wtMS4zMSAyLjYzIDEyLjA2IDMuNTEgMi4zNy01LjYyYy01LjM1LS41NS05LjQ2LS45Ny05LjctLjk5eiIvPjxwYXRoIGQ9Im0yNCA0Ni4yNGgydjIwaC0yeiIgdHJhbnNmb3JtPSJtYXRyaXgoLjI4IC0uOTYgLjk2IC4yOCAtMzUuOTkgNjQuNDkzKSIvPjxjaXJjbGUgY3g9IjI3IiBjeT0iMjYuMjQiIHI9IjMiLz48cGF0aCBkPSJtMjQuNTcgMTYuMDRhMTEuNTg5IDExLjU4OSAwIDAgMSAxLjc5IDUuMjZjLjE3LS4wMi4zNC0uMDQuNTItLjA1YTkuNzEyIDkuNzEyIDAgMCAwIDEuMTItNC45NiA4LjY1NiA4LjY1NiAwIDAgMCAtMS41NS00LjAyIDEzLjkxNiAxMy45MTYgMCAwIDAgLTQuNDguOTIgMTEuNTY4IDExLjU2OCAwIDAgMSAyLjYgMi44NXoiLz48cGF0aCBkPSJtMjkuNDMgMzYuNDRhMTEuNTg2IDExLjU4NiAwIDAgMSAtMS43OS01LjI3IDQuMzUgNC4zNSAwIDAgMSAtLjUyLjA2IDkuNzEyIDkuNzEyIDAgMCAwIC0xLjEyIDQuOTYgOC42NTYgOC42NTYgMCAwIDAgMS41NSA0LjAyIDEzLjkxNiAxMy45MTYgMCAwIDAgNC40OC0uOTIgMTEuNTY4IDExLjU2OCAwIDAgMSAtMi42LTIuODV6Ii8+PHBhdGggZD0ibTIyLjA3IDI2Ljg5YTQuNzc2IDQuNzc2IDAgMCAxIC0uMDYtLjUzIDkuNjg3IDkuNjg3IDAgMCAwIC00Ljk2LTEuMTIgOC42NTYgOC42NTYgMCAwIDAgLTQuMDIgMS41NSAxMy45MTYgMTMuOTE2IDAgMCAwIC45MiA0LjQ4IDExLjQ3MiAxMS40NzIgMCAwIDEgOC4xMi00LjM4eiIvPjxwYXRoIGQ9Im01MiA1Mi42OGMuOC4wOSAxLjQ4LjE2IDIgLjIxdi0xMy44OWgtMnoiLz48cGF0aCBkPSJtNTYgMzJoNHYyNGgtNHoiLz48cGF0aCBkPSJtNDYgMzdoMS43MWEyMi45OTMgMjIuOTkzIDAgMCAwIC0xOS4xNy0zMi45NWMtLjUyLS4wMy0xLjA0LS4wNS0xLjU2LS4wNWEyMi43NzEgMjIuNzcxIDAgMCAwIC0xNS43IDYuMjEgMjMgMjMgMCAwIDAgMTMuODQgMzkuNzFjLjQ4LjA0IDE2LjQzIDEuNjkgMjQuODggMi41NnYtMTMuNDhoLTR6bS0xOSA1LjI0YTE2IDE2IDAgMSAxIDE2LTE2IDE2LjAyMSAxNi4wMjEgMCAwIDEgLTE2IDE2eiIvPjxwYXRoIGQ9Im0zMC4wMiAzMC4xOWEzLjE4OCAzLjE4OCAwIDAgMSAtLjQyLjMgOS42OSA5LjY5IDAgMCAwIDEuNTEgNC44NyA5LjggOS44IDAgMCAwIDIuOTcgMi45NCAxNC4wNTMgMTQuMDUzIDAgMCAwIDMuOC0zLjI3IDExLjUwNyAxMS41MDcgMCAwIDEgLTcuODYtNC44NHoiLz48cGF0aCBkPSJtMzYuNTEgMjkuMjVhMTEuNjM0IDExLjYzNCAwIDAgMSAtNC45LTEuMDkgNC4wMTggNC4wMTggMCAwIDEgLS4yNC40NiA5LjU5MiA5LjU5MiAwIDAgMCA3LjggNC41MiAxNCAxNCAwIDAgMCAxLjctNS4wOCA4Ljk0OSA4Ljk0OSAwIDAgMSAtMy44MiAxLjE4Yy0uMTguMDEtLjM2LjAxLS41NC4wMXoiLz48cGF0aCBkPSJtMzEuOTMgMjUuNmE0LjM1IDQuMzUgMCAwIDEgLjA2LjUyIDkuNTg3IDkuNTg3IDAgMCAwIDQuOTYgMS4xMiA4LjY1NiA4LjY1NiAwIDAgMCA0LjAyLTEuNTUgMTMuODYxIDEzLjg2MSAwIDAgMCAtLjkyLTQuNDggMTEuNTIyIDExLjUyMiAwIDAgMSAtOC4xMiA0LjM5eiIvPjxwYXRoIGQ9Im0zNS43OCAxNS4zNWExMS40MjYgMTEuNDI2IDAgMCAxIC0xLjE2IDMuNjkgMTEuOCAxMS44IDAgMCAxIC0zLjY2IDQuMThjLjEuMTMuMi4yOC4yOS40MmE5LjYzNSA5LjYzNSAwIDAgMCA0Ljg3LTEuNTEgOS44IDkuOCAwIDAgMCAyLjk0LTIuOTcgMTQuMTA3IDE0LjEwNyAwIDAgMCAtMy4yOC0zLjgxeiIvPjwvZz48L3N2Zz4=\" />";
  this.handleBtnClickIsActive = false;
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
      var paragrafVin = document.createElement("p");
      var HeaderHistoryVin = document.createElement("div");
      HeaderHistoryVin.className = "vinHistory-test";
      HeaderHistoryVin.setAttribute("id", vin);
      var vinDescribeHeader = document.createTextNode("".concat(vin));
      var aEl = document.createElement("a");
      aEl.className = "delete";
      var deleteDescribe = document.createTextNode("x");
      HeaderHistoryVin.addEventListener("mousedown", function (e) {
        return _this.handleMouseDownListElem(e);
      });
      paragrafVin.appendChild(vinDescribeHeader);
      aEl.appendChild(deleteDescribe);

      if (_this.listVinEl) {
        _this.listVinEl.appendChild(li);

        li.appendChild(HeaderHistoryVin);
        HeaderHistoryVin.appendChild(paragrafVin);
        paragrafVin.after(aEl);
      }
    });
  };

  this.handleMouseDownListElem = function (e) {
    console.log(e);
    var id = e.target.id;
    console.log(id);
    console.log(id);
    var testduba = new VinHistory_1.default().handleVinsFromLocal();
    console.log(testduba);
    var catchElemList = testduba.filter(function (el) {
      return el.vin == id;
    });
    catchElemList.map(function (el) {
      return new Ui_1.default(el);
    });
  };

  this.ClearVinHistoryList = function () {
    var menuList = document.querySelector(".hitoryVin-Bar");

    if (menuList != null) {
      while (menuList.firstChild) {
        menuList.removeChild(menuList.firstChild);
      }
    }
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

var Api_1 = __importDefault(require("./Api"));

var VinHistory_1 = __importDefault(require("./VinHistory"));

var VinHistoryUI_1 = __importDefault(require("./VinHistoryUI"));

var Ui_1 = __importDefault(require("./Ui"));

var App = function App() {
  var _this = this;

  _classCallCheck(this, App);

  this.startAppEvent = function () {
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

    if (_this.vinCode) {
      var API = new Api_1.default(_this.vinCode);
      API.handleVinInfo("img");
      API.handleVinInfo("maintanceList");
      API.handleVinInfo("carData");
      setTimeout(function () {
        console.log(API.testDuba);
        new Ui_1.default(API.testDuba);

        _this.saveDataToLocal(API.testDuba);
      }, 1500);
    }

    document.querySelector("input[name=vinCode]").value = "";
  };

  this.handleDataFromLocal = function () {
    var testData = _this.VinHistory.handleVinsFromLocal();

    if (testData) {
      _this.HistoryUi.DisplayVinHeader(testData);
    } else {
      console.log("your histry vin not found!");
    }
  };

  this.saveDataToLocal = function (data) {
    if (_this.vinCode) {
      var test1 = _this.VinHistory.saveItemToLocalStorage(_this.vinCode, data);

      if (test1 === true) {
        throw new Error("your car  stay in  localstorage");
      } else {
        _this.HistoryUi.ClearVinHistoryList();

        _this.handleDataFromLocal();
      }
    }
  }; // this.Api=new Api();


  this.btnCheck = document.querySelector(".checkBtn"), this.vinCodeEl = document.querySelector("input[name=vinCode]"), this.vin = null, this.vinCode = "", this.testDuba = {}, this.VinHistory = new VinHistory_1.default();
  this.HistoryUi = new VinHistoryUI_1.default();
  this.handleDataFromLocal();
  this.startAppEvent();
};

new App();
},{"./Api":"../src/Api.ts","./VinHistory":"../src/VinHistory.ts","./VinHistoryUI":"../src/VinHistoryUI.ts","./Ui":"../src/Ui.ts"}],"C:/Users/Michal/AppData/Roaming/npm-cache/_npx/13544/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63412" + '/');

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
},{}]},{},["C:/Users/Michal/AppData/Roaming/npm-cache/_npx/13544/node_modules/parcel/src/builtins/hmr-runtime.js","../src/App.ts"], null)
//# sourceMappingURL=/App.c11db7a9.js.map