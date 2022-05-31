// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"17687899992a6e792a525d64209a395a":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 58031;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "d1954a0aba00d3102ea167fc9807288e";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

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
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
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
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
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

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
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
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"eb397b394ebff17b5f4b9224cf897db4":[function(require,module,exports) {
"use strict";

var _app = require("firebase/app");

var _lite = require("firebase/firestore/lite");

const firebaseConfig = {
  apiKey: "AIzaSyBjrmEJhEf0EKI7Fkwj5Zl37WHdsW_MPL8",
  authDomain: "bolsa-de-empleo-56fbd.firebaseapp.com",
  projectId: "bolsa-de-empleo-56fbd",
  storageBucket: "bolsa-de-empleo-56fbd.appspot.com",
  messagingSenderId: "573667558760",
  appId: "1:573667558760:web:4cbd296a8de6b5391182dd"
}; // Initialize Firebase

const app = (0, _app.initializeApp)(firebaseConfig);
const db = (0, _lite.getFirestore)(app);

async function sendApprove(to, message, name_to, position) {
  const result = await emailjs.send("service_fve8q39", "template_69bxztp", {
    to_name: name_to,
    message: "Aplicación para el cargo de: " + position + "\r\n" + message,
    to_email: to
  });
  return result;
}

async function sendReject(to, message, name_to, position) {
  const result = await emailjs.send("service_fve8q39", "template_hzmapue", {
    to_name: name_to,
    message: "Aplicación para el cargo de: " + position + "\r\n" + message,
    to_email: to
  });
  return result;
}

document.addEventListener("DOMContentLoaded", function () {
  const btnApply = document.querySelector("#apply");
  const cvUrl = document.querySelector("#cv_url");
  const apps = document.querySelector("#aplicaciones");

  if (btnApply) {
    btnApply.addEventListener("click", async function (evt) {
      try {
        if (cvUrl.value.startsWith("https://we.tl/") && cvUrl.value.length > 13) {
          await (0, _lite.addDoc)((0, _lite.collection)(db, "aplications"), {
            job_op_id: this.getAttribute('data-recruiter-id'),
            job_id: this.getAttribute('data-job-id'),
            candidate_name: this.getAttribute('data-name'),
            candidate_degree: this.getAttribute('data-degree'),
            candidate_email: this.getAttribute('data-email'),
            cv_url: cvUrl.value,
            job_op_name: this.getAttribute('data-recruiter-name'),
            status: 'PENDING'
          });
          alert("Tu aplicación ha sido enviada");
        } else {
          alert("Error: Esta URL no es de wetransfer, debes subir tu curriculumn a we transfer");
        }
      } catch (err) {
        alert("Ha ocurrido un error subiendo tu aplicación, intentalo de nuevo");
      }

      window.location.href = "/";
    });
  }

  if (apps) {
    async function showapps() {
      const q = (0, _lite.query)((0, _lite.collection)(db, "aplications"), (0, _lite.where)("status", "==", "PENDING"));
      const querySnapshot = await (0, _lite.getDocs)(q);

      if (querySnapshot.size) {
        querySnapshot.forEach(async fdoc => {
          const job = fdoc.data();
          const id_doc = fdoc.id;
          const jobRef = (0, _lite.doc)(db, "aplications", id_doc);
          console.log(job);
          const result = await fetch(`/wp-json/wp/v2/ofertas/${job.job_id}`);
          const resJson = await result.json();
          const article = document.createElement("article");
          article.setAttribute("class", "user-summary");
          const h1 = document.createElement("h1");
          const a = document.createElement("a");
          h1.textContent = "Trabajo: " + resJson.title.rendered;
          const ul = document.createElement("ul");
          const li1 = document.createElement("li");
          const li2 = document.createElement("li");
          const li3 = document.createElement("li");
          li3.setAttribute("style", "margin: 5px 0 5px 0");
          const li4 = document.createElement("li");
          const labelAccept = document.createElement("label");
          const labelReject = document.createElement("label");
          const pa = document.createElement("p");
          pa.textContent = "El mensaje que escribas arriba será enviado al aplicante junto con la notificación de si fue aceptada o no la aplicación al empleo";
          labelAccept.textContent = "Aceptar";
          labelReject.textContent = "Rechazar";
          const label = document.createElement("label");
          label.setAttribute("style", "display: block");
          label.textContent = "Puedes decirle algo al aplicante";
          label.setAttribute("for", "mensaje");
          const emailTextArea = document.createElement("textarea");
          const form = document.createElement("form");
          form.setAttribute("method", "GET");
          form.setAttribute("action", "/calificar");
          emailTextArea.setAttribute("id", "mensaje");
          emailTextArea.setAttribute("style", "height: 60px");
          const wrapperRadio = document.createElement("div");
          const rejectBtn = document.createElement("input");
          rejectBtn.setAttribute("type", "radio");
          rejectBtn.setAttribute("name", "calificar");
          rejectBtn.value = "REJECT";
          const acceptBtn = document.createElement("input");
          acceptBtn.value = "ACCEPT";
          acceptBtn.setAttribute("type", "radio");
          acceptBtn.setAttribute("style", "width: 100px;");
          rejectBtn.setAttribute("style", "width: 100px;");
          acceptBtn.setAttribute("name", "calificar");
          const submit = document.createElement("button");
          submit.textContent = "Enviar Calificación";
          a.textContent = "Descargar CV";
          a.setAttribute("href", job.cv_url);
          a.setAttribute("target", "_blank");
          a.setAttribute("style", "color: white; background: black; box-shadow: 1px 1px 2px gray;");
          li1.textContent = `Correo Electronico: ${job.candidate_email}`;
          li2.textContent = `Nombre Completo: ${job.candidate_name}`;
          li3.appendChild(a);
          article.appendChild(h1);
          article.appendChild(li1);
          article.appendChild(li2);
          article.appendChild(li3);
          form.appendChild(label);
          form.appendChild(emailTextArea);
          form.appendChild(pa);
          wrapperRadio.appendChild(labelAccept);
          wrapperRadio.appendChild(acceptBtn);
          wrapperRadio.setAttribute("style", "margin-top: 5px");
          wrapperRadio.appendChild(labelReject);
          wrapperRadio.appendChild(rejectBtn);
          wrapperRadio.setAttribute("style", "display: grid; grid-template-columns: 50px auto;");
          form.appendChild(wrapperRadio);
          submit.setAttribute("style", "margin-top: 5px");
          submit.addEventListener("click", async function (evt) {
            evt.preventDefault();
            document.querySelector("#aplicaciones").innerHTML = "<p style='text-align: center'>Procesando solicitud, porfavor espere...</p>";

            try {
              await (0, _lite.updateDoc)(jobRef, {
                status: document.querySelector('input[name="calificar"]:checked').value
              });

              if (document.querySelector('input[name="calificar"]:checked').value === "ACCEPT") {
                const res = await sendApprove(job.candidate_email, emailTextArea.value, job.candidate_name, resJson.title.rendered);
                alert("Has aceptado esta aplicación, se enviará un correo electrónico notificando al aplicante");
                window.location.href = "/";
              } else if (document.querySelector('input[name="calificar"]:checked').value === "REJECT") {
                const res = await sendReject(job.candidate_email, emailTextArea.value, job.candidate_name, resJson.title.rendered);
                alert("Has rechazado esta aplicación, se enviará un correo electrónico notificando al aplicante");
                window.location.href = "/";
              }
            } catch (err) {
              console.log(err);
              alert("ha ocurrido un error, intenta realizar la acción nuevamente");
              window.location.href = "/aplicaciones";
            }
          });
          form.appendChild(submit);
          article.appendChild(form);
          article.setAttribute("style", "max-width: 500px;");
          document.querySelector("#aplicaciones").appendChild(article);
        });
      } else {
        document.querySelector("#aplicaciones").innerHTML = "<p style='text-align: center'>No hay aplicaciones pendientes de evaluacion</p>";
      }
    }

    showapps();
  }
});
},{"firebase/app":"0f82b4e3bf6745ffc6ddd1499495fcce","firebase/firestore/lite":"336b41e374da1b9bc32095da036023ef"}],"0f82b4e3bf6745ffc6ddd1499495fcce":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _app = require("@firebase/app");

Object.keys(_app).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _app[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _app[key];
    }
  });
});
var name = "firebase";
var version = "9.8.1";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(0, _app.registerVersion)(name, version, 'app');
},{"@firebase/app":"e9459d5b84e577cc173668c671fb9cf6"}],"e9459d5b84e577cc173668c671fb9cf6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._addComponent = _addComponent;
exports._addOrOverwriteComponent = _addOrOverwriteComponent;
exports._clearComponents = _clearComponents;
exports._getProvider = _getProvider;
exports._registerComponent = _registerComponent;
exports._removeServiceInstance = _removeServiceInstance;
exports.deleteApp = deleteApp;
exports.getApp = getApp;
exports.getApps = getApps;
exports.initializeApp = initializeApp;
exports.onLog = onLog;
exports.registerVersion = registerVersion;
exports.setLogLevel = setLogLevel;
Object.defineProperty(exports, "FirebaseError", {
  enumerable: true,
  get: function () {
    return _util.FirebaseError;
  }
});
exports._components = exports._apps = exports._DEFAULT_ENTRY_NAME = exports.SDK_VERSION = void 0;

var _component = require("@firebase/component");

var _logger = require("@firebase/logger");

var _util = require("@firebase/util");

var _idb = require("idb");

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class PlatformLoggerServiceImpl {
  constructor(container) {
    this.container = container;
  } // In initial implementation, this will be called by installations on
  // auth token refresh, and installations will send this string.


  getPlatformInfoString() {
    const providers = this.container.getProviders(); // Loop through providers and get library/version pairs from any that are
    // version components.

    return providers.map(provider => {
      if (isVersionServiceProvider(provider)) {
        const service = provider.getImmediate();
        return `${service.library}/${service.version}`;
      } else {
        return null;
      }
    }).filter(logString => logString).join(' ');
  }

}
/**
 *
 * @param provider check if this provider provides a VersionService
 *
 * NOTE: Using Provider<'app-version'> is a hack to indicate that the provider
 * provides VersionService. The provider is not necessarily a 'app-version'
 * provider.
 */


function isVersionServiceProvider(provider) {
  const component = provider.getComponent();
  return (component === null || component === void 0 ? void 0 : component.type) === "VERSION"
  /* VERSION */
  ;
}

const name$o = "@firebase/app";
const version$1 = "0.7.24";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const logger = new _logger.Logger('@firebase/app');
const name$n = "@firebase/app-compat";
const name$m = "@firebase/analytics-compat";
const name$l = "@firebase/analytics";
const name$k = "@firebase/app-check-compat";
const name$j = "@firebase/app-check";
const name$i = "@firebase/auth";
const name$h = "@firebase/auth-compat";
const name$g = "@firebase/database";
const name$f = "@firebase/database-compat";
const name$e = "@firebase/functions";
const name$d = "@firebase/functions-compat";
const name$c = "@firebase/installations";
const name$b = "@firebase/installations-compat";
const name$a = "@firebase/messaging";
const name$9 = "@firebase/messaging-compat";
const name$8 = "@firebase/performance";
const name$7 = "@firebase/performance-compat";
const name$6 = "@firebase/remote-config";
const name$5 = "@firebase/remote-config-compat";
const name$4 = "@firebase/storage";
const name$3 = "@firebase/storage-compat";
const name$2 = "@firebase/firestore";
const name$1 = "@firebase/firestore-compat";
const name = "firebase";
const version = "9.8.1";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The default app name
 *
 * @internal
 */

const DEFAULT_ENTRY_NAME = '[DEFAULT]';
exports._DEFAULT_ENTRY_NAME = DEFAULT_ENTRY_NAME;
const PLATFORM_LOG_STRING = {
  [name$o]: 'fire-core',
  [name$n]: 'fire-core-compat',
  [name$l]: 'fire-analytics',
  [name$m]: 'fire-analytics-compat',
  [name$j]: 'fire-app-check',
  [name$k]: 'fire-app-check-compat',
  [name$i]: 'fire-auth',
  [name$h]: 'fire-auth-compat',
  [name$g]: 'fire-rtdb',
  [name$f]: 'fire-rtdb-compat',
  [name$e]: 'fire-fn',
  [name$d]: 'fire-fn-compat',
  [name$c]: 'fire-iid',
  [name$b]: 'fire-iid-compat',
  [name$a]: 'fire-fcm',
  [name$9]: 'fire-fcm-compat',
  [name$8]: 'fire-perf',
  [name$7]: 'fire-perf-compat',
  [name$6]: 'fire-rc',
  [name$5]: 'fire-rc-compat',
  [name$4]: 'fire-gcs',
  [name$3]: 'fire-gcs-compat',
  [name$2]: 'fire-fst',
  [name$1]: 'fire-fst-compat',
  'fire-js': 'fire-js',
  [name]: 'fire-js-all'
};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @internal
 */

const _apps = new Map();
/**
 * Registered components.
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any


exports._apps = _apps;

const _components = new Map();
/**
 * @param component - the component being added to this app's container
 *
 * @internal
 */


exports._components = _components;

function _addComponent(app, component) {
  try {
    app.container.addComponent(component);
  } catch (e) {
    logger.debug(`Component ${component.name} failed to register with FirebaseApp ${app.name}`, e);
  }
}
/**
 *
 * @internal
 */


function _addOrOverwriteComponent(app, component) {
  app.container.addOrOverwriteComponent(component);
}
/**
 *
 * @param component - the component to register
 * @returns whether or not the component is registered successfully
 *
 * @internal
 */


function _registerComponent(component) {
  const componentName = component.name;

  if (_components.has(componentName)) {
    logger.debug(`There were multiple attempts to register component ${componentName}.`);
    return false;
  }

  _components.set(componentName, component); // add the component to existing app instances


  for (const app of _apps.values()) {
    _addComponent(app, component);
  }

  return true;
}
/**
 *
 * @param app - FirebaseApp instance
 * @param name - service name
 *
 * @returns the provider for the service with the matching name
 *
 * @internal
 */


function _getProvider(app, name) {
  const heartbeatController = app.container.getProvider('heartbeat').getImmediate({
    optional: true
  });

  if (heartbeatController) {
    void heartbeatController.triggerHeartbeat();
  }

  return app.container.getProvider(name);
}
/**
 *
 * @param app - FirebaseApp instance
 * @param name - service name
 * @param instanceIdentifier - service instance identifier in case the service supports multiple instances
 *
 * @internal
 */


function _removeServiceInstance(app, name, instanceIdentifier = DEFAULT_ENTRY_NAME) {
  _getProvider(app, name).clearInstance(instanceIdentifier);
}
/**
 * Test only
 *
 * @internal
 */


function _clearComponents() {
  _components.clear();
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const ERRORS = {
  ["no-app"
  /* NO_APP */
  ]: "No Firebase App '{$appName}' has been created - " + 'call Firebase App.initializeApp()',
  ["bad-app-name"
  /* BAD_APP_NAME */
  ]: "Illegal App name: '{$appName}",
  ["duplicate-app"
  /* DUPLICATE_APP */
  ]: "Firebase App named '{$appName}' already exists with different options or config",
  ["app-deleted"
  /* APP_DELETED */
  ]: "Firebase App named '{$appName}' already deleted",
  ["invalid-app-argument"
  /* INVALID_APP_ARGUMENT */
  ]: 'firebase.{$appName}() takes either no argument or a ' + 'Firebase App instance.',
  ["invalid-log-argument"
  /* INVALID_LOG_ARGUMENT */
  ]: 'First argument to `onLog` must be null or a function.',
  ["storage-open"
  /* STORAGE_OPEN */
  ]: 'Error thrown when opening storage. Original error: {$originalErrorMessage}.',
  ["storage-get"
  /* STORAGE_GET */
  ]: 'Error thrown when reading from storage. Original error: {$originalErrorMessage}.',
  ["storage-set"
  /* STORAGE_WRITE */
  ]: 'Error thrown when writing to storage. Original error: {$originalErrorMessage}.',
  ["storage-delete"
  /* STORAGE_DELETE */
  ]: 'Error thrown when deleting from storage. Original error: {$originalErrorMessage}.'
};
const ERROR_FACTORY = new _util.ErrorFactory('app', 'Firebase', ERRORS);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class FirebaseAppImpl {
  constructor(options, config, container) {
    this._isDeleted = false;
    this._options = Object.assign({}, options);
    this._config = Object.assign({}, config);
    this._name = config.name;
    this._automaticDataCollectionEnabled = config.automaticDataCollectionEnabled;
    this._container = container;
    this.container.addComponent(new _component.Component('app', () => this, "PUBLIC"
    /* PUBLIC */
    ));
  }

  get automaticDataCollectionEnabled() {
    this.checkDestroyed();
    return this._automaticDataCollectionEnabled;
  }

  set automaticDataCollectionEnabled(val) {
    this.checkDestroyed();
    this._automaticDataCollectionEnabled = val;
  }

  get name() {
    this.checkDestroyed();
    return this._name;
  }

  get options() {
    this.checkDestroyed();
    return this._options;
  }

  get config() {
    this.checkDestroyed();
    return this._config;
  }

  get container() {
    return this._container;
  }

  get isDeleted() {
    return this._isDeleted;
  }

  set isDeleted(val) {
    this._isDeleted = val;
  }
  /**
   * This function will throw an Error if the App has already been deleted -
   * use before performing API actions on the App.
   */


  checkDestroyed() {
    if (this.isDeleted) {
      throw ERROR_FACTORY.create("app-deleted"
      /* APP_DELETED */
      , {
        appName: this._name
      });
    }
  }

}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The current SDK version.
 *
 * @public
 */


const SDK_VERSION = version;
exports.SDK_VERSION = SDK_VERSION;

function initializeApp(options, rawConfig = {}) {
  if (typeof rawConfig !== 'object') {
    const name = rawConfig;
    rawConfig = {
      name
    };
  }

  const config = Object.assign({
    name: DEFAULT_ENTRY_NAME,
    automaticDataCollectionEnabled: false
  }, rawConfig);
  const name = config.name;

  if (typeof name !== 'string' || !name) {
    throw ERROR_FACTORY.create("bad-app-name"
    /* BAD_APP_NAME */
    , {
      appName: String(name)
    });
  }

  const existingApp = _apps.get(name);

  if (existingApp) {
    // return the existing app if options and config deep equal the ones in the existing app.
    if ((0, _util.deepEqual)(options, existingApp.options) && (0, _util.deepEqual)(config, existingApp.config)) {
      return existingApp;
    } else {
      throw ERROR_FACTORY.create("duplicate-app"
      /* DUPLICATE_APP */
      , {
        appName: name
      });
    }
  }

  const container = new _component.ComponentContainer(name);

  for (const component of _components.values()) {
    container.addComponent(component);
  }

  const newApp = new FirebaseAppImpl(options, config, container);

  _apps.set(name, newApp);

  return newApp;
}
/**
 * Retrieves a {@link @firebase/app#FirebaseApp} instance.
 *
 * When called with no arguments, the default app is returned. When an app name
 * is provided, the app corresponding to that name is returned.
 *
 * An exception is thrown if the app being retrieved has not yet been
 * initialized.
 *
 * @example
 * ```javascript
 * // Return the default app
 * const app = getApp();
 * ```
 *
 * @example
 * ```javascript
 * // Return a named app
 * const otherApp = getApp("otherApp");
 * ```
 *
 * @param name - Optional name of the app to return. If no name is
 *   provided, the default is `"[DEFAULT]"`.
 *
 * @returns The app corresponding to the provided app name.
 *   If no app name is provided, the default app is returned.
 *
 * @public
 */


function getApp(name = DEFAULT_ENTRY_NAME) {
  const app = _apps.get(name);

  if (!app) {
    throw ERROR_FACTORY.create("no-app"
    /* NO_APP */
    , {
      appName: name
    });
  }

  return app;
}
/**
 * A (read-only) array of all initialized apps.
 * @public
 */


function getApps() {
  return Array.from(_apps.values());
}
/**
 * Renders this app unusable and frees the resources of all associated
 * services.
 *
 * @example
 * ```javascript
 * deleteApp(app)
 *   .then(function() {
 *     console.log("App deleted successfully");
 *   })
 *   .catch(function(error) {
 *     console.log("Error deleting app:", error);
 *   });
 * ```
 *
 * @public
 */


async function deleteApp(app) {
  const name = app.name;

  if (_apps.has(name)) {
    _apps.delete(name);

    await Promise.all(app.container.getProviders().map(provider => provider.delete()));
    app.isDeleted = true;
  }
}
/**
 * Registers a library's name and version for platform logging purposes.
 * @param library - Name of 1p or 3p library (e.g. firestore, angularfire)
 * @param version - Current version of that library.
 * @param variant - Bundle variant, e.g., node, rn, etc.
 *
 * @public
 */


function registerVersion(libraryKeyOrName, version, variant) {
  var _a; // TODO: We can use this check to whitelist strings when/if we set up
  // a good whitelist system.


  let library = (_a = PLATFORM_LOG_STRING[libraryKeyOrName]) !== null && _a !== void 0 ? _a : libraryKeyOrName;

  if (variant) {
    library += `-${variant}`;
  }

  const libraryMismatch = library.match(/\s|\//);
  const versionMismatch = version.match(/\s|\//);

  if (libraryMismatch || versionMismatch) {
    const warning = [`Unable to register library "${library}" with version "${version}":`];

    if (libraryMismatch) {
      warning.push(`library name "${library}" contains illegal characters (whitespace or "/")`);
    }

    if (libraryMismatch && versionMismatch) {
      warning.push('and');
    }

    if (versionMismatch) {
      warning.push(`version name "${version}" contains illegal characters (whitespace or "/")`);
    }

    logger.warn(warning.join(' '));
    return;
  }

  _registerComponent(new _component.Component(`${library}-version`, () => ({
    library,
    version
  }), "VERSION"
  /* VERSION */
  ));
}
/**
 * Sets log handler for all Firebase SDKs.
 * @param logCallback - An optional custom log handler that executes user code whenever
 * the Firebase SDK makes a logging call.
 *
 * @public
 */


function onLog(logCallback, options) {
  if (logCallback !== null && typeof logCallback !== 'function') {
    throw ERROR_FACTORY.create("invalid-log-argument"
    /* INVALID_LOG_ARGUMENT */
    );
  }

  (0, _logger.setUserLogHandler)(logCallback, options);
}
/**
 * Sets log level for all Firebase SDKs.
 *
 * All of the log types above the current log level are captured (i.e. if
 * you set the log level to `info`, errors are logged, but `debug` and
 * `verbose` logs are not).
 *
 * @public
 */


function setLogLevel(logLevel) {
  (0, _logger.setLogLevel)(logLevel);
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const DB_NAME = 'firebase-heartbeat-database';
const DB_VERSION = 1;
const STORE_NAME = 'firebase-heartbeat-store';
let dbPromise = null;

function getDbPromise() {
  if (!dbPromise) {
    dbPromise = (0, _idb.openDB)(DB_NAME, DB_VERSION, {
      upgrade: (db, oldVersion) => {
        // We don't use 'break' in this switch statement, the fall-through
        // behavior is what we want, because if there are multiple versions between
        // the old version and the current version, we want ALL the migrations
        // that correspond to those versions to run, not only the last one.
        // eslint-disable-next-line default-case
        switch (oldVersion) {
          case 0:
            db.createObjectStore(STORE_NAME);
        }
      }
    }).catch(e => {
      throw ERROR_FACTORY.create("storage-open"
      /* STORAGE_OPEN */
      , {
        originalErrorMessage: e.message
      });
    });
  }

  return dbPromise;
}

async function readHeartbeatsFromIndexedDB(app) {
  try {
    const db = await getDbPromise();
    return db.transaction(STORE_NAME).objectStore(STORE_NAME).get(computeKey(app));
  } catch (e) {
    throw ERROR_FACTORY.create("storage-get"
    /* STORAGE_GET */
    , {
      originalErrorMessage: e.message
    });
  }
}

async function writeHeartbeatsToIndexedDB(app, heartbeatObject) {
  try {
    const db = await getDbPromise();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const objectStore = tx.objectStore(STORE_NAME);
    await objectStore.put(heartbeatObject, computeKey(app));
    return tx.done;
  } catch (e) {
    throw ERROR_FACTORY.create("storage-set"
    /* STORAGE_WRITE */
    , {
      originalErrorMessage: e.message
    });
  }
}

function computeKey(app) {
  return `${app.name}!${app.options.appId}`;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const MAX_HEADER_BYTES = 1024; // 30 days

const STORED_HEARTBEAT_RETENTION_MAX_MILLIS = 30 * 24 * 60 * 60 * 1000;

class HeartbeatServiceImpl {
  constructor(container) {
    this.container = container;
    /**
     * In-memory cache for heartbeats, used by getHeartbeatsHeader() to generate
     * the header string.
     * Stores one record per date. This will be consolidated into the standard
     * format of one record per user agent string before being sent as a header.
     * Populated from indexedDB when the controller is instantiated and should
     * be kept in sync with indexedDB.
     * Leave public for easier testing.
     */

    this._heartbeatsCache = null;
    const app = this.container.getProvider('app').getImmediate();
    this._storage = new HeartbeatStorageImpl(app);
    this._heartbeatsCachePromise = this._storage.read().then(result => {
      this._heartbeatsCache = result;
      return result;
    });
  }
  /**
   * Called to report a heartbeat. The function will generate
   * a HeartbeatsByUserAgent object, update heartbeatsCache, and persist it
   * to IndexedDB.
   * Note that we only store one heartbeat per day. So if a heartbeat for today is
   * already logged, subsequent calls to this function in the same day will be ignored.
   */


  async triggerHeartbeat() {
    const platformLogger = this.container.getProvider('platform-logger').getImmediate(); // This is the "Firebase user agent" string from the platform logger
    // service, not the browser user agent.

    const agent = platformLogger.getPlatformInfoString();
    const date = getUTCDateString();

    if (this._heartbeatsCache === null) {
      this._heartbeatsCache = await this._heartbeatsCachePromise;
    } // Do not store a heartbeat if one is already stored for this day
    // or if a header has already been sent today.


    if (this._heartbeatsCache.lastSentHeartbeatDate === date || this._heartbeatsCache.heartbeats.some(singleDateHeartbeat => singleDateHeartbeat.date === date)) {
      return;
    } else {
      // There is no entry for this date. Create one.
      this._heartbeatsCache.heartbeats.push({
        date,
        agent
      });
    } // Remove entries older than 30 days.


    this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter(singleDateHeartbeat => {
      const hbTimestamp = new Date(singleDateHeartbeat.date).valueOf();
      const now = Date.now();
      return now - hbTimestamp <= STORED_HEARTBEAT_RETENTION_MAX_MILLIS;
    });
    return this._storage.overwrite(this._heartbeatsCache);
  }
  /**
   * Returns a base64 encoded string which can be attached to the heartbeat-specific header directly.
   * It also clears all heartbeats from memory as well as in IndexedDB.
   *
   * NOTE: Consuming product SDKs should not send the header if this method
   * returns an empty string.
   */


  async getHeartbeatsHeader() {
    if (this._heartbeatsCache === null) {
      await this._heartbeatsCachePromise;
    } // If it's still null or the array is empty, there is no data to send.


    if (this._heartbeatsCache === null || this._heartbeatsCache.heartbeats.length === 0) {
      return '';
    }

    const date = getUTCDateString(); // Extract as many heartbeats from the cache as will fit under the size limit.

    const {
      heartbeatsToSend,
      unsentEntries
    } = extractHeartbeatsForHeader(this._heartbeatsCache.heartbeats);
    const headerString = (0, _util.base64urlEncodeWithoutPadding)(JSON.stringify({
      version: 2,
      heartbeats: heartbeatsToSend
    })); // Store last sent date to prevent another being logged/sent for the same day.

    this._heartbeatsCache.lastSentHeartbeatDate = date;

    if (unsentEntries.length > 0) {
      // Store any unsent entries if they exist.
      this._heartbeatsCache.heartbeats = unsentEntries; // This seems more likely than emptying the array (below) to lead to some odd state
      // since the cache isn't empty and this will be called again on the next request,
      // and is probably safest if we await it.

      await this._storage.overwrite(this._heartbeatsCache);
    } else {
      this._heartbeatsCache.heartbeats = []; // Do not wait for this, to reduce latency.

      void this._storage.overwrite(this._heartbeatsCache);
    }

    return headerString;
  }

}

function getUTCDateString() {
  const today = new Date(); // Returns date format 'YYYY-MM-DD'

  return today.toISOString().substring(0, 10);
}

function extractHeartbeatsForHeader(heartbeatsCache, maxSize = MAX_HEADER_BYTES) {
  // Heartbeats grouped by user agent in the standard format to be sent in
  // the header.
  const heartbeatsToSend = []; // Single date format heartbeats that are not sent.

  let unsentEntries = heartbeatsCache.slice();

  for (const singleDateHeartbeat of heartbeatsCache) {
    // Look for an existing entry with the same user agent.
    const heartbeatEntry = heartbeatsToSend.find(hb => hb.agent === singleDateHeartbeat.agent);

    if (!heartbeatEntry) {
      // If no entry for this user agent exists, create one.
      heartbeatsToSend.push({
        agent: singleDateHeartbeat.agent,
        dates: [singleDateHeartbeat.date]
      });

      if (countBytes(heartbeatsToSend) > maxSize) {
        // If the header would exceed max size, remove the added heartbeat
        // entry and stop adding to the header.
        heartbeatsToSend.pop();
        break;
      }
    } else {
      heartbeatEntry.dates.push(singleDateHeartbeat.date); // If the header would exceed max size, remove the added date
      // and stop adding to the header.

      if (countBytes(heartbeatsToSend) > maxSize) {
        heartbeatEntry.dates.pop();
        break;
      }
    } // Pop unsent entry from queue. (Skipped if adding the entry exceeded
    // quota and the loop breaks early.)


    unsentEntries = unsentEntries.slice(1);
  }

  return {
    heartbeatsToSend,
    unsentEntries
  };
}

class HeartbeatStorageImpl {
  constructor(app) {
    this.app = app;
    this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
  }

  async runIndexedDBEnvironmentCheck() {
    if (!(0, _util.isIndexedDBAvailable)()) {
      return false;
    } else {
      return (0, _util.validateIndexedDBOpenable)().then(() => true).catch(() => false);
    }
  }
  /**
   * Read all heartbeats.
   */


  async read() {
    const canUseIndexedDB = await this._canUseIndexedDBPromise;

    if (!canUseIndexedDB) {
      return {
        heartbeats: []
      };
    } else {
      const idbHeartbeatObject = await readHeartbeatsFromIndexedDB(this.app);
      return idbHeartbeatObject || {
        heartbeats: []
      };
    }
  } // overwrite the storage with the provided heartbeats


  async overwrite(heartbeatsObject) {
    var _a;

    const canUseIndexedDB = await this._canUseIndexedDBPromise;

    if (!canUseIndexedDB) {
      return;
    } else {
      const existingHeartbeatsObject = await this.read();
      return writeHeartbeatsToIndexedDB(this.app, {
        lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
        heartbeats: heartbeatsObject.heartbeats
      });
    }
  } // add heartbeats


  async add(heartbeatsObject) {
    var _a;

    const canUseIndexedDB = await this._canUseIndexedDBPromise;

    if (!canUseIndexedDB) {
      return;
    } else {
      const existingHeartbeatsObject = await this.read();
      return writeHeartbeatsToIndexedDB(this.app, {
        lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
        heartbeats: [...existingHeartbeatsObject.heartbeats, ...heartbeatsObject.heartbeats]
      });
    }
  }

}
/**
 * Calculate bytes of a HeartbeatsByUserAgent array after being wrapped
 * in a platform logging header JSON object, stringified, and converted
 * to base 64.
 */


function countBytes(heartbeatsCache) {
  // base64 has a restricted set of characters, all of which should be 1 byte.
  return (0, _util.base64urlEncodeWithoutPadding)( // heartbeatsCache wrapper properties
  JSON.stringify({
    version: 2,
    heartbeats: heartbeatsCache
  })).length;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function registerCoreComponents(variant) {
  _registerComponent(new _component.Component('platform-logger', container => new PlatformLoggerServiceImpl(container), "PRIVATE"
  /* PRIVATE */
  ));

  _registerComponent(new _component.Component('heartbeat', container => new HeartbeatServiceImpl(container), "PRIVATE"
  /* PRIVATE */
  )); // Register `app` package.


  registerVersion(name$o, version$1, variant); // BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation

  registerVersion(name$o, version$1, 'esm2017'); // Register platform SDK identifier (no version).

  registerVersion('fire-js', '');
}
/**
 * Firebase App
 *
 * @remarks This package coordinates the communication between the different Firebase components
 * @packageDocumentation
 */


registerCoreComponents('');
},{"@firebase/component":"351eabb5683e6da26cad6da070d97fac","@firebase/logger":"3a15e19ab036c3aaea02d8f124f3414e","@firebase/util":"139df1de1dfe98902ec8f2cbbe4db2c1","idb":"5fdcab4bbcebd897766eab58afcf7d14"}],"351eabb5683e6da26cad6da070d97fac":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Provider = exports.ComponentContainer = exports.Component = void 0;

var _util = require("@firebase/util");

/**
 * Component for service name T, e.g. `auth`, `auth-internal`
 */
class Component {
  /**
   *
   * @param name The public service name, e.g. app, auth, firestore, database
   * @param instanceFactory Service factory responsible for creating the public interface
   * @param type whether the service provided by the component is public or private
   */
  constructor(name, instanceFactory, type) {
    this.name = name;
    this.instanceFactory = instanceFactory;
    this.type = type;
    this.multipleInstances = false;
    /**
     * Properties to be added to the service namespace
     */

    this.serviceProps = {};
    this.instantiationMode = "LAZY"
    /* LAZY */
    ;
    this.onInstanceCreated = null;
  }

  setInstantiationMode(mode) {
    this.instantiationMode = mode;
    return this;
  }

  setMultipleInstances(multipleInstances) {
    this.multipleInstances = multipleInstances;
    return this;
  }

  setServiceProps(props) {
    this.serviceProps = props;
    return this;
  }

  setInstanceCreatedCallback(callback) {
    this.onInstanceCreated = callback;
    return this;
  }

}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.Component = Component;
const DEFAULT_ENTRY_NAME = '[DEFAULT]';
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Provider for instance for service name T, e.g. 'auth', 'auth-internal'
 * NameServiceMapping[T] is an alias for the type of the instance
 */

class Provider {
  constructor(name, container) {
    this.name = name;
    this.container = container;
    this.component = null;
    this.instances = new Map();
    this.instancesDeferred = new Map();
    this.instancesOptions = new Map();
    this.onInitCallbacks = new Map();
  }
  /**
   * @param identifier A provider can provide mulitple instances of a service
   * if this.component.multipleInstances is true.
   */


  get(identifier) {
    // if multipleInstances is not supported, use the default name
    const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);

    if (!this.instancesDeferred.has(normalizedIdentifier)) {
      const deferred = new _util.Deferred();
      this.instancesDeferred.set(normalizedIdentifier, deferred);

      if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
        // initialize the service if it can be auto-initialized
        try {
          const instance = this.getOrInitializeService({
            instanceIdentifier: normalizedIdentifier
          });

          if (instance) {
            deferred.resolve(instance);
          }
        } catch (e) {// when the instance factory throws an exception during get(), it should not cause
          // a fatal error. We just return the unresolved promise in this case.
        }
      }
    }

    return this.instancesDeferred.get(normalizedIdentifier).promise;
  }

  getImmediate(options) {
    var _a; // if multipleInstances is not supported, use the default name


    const normalizedIdentifier = this.normalizeInstanceIdentifier(options === null || options === void 0 ? void 0 : options.identifier);
    const optional = (_a = options === null || options === void 0 ? void 0 : options.optional) !== null && _a !== void 0 ? _a : false;

    if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
      try {
        return this.getOrInitializeService({
          instanceIdentifier: normalizedIdentifier
        });
      } catch (e) {
        if (optional) {
          return null;
        } else {
          throw e;
        }
      }
    } else {
      // In case a component is not initialized and should/can not be auto-initialized at the moment, return null if the optional flag is set, or throw
      if (optional) {
        return null;
      } else {
        throw Error(`Service ${this.name} is not available`);
      }
    }
  }

  getComponent() {
    return this.component;
  }

  setComponent(component) {
    if (component.name !== this.name) {
      throw Error(`Mismatching Component ${component.name} for Provider ${this.name}.`);
    }

    if (this.component) {
      throw Error(`Component for ${this.name} has already been provided`);
    }

    this.component = component; // return early without attempting to initialize the component if the component requires explicit initialization (calling `Provider.initialize()`)

    if (!this.shouldAutoInitialize()) {
      return;
    } // if the service is eager, initialize the default instance


    if (isComponentEager(component)) {
      try {
        this.getOrInitializeService({
          instanceIdentifier: DEFAULT_ENTRY_NAME
        });
      } catch (e) {// when the instance factory for an eager Component throws an exception during the eager
        // initialization, it should not cause a fatal error.
        // TODO: Investigate if we need to make it configurable, because some component may want to cause
        // a fatal error in this case?
      }
    } // Create service instances for the pending promises and resolve them
    // NOTE: if this.multipleInstances is false, only the default instance will be created
    // and all promises with resolve with it regardless of the identifier.


    for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
      const normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);

      try {
        // `getOrInitializeService()` should always return a valid instance since a component is guaranteed. use ! to make typescript happy.
        const instance = this.getOrInitializeService({
          instanceIdentifier: normalizedIdentifier
        });
        instanceDeferred.resolve(instance);
      } catch (e) {// when the instance factory throws an exception, it should not cause
        // a fatal error. We just leave the promise unresolved.
      }
    }
  }

  clearInstance(identifier = DEFAULT_ENTRY_NAME) {
    this.instancesDeferred.delete(identifier);
    this.instancesOptions.delete(identifier);
    this.instances.delete(identifier);
  } // app.delete() will call this method on every provider to delete the services
  // TODO: should we mark the provider as deleted?


  async delete() {
    const services = Array.from(this.instances.values());
    await Promise.all([...services.filter(service => 'INTERNAL' in service) // legacy services
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map(service => service.INTERNAL.delete()), ...services.filter(service => '_delete' in service) // modularized services
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map(service => service._delete())]);
  }

  isComponentSet() {
    return this.component != null;
  }

  isInitialized(identifier = DEFAULT_ENTRY_NAME) {
    return this.instances.has(identifier);
  }

  getOptions(identifier = DEFAULT_ENTRY_NAME) {
    return this.instancesOptions.get(identifier) || {};
  }

  initialize(opts = {}) {
    const {
      options = {}
    } = opts;
    const normalizedIdentifier = this.normalizeInstanceIdentifier(opts.instanceIdentifier);

    if (this.isInitialized(normalizedIdentifier)) {
      throw Error(`${this.name}(${normalizedIdentifier}) has already been initialized`);
    }

    if (!this.isComponentSet()) {
      throw Error(`Component ${this.name} has not been registered yet`);
    }

    const instance = this.getOrInitializeService({
      instanceIdentifier: normalizedIdentifier,
      options
    }); // resolve any pending promise waiting for the service instance

    for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
      const normalizedDeferredIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);

      if (normalizedIdentifier === normalizedDeferredIdentifier) {
        instanceDeferred.resolve(instance);
      }
    }

    return instance;
  }
  /**
   *
   * @param callback - a function that will be invoked  after the provider has been initialized by calling provider.initialize().
   * The function is invoked SYNCHRONOUSLY, so it should not execute any longrunning tasks in order to not block the program.
   *
   * @param identifier An optional instance identifier
   * @returns a function to unregister the callback
   */


  onInit(callback, identifier) {
    var _a;

    const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
    const existingCallbacks = (_a = this.onInitCallbacks.get(normalizedIdentifier)) !== null && _a !== void 0 ? _a : new Set();
    existingCallbacks.add(callback);
    this.onInitCallbacks.set(normalizedIdentifier, existingCallbacks);
    const existingInstance = this.instances.get(normalizedIdentifier);

    if (existingInstance) {
      callback(existingInstance, normalizedIdentifier);
    }

    return () => {
      existingCallbacks.delete(callback);
    };
  }
  /**
   * Invoke onInit callbacks synchronously
   * @param instance the service instance`
   */


  invokeOnInitCallbacks(instance, identifier) {
    const callbacks = this.onInitCallbacks.get(identifier);

    if (!callbacks) {
      return;
    }

    for (const callback of callbacks) {
      try {
        callback(instance, identifier);
      } catch (_a) {// ignore errors in the onInit callback
      }
    }
  }

  getOrInitializeService({
    instanceIdentifier,
    options = {}
  }) {
    let instance = this.instances.get(instanceIdentifier);

    if (!instance && this.component) {
      instance = this.component.instanceFactory(this.container, {
        instanceIdentifier: normalizeIdentifierForFactory(instanceIdentifier),
        options
      });
      this.instances.set(instanceIdentifier, instance);
      this.instancesOptions.set(instanceIdentifier, options);
      /**
       * Invoke onInit listeners.
       * Note this.component.onInstanceCreated is different, which is used by the component creator,
       * while onInit listeners are registered by consumers of the provider.
       */

      this.invokeOnInitCallbacks(instance, instanceIdentifier);
      /**
       * Order is important
       * onInstanceCreated() should be called after this.instances.set(instanceIdentifier, instance); which
       * makes `isInitialized()` return true.
       */

      if (this.component.onInstanceCreated) {
        try {
          this.component.onInstanceCreated(this.container, instanceIdentifier, instance);
        } catch (_a) {// ignore errors in the onInstanceCreatedCallback
        }
      }
    }

    return instance || null;
  }

  normalizeInstanceIdentifier(identifier = DEFAULT_ENTRY_NAME) {
    if (this.component) {
      return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME;
    } else {
      return identifier; // assume multiple instances are supported before the component is provided.
    }
  }

  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT"
    /* EXPLICIT */
    ;
  }

} // undefined should be passed to the service factory for the default instance


exports.Provider = Provider;

function normalizeIdentifierForFactory(identifier) {
  return identifier === DEFAULT_ENTRY_NAME ? undefined : identifier;
}

function isComponentEager(component) {
  return component.instantiationMode === "EAGER"
  /* EAGER */
  ;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * ComponentContainer that provides Providers for service name T, e.g. `auth`, `auth-internal`
 */


class ComponentContainer {
  constructor(name) {
    this.name = name;
    this.providers = new Map();
  }
  /**
   *
   * @param component Component being added
   * @param overwrite When a component with the same name has already been registered,
   * if overwrite is true: overwrite the existing component with the new component and create a new
   * provider with the new component. It can be useful in tests where you want to use different mocks
   * for different tests.
   * if overwrite is false: throw an exception
   */


  addComponent(component) {
    const provider = this.getProvider(component.name);

    if (provider.isComponentSet()) {
      throw new Error(`Component ${component.name} has already been registered with ${this.name}`);
    }

    provider.setComponent(component);
  }

  addOrOverwriteComponent(component) {
    const provider = this.getProvider(component.name);

    if (provider.isComponentSet()) {
      // delete the existing provider from the container, so we can register the new component
      this.providers.delete(component.name);
    }

    this.addComponent(component);
  }
  /**
   * getProvider provides a type safe interface where it can only be called with a field name
   * present in NameServiceMapping interface.
   *
   * Firebase SDKs providing services should extend NameServiceMapping interface to register
   * themselves.
   */


  getProvider(name) {
    if (this.providers.has(name)) {
      return this.providers.get(name);
    } // create a Provider for a service that hasn't registered with Firebase


    const provider = new Provider(name, this);
    this.providers.set(name, provider);
    return provider;
  }

  getProviders() {
    return Array.from(this.providers.values());
  }

}

exports.ComponentContainer = ComponentContainer;
},{"@firebase/util":"139df1de1dfe98902ec8f2cbbe4db2c1"}],"139df1de1dfe98902ec8f2cbbe4db2c1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.areCookiesEnabled = areCookiesEnabled;
exports.async = async;
exports.calculateBackoffMillis = calculateBackoffMillis;
exports.contains = contains;
exports.createMockUserToken = createMockUserToken;
exports.createSubscribe = createSubscribe;
exports.deepCopy = deepCopy;
exports.deepEqual = deepEqual;
exports.deepExtend = deepExtend;
exports.errorPrefix = errorPrefix;
exports.extractQuerystring = extractQuerystring;
exports.getGlobal = getGlobal;
exports.getModularInstance = getModularInstance;
exports.getUA = getUA;
exports.isBrowser = isBrowser;
exports.isBrowserExtension = isBrowserExtension;
exports.isElectron = isElectron;
exports.isEmpty = isEmpty;
exports.isIE = isIE;
exports.isIndexedDBAvailable = isIndexedDBAvailable;
exports.isMobileCordova = isMobileCordova;
exports.isNode = isNode;
exports.isNodeSdk = isNodeSdk;
exports.isReactNative = isReactNative;
exports.isSafari = isSafari;
exports.isUWP = isUWP;
exports.jsonEval = jsonEval;
exports.map = map;
exports.ordinal = ordinal;
exports.querystring = querystring;
exports.querystringDecode = querystringDecode;
exports.safeGet = safeGet;
exports.stringify = stringify;
exports.validateCallback = validateCallback;
exports.validateContextObject = validateContextObject;
exports.validateIndexedDBOpenable = validateIndexedDBOpenable;
exports.validateNamespace = validateNamespace;
exports.validateArgCount = exports.stringToByteArray = exports.stringLength = exports.issuedAtTime = exports.isValidTimestamp = exports.isValidFormat = exports.isAdmin = exports.decode = exports.base64urlEncodeWithoutPadding = exports.base64Encode = exports.base64Decode = exports.base64 = exports.assertionError = exports.assert = exports.Sha1 = exports.RANDOM_FACTOR = exports.MAX_VALUE_MILLIS = exports.FirebaseError = exports.ErrorFactory = exports.Deferred = exports.CONSTANTS = void 0;
var global = arguments[3];

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Firebase constants.  Some of these (@defines) can be overridden at compile-time.
 */
const CONSTANTS = {
  /**
   * @define {boolean} Whether this is the client Node.js SDK.
   */
  NODE_CLIENT: false,

  /**
   * @define {boolean} Whether this is the Admin Node.js SDK.
   */
  NODE_ADMIN: false,

  /**
   * Firebase SDK Version
   */
  SDK_VERSION: '${JSCORE_VERSION}'
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Throws an error if the provided assertion is falsy
 */

exports.CONSTANTS = CONSTANTS;

const assert = function (assertion, message) {
  if (!assertion) {
    throw assertionError(message);
  }
};
/**
 * Returns an Error object suitable for throwing.
 */


exports.assert = assert;

const assertionError = function (message) {
  return new Error('Firebase Database (' + CONSTANTS.SDK_VERSION + ') INTERNAL ASSERT FAILED: ' + message);
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.assertionError = assertionError;

const stringToByteArray$1 = function (str) {
  // TODO(user): Use native implementations if/when available
  const out = [];
  let p = 0;

  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);

    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = c >> 6 | 192;
      out[p++] = c & 63 | 128;
    } else if ((c & 0xfc00) === 0xd800 && i + 1 < str.length && (str.charCodeAt(i + 1) & 0xfc00) === 0xdc00) {
      // Surrogate Pair
      c = 0x10000 + ((c & 0x03ff) << 10) + (str.charCodeAt(++i) & 0x03ff);
      out[p++] = c >> 18 | 240;
      out[p++] = c >> 12 & 63 | 128;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    } else {
      out[p++] = c >> 12 | 224;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    }
  }

  return out;
};
/**
 * Turns an array of numbers into the string given by the concatenation of the
 * characters to which the numbers correspond.
 * @param bytes Array of numbers representing characters.
 * @return Stringification of the array.
 */


const byteArrayToString = function (bytes) {
  // TODO(user): Use native implementations if/when available
  const out = [];
  let pos = 0,
      c = 0;

  while (pos < bytes.length) {
    const c1 = bytes[pos++];

    if (c1 < 128) {
      out[c++] = String.fromCharCode(c1);
    } else if (c1 > 191 && c1 < 224) {
      const c2 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
    } else if (c1 > 239 && c1 < 365) {
      // Surrogate Pair
      const c2 = bytes[pos++];
      const c3 = bytes[pos++];
      const c4 = bytes[pos++];
      const u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 0x10000;
      out[c++] = String.fromCharCode(0xd800 + (u >> 10));
      out[c++] = String.fromCharCode(0xdc00 + (u & 1023));
    } else {
      const c2 = bytes[pos++];
      const c3 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
    }
  }

  return out.join('');
}; // We define it as an object literal instead of a class because a class compiled down to es5 can't
// be treeshaked. https://github.com/rollup/rollup/issues/1691
// Static lookup maps, lazily populated by init_()


const base64 = {
  /**
   * Maps bytes to characters.
   */
  byteToCharMap_: null,

  /**
   * Maps characters to bytes.
   */
  charToByteMap_: null,

  /**
   * Maps bytes to websafe characters.
   * @private
   */
  byteToCharMapWebSafe_: null,

  /**
   * Maps websafe characters to bytes.
   * @private
   */
  charToByteMapWebSafe_: null,

  /**
   * Our default alphabet, shared between
   * ENCODED_VALS and ENCODED_VALS_WEBSAFE
   */
  ENCODED_VALS_BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789',

  /**
   * Our default alphabet. Value 64 (=) is special; it means "nothing."
   */
  get ENCODED_VALS() {
    return this.ENCODED_VALS_BASE + '+/=';
  },

  /**
   * Our websafe alphabet.
   */
  get ENCODED_VALS_WEBSAFE() {
    return this.ENCODED_VALS_BASE + '-_.';
  },

  /**
   * Whether this browser supports the atob and btoa functions. This extension
   * started at Mozilla but is now implemented by many browsers. We use the
   * ASSUME_* variables to avoid pulling in the full useragent detection library
   * but still allowing the standard per-browser compilations.
   *
   */
  HAS_NATIVE_SUPPORT: typeof atob === 'function',

  /**
   * Base64-encode an array of bytes.
   *
   * @param input An array of bytes (numbers with
   *     value in [0, 255]) to encode.
   * @param webSafe Boolean indicating we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeByteArray(input, webSafe) {
    if (!Array.isArray(input)) {
      throw Error('encodeByteArray takes an array as a parameter');
    }

    this.init_();
    const byteToCharMap = webSafe ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
    const output = [];

    for (let i = 0; i < input.length; i += 3) {
      const byte1 = input[i];
      const haveByte2 = i + 1 < input.length;
      const byte2 = haveByte2 ? input[i + 1] : 0;
      const haveByte3 = i + 2 < input.length;
      const byte3 = haveByte3 ? input[i + 2] : 0;
      const outByte1 = byte1 >> 2;
      const outByte2 = (byte1 & 0x03) << 4 | byte2 >> 4;
      let outByte3 = (byte2 & 0x0f) << 2 | byte3 >> 6;
      let outByte4 = byte3 & 0x3f;

      if (!haveByte3) {
        outByte4 = 64;

        if (!haveByte2) {
          outByte3 = 64;
        }
      }

      output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
    }

    return output.join('');
  },

  /**
   * Base64-encode a string.
   *
   * @param input A string to encode.
   * @param webSafe If true, we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeString(input, webSafe) {
    // Shortcut for Mozilla browsers that implement
    // a native base64 encoder in the form of "btoa/atob"
    if (this.HAS_NATIVE_SUPPORT && !webSafe) {
      return btoa(input);
    }

    return this.encodeByteArray(stringToByteArray$1(input), webSafe);
  },

  /**
   * Base64-decode a string.
   *
   * @param input to decode.
   * @param webSafe True if we should use the
   *     alternative alphabet.
   * @return string representing the decoded value.
   */
  decodeString(input, webSafe) {
    // Shortcut for Mozilla browsers that implement
    // a native base64 encoder in the form of "btoa/atob"
    if (this.HAS_NATIVE_SUPPORT && !webSafe) {
      return atob(input);
    }

    return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
  },

  /**
   * Base64-decode a string.
   *
   * In base-64 decoding, groups of four characters are converted into three
   * bytes.  If the encoder did not apply padding, the input length may not
   * be a multiple of 4.
   *
   * In this case, the last group will have fewer than 4 characters, and
   * padding will be inferred.  If the group has one or two characters, it decodes
   * to one byte.  If the group has three characters, it decodes to two bytes.
   *
   * @param input Input to decode.
   * @param webSafe True if we should use the web-safe alphabet.
   * @return bytes representing the decoded value.
   */
  decodeStringToByteArray(input, webSafe) {
    this.init_();
    const charToByteMap = webSafe ? this.charToByteMapWebSafe_ : this.charToByteMap_;
    const output = [];

    for (let i = 0; i < input.length;) {
      const byte1 = charToByteMap[input.charAt(i++)];
      const haveByte2 = i < input.length;
      const byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
      ++i;
      const haveByte3 = i < input.length;
      const byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
      ++i;
      const haveByte4 = i < input.length;
      const byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
      ++i;

      if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
        throw Error();
      }

      const outByte1 = byte1 << 2 | byte2 >> 4;
      output.push(outByte1);

      if (byte3 !== 64) {
        const outByte2 = byte2 << 4 & 0xf0 | byte3 >> 2;
        output.push(outByte2);

        if (byte4 !== 64) {
          const outByte3 = byte3 << 6 & 0xc0 | byte4;
          output.push(outByte3);
        }
      }
    }

    return output;
  },

  /**
   * Lazy static initialization function. Called before
   * accessing any of the static map variables.
   * @private
   */
  init_() {
    if (!this.byteToCharMap_) {
      this.byteToCharMap_ = {};
      this.charToByteMap_ = {};
      this.byteToCharMapWebSafe_ = {};
      this.charToByteMapWebSafe_ = {}; // We want quick mappings back and forth, so we precompute two maps.

      for (let i = 0; i < this.ENCODED_VALS.length; i++) {
        this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
        this.charToByteMap_[this.byteToCharMap_[i]] = i;
        this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
        this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i; // Be forgiving when decoding and correctly decode both encodings.

        if (i >= this.ENCODED_VALS_BASE.length) {
          this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
          this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
        }
      }
    }
  }

};
/**
 * URL-safe base64 encoding
 */

exports.base64 = base64;

const base64Encode = function (str) {
  const utf8Bytes = stringToByteArray$1(str);
  return base64.encodeByteArray(utf8Bytes, true);
};
/**
 * URL-safe base64 encoding (without "." padding in the end).
 * e.g. Used in JSON Web Token (JWT) parts.
 */


exports.base64Encode = base64Encode;

const base64urlEncodeWithoutPadding = function (str) {
  // Use base64url encoding and remove padding in the end (dot characters).
  return base64Encode(str).replace(/\./g, '');
};
/**
 * URL-safe base64 decoding
 *
 * NOTE: DO NOT use the global atob() function - it does NOT support the
 * base64Url variant encoding.
 *
 * @param str To be decoded
 * @return Decoded result, if possible
 */


exports.base64urlEncodeWithoutPadding = base64urlEncodeWithoutPadding;

const base64Decode = function (str) {
  try {
    return base64.decodeString(str, true);
  } catch (e) {
    console.error('base64Decode failed: ', e);
  }

  return null;
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Do a deep-copy of basic JavaScript Objects or Arrays.
 */


exports.base64Decode = base64Decode;

function deepCopy(value) {
  return deepExtend(undefined, value);
}
/**
 * Copy properties from source to target (recursively allows extension
 * of Objects and Arrays).  Scalar values in the target are over-written.
 * If target is undefined, an object of the appropriate type will be created
 * (and returned).
 *
 * We recursively copy all child properties of plain Objects in the source- so
 * that namespace- like dictionaries are merged.
 *
 * Note that the target can be a function, in which case the properties in
 * the source Object are copied onto it as static properties of the Function.
 *
 * Note: we don't merge __proto__ to prevent prototype pollution
 */


function deepExtend(target, source) {
  if (!(source instanceof Object)) {
    return source;
  }

  switch (source.constructor) {
    case Date:
      // Treat Dates like scalars; if the target date object had any child
      // properties - they will be lost!
      const dateValue = source;
      return new Date(dateValue.getTime());

    case Object:
      if (target === undefined) {
        target = {};
      }

      break;

    case Array:
      // Always copy the array source and overwrite the target.
      target = [];
      break;

    default:
      // Not a plain Object - treat it as a scalar.
      return source;
  }

  for (const prop in source) {
    // use isValidKey to guard against prototype pollution. See https://snyk.io/vuln/SNYK-JS-LODASH-450202
    if (!source.hasOwnProperty(prop) || !isValidKey(prop)) {
      continue;
    }

    target[prop] = deepExtend(target[prop], source[prop]);
  }

  return target;
}

function isValidKey(key) {
  return key !== '__proto__';
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


class Deferred {
  constructor() {
    this.reject = () => {};

    this.resolve = () => {};

    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
  /**
   * Our API internals are not promiseified and cannot because our callback APIs have subtle expectations around
   * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
   * and returns a node-style callback which will resolve or reject the Deferred's promise.
   */


  wrapCallback(callback) {
    return (error, value) => {
      if (error) {
        this.reject(error);
      } else {
        this.resolve(value);
      }

      if (typeof callback === 'function') {
        // Attaching noop handler just in case developer wasn't expecting
        // promises
        this.promise.catch(() => {}); // Some of our callbacks don't expect a value and our own tests
        // assert that the parameter length is 1

        if (callback.length === 1) {
          callback(error);
        } else {
          callback(error, value);
        }
      }
    };
  }

}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.Deferred = Deferred;

function createMockUserToken(token, projectId) {
  if (token.uid) {
    throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
  } // Unsecured JWTs use "none" as the algorithm.


  const header = {
    alg: 'none',
    type: 'JWT'
  };
  const project = projectId || 'demo-project';
  const iat = token.iat || 0;
  const sub = token.sub || token.user_id;

  if (!sub) {
    throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
  }

  const payload = Object.assign({
    // Set all required fields to decent defaults
    iss: `https://securetoken.google.com/${project}`,
    aud: project,
    iat,
    exp: iat + 3600,
    auth_time: iat,
    sub,
    user_id: sub,
    firebase: {
      sign_in_provider: 'custom',
      identities: {}
    }
  }, token); // Unsecured JWTs use the empty string as a signature.

  const signature = '';
  return [base64urlEncodeWithoutPadding(JSON.stringify(header)), base64urlEncodeWithoutPadding(JSON.stringify(payload)), signature].join('.');
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns navigator.userAgent string or '' if it's not defined.
 * @return user agent string
 */


function getUA() {
  if (typeof navigator !== 'undefined' && typeof navigator['userAgent'] === 'string') {
    return navigator['userAgent'];
  } else {
    return '';
  }
}
/**
 * Detect Cordova / PhoneGap / Ionic frameworks on a mobile device.
 *
 * Deliberately does not rely on checking `file://` URLs (as this fails PhoneGap
 * in the Ripple emulator) nor Cordova `onDeviceReady`, which would normally
 * wait for a callback.
 */


function isMobileCordova() {
  return typeof window !== 'undefined' && // @ts-ignore Setting up an broadly applicable index signature for Window
  // just to deal with this case would probably be a bad idea.
  !!(window['cordova'] || window['phonegap'] || window['PhoneGap']) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA());
}
/**
 * Detect Node.js.
 *
 * @return true if Node.js environment is detected.
 */
// Node detection logic from: https://github.com/iliakan/detect-node/


function isNode() {
  try {
    return Object.prototype.toString.call(global.process) === '[object process]';
  } catch (e) {
    return false;
  }
}
/**
 * Detect Browser Environment
 */


function isBrowser() {
  return typeof self === 'object' && self.self === self;
}

function isBrowserExtension() {
  const runtime = typeof chrome === 'object' ? chrome.runtime : typeof browser === 'object' ? browser.runtime : undefined;
  return typeof runtime === 'object' && runtime.id !== undefined;
}
/**
 * Detect React Native.
 *
 * @return true if ReactNative environment is detected.
 */


function isReactNative() {
  return typeof navigator === 'object' && navigator['product'] === 'ReactNative';
}
/** Detects Electron apps. */


function isElectron() {
  return getUA().indexOf('Electron/') >= 0;
}
/** Detects Internet Explorer. */


function isIE() {
  const ua = getUA();
  return ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
}
/** Detects Universal Windows Platform apps. */


function isUWP() {
  return getUA().indexOf('MSAppHost/') >= 0;
}
/**
 * Detect whether the current SDK build is the Node version.
 *
 * @return true if it's the Node SDK build.
 */


function isNodeSdk() {
  return CONSTANTS.NODE_CLIENT === true || CONSTANTS.NODE_ADMIN === true;
}
/** Returns true if we are running in Safari. */


function isSafari() {
  return !isNode() && navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');
}
/**
 * This method checks if indexedDB is supported by current browser/service worker context
 * @return true if indexedDB is supported by current browser/service worker context
 */


function isIndexedDBAvailable() {
  return typeof indexedDB === 'object';
}
/**
 * This method validates browser/sw context for indexedDB by opening a dummy indexedDB database and reject
 * if errors occur during the database open operation.
 *
 * @throws exception if current browser/sw context can't run idb.open (ex: Safari iframe, Firefox
 * private browsing)
 */


function validateIndexedDBOpenable() {
  return new Promise((resolve, reject) => {
    try {
      let preExist = true;
      const DB_CHECK_NAME = 'validate-browser-context-for-indexeddb-analytics-module';
      const request = self.indexedDB.open(DB_CHECK_NAME);

      request.onsuccess = () => {
        request.result.close(); // delete database only when it doesn't pre-exist

        if (!preExist) {
          self.indexedDB.deleteDatabase(DB_CHECK_NAME);
        }

        resolve(true);
      };

      request.onupgradeneeded = () => {
        preExist = false;
      };

      request.onerror = () => {
        var _a;

        reject(((_a = request.error) === null || _a === void 0 ? void 0 : _a.message) || '');
      };
    } catch (error) {
      reject(error);
    }
  });
}
/**
 *
 * This method checks whether cookie is enabled within current browser
 * @return true if cookie is enabled within current browser
 */


function areCookiesEnabled() {
  if (typeof navigator === 'undefined' || !navigator.cookieEnabled) {
    return false;
  }

  return true;
}
/**
 * Polyfill for `globalThis` object.
 * @returns the `globalThis` object for the given environment.
 */


function getGlobal() {
  if (typeof self !== 'undefined') {
    return self;
  }

  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  throw new Error('Unable to locate global object.');
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Standardized Firebase Error.
 *
 * Usage:
 *
 *   // Typescript string literals for type-safe codes
 *   type Err =
 *     'unknown' |
 *     'object-not-found'
 *     ;
 *
 *   // Closure enum for type-safe error codes
 *   // at-enum {string}
 *   var Err = {
 *     UNKNOWN: 'unknown',
 *     OBJECT_NOT_FOUND: 'object-not-found',
 *   }
 *
 *   let errors: Map<Err, string> = {
 *     'generic-error': "Unknown error",
 *     'file-not-found': "Could not find file: {$file}",
 *   };
 *
 *   // Type-safe function - must pass a valid error code as param.
 *   let error = new ErrorFactory<Err>('service', 'Service', errors);
 *
 *   ...
 *   throw error.create(Err.GENERIC);
 *   ...
 *   throw error.create(Err.FILE_NOT_FOUND, {'file': fileName});
 *   ...
 *   // Service: Could not file file: foo.txt (service/file-not-found).
 *
 *   catch (e) {
 *     assert(e.message === "Could not find file: foo.txt.");
 *     if (e.code === 'service/file-not-found') {
 *       console.log("Could not read file: " + e['file']);
 *     }
 *   }
 */


const ERROR_NAME = 'FirebaseError'; // Based on code from:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types

class FirebaseError extends Error {
  constructor(
  /** The error code for this error. */
  code, message,
  /** Custom data for this error. */
  customData) {
    super(message);
    this.code = code;
    this.customData = customData;
    /** The custom name for all FirebaseErrors. */

    this.name = ERROR_NAME; // Fix For ES5
    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work

    Object.setPrototypeOf(this, FirebaseError.prototype); // Maintains proper stack trace for where our error was thrown.
    // Only available on V8.

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorFactory.prototype.create);
    }
  }

}

exports.FirebaseError = FirebaseError;

class ErrorFactory {
  constructor(service, serviceName, errors) {
    this.service = service;
    this.serviceName = serviceName;
    this.errors = errors;
  }

  create(code, ...data) {
    const customData = data[0] || {};
    const fullCode = `${this.service}/${code}`;
    const template = this.errors[code];
    const message = template ? replaceTemplate(template, customData) : 'Error'; // Service Name: Error message (service/code).

    const fullMessage = `${this.serviceName}: ${message} (${fullCode}).`;
    const error = new FirebaseError(fullCode, fullMessage, customData);
    return error;
  }

}

exports.ErrorFactory = ErrorFactory;

function replaceTemplate(template, data) {
  return template.replace(PATTERN, (_, key) => {
    const value = data[key];
    return value != null ? String(value) : `<${key}?>`;
  });
}

const PATTERN = /\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Evaluates a JSON string into a javascript object.
 *
 * @param {string} str A string containing JSON.
 * @return {*} The javascript object representing the specified JSON.
 */

function jsonEval(str) {
  return JSON.parse(str);
}
/**
 * Returns JSON representing a javascript object.
 * @param {*} data Javascript object to be stringified.
 * @return {string} The JSON contents of the object.
 */


function stringify(data) {
  return JSON.stringify(data);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Decodes a Firebase auth. token into constituent parts.
 *
 * Notes:
 * - May return with invalid / incomplete claims if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */


const decode = function (token) {
  let header = {},
      claims = {},
      data = {},
      signature = '';

  try {
    const parts = token.split('.');
    header = jsonEval(base64Decode(parts[0]) || '');
    claims = jsonEval(base64Decode(parts[1]) || '');
    signature = parts[2];
    data = claims['d'] || {};
    delete claims['d'];
  } catch (e) {}

  return {
    header,
    claims,
    data,
    signature
  };
};
/**
 * Decodes a Firebase auth. token and checks the validity of its time-based claims. Will return true if the
 * token is within the time window authorized by the 'nbf' (not-before) and 'iat' (issued-at) claims.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */


exports.decode = decode;

const isValidTimestamp = function (token) {
  const claims = decode(token).claims;
  const now = Math.floor(new Date().getTime() / 1000);
  let validSince = 0,
      validUntil = 0;

  if (typeof claims === 'object') {
    if (claims.hasOwnProperty('nbf')) {
      validSince = claims['nbf'];
    } else if (claims.hasOwnProperty('iat')) {
      validSince = claims['iat'];
    }

    if (claims.hasOwnProperty('exp')) {
      validUntil = claims['exp'];
    } else {
      // token will expire after 24h by default
      validUntil = validSince + 86400;
    }
  }

  return !!now && !!validSince && !!validUntil && now >= validSince && now <= validUntil;
};
/**
 * Decodes a Firebase auth. token and returns its issued at time if valid, null otherwise.
 *
 * Notes:
 * - May return null if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */


exports.isValidTimestamp = isValidTimestamp;

const issuedAtTime = function (token) {
  const claims = decode(token).claims;

  if (typeof claims === 'object' && claims.hasOwnProperty('iat')) {
    return claims['iat'];
  }

  return null;
};
/**
 * Decodes a Firebase auth. token and checks the validity of its format. Expects a valid issued-at time.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */


exports.issuedAtTime = issuedAtTime;

const isValidFormat = function (token) {
  const decoded = decode(token),
        claims = decoded.claims;
  return !!claims && typeof claims === 'object' && claims.hasOwnProperty('iat');
};
/**
 * Attempts to peer into an auth token and determine if it's an admin auth token by looking at the claims portion.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */


exports.isValidFormat = isValidFormat;

const isAdmin = function (token) {
  const claims = decode(token).claims;
  return typeof claims === 'object' && claims['admin'] === true;
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.isAdmin = isAdmin;

function contains(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function safeGet(obj, key) {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return obj[key];
  } else {
    return undefined;
  }
}

function isEmpty(obj) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }

  return true;
}

function map(obj, fn, contextObj) {
  const res = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      res[key] = fn.call(contextObj, obj[key], key, obj);
    }
  }

  return res;
}
/**
 * Deep equal two objects. Support Arrays and Objects.
 */


function deepEqual(a, b) {
  if (a === b) {
    return true;
  }

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  for (const k of aKeys) {
    if (!bKeys.includes(k)) {
      return false;
    }

    const aProp = a[k];
    const bProp = b[k];

    if (isObject(aProp) && isObject(bProp)) {
      if (!deepEqual(aProp, bProp)) {
        return false;
      }
    } else if (aProp !== bProp) {
      return false;
    }
  }

  for (const k of bKeys) {
    if (!aKeys.includes(k)) {
      return false;
    }
  }

  return true;
}

function isObject(thing) {
  return thing !== null && typeof thing === 'object';
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns a querystring-formatted string (e.g. &arg=val&arg2=val2) from a
 * params object (e.g. {arg: 'val', arg2: 'val2'})
 * Note: You must prepend it with ? when adding it to a URL.
 */


function querystring(querystringParams) {
  const params = [];

  for (const [key, value] of Object.entries(querystringParams)) {
    if (Array.isArray(value)) {
      value.forEach(arrayVal => {
        params.push(encodeURIComponent(key) + '=' + encodeURIComponent(arrayVal));
      });
    } else {
      params.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
  }

  return params.length ? '&' + params.join('&') : '';
}
/**
 * Decodes a querystring (e.g. ?arg=val&arg2=val2) into a params object
 * (e.g. {arg: 'val', arg2: 'val2'})
 */


function querystringDecode(querystring) {
  const obj = {};
  const tokens = querystring.replace(/^\?/, '').split('&');
  tokens.forEach(token => {
    if (token) {
      const [key, value] = token.split('=');
      obj[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  });
  return obj;
}
/**
 * Extract the query string part of a URL, including the leading question mark (if present).
 */


function extractQuerystring(url) {
  const queryStart = url.indexOf('?');

  if (!queryStart) {
    return '';
  }

  const fragmentStart = url.indexOf('#', queryStart);
  return url.substring(queryStart, fragmentStart > 0 ? fragmentStart : undefined);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview SHA-1 cryptographic hash.
 * Variable names follow the notation in FIPS PUB 180-3:
 * http://csrc.nist.gov/publications/fips/fips180-3/fips180-3_final.pdf.
 *
 * Usage:
 *   var sha1 = new sha1();
 *   sha1.update(bytes);
 *   var hash = sha1.digest();
 *
 * Performance:
 *   Chrome 23:   ~400 Mbit/s
 *   Firefox 16:  ~250 Mbit/s
 *
 */

/**
 * SHA-1 cryptographic hash constructor.
 *
 * The properties declared here are discussed in the above algorithm document.
 * @constructor
 * @final
 * @struct
 */


class Sha1 {
  constructor() {
    /**
     * Holds the previous values of accumulated variables a-e in the compress_
     * function.
     * @private
     */
    this.chain_ = [];
    /**
     * A buffer holding the partially computed hash result.
     * @private
     */

    this.buf_ = [];
    /**
     * An array of 80 bytes, each a part of the message to be hashed.  Referred to
     * as the message schedule in the docs.
     * @private
     */

    this.W_ = [];
    /**
     * Contains data needed to pad messages less than 64 bytes.
     * @private
     */

    this.pad_ = [];
    /**
     * @private {number}
     */

    this.inbuf_ = 0;
    /**
     * @private {number}
     */

    this.total_ = 0;
    this.blockSize = 512 / 8;
    this.pad_[0] = 128;

    for (let i = 1; i < this.blockSize; ++i) {
      this.pad_[i] = 0;
    }

    this.reset();
  }

  reset() {
    this.chain_[0] = 0x67452301;
    this.chain_[1] = 0xefcdab89;
    this.chain_[2] = 0x98badcfe;
    this.chain_[3] = 0x10325476;
    this.chain_[4] = 0xc3d2e1f0;
    this.inbuf_ = 0;
    this.total_ = 0;
  }
  /**
   * Internal compress helper function.
   * @param buf Block to compress.
   * @param offset Offset of the block in the buffer.
   * @private
   */


  compress_(buf, offset) {
    if (!offset) {
      offset = 0;
    }

    const W = this.W_; // get 16 big endian words

    if (typeof buf === 'string') {
      for (let i = 0; i < 16; i++) {
        // TODO(user): [bug 8140122] Recent versions of Safari for Mac OS and iOS
        // have a bug that turns the post-increment ++ operator into pre-increment
        // during JIT compilation.  We have code that depends heavily on SHA-1 for
        // correctness and which is affected by this bug, so I've removed all uses
        // of post-increment ++ in which the result value is used.  We can revert
        // this change once the Safari bug
        // (https://bugs.webkit.org/show_bug.cgi?id=109036) has been fixed and
        // most clients have been updated.
        W[i] = buf.charCodeAt(offset) << 24 | buf.charCodeAt(offset + 1) << 16 | buf.charCodeAt(offset + 2) << 8 | buf.charCodeAt(offset + 3);
        offset += 4;
      }
    } else {
      for (let i = 0; i < 16; i++) {
        W[i] = buf[offset] << 24 | buf[offset + 1] << 16 | buf[offset + 2] << 8 | buf[offset + 3];
        offset += 4;
      }
    } // expand to 80 words


    for (let i = 16; i < 80; i++) {
      const t = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
      W[i] = (t << 1 | t >>> 31) & 0xffffffff;
    }

    let a = this.chain_[0];
    let b = this.chain_[1];
    let c = this.chain_[2];
    let d = this.chain_[3];
    let e = this.chain_[4];
    let f, k; // TODO(user): Try to unroll this loop to speed up the computation.

    for (let i = 0; i < 80; i++) {
      if (i < 40) {
        if (i < 20) {
          f = d ^ b & (c ^ d);
          k = 0x5a827999;
        } else {
          f = b ^ c ^ d;
          k = 0x6ed9eba1;
        }
      } else {
        if (i < 60) {
          f = b & c | d & (b | c);
          k = 0x8f1bbcdc;
        } else {
          f = b ^ c ^ d;
          k = 0xca62c1d6;
        }
      }

      const t = (a << 5 | a >>> 27) + f + e + k + W[i] & 0xffffffff;
      e = d;
      d = c;
      c = (b << 30 | b >>> 2) & 0xffffffff;
      b = a;
      a = t;
    }

    this.chain_[0] = this.chain_[0] + a & 0xffffffff;
    this.chain_[1] = this.chain_[1] + b & 0xffffffff;
    this.chain_[2] = this.chain_[2] + c & 0xffffffff;
    this.chain_[3] = this.chain_[3] + d & 0xffffffff;
    this.chain_[4] = this.chain_[4] + e & 0xffffffff;
  }

  update(bytes, length) {
    // TODO(johnlenz): tighten the function signature and remove this check
    if (bytes == null) {
      return;
    }

    if (length === undefined) {
      length = bytes.length;
    }

    const lengthMinusBlock = length - this.blockSize;
    let n = 0; // Using local instead of member variables gives ~5% speedup on Firefox 16.

    const buf = this.buf_;
    let inbuf = this.inbuf_; // The outer while loop should execute at most twice.

    while (n < length) {
      // When we have no data in the block to top up, we can directly process the
      // input buffer (assuming it contains sufficient data). This gives ~25%
      // speedup on Chrome 23 and ~15% speedup on Firefox 16, but requires that
      // the data is provided in large chunks (or in multiples of 64 bytes).
      if (inbuf === 0) {
        while (n <= lengthMinusBlock) {
          this.compress_(bytes, n);
          n += this.blockSize;
        }
      }

      if (typeof bytes === 'string') {
        while (n < length) {
          buf[inbuf] = bytes.charCodeAt(n);
          ++inbuf;
          ++n;

          if (inbuf === this.blockSize) {
            this.compress_(buf);
            inbuf = 0; // Jump to the outer loop so we use the full-block optimization.

            break;
          }
        }
      } else {
        while (n < length) {
          buf[inbuf] = bytes[n];
          ++inbuf;
          ++n;

          if (inbuf === this.blockSize) {
            this.compress_(buf);
            inbuf = 0; // Jump to the outer loop so we use the full-block optimization.

            break;
          }
        }
      }
    }

    this.inbuf_ = inbuf;
    this.total_ += length;
  }
  /** @override */


  digest() {
    const digest = [];
    let totalBits = this.total_ * 8; // Add pad 0x80 0x00*.

    if (this.inbuf_ < 56) {
      this.update(this.pad_, 56 - this.inbuf_);
    } else {
      this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
    } // Add # bits.


    for (let i = this.blockSize - 1; i >= 56; i--) {
      this.buf_[i] = totalBits & 255;
      totalBits /= 256; // Don't use bit-shifting here!
    }

    this.compress_(this.buf_);
    let n = 0;

    for (let i = 0; i < 5; i++) {
      for (let j = 24; j >= 0; j -= 8) {
        digest[n] = this.chain_[i] >> j & 255;
        ++n;
      }
    }

    return digest;
  }

}
/**
 * Helper to make a Subscribe function (just like Promise helps make a
 * Thenable).
 *
 * @param executor Function which can make calls to a single Observer
 *     as a proxy.
 * @param onNoObservers Callback when count of Observers goes to zero.
 */


exports.Sha1 = Sha1;

function createSubscribe(executor, onNoObservers) {
  const proxy = new ObserverProxy(executor, onNoObservers);
  return proxy.subscribe.bind(proxy);
}
/**
 * Implement fan-out for any number of Observers attached via a subscribe
 * function.
 */


class ObserverProxy {
  /**
   * @param executor Function which can make calls to a single Observer
   *     as a proxy.
   * @param onNoObservers Callback when count of Observers goes to zero.
   */
  constructor(executor, onNoObservers) {
    this.observers = [];
    this.unsubscribes = [];
    this.observerCount = 0; // Micro-task scheduling by calling task.then().

    this.task = Promise.resolve();
    this.finalized = false;
    this.onNoObservers = onNoObservers; // Call the executor asynchronously so subscribers that are called
    // synchronously after the creation of the subscribe function
    // can still receive the very first value generated in the executor.

    this.task.then(() => {
      executor(this);
    }).catch(e => {
      this.error(e);
    });
  }

  next(value) {
    this.forEachObserver(observer => {
      observer.next(value);
    });
  }

  error(error) {
    this.forEachObserver(observer => {
      observer.error(error);
    });
    this.close(error);
  }

  complete() {
    this.forEachObserver(observer => {
      observer.complete();
    });
    this.close();
  }
  /**
   * Subscribe function that can be used to add an Observer to the fan-out list.
   *
   * - We require that no event is sent to a subscriber sychronously to their
   *   call to subscribe().
   */


  subscribe(nextOrObserver, error, complete) {
    let observer;

    if (nextOrObserver === undefined && error === undefined && complete === undefined) {
      throw new Error('Missing Observer.');
    } // Assemble an Observer object when passed as callback functions.


    if (implementsAnyMethods(nextOrObserver, ['next', 'error', 'complete'])) {
      observer = nextOrObserver;
    } else {
      observer = {
        next: nextOrObserver,
        error,
        complete
      };
    }

    if (observer.next === undefined) {
      observer.next = noop;
    }

    if (observer.error === undefined) {
      observer.error = noop;
    }

    if (observer.complete === undefined) {
      observer.complete = noop;
    }

    const unsub = this.unsubscribeOne.bind(this, this.observers.length); // Attempt to subscribe to a terminated Observable - we
    // just respond to the Observer with the final error or complete
    // event.

    if (this.finalized) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.task.then(() => {
        try {
          if (this.finalError) {
            observer.error(this.finalError);
          } else {
            observer.complete();
          }
        } catch (e) {// nothing
        }

        return;
      });
    }

    this.observers.push(observer);
    return unsub;
  } // Unsubscribe is synchronous - we guarantee that no events are sent to
  // any unsubscribed Observer.


  unsubscribeOne(i) {
    if (this.observers === undefined || this.observers[i] === undefined) {
      return;
    }

    delete this.observers[i];
    this.observerCount -= 1;

    if (this.observerCount === 0 && this.onNoObservers !== undefined) {
      this.onNoObservers(this);
    }
  }

  forEachObserver(fn) {
    if (this.finalized) {
      // Already closed by previous event....just eat the additional values.
      return;
    } // Since sendOne calls asynchronously - there is no chance that
    // this.observers will become undefined.


    for (let i = 0; i < this.observers.length; i++) {
      this.sendOne(i, fn);
    }
  } // Call the Observer via one of it's callback function. We are careful to
  // confirm that the observe has not been unsubscribed since this asynchronous
  // function had been queued.


  sendOne(i, fn) {
    // Execute the callback asynchronously
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.task.then(() => {
      if (this.observers !== undefined && this.observers[i] !== undefined) {
        try {
          fn(this.observers[i]);
        } catch (e) {
          // Ignore exceptions raised in Observers or missing methods of an
          // Observer.
          // Log error to console. b/31404806
          if (typeof console !== 'undefined' && console.error) {
            console.error(e);
          }
        }
      }
    });
  }

  close(err) {
    if (this.finalized) {
      return;
    }

    this.finalized = true;

    if (err !== undefined) {
      this.finalError = err;
    } // Proxy is no longer needed - garbage collect references
    // eslint-disable-next-line @typescript-eslint/no-floating-promises


    this.task.then(() => {
      this.observers = undefined;
      this.onNoObservers = undefined;
    });
  }

}
/** Turn synchronous function into one called asynchronously. */
// eslint-disable-next-line @typescript-eslint/ban-types


function async(fn, onError) {
  return (...args) => {
    Promise.resolve(true).then(() => {
      fn(...args);
    }).catch(error => {
      if (onError) {
        onError(error);
      }
    });
  };
}
/**
 * Return true if the object passed in implements any of the named methods.
 */


function implementsAnyMethods(obj, methods) {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  for (const method of methods) {
    if (method in obj && typeof obj[method] === 'function') {
      return true;
    }
  }

  return false;
}

function noop() {// do nothing
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Check to make sure the appropriate number of arguments are provided for a public function.
 * Throws an error if it fails.
 *
 * @param fnName The function name
 * @param minCount The minimum number of arguments to allow for the function call
 * @param maxCount The maximum number of argument to allow for the function call
 * @param argCount The actual number of arguments provided.
 */


const validateArgCount = function (fnName, minCount, maxCount, argCount) {
  let argError;

  if (argCount < minCount) {
    argError = 'at least ' + minCount;
  } else if (argCount > maxCount) {
    argError = maxCount === 0 ? 'none' : 'no more than ' + maxCount;
  }

  if (argError) {
    const error = fnName + ' failed: Was called with ' + argCount + (argCount === 1 ? ' argument.' : ' arguments.') + ' Expects ' + argError + '.';
    throw new Error(error);
  }
};
/**
 * Generates a string to prefix an error message about failed argument validation
 *
 * @param fnName The function name
 * @param argName The name of the argument
 * @return The prefix to add to the error thrown for validation.
 */


exports.validateArgCount = validateArgCount;

function errorPrefix(fnName, argName) {
  return `${fnName} failed: ${argName} argument `;
}
/**
 * @param fnName
 * @param argumentNumber
 * @param namespace
 * @param optional
 */


function validateNamespace(fnName, namespace, optional) {
  if (optional && !namespace) {
    return;
  }

  if (typeof namespace !== 'string') {
    //TODO: I should do more validation here. We only allow certain chars in namespaces.
    throw new Error(errorPrefix(fnName, 'namespace') + 'must be a valid firebase namespace.');
  }
}

function validateCallback(fnName, argumentName, // eslint-disable-next-line @typescript-eslint/ban-types
callback, optional) {
  if (optional && !callback) {
    return;
  }

  if (typeof callback !== 'function') {
    throw new Error(errorPrefix(fnName, argumentName) + 'must be a valid function.');
  }
}

function validateContextObject(fnName, argumentName, context, optional) {
  if (optional && !context) {
    return;
  }

  if (typeof context !== 'object' || context === null) {
    throw new Error(errorPrefix(fnName, argumentName) + 'must be a valid context object.');
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Code originally came from goog.crypt.stringToUtf8ByteArray, but for some reason they
// automatically replaced '\r\n' with '\n', and they didn't handle surrogate pairs,
// so it's been modified.
// Note that not all Unicode characters appear as single characters in JavaScript strings.
// fromCharCode returns the UTF-16 encoding of a character - so some Unicode characters
// use 2 characters in Javascript.  All 4-byte UTF-8 characters begin with a first
// character in the range 0xD800 - 0xDBFF (the first character of a so-called surrogate
// pair).
// See http://www.ecma-international.org/ecma-262/5.1/#sec-15.1.3

/**
 * @param {string} str
 * @return {Array}
 */


const stringToByteArray = function (str) {
  const out = [];
  let p = 0;

  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i); // Is this the lead surrogate in a surrogate pair?

    if (c >= 0xd800 && c <= 0xdbff) {
      const high = c - 0xd800; // the high 10 bits.

      i++;
      assert(i < str.length, 'Surrogate pair missing trail surrogate.');
      const low = str.charCodeAt(i) - 0xdc00; // the low 10 bits.

      c = 0x10000 + (high << 10) + low;
    }

    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = c >> 6 | 192;
      out[p++] = c & 63 | 128;
    } else if (c < 65536) {
      out[p++] = c >> 12 | 224;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    } else {
      out[p++] = c >> 18 | 240;
      out[p++] = c >> 12 & 63 | 128;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    }
  }

  return out;
};
/**
 * Calculate length without actually converting; useful for doing cheaper validation.
 * @param {string} str
 * @return {number}
 */


exports.stringToByteArray = stringToByteArray;

const stringLength = function (str) {
  let p = 0;

  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);

    if (c < 128) {
      p++;
    } else if (c < 2048) {
      p += 2;
    } else if (c >= 0xd800 && c <= 0xdbff) {
      // Lead surrogate of a surrogate pair.  The pair together will take 4 bytes to represent.
      p += 4;
      i++; // skip trail surrogate.
    } else {
      p += 3;
    }
  }

  return p;
};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The amount of milliseconds to exponentially increase.
 */


exports.stringLength = stringLength;
const DEFAULT_INTERVAL_MILLIS = 1000;
/**
 * The factor to backoff by.
 * Should be a number greater than 1.
 */

const DEFAULT_BACKOFF_FACTOR = 2;
/**
 * The maximum milliseconds to increase to.
 *
 * <p>Visible for testing
 */

const MAX_VALUE_MILLIS = 4 * 60 * 60 * 1000; // Four hours, like iOS and Android.

/**
 * The percentage of backoff time to randomize by.
 * See
 * http://go/safe-client-behavior#step-1-determine-the-appropriate-retry-interval-to-handle-spike-traffic
 * for context.
 *
 * <p>Visible for testing
 */

exports.MAX_VALUE_MILLIS = MAX_VALUE_MILLIS;
const RANDOM_FACTOR = 0.5;
/**
 * Based on the backoff method from
 * https://github.com/google/closure-library/blob/master/closure/goog/math/exponentialbackoff.js.
 * Extracted here so we don't need to pass metadata and a stateful ExponentialBackoff object around.
 */

exports.RANDOM_FACTOR = RANDOM_FACTOR;

function calculateBackoffMillis(backoffCount, intervalMillis = DEFAULT_INTERVAL_MILLIS, backoffFactor = DEFAULT_BACKOFF_FACTOR) {
  // Calculates an exponentially increasing value.
  // Deviation: calculates value from count and a constant interval, so we only need to save value
  // and count to restore state.
  const currBaseValue = intervalMillis * Math.pow(backoffFactor, backoffCount); // A random "fuzz" to avoid waves of retries.
  // Deviation: randomFactor is required.

  const randomWait = Math.round( // A fraction of the backoff value to add/subtract.
  // Deviation: changes multiplication order to improve readability.
  RANDOM_FACTOR * currBaseValue * ( // A random float (rounded to int by Math.round above) in the range [-1, 1]. Determines
  // if we add or subtract.
  Math.random() - 0.5) * 2); // Limits backoff to max to avoid effectively permanent backoff.

  return Math.min(MAX_VALUE_MILLIS, currBaseValue + randomWait);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Provide English ordinal letters after a number
 */


function ordinal(i) {
  if (!Number.isFinite(i)) {
    return `${i}`;
  }

  return i + indicator(i);
}

function indicator(i) {
  i = Math.abs(i);
  const cent = i % 100;

  if (cent >= 10 && cent <= 20) {
    return 'th';
  }

  const dec = i % 10;

  if (dec === 1) {
    return 'st';
  }

  if (dec === 2) {
    return 'nd';
  }

  if (dec === 3) {
    return 'rd';
  }

  return 'th';
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function getModularInstance(service) {
  if (service && service._delegate) {
    return service._delegate;
  } else {
    return service;
  }
}
},{}],"3a15e19ab036c3aaea02d8f124f3414e":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a;
/**
 * A container for all of the Logger instances
 */
var instances = [];
/**
 * The JS SDK supports 5 log levels and also allows a user the ability to
 * silence the logs altogether.
 *
 * The order is a follows:
 * DEBUG < VERBOSE < INFO < WARN < ERROR
 *
 * All of the log types above the current log level will be captured (i.e. if
 * you set the log level to `INFO`, errors will still be logged, but `DEBUG` and
 * `VERBOSE` logs will not)
 */
exports.LogLevel = void 0;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
    LogLevel[LogLevel["SILENT"] = 5] = "SILENT";
})(exports.LogLevel || (exports.LogLevel = {}));
var levelStringToEnum = {
    'debug': exports.LogLevel.DEBUG,
    'verbose': exports.LogLevel.VERBOSE,
    'info': exports.LogLevel.INFO,
    'warn': exports.LogLevel.WARN,
    'error': exports.LogLevel.ERROR,
    'silent': exports.LogLevel.SILENT
};
/**
 * The default log level
 */
var defaultLogLevel = exports.LogLevel.INFO;
/**
 * By default, `console.debug` is not displayed in the developer console (in
 * chrome). To avoid forcing users to have to opt-in to these logs twice
 * (i.e. once for firebase, and once in the console), we are sending `DEBUG`
 * logs to the `console.log` function.
 */
var ConsoleMethod = (_a = {},
    _a[exports.LogLevel.DEBUG] = 'log',
    _a[exports.LogLevel.VERBOSE] = 'log',
    _a[exports.LogLevel.INFO] = 'info',
    _a[exports.LogLevel.WARN] = 'warn',
    _a[exports.LogLevel.ERROR] = 'error',
    _a);
/**
 * The default log handler will forward DEBUG, VERBOSE, INFO, WARN, and ERROR
 * messages on to their corresponding console counterparts (if the log method
 * is supported by the current log level)
 */
var defaultLogHandler = function (instance, logType) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (logType < instance.logLevel) {
        return;
    }
    var now = new Date().toISOString();
    var method = ConsoleMethod[logType];
    if (method) {
        console[method].apply(console, tslib.__spreadArray(["[" + now + "]  " + instance.name + ":"], args));
    }
    else {
        throw new Error("Attempted to log a message with an invalid logType (value: " + logType + ")");
    }
};
var Logger = /** @class */ (function () {
    /**
     * Gives you an instance of a Logger to capture messages according to
     * Firebase's logging scheme.
     *
     * @param name The name that the logs will be associated with
     */
    function Logger(name) {
        this.name = name;
        /**
         * The log level of the given Logger instance.
         */
        this._logLevel = defaultLogLevel;
        /**
         * The main (internal) log handler for the Logger instance.
         * Can be set to a new function in internal package code but not by user.
         */
        this._logHandler = defaultLogHandler;
        /**
         * The optional, additional, user-defined log handler for the Logger instance.
         */
        this._userLogHandler = null;
        /**
         * Capture the current instance for later use
         */
        instances.push(this);
    }
    Object.defineProperty(Logger.prototype, "logLevel", {
        get: function () {
            return this._logLevel;
        },
        set: function (val) {
            if (!(val in exports.LogLevel)) {
                throw new TypeError("Invalid value \"" + val + "\" assigned to `logLevel`");
            }
            this._logLevel = val;
        },
        enumerable: false,
        configurable: true
    });
    // Workaround for setter/getter having to be the same type.
    Logger.prototype.setLogLevel = function (val) {
        this._logLevel = typeof val === 'string' ? levelStringToEnum[val] : val;
    };
    Object.defineProperty(Logger.prototype, "logHandler", {
        get: function () {
            return this._logHandler;
        },
        set: function (val) {
            if (typeof val !== 'function') {
                throw new TypeError('Value assigned to `logHandler` must be a function');
            }
            this._logHandler = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Logger.prototype, "userLogHandler", {
        get: function () {
            return this._userLogHandler;
        },
        set: function (val) {
            this._userLogHandler = val;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * The functions below are all based on the `console` interface
     */
    Logger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._userLogHandler && this._userLogHandler.apply(this, tslib.__spreadArray([this, exports.LogLevel.DEBUG], args));
        this._logHandler.apply(this, tslib.__spreadArray([this, exports.LogLevel.DEBUG], args));
    };
    Logger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._userLogHandler && this._userLogHandler.apply(this, tslib.__spreadArray([this, exports.LogLevel.VERBOSE], args));
        this._logHandler.apply(this, tslib.__spreadArray([this, exports.LogLevel.VERBOSE], args));
    };
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._userLogHandler && this._userLogHandler.apply(this, tslib.__spreadArray([this, exports.LogLevel.INFO], args));
        this._logHandler.apply(this, tslib.__spreadArray([this, exports.LogLevel.INFO], args));
    };
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._userLogHandler && this._userLogHandler.apply(this, tslib.__spreadArray([this, exports.LogLevel.WARN], args));
        this._logHandler.apply(this, tslib.__spreadArray([this, exports.LogLevel.WARN], args));
    };
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._userLogHandler && this._userLogHandler.apply(this, tslib.__spreadArray([this, exports.LogLevel.ERROR], args));
        this._logHandler.apply(this, tslib.__spreadArray([this, exports.LogLevel.ERROR], args));
    };
    return Logger;
}());
function setLogLevel(level) {
    instances.forEach(function (inst) {
        inst.setLogLevel(level);
    });
}
function setUserLogHandler(logCallback, options) {
    var _loop_1 = function (instance) {
        var customLogLevel = null;
        if (options && options.level) {
            customLogLevel = levelStringToEnum[options.level];
        }
        if (logCallback === null) {
            instance.userLogHandler = null;
        }
        else {
            instance.userLogHandler = function (instance, level) {
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    args[_i - 2] = arguments[_i];
                }
                var message = args
                    .map(function (arg) {
                    if (arg == null) {
                        return null;
                    }
                    else if (typeof arg === 'string') {
                        return arg;
                    }
                    else if (typeof arg === 'number' || typeof arg === 'boolean') {
                        return arg.toString();
                    }
                    else if (arg instanceof Error) {
                        return arg.message;
                    }
                    else {
                        try {
                            return JSON.stringify(arg);
                        }
                        catch (ignored) {
                            return null;
                        }
                    }
                })
                    .filter(function (arg) { return arg; })
                    .join(' ');
                if (level >= (customLogLevel !== null && customLogLevel !== void 0 ? customLogLevel : instance.logLevel)) {
                    logCallback({
                        level: exports.LogLevel[level].toLowerCase(),
                        message: message,
                        args: args,
                        type: instance.name
                    });
                }
            };
        }
    };
    for (var _i = 0, instances_1 = instances; _i < instances_1.length; _i++) {
        var instance = instances_1[_i];
        _loop_1(instance);
    }
}

exports.Logger = Logger;
exports.setLogLevel = setLogLevel;
exports.setUserLogHandler = setUserLogHandler;
//# sourceMappingURL=index.cjs.js.map

},{"tslib":"a212b5bd40bedbc434eaed1b3a2942b1"}],"a212b5bd40bedbc434eaed1b3a2942b1":[function(require,module,exports) {
var global = arguments[3];
var define;

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global global, define, System, Reflect, Promise */
var __extends;

var __assign;

var __rest;

var __decorate;

var __param;

var __metadata;

var __awaiter;

var __generator;

var __exportStar;

var __values;

var __read;

var __spread;

var __spreadArrays;

var __spreadArray;

var __await;

var __asyncGenerator;

var __asyncDelegator;

var __asyncValues;

var __makeTemplateObject;

var __importStar;

var __importDefault;

var __classPrivateFieldGet;

var __classPrivateFieldSet;

var __classPrivateFieldIn;

var __createBinding;

(function (factory) {
  var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};

  if (typeof define === "function" && define.amd) {
    define("tslib", ["exports"], function (exports) {
      factory(createExporter(root, createExporter(exports)));
    });
  } else if (typeof module === "object" && typeof module.exports === "object") {
    factory(createExporter(root, createExporter(module.exports)));
  } else {
    factory(createExporter(root));
  }

  function createExporter(exports, previous) {
    if (exports !== root) {
      if (typeof Object.create === "function") {
        Object.defineProperty(exports, "__esModule", {
          value: true
        });
      } else {
        exports.__esModule = true;
      }
    }

    return function (id, v) {
      return exports[id] = previous ? previous(id, v) : v;
    };
  }
})(function (exporter) {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };

  __extends = function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };

  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  __rest = function (s, e) {
    var t = {};

    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

    if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
  };

  __decorate = function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };

  __param = function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };

  __metadata = function (metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
  };

  __awaiter = function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

  __generator = function (thisArg, body) {
    var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
        f,
        y,
        t,
        g;
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
      return this;
    }), g;

    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }

    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");

      while (_) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }

      if (op[0] & 5) throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  };

  __exportStar = function (m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
  };

  __createBinding = Object.create ? function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);

    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = {
        enumerable: true,
        get: function () {
          return m[k];
        }
      };
    }

    Object.defineProperty(o, k2, desc);
  } : function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
  };

  __values = function (o) {
    var s = typeof Symbol === "function" && Symbol.iterator,
        m = s && o[s],
        i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
      next: function () {
        if (o && i >= o.length) o = void 0;
        return {
          value: o && o[i++],
          done: !o
        };
      }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };

  __read = function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;

    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = {
        error: error
      };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }

    return ar;
  };
  /** @deprecated */


  __spread = function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

    return ar;
  };
  /** @deprecated */


  __spreadArrays = function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

    for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

    return r;
  };

  __spreadArray = function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };

  __await = function (v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
  };

  __asyncGenerator = function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []),
        i,
        q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
      return this;
    }, i;

    function verb(n) {
      if (g[n]) i[n] = function (v) {
        return new Promise(function (a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
    }

    function resume(n, v) {
      try {
        step(g[n](v));
      } catch (e) {
        settle(q[0][3], e);
      }
    }

    function step(r) {
      r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }

    function fulfill(value) {
      resume("next", value);
    }

    function reject(value) {
      resume("throw", value);
    }

    function settle(f, v) {
      if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
  };

  __asyncDelegator = function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) {
      throw e;
    }), verb("return"), i[Symbol.iterator] = function () {
      return this;
    }, i;

    function verb(n, f) {
      i[n] = o[n] ? function (v) {
        return (p = !p) ? {
          value: __await(o[n](v)),
          done: n === "return"
        } : f ? f(v) : v;
      } : f;
    }
  };

  __asyncValues = function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator],
        i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
      return this;
    }, i);

    function verb(n) {
      i[n] = o[n] && function (v) {
        return new Promise(function (resolve, reject) {
          v = o[n](v), settle(resolve, reject, v.done, v.value);
        });
      };
    }

    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function (v) {
        resolve({
          value: v,
          done: d
        });
      }, reject);
    }
  };

  __makeTemplateObject = function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", {
        value: raw
      });
    } else {
      cooked.raw = raw;
    }

    return cooked;
  };

  var __setModuleDefault = Object.create ? function (o, v) {
    Object.defineProperty(o, "default", {
      enumerable: true,
      value: v
    });
  } : function (o, v) {
    o["default"] = v;
  };

  __importStar = function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

    __setModuleDefault(result, mod);

    return result;
  };

  __importDefault = function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };

  __classPrivateFieldGet = function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };

  __classPrivateFieldSet = function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };

  __classPrivateFieldIn = function (state, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
  };

  exporter("__extends", __extends);
  exporter("__assign", __assign);
  exporter("__rest", __rest);
  exporter("__decorate", __decorate);
  exporter("__param", __param);
  exporter("__metadata", __metadata);
  exporter("__awaiter", __awaiter);
  exporter("__generator", __generator);
  exporter("__exportStar", __exportStar);
  exporter("__createBinding", __createBinding);
  exporter("__values", __values);
  exporter("__read", __read);
  exporter("__spread", __spread);
  exporter("__spreadArrays", __spreadArrays);
  exporter("__spreadArray", __spreadArray);
  exporter("__await", __await);
  exporter("__asyncGenerator", __asyncGenerator);
  exporter("__asyncDelegator", __asyncDelegator);
  exporter("__asyncValues", __asyncValues);
  exporter("__makeTemplateObject", __makeTemplateObject);
  exporter("__importStar", __importStar);
  exporter("__importDefault", __importDefault);
  exporter("__classPrivateFieldGet", __classPrivateFieldGet);
  exporter("__classPrivateFieldSet", __classPrivateFieldSet);
  exporter("__classPrivateFieldIn", __classPrivateFieldIn);
});
},{}],"5fdcab4bbcebd897766eab58afcf7d14":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var wrapIdbValue = require('./wrap-idb-value.cjs');

/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */
function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
    const request = indexedDB.open(name, version);
    const openPromise = wrapIdbValue.wrap(request);
    if (upgrade) {
        request.addEventListener('upgradeneeded', (event) => {
            upgrade(wrapIdbValue.wrap(request.result), event.oldVersion, event.newVersion, wrapIdbValue.wrap(request.transaction));
        });
    }
    if (blocked)
        request.addEventListener('blocked', () => blocked());
    openPromise
        .then((db) => {
        if (terminated)
            db.addEventListener('close', () => terminated());
        if (blocking)
            db.addEventListener('versionchange', () => blocking());
    })
        .catch(() => { });
    return openPromise;
}
/**
 * Delete a database.
 *
 * @param name Name of the database.
 */
function deleteDB(name, { blocked } = {}) {
    const request = indexedDB.deleteDatabase(name);
    if (blocked)
        request.addEventListener('blocked', () => blocked());
    return wrapIdbValue.wrap(request).then(() => undefined);
}

const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
const writeMethods = ['put', 'add', 'delete', 'clear'];
const cachedMethods = new Map();
function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase &&
        !(prop in target) &&
        typeof prop === 'string')) {
        return;
    }
    if (cachedMethods.get(prop))
        return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, '');
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) ||
        !(isWrite || readMethods.includes(targetFuncName))) {
        return;
    }
    const method = async function (storeName, ...args) {
        // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
        const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
        let target = tx.store;
        if (useIndex)
            target = target.index(args.shift());
        // Must reject if op rejects.
        // If it's a write operation, must reject if tx.done rejects.
        // Must reject with op rejection first.
        // Must resolve with op value.
        // Must handle both promises (no unhandled rejections)
        return (await Promise.all([
            target[targetFuncName](...args),
            isWrite && tx.done,
        ]))[0];
    };
    cachedMethods.set(prop, method);
    return method;
}
wrapIdbValue.replaceTraps((oldTraps) => ({
    ...oldTraps,
    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop),
}));

exports.unwrap = wrapIdbValue.unwrap;
exports.wrap = wrapIdbValue.wrap;
exports.deleteDB = deleteDB;
exports.openDB = openDB;

},{"./wrap-idb-value.cjs":"25d198b333932bea215407225ab12289"}],"25d198b333932bea215407225ab12289":[function(require,module,exports) {
'use strict';

const instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);

let idbProxyableTypes;
let cursorAdvanceMethods;
// This is a function to prevent it throwing up in node environments.
function getIdbProxyableTypes() {
    return (idbProxyableTypes ||
        (idbProxyableTypes = [
            IDBDatabase,
            IDBObjectStore,
            IDBIndex,
            IDBCursor,
            IDBTransaction,
        ]));
}
// This is a function to prevent it throwing up in node environments.
function getCursorAdvanceMethods() {
    return (cursorAdvanceMethods ||
        (cursorAdvanceMethods = [
            IDBCursor.prototype.advance,
            IDBCursor.prototype.continue,
            IDBCursor.prototype.continuePrimaryKey,
        ]));
}
const cursorRequestMap = new WeakMap();
const transactionDoneMap = new WeakMap();
const transactionStoreNamesMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
function promisifyRequest(request) {
    const promise = new Promise((resolve, reject) => {
        const unlisten = () => {
            request.removeEventListener('success', success);
            request.removeEventListener('error', error);
        };
        const success = () => {
            resolve(wrap(request.result));
            unlisten();
        };
        const error = () => {
            reject(request.error);
            unlisten();
        };
        request.addEventListener('success', success);
        request.addEventListener('error', error);
    });
    promise
        .then((value) => {
        // Since cursoring reuses the IDBRequest (*sigh*), we cache it for later retrieval
        // (see wrapFunction).
        if (value instanceof IDBCursor) {
            cursorRequestMap.set(value, request);
        }
        // Catching to avoid "Uncaught Promise exceptions"
    })
        .catch(() => { });
    // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This
    // is because we create many promises from a single IDBRequest.
    reverseTransformCache.set(promise, request);
    return promise;
}
function cacheDonePromiseForTransaction(tx) {
    // Early bail if we've already created a done promise for this transaction.
    if (transactionDoneMap.has(tx))
        return;
    const done = new Promise((resolve, reject) => {
        const unlisten = () => {
            tx.removeEventListener('complete', complete);
            tx.removeEventListener('error', error);
            tx.removeEventListener('abort', error);
        };
        const complete = () => {
            resolve();
            unlisten();
        };
        const error = () => {
            reject(tx.error || new DOMException('AbortError', 'AbortError'));
            unlisten();
        };
        tx.addEventListener('complete', complete);
        tx.addEventListener('error', error);
        tx.addEventListener('abort', error);
    });
    // Cache it for later retrieval.
    transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
    get(target, prop, receiver) {
        if (target instanceof IDBTransaction) {
            // Special handling for transaction.done.
            if (prop === 'done')
                return transactionDoneMap.get(target);
            // Polyfill for objectStoreNames because of Edge.
            if (prop === 'objectStoreNames') {
                return target.objectStoreNames || transactionStoreNamesMap.get(target);
            }
            // Make tx.store return the only store in the transaction, or undefined if there are many.
            if (prop === 'store') {
                return receiver.objectStoreNames[1]
                    ? undefined
                    : receiver.objectStore(receiver.objectStoreNames[0]);
            }
        }
        // Else transform whatever we get back.
        return wrap(target[prop]);
    },
    set(target, prop, value) {
        target[prop] = value;
        return true;
    },
    has(target, prop) {
        if (target instanceof IDBTransaction &&
            (prop === 'done' || prop === 'store')) {
            return true;
        }
        return prop in target;
    },
};
function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
    // Due to expected object equality (which is enforced by the caching in `wrap`), we
    // only create one new func per func.
    // Edge doesn't support objectStoreNames (booo), so we polyfill it here.
    if (func === IDBDatabase.prototype.transaction &&
        !('objectStoreNames' in IDBTransaction.prototype)) {
        return function (storeNames, ...args) {
            const tx = func.call(unwrap(this), storeNames, ...args);
            transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
            return wrap(tx);
        };
    }
    // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
    // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
    // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
    // with real promises, so each advance methods returns a new promise for the cursor object, or
    // undefined if the end of the cursor has been reached.
    if (getCursorAdvanceMethods().includes(func)) {
        return function (...args) {
            // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
            // the original object.
            func.apply(unwrap(this), args);
            return wrap(cursorRequestMap.get(this));
        };
    }
    return function (...args) {
        // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
        // the original object.
        return wrap(func.apply(unwrap(this), args));
    };
}
function transformCachableValue(value) {
    if (typeof value === 'function')
        return wrapFunction(value);
    // This doesn't return, it just creates a 'done' promise for the transaction,
    // which is later returned for transaction.done (see idbObjectHandler).
    if (value instanceof IDBTransaction)
        cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes()))
        return new Proxy(value, idbProxyTraps);
    // Return the same value back if we're not going to transform it.
    return value;
}
function wrap(value) {
    // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
    // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
    if (value instanceof IDBRequest)
        return promisifyRequest(value);
    // If we've already transformed this value before, reuse the transformed value.
    // This is faster, but it also provides object equality.
    if (transformCache.has(value))
        return transformCache.get(value);
    const newValue = transformCachableValue(value);
    // Not all types are transformed.
    // These may be primitive types, so they can't be WeakMap keys.
    if (newValue !== value) {
        transformCache.set(value, newValue);
        reverseTransformCache.set(newValue, value);
    }
    return newValue;
}
const unwrap = (value) => reverseTransformCache.get(value);

exports.instanceOfAny = instanceOfAny;
exports.replaceTraps = replaceTraps;
exports.reverseTransformCache = reverseTransformCache;
exports.unwrap = unwrap;
exports.wrap = wrap;

},{}],"336b41e374da1b9bc32095da036023ef":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lite = require("@firebase/firestore/lite");

Object.keys(_lite).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _lite[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _lite[key];
    }
  });
});
},{"@firebase/firestore/lite":"10b3057df9bd45eea4abf0f67124bcdc"}],"10b3057df9bd45eea4abf0f67124bcdc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDoc = Ir;
exports.arrayRemove = Dr;
exports.arrayUnion = Vr;
exports.collection = fn;
exports.collectionGroup = dn;
exports.connectFirestoreEmulator = un;
exports.deleteDoc = Ar;
exports.deleteField = Rr;
exports.doc = wn;
exports.documentId = _n;
exports.endAt = dr;
exports.endBefore = fr;
exports.getDoc = br;
exports.getDocs = vr;
exports.getFirestore = on;
exports.increment = Nr;
exports.initializeFirestore = sn;
exports.limit = or;
exports.limitToLast = ur;
exports.orderBy = sr;
exports.query = tr;
exports.queryEqual = pn;
exports.refEqual = mn;
exports.runTransaction = jr;
exports.serverTimestamp = Pr;
exports.setDoc = Er;
exports.setLogLevel = w;
exports.snapshotEqual = Jn;
exports.startAfter = hr;
exports.startAt = ar;
exports.terminate = cn;
exports.updateDoc = Tr;
exports.where = nr;
exports.writeBatch = xr;
exports.WriteBatch = exports.Transaction = exports.Timestamp = exports.QuerySnapshot = exports.QueryDocumentSnapshot = exports.QueryConstraint = exports.Query = exports.GeoPoint = exports.FirestoreError = exports.Firestore = exports.FieldValue = exports.FieldPath = exports.DocumentSnapshot = exports.DocumentReference = exports.CollectionReference = exports.Bytes = void 0;

var _app = require("@firebase/app");

var _component = require("@firebase/component");

var _logger = require("@firebase/logger");

var _util = require("@firebase/util");

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Simple wrapper around a nullable UID. Mostly exists to make code more
 * readable.
 */
class l {
  constructor(t) {
    this.uid = t;
  }

  isAuthenticated() {
    return null != this.uid;
  }
  /**
   * Returns a key representing this user, suitable for inclusion in a
   * dictionary.
   */


  toKey() {
    return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
  }

  isEqual(t) {
    return t.uid === this.uid;
  }

}
/** A user with a null UID. */


l.UNAUTHENTICATED = new l(null), // TODO(mikelehen): Look into getting a proper uid-equivalent for
// non-FirebaseAuth providers.
l.GOOGLE_CREDENTIALS = new l("google-credentials-uid"), l.FIRST_PARTY = new l("first-party-uid"), l.MOCK_USER = new l("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

let f = "9.8.0";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const d = new _logger.Logger("@firebase/firestore");
/**
 * Sets the verbosity of Cloud Firestore logs (debug, error, or silent).
 *
 * @param logLevel - The verbosity you set for activity and error logging. Can
 *   be any of the following values:
 *
 *   <ul>
 *     <li>`debug` for the most verbose logging level, primarily for
 *     debugging.</li>
 *     <li>`error` to log errors only.</li>
 *     <li><code>`silent` to turn off logging.</li>
 *   </ul>
 */

function w(t) {
  d.setLogLevel(t);
}

function m(t, ...e) {
  if (d.logLevel <= _logger.LogLevel.DEBUG) {
    const n = e.map(_);
    d.debug(`Firestore (${f}): ${t}`, ...n);
  }
}

function p(t, ...e) {
  if (d.logLevel <= _logger.LogLevel.ERROR) {
    const n = e.map(_);
    d.error(`Firestore (${f}): ${t}`, ...n);
  }
}
/**
 * @internal
 */


function y(t, ...e) {
  if (d.logLevel <= _logger.LogLevel.WARN) {
    const n = e.map(_);
    d.warn(`Firestore (${f}): ${t}`, ...n);
  }
}
/**
 * Converts an additional log parameter to a string representation.
 */


function _(t) {
  if ("string" == typeof t) return t;

  try {
    return e = t, JSON.stringify(e);
  } catch (e) {
    // Converting to JSON failed, just log the object directly
    return t;
  }
  /**
  * @license
  * Copyright 2020 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

  /** Formats an object as a JSON string, suitable for logging. */


  var e;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Unconditionally fails, throwing an Error with the given message.
 * Messages are stripped in production builds.
 *
 * Returns `never` and can be used in expressions:
 * @example
 * let futureVar = fail('not implemented yet');
 */


function g(t = "Unexpected state") {
  // Log the failure in addition to throw an exception, just in case the
  // exception is swallowed.
  const e = `FIRESTORE (${f}) INTERNAL ASSERTION FAILED: ` + t; // NOTE: We don't use FirestoreError here because these are internal failures
  // that cannot be handled by the user. (Also it would create a circular
  // dependency between the error and assert modules which doesn't work.)

  throw p(e), new Error(e);
}
/**
 * Fails if the given assertion condition is false, throwing an Error with the
 * given message if it did.
 *
 * Messages are stripped in production builds.
 */


function b(t, e) {
  t || g();
}
/**
 * Casts `obj` to `T`. In non-production builds, verifies that `obj` is an
 * instance of `T` before casting.
 */


function v(t, // eslint-disable-next-line @typescript-eslint/no-explicit-any
e) {
  return t;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const E = "ok",
      T = "cancelled",
      A = "unknown",
      I = "invalid-argument",
      R = "deadline-exceeded",
      P = "not-found",
      V = "already-exists",
      D = "permission-denied",
      N = "unauthenticated",
      $ = "resource-exhausted",
      S = "failed-precondition",
      x = "aborted",
      F = "out-of-range",
      q = "unimplemented",
      O = "internal",
      C = "unavailable",
      L = "data-loss";
/** An error returned by a Firestore operation. */

class U extends _util.FirebaseError {
  /** @hideconstructor */
  constructor(
  /**
   * The backend error code associated with this error.
   */
  t,
  /**
   * A custom error description.
   */
  e) {
    super(t, e), this.code = t, this.message = e, // HACK: We write a toString property directly because Error is not a real
    // class and so inheritance does not work correctly. We could alternatively
    // do the same "back-door inheritance" trick that FirebaseError does.
    this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`;
  }

}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.FirestoreError = U;

class k {
  constructor() {
    this.promise = new Promise((t, e) => {
      this.resolve = t, this.reject = e;
    });
  }

}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


class j {
  constructor(t, e) {
    this.user = e, this.type = "OAuth", this.headers = new Map(), this.headers.set("Authorization", `Bearer ${t}`);
  }

}
/**
 * A CredentialsProvider that always yields an empty token.
 * @internal
 */


class M {
  getToken() {
    return Promise.resolve(null);
  }

  invalidateToken() {}

  start(t, e) {
    // Fire with initial user.
    t.enqueueRetryable(() => e(l.UNAUTHENTICATED));
  }

  shutdown() {}

}
/**
 * A CredentialsProvider that always returns a constant token. Used for
 * emulator token mocking.
 */


class B {
  constructor(t) {
    this.token = t,
    /**
     * Stores the listener registered with setChangeListener()
     * This isn't actually necessary since the UID never changes, but we use this
     * to verify the listen contract is adhered to in tests.
     */
    this.changeListener = null;
  }

  getToken() {
    return Promise.resolve(this.token);
  }

  invalidateToken() {}

  start(t, e) {
    this.changeListener = e, // Fire with initial user.
    t.enqueueRetryable(() => e(this.token.user));
  }

  shutdown() {
    this.changeListener = null;
  }

}
/** Credential provider for the Lite SDK. */


class z {
  constructor(t) {
    this.auth = null, t.onInit(t => {
      this.auth = t;
    });
  }

  getToken() {
    return this.auth ? this.auth.getToken().then(t => t ? (b("string" == typeof t.accessToken), new j(t.accessToken, new l(this.auth.getUid()))) : null) : Promise.resolve(null);
  }

  invalidateToken() {}

  start(t, e) {}

  shutdown() {}

}
/*
 * FirstPartyToken provides a fresh token each time its value
 * is requested, because if the token is too old, requests will be rejected.
 * Technically this may no longer be necessary since the SDK should gracefully
 * recover from unauthenticated errors (see b/33147818 for context), but it's
 * safer to keep the implementation as-is.
 */


class G {
  constructor(t, e, n) {
    this.type = "FirstParty", this.user = l.FIRST_PARTY, this.headers = new Map(), this.headers.set("X-Goog-AuthUser", e);
    const r = t.auth.getAuthHeaderValueForFirstParty([]);
    r && this.headers.set("Authorization", r), n && this.headers.set("X-Goog-Iam-Authorization-Token", n);
  }

}
/*
 * Provides user credentials required for the Firestore JavaScript SDK
 * to authenticate the user, using technique that is only available
 * to applications hosted by Google.
 */


class Q {
  constructor(t, e, n) {
    this.t = t, this.i = e, this.o = n;
  }

  getToken() {
    return Promise.resolve(new G(this.t, this.i, this.o));
  }

  start(t, e) {
    // Fire with initial uid.
    t.enqueueRetryable(() => e(l.FIRST_PARTY));
  }

  shutdown() {}

  invalidateToken() {}

}

class W {
  constructor(t) {
    this.value = t, this.type = "AppCheck", this.headers = new Map(), t && t.length > 0 && this.headers.set("x-firebase-appcheck", this.value);
  }

}
/** AppCheck token provider for the Lite SDK. */


class Y {
  constructor(t) {
    this.u = t, this.appCheck = null, t.onInit(t => {
      this.appCheck = t;
    });
  }

  getToken() {
    return this.appCheck ? this.appCheck.getToken().then(t => t ? (b("string" == typeof t.token), new W(t.token)) : null) : Promise.resolve(null);
  }

  invalidateToken() {}

  start(t, e) {}

  shutdown() {}

}
/**
 * Builds a CredentialsProvider depending on the type of
 * the credentials passed in.
 */

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


class H {
  /**
   * Constructs a DatabaseInfo using the provided host, databaseId and
   * persistenceKey.
   *
   * @param databaseId - The database to use.
   * @param appId - The Firebase App Id.
   * @param persistenceKey - A unique identifier for this Firestore's local
   * storage (used in conjunction with the databaseId).
   * @param host - The Firestore backend host to connect to.
   * @param ssl - Whether to use SSL when connecting.
   * @param forceLongPolling - Whether to use the forceLongPolling option
   * when using WebChannel as the network transport.
   * @param autoDetectLongPolling - Whether to use the detectBufferingProxy
   * option when using WebChannel as the network transport.
   * @param useFetchStreams Whether to use the Fetch API instead of
   * XMLHTTPRequest
   */
  constructor(t, e, n, r, s, i, o, u) {
    this.databaseId = t, this.appId = e, this.persistenceKey = n, this.host = r, this.ssl = s, this.forceLongPolling = i, this.autoDetectLongPolling = o, this.useFetchStreams = u;
  }

}
/** The default database name for a project. */

/**
 * Represents the database ID a Firestore client is associated with.
 * @internal
 */


class K {
  constructor(t, e) {
    this.projectId = t, this.database = e || "(default)";
  }

  static empty() {
    return new K("", "");
  }

  get isDefaultDatabase() {
    return "(default)" === this.database;
  }

  isEqual(t) {
    return t instanceof K && t.projectId === this.projectId && t.database === this.database;
  }

}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Path represents an ordered sequence of string segments.
 */


class J {
  constructor(t, e, n) {
    void 0 === e ? e = 0 : e > t.length && g(), void 0 === n ? n = t.length - e : n > t.length - e && g(), this.segments = t, this.offset = e, this.len = n;
  }

  get length() {
    return this.len;
  }

  isEqual(t) {
    return 0 === J.comparator(this, t);
  }

  child(t) {
    const e = this.segments.slice(this.offset, this.limit());
    return t instanceof J ? t.forEach(t => {
      e.push(t);
    }) : e.push(t), this.construct(e);
  }
  /** The index of one past the last segment of the path. */


  limit() {
    return this.offset + this.length;
  }

  popFirst(t) {
    return t = void 0 === t ? 1 : t, this.construct(this.segments, this.offset + t, this.length - t);
  }

  popLast() {
    return this.construct(this.segments, this.offset, this.length - 1);
  }

  firstSegment() {
    return this.segments[this.offset];
  }

  lastSegment() {
    return this.get(this.length - 1);
  }

  get(t) {
    return this.segments[this.offset + t];
  }

  isEmpty() {
    return 0 === this.length;
  }

  isPrefixOf(t) {
    if (t.length < this.length) return !1;

    for (let e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;

    return !0;
  }

  isImmediateParentOf(t) {
    if (this.length + 1 !== t.length) return !1;

    for (let e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;

    return !0;
  }

  forEach(t) {
    for (let e = this.offset, n = this.limit(); e < n; e++) t(this.segments[e]);
  }

  toArray() {
    return this.segments.slice(this.offset, this.limit());
  }

  static comparator(t, e) {
    const n = Math.min(t.length, e.length);

    for (let r = 0; r < n; r++) {
      const n = t.get(r),
            s = e.get(r);
      if (n < s) return -1;
      if (n > s) return 1;
    }

    return t.length < e.length ? -1 : t.length > e.length ? 1 : 0;
  }

}
/**
 * A slash-separated path for navigating resources (documents and collections)
 * within Firestore.
 *
 * @internal
 */


class X extends J {
  construct(t, e, n) {
    return new X(t, e, n);
  }

  canonicalString() {
    // NOTE: The client is ignorant of any path segments containing escape
    // sequences (e.g. __id123__) and just passes them through raw (they exist
    // for legacy reasons and should not be used frequently).
    return this.toArray().join("/");
  }

  toString() {
    return this.canonicalString();
  }
  /**
   * Creates a resource path from the given slash-delimited string. If multiple
   * arguments are provided, all components are combined. Leading and trailing
   * slashes from all components are ignored.
   */


  static fromString(...t) {
    // NOTE: The client is ignorant of any path segments containing escape
    // sequences (e.g. __id123__) and just passes them through raw (they exist
    // for legacy reasons and should not be used frequently).
    const e = [];

    for (const n of t) {
      if (n.indexOf("//") >= 0) throw new U(I, `Invalid segment (${n}). Paths must not contain // in them.`); // Strip leading and traling slashed.

      e.push(...n.split("/").filter(t => t.length > 0));
    }

    return new X(e);
  }

  static emptyPath() {
    return new X([]);
  }

}

const Z = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
/**
 * A dot-separated path for navigating sub-objects within a document.
 * @internal
 */

class tt extends J {
  construct(t, e, n) {
    return new tt(t, e, n);
  }
  /**
   * Returns true if the string could be used as a segment in a field path
   * without escaping.
   */


  static isValidIdentifier(t) {
    return Z.test(t);
  }

  canonicalString() {
    return this.toArray().map(t => (t = t.replace(/\\/g, "\\\\").replace(/`/g, "\\`"), tt.isValidIdentifier(t) || (t = "`" + t + "`"), t)).join(".");
  }

  toString() {
    return this.canonicalString();
  }
  /**
   * Returns true if this field references the key of a document.
   */


  isKeyField() {
    return 1 === this.length && "__name__" === this.get(0);
  }
  /**
   * The field designating the key of a document.
   */


  static keyField() {
    return new tt(["__name__"]);
  }
  /**
   * Parses a field string from the given server-formatted string.
   *
   * - Splitting the empty string is not allowed (for now at least).
   * - Empty segments within the string (e.g. if there are two consecutive
   *   separators) are not allowed.
   *
   * TODO(b/37244157): we should make this more strict. Right now, it allows
   * non-identifier path components, even if they aren't escaped.
   */


  static fromServerFormat(t) {
    const e = [];
    let n = "",
        r = 0;

    const s = () => {
      if (0 === n.length) throw new U(I, `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
      e.push(n), n = "";
    };

    let i = !1;

    for (; r < t.length;) {
      const e = t[r];

      if ("\\" === e) {
        if (r + 1 === t.length) throw new U(I, "Path has trailing escape character: " + t);
        const e = t[r + 1];
        if ("\\" !== e && "." !== e && "`" !== e) throw new U(I, "Path has invalid escape sequence: " + t);
        n += e, r += 2;
      } else "`" === e ? (i = !i, r++) : "." !== e || i ? (n += e, r++) : (s(), r++);
    }

    if (s(), i) throw new U(I, "Unterminated ` in path: " + t);
    return new tt(e);
  }

  static emptyPath() {
    return new tt([]);
  }

}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @internal
 */


class et {
  constructor(t) {
    this.path = t;
  }

  static fromPath(t) {
    return new et(X.fromString(t));
  }

  static fromName(t) {
    return new et(X.fromString(t).popFirst(5));
  }

  static empty() {
    return new et(X.emptyPath());
  }

  get collectionGroup() {
    return this.path.popLast().lastSegment();
  }
  /** Returns true if the document is in the specified collectionId. */


  hasCollectionId(t) {
    return this.path.length >= 2 && this.path.get(this.path.length - 2) === t;
  }
  /** Returns the collection group (i.e. the name of the parent collection) for this key. */


  getCollectionGroup() {
    return this.path.get(this.path.length - 2);
  }
  /** Returns the fully qualified path to the parent collection. */


  getCollectionPath() {
    return this.path.popLast();
  }

  isEqual(t) {
    return null !== t && 0 === X.comparator(this.path, t.path);
  }

  toString() {
    return this.path.toString();
  }

  static comparator(t, e) {
    return X.comparator(t.path, e.path);
  }

  static isDocumentKey(t) {
    return t.length % 2 == 0;
  }
  /**
   * Creates and returns a new document key with the given segments.
   *
   * @param segments - The segments of the path to the document
   * @returns A new instance of DocumentKey
   */


  static fromSegments(t) {
    return new et(new X(t.slice()));
  }

}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function nt(t, e, n) {
  if (!n) throw new U(I, `Function ${t}() cannot be called with an empty ${e}.`);
}
/**
 * Validates that two boolean options are not set at the same time.
 * @internal
 */

/**
 * Validates that `path` refers to a document (indicated by the fact it contains
 * an even numbers of segments).
 */


function rt(t) {
  if (!et.isDocumentKey(t)) throw new U(I, `Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`);
}
/**
 * Validates that `path` refers to a collection (indicated by the fact it
 * contains an odd numbers of segments).
 */


function st(t) {
  if (et.isDocumentKey(t)) throw new U(I, `Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`);
}
/**
 * Returns true if it's a non-null object without a custom prototype
 * (i.e. excludes Array, Date, etc.).
 */

/** Returns a string describing the type / value of the provided input. */


function it(t) {
  if (void 0 === t) return "undefined";
  if (null === t) return "null";
  if ("string" == typeof t) return t.length > 20 && (t = `${t.substring(0, 20)}...`), JSON.stringify(t);
  if ("number" == typeof t || "boolean" == typeof t) return "" + t;

  if ("object" == typeof t) {
    if (t instanceof Array) return "an array";
    {
      const e =
      /** try to get the constructor name for an object. */
      function (t) {
        if (t.constructor) return t.constructor.name;
        return null;
      }
      /**
      * Casts `obj` to `T`, optionally unwrapping Compat types to expose the
      * underlying instance. Throws if  `obj` is not an instance of `T`.
      *
      * This cast is used in the Lite and Full SDK to verify instance types for
      * arguments passed to the public API.
      * @internal
      */
      (t);

      return e ? `a custom ${e} object` : "an object";
    }
  }

  return "function" == typeof t ? "a function" : g();
}

function ot(t, // eslint-disable-next-line @typescript-eslint/no-explicit-any
e) {
  if ("_delegate" in t && ( // Unwrap Compat types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t = t._delegate), !(t instanceof e)) {
    if (e.name === t.constructor.name) throw new U(I, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
    {
      const n = it(t);
      throw new U(I, `Expected type '${e.name}', but it was: ${n}`);
    }
  }

  return t;
}

function ut(t, e) {
  if (e <= 0) throw new U(I, `Function ${t}() requires a positive number, but it was: ${e}.`);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns whether a variable is either undefined or null.
 */


function ct(t) {
  return null == t;
}
/** Returns whether the value represents -0. */


function at(t) {
  // Detect if the value is -0.0. Based on polyfill from
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
  return 0 === t && 1 / t == -1 / 0;
}
/**
 * Returns whether a value is an integer and in the safe integer range
 * @param value - The value to test for being an integer and in the safe range
 */

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const ht = {
  BatchGetDocuments: "batchGet",
  Commit: "commit",
  RunQuery: "runQuery"
};
/**
 * Maps RPC names to the corresponding REST endpoint name.
 *
 * We use array notation to avoid mangling.
 */

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Error Codes describing the different ways GRPC can fail. These are copied
 * directly from GRPC's sources here:
 *
 * https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
 *
 * Important! The names of these identifiers matter because the string forms
 * are used for reverse lookups from the webchannel stream. Do NOT change the
 * names of these identifiers or change this into a const enum.
 */

var lt, ft;
/**
 * Converts an HTTP Status Code to the equivalent error code.
 *
 * @param status - An HTTP Status Code, like 200, 404, 503, etc.
 * @returns The equivalent Code. Unknown status codes are mapped to
 *     Code.UNKNOWN.
 */

function dt(t) {
  if (void 0 === t) return p("RPC_ERROR", "HTTP error has no status"), A; // The canonical error codes for Google APIs [1] specify mapping onto HTTP
  // status codes but the mapping is not bijective. In each case of ambiguity
  // this function chooses a primary error.
  // [1]
  // https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto

  switch (t) {
    case 200:
      // OK
      return E;

    case 400:
      // Bad Request
      return S;
    // Other possibilities based on the forward mapping
    // return Code.INVALID_ARGUMENT;
    // return Code.OUT_OF_RANGE;

    case 401:
      // Unauthorized
      return N;

    case 403:
      // Forbidden
      return D;

    case 404:
      // Not Found
      return P;

    case 409:
      // Conflict
      return x;
    // Other possibilities:
    // return Code.ALREADY_EXISTS;

    case 416:
      // Range Not Satisfiable
      return F;

    case 429:
      // Too Many Requests
      return $;

    case 499:
      // Client Closed Request
      return T;

    case 500:
      // Internal Server Error
      return A;
    // Other possibilities:
    // return Code.INTERNAL;
    // return Code.DATA_LOSS;

    case 501:
      // Unimplemented
      return q;

    case 503:
      // Service Unavailable
      return C;

    case 504:
      // Gateway Timeout
      return R;

    default:
      return t >= 200 && t < 300 ? E : t >= 400 && t < 500 ? S : t >= 500 && t < 600 ? O : A;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A Rest-based connection that relies on the native HTTP stack
 * (e.g. `fetch` or a polyfill).
 */


(ft = lt || (lt = {}))[ft.OK = 0] = "OK", ft[ft.CANCELLED = 1] = "CANCELLED", ft[ft.UNKNOWN = 2] = "UNKNOWN", ft[ft.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", ft[ft.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", ft[ft.NOT_FOUND = 5] = "NOT_FOUND", ft[ft.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", ft[ft.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", ft[ft.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", ft[ft.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", ft[ft.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", ft[ft.ABORTED = 10] = "ABORTED", ft[ft.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", ft[ft.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", ft[ft.INTERNAL = 13] = "INTERNAL", ft[ft.UNAVAILABLE = 14] = "UNAVAILABLE", ft[ft.DATA_LOSS = 15] = "DATA_LOSS";

class wt extends
/**
 * Base class for all Rest-based connections to the backend (WebChannel and
 * HTTP).
 */
class {
  constructor(t) {
    this.databaseInfo = t, this.databaseId = t.databaseId;
    const e = t.ssl ? "https" : "http";
    this.h = e + "://" + t.host, this.l = "projects/" + this.databaseId.projectId + "/databases/" + this.databaseId.database + "/documents";
  }

  m(t, e, n, r, s) {
    const i = this.p(t, e);
    m("RestConnection", "Sending: ", i, n);
    const o = {};
    return this.g(o, r, s), this.v(t, i, o, n).then(t => (m("RestConnection", "Received: ", t), t), e => {
      throw y("RestConnection", `${t} failed with error: `, e, "url: ", i, "request:", n), e;
    });
  }

  T(t, e, n, r, s) {
    // The REST API automatically aggregates all of the streamed results, so we
    // can just use the normal invoke() method.
    return this.m(t, e, n, r, s);
  }
  /**
   * Modifies the headers for a request, adding any authorization token if
   * present and any additional headers for the request.
   */


  g(t, e, n) {
    t["X-Goog-Api-Client"] = "gl-js/ fire/" + f, // Content-Type: text/plain will avoid preflight requests which might
    // mess with CORS and redirects by proxies. If we add custom headers
    // we will need to change this code to potentially use the $httpOverwrite
    // parameter supported by ESF to avoid triggering preflight requests.
    t["Content-Type"] = "text/plain", this.databaseInfo.appId && (t["X-Firebase-GMPID"] = this.databaseInfo.appId), e && e.headers.forEach((e, n) => t[n] = e), n && n.headers.forEach((e, n) => t[n] = e);
  }

  p(t, e) {
    const n = ht[t];
    return `${this.h}/v1/${e}:${n}`;
  }

} {
  /**
   * @param databaseInfo - The connection info.
   * @param fetchImpl - `fetch` or a Polyfill that implements the fetch API.
   */
  constructor(t, e) {
    super(t), this.A = e;
  }

  I(t, e) {
    throw new Error("Not supported by FetchConnection");
  }

  async v(t, e, n, r) {
    const s = JSON.stringify(r);
    let i;

    try {
      i = await this.A(e, {
        method: "POST",
        headers: n,
        body: s
      });
    } catch (t) {
      throw new U(dt(t.status), "Request failed with error: " + t.statusText);
    }

    if (!i.ok) throw new U(dt(i.status), "Request failed with error: " + i.statusText);
    return i.json();
  }

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** Initializes the HTTP connection for the REST API. */

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Generates `nBytes` of random bytes.
 *
 * If `nBytes < 0` , an error will be thrown.
 */


function mt(t) {
  // Polyfills for IE and WebWorker by using `self` and `msCrypto` when `crypto` is not available.
  const e = // eslint-disable-next-line @typescript-eslint/no-explicit-any
  "undefined" != typeof self && (self.crypto || self.msCrypto),
        n = new Uint8Array(t);
  if (e && "function" == typeof e.getRandomValues) e.getRandomValues(n);else // Falls back to Math.random
    for (let e = 0; e < t; e++) n[e] = Math.floor(256 * Math.random());
  return n;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


class pt {
  static R() {
    // Alphanumeric characters
    const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
          e = Math.floor(256 / t.length) * t.length; // The largest byte value that is a multiple of `char.length`.

    let n = "";

    for (; n.length < 20;) {
      const r = mt(40);

      for (let s = 0; s < r.length; ++s) // Only accept values that are [0, maxMultiple), this ensures they can
      // be evenly mapped to indices of `chars` via a modulo operation.
      n.length < 20 && r[s] < e && (n += t.charAt(r[s] % t.length));
    }

    return n;
  }

}

function yt(t, e) {
  return t < e ? -1 : t > e ? 1 : 0;
}
/** Helper to compare arrays using isEqual(). */


function _t(t, e, n) {
  return t.length === e.length && t.every((t, r) => n(t, e[r]));
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// The earliest date supported by Firestore timestamps (0001-01-01T00:00:00Z).

/**
 * A `Timestamp` represents a point in time independent of any time zone or
 * calendar, represented as seconds and fractions of seconds at nanosecond
 * resolution in UTC Epoch time.
 *
 * It is encoded using the Proleptic Gregorian Calendar which extends the
 * Gregorian calendar backwards to year one. It is encoded assuming all minutes
 * are 60 seconds long, i.e. leap seconds are "smeared" so that no leap second
 * table is needed for interpretation. Range is from 0001-01-01T00:00:00Z to
 * 9999-12-31T23:59:59.999999999Z.
 *
 * For examples and further specifications, refer to the
 * {@link https://github.com/google/protobuf/blob/master/src/google/protobuf/timestamp.proto | Timestamp definition}.
 */


class gt {
  /**
   * Creates a new timestamp.
   *
   * @param seconds - The number of seconds of UTC time since Unix epoch
   *     1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
   *     9999-12-31T23:59:59Z inclusive.
   * @param nanoseconds - The non-negative fractions of a second at nanosecond
   *     resolution. Negative second values with fractions must still have
   *     non-negative nanoseconds values that count forward in time. Must be
   *     from 0 to 999,999,999 inclusive.
   */
  constructor(
  /**
   * The number of seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z.
   */
  t,
  /**
   * The fractions of a second at nanosecond resolution.*
   */
  e) {
    if (this.seconds = t, this.nanoseconds = e, e < 0) throw new U(I, "Timestamp nanoseconds out of range: " + e);
    if (e >= 1e9) throw new U(I, "Timestamp nanoseconds out of range: " + e);
    if (t < -62135596800) throw new U(I, "Timestamp seconds out of range: " + t); // This will break in the year 10,000.

    if (t >= 253402300800) throw new U(I, "Timestamp seconds out of range: " + t);
  }
  /**
   * Creates a new timestamp with the current date, with millisecond precision.
   *
   * @returns a new timestamp representing the current date.
   */


  static now() {
    return gt.fromMillis(Date.now());
  }
  /**
   * Creates a new timestamp from the given date.
   *
   * @param date - The date to initialize the `Timestamp` from.
   * @returns A new `Timestamp` representing the same point in time as the given
   *     date.
   */


  static fromDate(t) {
    return gt.fromMillis(t.getTime());
  }
  /**
   * Creates a new timestamp from the given number of milliseconds.
   *
   * @param milliseconds - Number of milliseconds since Unix epoch
   *     1970-01-01T00:00:00Z.
   * @returns A new `Timestamp` representing the same point in time as the given
   *     number of milliseconds.
   */


  static fromMillis(t) {
    const e = Math.floor(t / 1e3),
          n = Math.floor(1e6 * (t - 1e3 * e));
    return new gt(e, n);
  }
  /**
   * Converts a `Timestamp` to a JavaScript `Date` object. This conversion
   * causes a loss of precision since `Date` objects only support millisecond
   * precision.
   *
   * @returns JavaScript `Date` object representing the same point in time as
   *     this `Timestamp`, with millisecond precision.
   */


  toDate() {
    return new Date(this.toMillis());
  }
  /**
   * Converts a `Timestamp` to a numeric timestamp (in milliseconds since
   * epoch). This operation causes a loss of precision.
   *
   * @returns The point in time corresponding to this timestamp, represented as
   *     the number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
   */


  toMillis() {
    return 1e3 * this.seconds + this.nanoseconds / 1e6;
  }

  _compareTo(t) {
    return this.seconds === t.seconds ? yt(this.nanoseconds, t.nanoseconds) : yt(this.seconds, t.seconds);
  }
  /**
   * Returns true if this `Timestamp` is equal to the provided one.
   *
   * @param other - The `Timestamp` to compare against.
   * @returns true if this `Timestamp` is equal to the provided one.
   */


  isEqual(t) {
    return t.seconds === this.seconds && t.nanoseconds === this.nanoseconds;
  }
  /** Returns a textual representation of this `Timestamp`. */


  toString() {
    return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")";
  }
  /** Returns a JSON-serializable representation of this `Timestamp`. */


  toJSON() {
    return {
      seconds: this.seconds,
      nanoseconds: this.nanoseconds
    };
  }
  /**
   * Converts this object to a primitive string, which allows `Timestamp` objects
   * to be compared using the `>`, `<=`, `>=` and `>` operators.
   */


  valueOf() {
    // This method returns a string of the form <seconds>.<nanoseconds> where
    // <seconds> is translated to have a non-negative value and both <seconds>
    // and <nanoseconds> are left-padded with zeroes to be a consistent length.
    // Strings with this format then have a lexiographical ordering that matches
    // the expected ordering. The <seconds> translation is done to avoid having
    // a leading negative sign (i.e. a leading '-' character) in its string
    // representation, which would affect its lexiographical ordering.
    const t = this.seconds - -62135596800; // Note: Up to 12 decimal digits are required to represent all valid
    // 'seconds' values.

    return String(t).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0");
  }

}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A version of a document in Firestore. This corresponds to the version
 * timestamp, such as update_time or read_time.
 */


exports.Timestamp = gt;

class bt {
  constructor(t) {
    this.timestamp = t;
  }

  static fromTimestamp(t) {
    return new bt(t);
  }

  static min() {
    return new bt(new gt(0, 0));
  }

  static max() {
    return new bt(new gt(253402300799, 999999999));
  }

  compareTo(t) {
    return this.timestamp._compareTo(t.timestamp);
  }

  isEqual(t) {
    return this.timestamp.isEqual(t.timestamp);
  }
  /** Returns a number representation of the version for use in spec tests. */


  toMicroseconds() {
    // Convert to microseconds.
    return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
  }

  toString() {
    return "SnapshotVersion(" + this.timestamp.toString() + ")";
  }

  toTimestamp() {
    return this.timestamp;
  }

}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function vt(t) {
  let e = 0;

  for (const n in t) Object.prototype.hasOwnProperty.call(t, n) && e++;

  return e;
}

function Et(t, e) {
  for (const n in t) Object.prototype.hasOwnProperty.call(t, n) && e(n, t[n]);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Provides a set of fields that can be used to partially patch a document.
 * FieldMask is used in conjunction with ObjectValue.
 * Examples:
 *   foo - Overwrites foo entirely with the provided value. If foo is not
 *         present in the companion ObjectValue, the field is deleted.
 *   foo.bar - Overwrites only the field bar of the object foo.
 *             If foo is not an object, foo is replaced with an object
 *             containing foo
 */


class Tt {
  constructor(t) {
    this.fields = t, // TODO(dimond): validation of FieldMask
    // Sort the field mask to support `FieldMask.isEqual()` and assert below.
    t.sort(tt.comparator);
  }
  /**
   * Verifies that `fieldPath` is included by at least one field in this field
   * mask.
   *
   * This is an O(n) operation, where `n` is the size of the field mask.
   */


  covers(t) {
    for (const e of this.fields) if (e.isPrefixOf(t)) return !0;

    return !1;
  }

  isEqual(t) {
    return _t(this.fields, t.fields, (t, e) => t.isEqual(e));
  }

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** Converts a Base64 encoded string to a binary string. */

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Immutable class that represents a "proto" byte string.
 *
 * Proto byte strings can either be Base64-encoded strings or Uint8Arrays when
 * sent on the wire. This class abstracts away this differentiation by holding
 * the proto byte string in a common class that must be converted into a string
 * before being sent as a proto.
 * @internal
 */


class At {
  constructor(t) {
    this.binaryString = t;
  }

  static fromBase64String(t) {
    const e = atob(t);
    return new At(e);
  }

  static fromUint8Array(t) {
    // TODO(indexing); Remove the copy of the byte string here as this method
    // is frequently called during indexing.
    const e =
    /**
    * Helper function to convert an Uint8array to a binary string.
    */
    function (t) {
      let e = "";

      for (let n = 0; n < t.length; ++n) e += String.fromCharCode(t[n]);

      return e;
    }
    /**
    * Helper function to convert a binary string to an Uint8Array.
    */
    (t);

    return new At(e);
  }

  [Symbol.iterator]() {
    let t = 0;
    return {
      next: () => t < this.binaryString.length ? {
        value: this.binaryString.charCodeAt(t++),
        done: !1
      } : {
        value: void 0,
        done: !0
      }
    };
  }

  toBase64() {
    return t = this.binaryString, btoa(t);
    /** Converts a binary string to a Base64 encoded string. */

    var t;
  }

  toUint8Array() {
    return function (t) {
      const e = new Uint8Array(t.length);

      for (let n = 0; n < t.length; n++) e[n] = t.charCodeAt(n);

      return e;
    }
    /**
    * @license
    * Copyright 2020 Google LLC
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *   http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    */
    // A RegExp matching ISO 8601 UTC timestamps with optional fraction.
    (this.binaryString);
  }

  approximateByteSize() {
    return 2 * this.binaryString.length;
  }

  compareTo(t) {
    return yt(this.binaryString, t.binaryString);
  }

  isEqual(t) {
    return this.binaryString === t.binaryString;
  }

}

At.EMPTY_BYTE_STRING = new At("");
const It = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
/**
 * Converts the possible Proto values for a timestamp value into a "seconds and
 * nanos" representation.
 */

function Rt(t) {
  // The json interface (for the browser) will return an iso timestamp string,
  // while the proto js library (for node) will return a
  // google.protobuf.Timestamp instance.
  if (b(!!t), "string" == typeof t) {
    // The date string can have higher precision (nanos) than the Date class
    // (millis), so we do some custom parsing here.
    // Parse the nanos right out of the string.
    let e = 0;
    const n = It.exec(t);

    if (b(!!n), n[1]) {
      // Pad the fraction out to 9 digits (nanos).
      let t = n[1];
      t = (t + "000000000").substr(0, 9), e = Number(t);
    } // Parse the date to get the seconds.


    const r = new Date(t);
    return {
      seconds: Math.floor(r.getTime() / 1e3),
      nanos: e
    };
  }

  return {
    seconds: Pt(t.seconds),
    nanos: Pt(t.nanos)
  };
}
/**
 * Converts the possible Proto types for numbers into a JavaScript number.
 * Returns 0 if the value is not numeric.
 */


function Pt(t) {
  // TODO(bjornick): Handle int64 greater than 53 bits.
  return "number" == typeof t ? t : "string" == typeof t ? Number(t) : 0;
}
/** Converts the possible Proto types for Blobs into a ByteString. */


function Vt(t) {
  return "string" == typeof t ? At.fromBase64String(t) : At.fromUint8Array(t);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Represents a locally-applied ServerTimestamp.
 *
 * Server Timestamps are backed by MapValues that contain an internal field
 * `__type__` with a value of `server_timestamp`. The previous value and local
 * write time are stored in its `__previous_value__` and `__local_write_time__`
 * fields respectively.
 *
 * Notes:
 * - ServerTimestampValue instances are created as the result of applying a
 *   transform. They can only exist in the local view of a document. Therefore
 *   they do not need to be parsed or serialized.
 * - When evaluated locally (e.g. for snapshot.data()), they by default
 *   evaluate to `null`. This behavior can be configured by passing custom
 *   FieldValueOptions to value().
 * - With respect to other ServerTimestampValues, they sort by their
 *   localWriteTime.
 */


function Dt(t) {
  var e, n;
  return "server_timestamp" === (null === (n = ((null === (e = null == t ? void 0 : t.mapValue) || void 0 === e ? void 0 : e.fields) || {}).__type__) || void 0 === n ? void 0 : n.stringValue);
}
/**
 * Returns the value of the field before this ServerTimestamp was set.
 *
 * Preserving the previous values allows the user to display the last resoled
 * value until the backend responds with the timestamp.
 */


function Nt(t) {
  const e = t.mapValue.fields.__previous_value__;
  return Dt(e) ? Nt(e) : e;
}
/**
 * Returns the local time at which this timestamp was first set.
 */


function $t(t) {
  const e = Rt(t.mapValue.fields.__local_write_time__.timestampValue);
  return new gt(e.seconds, e.nanos);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const St = {
  fields: {
    __type__: {
      stringValue: "__max__"
    }
  }
};
/** Extracts the backend's type order for the provided value. */

function xt(t) {
  return "nullValue" in t ? 0
  /* NullValue */
  : "booleanValue" in t ? 1
  /* BooleanValue */
  : "integerValue" in t || "doubleValue" in t ? 2
  /* NumberValue */
  : "timestampValue" in t ? 3
  /* TimestampValue */
  : "stringValue" in t ? 5
  /* StringValue */
  : "bytesValue" in t ? 6
  /* BlobValue */
  : "referenceValue" in t ? 7
  /* RefValue */
  : "geoPointValue" in t ? 8
  /* GeoPointValue */
  : "arrayValue" in t ? 9
  /* ArrayValue */
  : "mapValue" in t ? Dt(t) ? 4
  /* ServerTimestampValue */
  :
  /** Returns true if the Value represents the canonical {@link #MAX_VALUE} . */
  function (t) {
    return "__max__" === (((t.mapValue || {}).fields || {}).__type__ || {}).stringValue;
  }
  /**
  * @license
  * Copyright 2017 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

  /**
  * An ObjectValue represents a MapValue in the Firestore Proto and offers the
  * ability to add and remove fields (via the ObjectValueBuilder).
  */
  (t) ? 9007199254740991
  /* MaxValue */
  : 10
  /* ObjectValue */
  : g();
}
/** Tests `left` and `right` for equality based on the backend semantics. */


function Ft(t, e) {
  if (t === e) return !0;
  const n = xt(t);
  if (n !== xt(e)) return !1;

  switch (n) {
    case 0
    /* NullValue */
    :
    case 9007199254740991
    /* MaxValue */
    :
      return !0;

    case 1
    /* BooleanValue */
    :
      return t.booleanValue === e.booleanValue;

    case 4
    /* ServerTimestampValue */
    :
      return $t(t).isEqual($t(e));

    case 3
    /* TimestampValue */
    :
      return function (t, e) {
        if ("string" == typeof t.timestampValue && "string" == typeof e.timestampValue && t.timestampValue.length === e.timestampValue.length) // Use string equality for ISO 8601 timestamps
          return t.timestampValue === e.timestampValue;
        const n = Rt(t.timestampValue),
              r = Rt(e.timestampValue);
        return n.seconds === r.seconds && n.nanos === r.nanos;
      }(t, e);

    case 5
    /* StringValue */
    :
      return t.stringValue === e.stringValue;

    case 6
    /* BlobValue */
    :
      return function (t, e) {
        return Vt(t.bytesValue).isEqual(Vt(e.bytesValue));
      }(t, e);

    case 7
    /* RefValue */
    :
      return t.referenceValue === e.referenceValue;

    case 8
    /* GeoPointValue */
    :
      return function (t, e) {
        return Pt(t.geoPointValue.latitude) === Pt(e.geoPointValue.latitude) && Pt(t.geoPointValue.longitude) === Pt(e.geoPointValue.longitude);
      }(t, e);

    case 2
    /* NumberValue */
    :
      return function (t, e) {
        if ("integerValue" in t && "integerValue" in e) return Pt(t.integerValue) === Pt(e.integerValue);

        if ("doubleValue" in t && "doubleValue" in e) {
          const n = Pt(t.doubleValue),
                r = Pt(e.doubleValue);
          return n === r ? at(n) === at(r) : isNaN(n) && isNaN(r);
        }

        return !1;
      }(t, e);

    case 9
    /* ArrayValue */
    :
      return _t(t.arrayValue.values || [], e.arrayValue.values || [], Ft);

    case 10
    /* ObjectValue */
    :
      return function (t, e) {
        const n = t.mapValue.fields || {},
              r = e.mapValue.fields || {};
        if (vt(n) !== vt(r)) return !1;

        for (const t in n) if (n.hasOwnProperty(t) && (void 0 === r[t] || !Ft(n[t], r[t]))) return !1;

        return !0;
      }
      /** Returns true if the ArrayValue contains the specified element. */
      (t, e);

    default:
      return g();
  }
}

function qt(t, e) {
  return void 0 !== (t.values || []).find(t => Ft(t, e));
}

function Ot(t, e) {
  if (t === e) return 0;
  const n = xt(t),
        r = xt(e);
  if (n !== r) return yt(n, r);

  switch (n) {
    case 0
    /* NullValue */
    :
    case 9007199254740991
    /* MaxValue */
    :
      return 0;

    case 1
    /* BooleanValue */
    :
      return yt(t.booleanValue, e.booleanValue);

    case 2
    /* NumberValue */
    :
      return function (t, e) {
        const n = Pt(t.integerValue || t.doubleValue),
              r = Pt(e.integerValue || e.doubleValue);
        return n < r ? -1 : n > r ? 1 : n === r ? 0 : // one or both are NaN.
        isNaN(n) ? isNaN(r) ? 0 : -1 : 1;
      }(t, e);

    case 3
    /* TimestampValue */
    :
      return Ct(t.timestampValue, e.timestampValue);

    case 4
    /* ServerTimestampValue */
    :
      return Ct($t(t), $t(e));

    case 5
    /* StringValue */
    :
      return yt(t.stringValue, e.stringValue);

    case 6
    /* BlobValue */
    :
      return function (t, e) {
        const n = Vt(t),
              r = Vt(e);
        return n.compareTo(r);
      }(t.bytesValue, e.bytesValue);

    case 7
    /* RefValue */
    :
      return function (t, e) {
        const n = t.split("/"),
              r = e.split("/");

        for (let t = 0; t < n.length && t < r.length; t++) {
          const e = yt(n[t], r[t]);
          if (0 !== e) return e;
        }

        return yt(n.length, r.length);
      }(t.referenceValue, e.referenceValue);

    case 8
    /* GeoPointValue */
    :
      return function (t, e) {
        const n = yt(Pt(t.latitude), Pt(e.latitude));
        if (0 !== n) return n;
        return yt(Pt(t.longitude), Pt(e.longitude));
      }(t.geoPointValue, e.geoPointValue);

    case 9
    /* ArrayValue */
    :
      return function (t, e) {
        const n = t.values || [],
              r = e.values || [];

        for (let t = 0; t < n.length && t < r.length; ++t) {
          const e = Ot(n[t], r[t]);
          if (e) return e;
        }

        return yt(n.length, r.length);
      }(t.arrayValue, e.arrayValue);

    case 10
    /* ObjectValue */
    :
      return function (t, e) {
        if (t === St && e === St) return 0;
        if (t === St) return 1;
        if (e === St) return -1;
        const n = t.fields || {},
              r = Object.keys(n),
              s = e.fields || {},
              i = Object.keys(s); // Even though MapValues are likely sorted correctly based on their insertion
        // order (e.g. when received from the backend), local modifications can bring
        // elements out of order. We need to re-sort the elements to ensure that
        // canonical IDs are independent of insertion order.

        r.sort(), i.sort();

        for (let t = 0; t < r.length && t < i.length; ++t) {
          const e = yt(r[t], i[t]);
          if (0 !== e) return e;
          const o = Ot(n[r[t]], s[i[t]]);
          if (0 !== o) return o;
        }

        return yt(r.length, i.length);
      }
      /** Returns a reference value for the provided database and key. */
      (t.mapValue, e.mapValue);

    default:
      throw g();
  }
}

function Ct(t, e) {
  if ("string" == typeof t && "string" == typeof e && t.length === e.length) return yt(t, e);
  const n = Rt(t),
        r = Rt(e),
        s = yt(n.seconds, r.seconds);
  return 0 !== s ? s : yt(n.nanos, r.nanos);
}

function Lt(t, e) {
  return {
    referenceValue: `projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`
  };
}
/** Returns true if `value` is an ArrayValue. */


function Ut(t) {
  return !!t && "arrayValue" in t;
}
/** Returns true if `value` is a NullValue. */


function kt(t) {
  return !!t && "nullValue" in t;
}
/** Returns true if `value` is NaN. */


function jt(t) {
  return !!t && "doubleValue" in t && isNaN(Number(t.doubleValue));
}
/** Returns true if `value` is a MapValue. */


function Mt(t) {
  return !!t && "mapValue" in t;
}
/** Creates a deep copy of `source`. */


function Bt(t) {
  if (t.geoPointValue) return {
    geoPointValue: Object.assign({}, t.geoPointValue)
  };
  if (t.timestampValue && "object" == typeof t.timestampValue) return {
    timestampValue: Object.assign({}, t.timestampValue)
  };

  if (t.mapValue) {
    const e = {
      mapValue: {
        fields: {}
      }
    };
    return Et(t.mapValue.fields, (t, n) => e.mapValue.fields[t] = Bt(n)), e;
  }

  if (t.arrayValue) {
    const e = {
      arrayValue: {
        values: []
      }
    };

    for (let n = 0; n < (t.arrayValue.values || []).length; ++n) e.arrayValue.values[n] = Bt(t.arrayValue.values[n]);

    return e;
  }

  return Object.assign({}, t);
}

class zt {
  constructor(t) {
    this.value = t;
  }

  static empty() {
    return new zt({
      mapValue: {}
    });
  }
  /**
   * Returns the value at the given path or null.
   *
   * @param path - the path to search
   * @returns The value at the path or null if the path is not set.
   */


  field(t) {
    if (t.isEmpty()) return this.value;
    {
      let e = this.value;

      for (let n = 0; n < t.length - 1; ++n) if (e = (e.mapValue.fields || {})[t.get(n)], !Mt(e)) return null;

      return e = (e.mapValue.fields || {})[t.lastSegment()], e || null;
    }
  }
  /**
   * Sets the field to the provided value.
   *
   * @param path - The field path to set.
   * @param value - The value to set.
   */


  set(t, e) {
    this.getFieldsMap(t.popLast())[t.lastSegment()] = Bt(e);
  }
  /**
   * Sets the provided fields to the provided values.
   *
   * @param data - A map of fields to values (or null for deletes).
   */


  setAll(t) {
    let e = tt.emptyPath(),
        n = {},
        r = [];
    t.forEach((t, s) => {
      if (!e.isImmediateParentOf(s)) {
        // Insert the accumulated changes at this parent location
        const t = this.getFieldsMap(e);
        this.applyChanges(t, n, r), n = {}, r = [], e = s.popLast();
      }

      t ? n[s.lastSegment()] = Bt(t) : r.push(s.lastSegment());
    });
    const s = this.getFieldsMap(e);
    this.applyChanges(s, n, r);
  }
  /**
   * Removes the field at the specified path. If there is no field at the
   * specified path, nothing is changed.
   *
   * @param path - The field path to remove.
   */


  delete(t) {
    const e = this.field(t.popLast());
    Mt(e) && e.mapValue.fields && delete e.mapValue.fields[t.lastSegment()];
  }

  isEqual(t) {
    return Ft(this.value, t.value);
  }
  /**
   * Returns the map that contains the leaf element of `path`. If the parent
   * entry does not yet exist, or if it is not a map, a new map will be created.
   */


  getFieldsMap(t) {
    let e = this.value;
    e.mapValue.fields || (e.mapValue = {
      fields: {}
    });

    for (let n = 0; n < t.length; ++n) {
      let r = e.mapValue.fields[t.get(n)];
      Mt(r) && r.mapValue.fields || (r = {
        mapValue: {
          fields: {}
        }
      }, e.mapValue.fields[t.get(n)] = r), e = r;
    }

    return e.mapValue.fields;
  }
  /**
   * Modifies `fieldsMap` by adding, replacing or deleting the specified
   * entries.
   */


  applyChanges(t, e, n) {
    Et(e, (e, n) => t[e] = n);

    for (const e of n) delete t[e];
  }

  clone() {
    return new zt(Bt(this.value));
  }

}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Represents a document in Firestore with a key, version, data and whether it
 * has local mutations applied to it.
 *
 * Documents can transition between states via `convertToFoundDocument()`,
 * `convertToNoDocument()` and `convertToUnknownDocument()`. If a document does
 * not transition to one of these states even after all mutations have been
 * applied, `isValidDocument()` returns false and the document should be removed
 * from all views.
 */


class Gt {
  constructor(t, e, n, r, s, i) {
    this.key = t, this.documentType = e, this.version = n, this.readTime = r, this.data = s, this.documentState = i;
  }
  /**
   * Creates a document with no known version or data, but which can serve as
   * base document for mutations.
   */


  static newInvalidDocument(t) {
    return new Gt(t, 0
    /* INVALID */
    , bt.min(), bt.min(), zt.empty(), 0
    /* SYNCED */
    );
  }
  /**
   * Creates a new document that is known to exist with the given data at the
   * given version.
   */


  static newFoundDocument(t, e, n) {
    return new Gt(t, 1
    /* FOUND_DOCUMENT */
    , e, bt.min(), n, 0
    /* SYNCED */
    );
  }
  /** Creates a new document that is known to not exist at the given version. */


  static newNoDocument(t, e) {
    return new Gt(t, 2
    /* NO_DOCUMENT */
    , e, bt.min(), zt.empty(), 0
    /* SYNCED */
    );
  }
  /**
   * Creates a new document that is known to exist at the given version but
   * whose data is not known (e.g. a document that was updated without a known
   * base document).
   */


  static newUnknownDocument(t, e) {
    return new Gt(t, 3
    /* UNKNOWN_DOCUMENT */
    , e, bt.min(), zt.empty(), 2
    /* HAS_COMMITTED_MUTATIONS */
    );
  }
  /**
   * Changes the document type to indicate that it exists and that its version
   * and data are known.
   */


  convertToFoundDocument(t, e) {
    return this.version = t, this.documentType = 1
    /* FOUND_DOCUMENT */
    , this.data = e, this.documentState = 0
    /* SYNCED */
    , this;
  }
  /**
   * Changes the document type to indicate that it doesn't exist at the given
   * version.
   */


  convertToNoDocument(t) {
    return this.version = t, this.documentType = 2
    /* NO_DOCUMENT */
    , this.data = zt.empty(), this.documentState = 0
    /* SYNCED */
    , this;
  }
  /**
   * Changes the document type to indicate that it exists at a given version but
   * that its data is not known (e.g. a document that was updated without a known
   * base document).
   */


  convertToUnknownDocument(t) {
    return this.version = t, this.documentType = 3
    /* UNKNOWN_DOCUMENT */
    , this.data = zt.empty(), this.documentState = 2
    /* HAS_COMMITTED_MUTATIONS */
    , this;
  }

  setHasCommittedMutations() {
    return this.documentState = 2
    /* HAS_COMMITTED_MUTATIONS */
    , this;
  }

  setHasLocalMutations() {
    return this.documentState = 1
    /* HAS_LOCAL_MUTATIONS */
    , this;
  }

  setReadTime(t) {
    return this.readTime = t, this;
  }

  get hasLocalMutations() {
    return 1
    /* HAS_LOCAL_MUTATIONS */
    === this.documentState;
  }

  get hasCommittedMutations() {
    return 2
    /* HAS_COMMITTED_MUTATIONS */
    === this.documentState;
  }

  get hasPendingWrites() {
    return this.hasLocalMutations || this.hasCommittedMutations;
  }

  isValidDocument() {
    return 0
    /* INVALID */
    !== this.documentType;
  }

  isFoundDocument() {
    return 1
    /* FOUND_DOCUMENT */
    === this.documentType;
  }

  isNoDocument() {
    return 2
    /* NO_DOCUMENT */
    === this.documentType;
  }

  isUnknownDocument() {
    return 3
    /* UNKNOWN_DOCUMENT */
    === this.documentType;
  }

  isEqual(t) {
    return t instanceof Gt && this.key.isEqual(t.key) && this.version.isEqual(t.version) && this.documentType === t.documentType && this.documentState === t.documentState && this.data.isEqual(t.data);
  }

  mutableCopy() {
    return new Gt(this.key, this.documentType, this.version, this.readTime, this.data.clone(), this.documentState);
  }

  toString() {
    return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`;
  }

}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Visible for testing


class Qt {
  constructor(t, e = null, n = [], r = [], s = null, i = null, o = null) {
    this.path = t, this.collectionGroup = e, this.orderBy = n, this.filters = r, this.limit = s, this.startAt = i, this.endAt = o, this.P = null;
  }

}
/**
 * Initializes a Target with a path and optional additional query constraints.
 * Path must currently be empty if this is a collection group query.
 *
 * NOTE: you should always construct `Target` from `Query.toTarget` instead of
 * using this factory method, because `Query` provides an implicit `orderBy`
 * property.
 */


function Wt(t, e = null, n = [], r = [], s = null, i = null, o = null) {
  return new Qt(t, e, n, r, s, i, o);
}

class Yt extends class {} {
  constructor(t, e, n) {
    super(), this.field = t, this.op = e, this.value = n;
  }
  /**
   * Creates a filter based on the provided arguments.
   */


  static create(t, e, n) {
    return t.isKeyField() ? "in"
    /* IN */
    === e || "not-in"
    /* NOT_IN */
    === e ? this.V(t, e, n) : new Ht(t, e, n) : "array-contains"
    /* ARRAY_CONTAINS */
    === e ? new Zt(t, n) : "in"
    /* IN */
    === e ? new te(t, n) : "not-in"
    /* NOT_IN */
    === e ? new ee(t, n) : "array-contains-any"
    /* ARRAY_CONTAINS_ANY */
    === e ? new ne(t, n) : new Yt(t, e, n);
  }

  static V(t, e, n) {
    return "in"
    /* IN */
    === e ? new Kt(t, n) : new Jt(t, n);
  }

  matches(t) {
    const e = t.data.field(this.field); // Types do not have to match in NOT_EQUAL filters.

    return "!="
    /* NOT_EQUAL */
    === this.op ? null !== e && this.D(Ot(e, this.value)) : null !== e && xt(this.value) === xt(e) && this.D(Ot(e, this.value)); // Only compare types with matching backend order (such as double and int).
  }

  D(t) {
    switch (this.op) {
      case "<"
      /* LESS_THAN */
      :
        return t < 0;

      case "<="
      /* LESS_THAN_OR_EQUAL */
      :
        return t <= 0;

      case "=="
      /* EQUAL */
      :
        return 0 === t;

      case "!="
      /* NOT_EQUAL */
      :
        return 0 !== t;

      case ">"
      /* GREATER_THAN */
      :
        return t > 0;

      case ">="
      /* GREATER_THAN_OR_EQUAL */
      :
        return t >= 0;

      default:
        return g();
    }
  }

  N() {
    return ["<"
    /* LESS_THAN */
    , "<="
    /* LESS_THAN_OR_EQUAL */
    , ">"
    /* GREATER_THAN */
    , ">="
    /* GREATER_THAN_OR_EQUAL */
    , "!="
    /* NOT_EQUAL */
    , "not-in"
    /* NOT_IN */
    ].indexOf(this.op) >= 0;
  }

}
/** Filter that matches on key fields (i.e. '__name__'). */


class Ht extends Yt {
  constructor(t, e, n) {
    super(t, e, n), this.key = et.fromName(n.referenceValue);
  }

  matches(t) {
    const e = et.comparator(t.key, this.key);
    return this.D(e);
  }

}
/** Filter that matches on key fields within an array. */


class Kt extends Yt {
  constructor(t, e) {
    super(t, "in"
    /* IN */
    , e), this.keys = Xt("in"
    /* IN */
    , e);
  }

  matches(t) {
    return this.keys.some(e => e.isEqual(t.key));
  }

}
/** Filter that matches on key fields not present within an array. */


class Jt extends Yt {
  constructor(t, e) {
    super(t, "not-in"
    /* NOT_IN */
    , e), this.keys = Xt("not-in"
    /* NOT_IN */
    , e);
  }

  matches(t) {
    return !this.keys.some(e => e.isEqual(t.key));
  }

}

function Xt(t, e) {
  var n;
  return ((null === (n = e.arrayValue) || void 0 === n ? void 0 : n.values) || []).map(t => et.fromName(t.referenceValue));
}
/** A Filter that implements the array-contains operator. */


class Zt extends Yt {
  constructor(t, e) {
    super(t, "array-contains"
    /* ARRAY_CONTAINS */
    , e);
  }

  matches(t) {
    const e = t.data.field(this.field);
    return Ut(e) && qt(e.arrayValue, this.value);
  }

}
/** A Filter that implements the IN operator. */


class te extends Yt {
  constructor(t, e) {
    super(t, "in"
    /* IN */
    , e);
  }

  matches(t) {
    const e = t.data.field(this.field);
    return null !== e && qt(this.value.arrayValue, e);
  }

}
/** A Filter that implements the not-in operator. */


class ee extends Yt {
  constructor(t, e) {
    super(t, "not-in"
    /* NOT_IN */
    , e);
  }

  matches(t) {
    if (qt(this.value.arrayValue, {
      nullValue: "NULL_VALUE"
    })) return !1;
    const e = t.data.field(this.field);
    return null !== e && !qt(this.value.arrayValue, e);
  }

}
/** A Filter that implements the array-contains-any operator. */


class ne extends Yt {
  constructor(t, e) {
    super(t, "array-contains-any"
    /* ARRAY_CONTAINS_ANY */
    , e);
  }

  matches(t) {
    const e = t.data.field(this.field);
    return !(!Ut(e) || !e.arrayValue.values) && e.arrayValue.values.some(t => qt(this.value.arrayValue, t));
  }

}
/**
 * Represents a bound of a query.
 *
 * The bound is specified with the given components representing a position and
 * whether it's just before or just after the position (relative to whatever the
 * query order is).
 *
 * The position represents a logical index position for a query. It's a prefix
 * of values for the (potentially implicit) order by clauses of a query.
 *
 * Bound provides a function to determine whether a document comes before or
 * after a bound. This is influenced by whether the position is just before or
 * just after the provided values.
 */


class re {
  constructor(t, e) {
    this.position = t, this.inclusive = e;
  }

}
/**
 * An ordering on a field, in some Direction. Direction defaults to ASCENDING.
 */


class se {
  constructor(t, e = "asc"
  /* ASCENDING */
  ) {
    this.field = t, this.dir = e;
  }

}

function ie(t, e) {
  return t.dir === e.dir && t.field.isEqual(e.field);
}

function oe(t, e) {
  if (null === t) return null === e;
  if (null === e) return !1;
  if (t.inclusive !== e.inclusive || t.position.length !== e.position.length) return !1;

  for (let n = 0; n < t.position.length; n++) {
    if (!Ft(t.position[n], e.position[n])) return !1;
  }

  return !0;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Query encapsulates all the query attributes we support in the SDK. It can
 * be run against the LocalStore, as well as be converted to a `Target` to
 * query the RemoteStore results.
 *
 * Visible for testing.
 */


class ue {
  /**
   * Initializes a Query with a path and optional additional query constraints.
   * Path must currently be empty if this is a collection group query.
   */
  constructor(t, e = null, n = [], r = [], s = null, i = "F"
  /* First */
  , o = null, u = null) {
    this.path = t, this.collectionGroup = e, this.explicitOrderBy = n, this.filters = r, this.limit = s, this.limitType = i, this.startAt = o, this.endAt = u, this.$ = null, // The corresponding `Target` of this `Query` instance.
    this.S = null, this.startAt, this.endAt;
  }

}
/** Creates a new Query for a query that matches all documents at `path` */


function ce(t) {
  return t.explicitOrderBy.length > 0 ? t.explicitOrderBy[0].field : null;
}

function ae(t) {
  for (const e of t.filters) if (e.N()) return e.field;

  return null;
}
/**
 * Checks if any of the provided Operators are included in the query and
 * returns the first one that is, or null if none are.
 */

/**
 * Returns whether the query matches a collection group rather than a specific
 * collection.
 */


function he(t) {
  return null !== t.collectionGroup;
}
/**
 * Returns the implicit order by constraint that is used to execute the Query,
 * which can be different from the order by constraints the user provided (e.g.
 * the SDK and backend always orders by `__name__`).
 */


function le(t) {
  const e = v(t);

  if (null === e.$) {
    e.$ = [];
    const t = ae(e),
          n = ce(e);
    if (null !== t && null === n) // In order to implicitly add key ordering, we must also add the
      // inequality filter field for it to be a valid query.
      // Note that the default inequality field and key ordering is ascending.
      t.isKeyField() || e.$.push(new se(t)), e.$.push(new se(tt.keyField(), "asc"
      /* ASCENDING */
      ));else {
      let t = !1;

      for (const n of e.explicitOrderBy) e.$.push(n), n.field.isKeyField() && (t = !0);

      if (!t) {
        // The order of the implicit key ordering always matches the last
        // explicit order by
        const t = e.explicitOrderBy.length > 0 ? e.explicitOrderBy[e.explicitOrderBy.length - 1].dir : "asc"
        /* ASCENDING */
        ;
        e.$.push(new se(tt.keyField(), t));
      }
    }
  }

  return e.$;
}
/**
 * Converts this `Query` instance to it's corresponding `Target` representation.
 */


function fe(t) {
  const e = v(t);
  if (!e.S) if ("F"
  /* First */
  === e.limitType) e.S = Wt(e.path, e.collectionGroup, le(e), e.filters, e.limit, e.startAt, e.endAt);else {
    // Flip the orderBy directions since we want the last results
    const t = [];

    for (const n of le(e)) {
      const e = "desc"
      /* DESCENDING */
      === n.dir ? "asc"
      /* ASCENDING */
      : "desc"
      /* DESCENDING */
      ;
      t.push(new se(n.field, e));
    } // We need to swap the cursors to match the now-flipped query ordering.


    const n = e.endAt ? new re(e.endAt.position, e.endAt.inclusive) : null,
          r = e.startAt ? new re(e.startAt.position, e.startAt.inclusive) : null; // Now return as a LimitType.First query.

    e.S = Wt(e.path, e.collectionGroup, t, e.filters, e.limit, n, r);
  }
  return e.S;
}

function de(t, e) {
  return function (t, e) {
    if (t.limit !== e.limit) return !1;
    if (t.orderBy.length !== e.orderBy.length) return !1;

    for (let n = 0; n < t.orderBy.length; n++) if (!ie(t.orderBy[n], e.orderBy[n])) return !1;

    if (t.filters.length !== e.filters.length) return !1;

    for (let s = 0; s < t.filters.length; s++) if (n = t.filters[s], r = e.filters[s], n.op !== r.op || !n.field.isEqual(r.field) || !Ft(n.value, r.value)) return !1;

    var n, r;
    return t.collectionGroup === e.collectionGroup && !!t.path.isEqual(e.path) && !!oe(t.startAt, e.startAt) && oe(t.endAt, e.endAt);
  }(fe(t), fe(e)) && t.limitType === e.limitType;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns an DoubleValue for `value` that is encoded based the serializer's
 * `useProto3Json` setting.
 */

/**
 * Returns a value for a number that's appropriate to put into a proto.
 * The return value is an IntegerValue if it can safely represent the value,
 * otherwise a DoubleValue is returned.
 */


function we(t, e) {
  return function (t) {
    return "number" == typeof t && Number.isInteger(t) && !at(t) && t <= Number.MAX_SAFE_INTEGER && t >= Number.MIN_SAFE_INTEGER;
  }(e) ?
  /**
  * Returns an IntegerValue for `value`.
  */
  function (t) {
    return {
      integerValue: "" + t
    };
  }(e) : function (t, e) {
    if (t.F) {
      if (isNaN(e)) return {
        doubleValue: "NaN"
      };
      if (e === 1 / 0) return {
        doubleValue: "Infinity"
      };
      if (e === -1 / 0) return {
        doubleValue: "-Infinity"
      };
    }

    return {
      doubleValue: at(e) ? "-0" : e
    };
  }(t, e);
}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** Used to represent a field transform on a mutation. */


class me {
  constructor() {
    // Make sure that the structural type of `TransformOperation` is unique.
    // See https://github.com/microsoft/TypeScript/issues/5451
    this._ = void 0;
  }

}
/** Transforms a value into a server-generated timestamp. */


class pe extends me {}
/** Transforms an array value via a union operation. */


class ye extends me {
  constructor(t) {
    super(), this.elements = t;
  }

}
/** Transforms an array value via a remove operation. */


class _e extends me {
  constructor(t) {
    super(), this.elements = t;
  }

}
/**
 * Implements the backend semantics for locally computed NUMERIC_ADD (increment)
 * transforms. Converts all field values to integers or doubles, but unlike the
 * backend does not cap integer values at 2^63. Instead, JavaScript number
 * arithmetic is used and precision loss can occur for values greater than 2^53.
 */


class ge extends me {
  constructor(t, e) {
    super(), this.q = t, this.O = e;
  }

}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** A field path and the TransformOperation to perform upon it. */


class be {
  constructor(t, e) {
    this.field = t, this.transform = e;
  }

}
/**
 * Encodes a precondition for a mutation. This follows the model that the
 * backend accepts with the special case of an explicit "empty" precondition
 * (meaning no precondition).
 */


class ve {
  constructor(t, e) {
    this.updateTime = t, this.exists = e;
  }
  /** Creates a new empty Precondition. */


  static none() {
    return new ve();
  }
  /** Creates a new Precondition with an exists flag. */


  static exists(t) {
    return new ve(void 0, t);
  }
  /** Creates a new Precondition based on a version a document exists at. */


  static updateTime(t) {
    return new ve(t);
  }
  /** Returns whether this Precondition is empty. */


  get isNone() {
    return void 0 === this.updateTime && void 0 === this.exists;
  }

  isEqual(t) {
    return this.exists === t.exists && (this.updateTime ? !!t.updateTime && this.updateTime.isEqual(t.updateTime) : !t.updateTime);
  }

}
/**
 * A mutation describes a self-contained change to a document. Mutations can
 * create, replace, delete, and update subsets of documents.
 *
 * Mutations not only act on the value of the document but also its version.
 *
 * For local mutations (mutations that haven't been committed yet), we preserve
 * the existing version for Set and Patch mutations. For Delete mutations, we
 * reset the version to 0.
 *
 * Here's the expected transition table.
 *
 * MUTATION           APPLIED TO            RESULTS IN
 *
 * SetMutation        Document(v3)          Document(v3)
 * SetMutation        NoDocument(v3)        Document(v0)
 * SetMutation        InvalidDocument(v0)   Document(v0)
 * PatchMutation      Document(v3)          Document(v3)
 * PatchMutation      NoDocument(v3)        NoDocument(v3)
 * PatchMutation      InvalidDocument(v0)   UnknownDocument(v3)
 * DeleteMutation     Document(v3)          NoDocument(v0)
 * DeleteMutation     NoDocument(v3)        NoDocument(v0)
 * DeleteMutation     InvalidDocument(v0)   NoDocument(v0)
 *
 * For acknowledged mutations, we use the updateTime of the WriteResponse as
 * the resulting version for Set and Patch mutations. As deletes have no
 * explicit update time, we use the commitTime of the WriteResponse for
 * Delete mutations.
 *
 * If a mutation is acknowledged by the backend but fails the precondition check
 * locally, we transition to an `UnknownDocument` and rely on Watch to send us
 * the updated version.
 *
 * Field transforms are used only with Patch and Set Mutations. We use the
 * `updateTransforms` message to store transforms, rather than the `transforms`s
 * messages.
 *
 * ## Subclassing Notes
 *
 * Every type of mutation needs to implement its own applyToRemoteDocument() and
 * applyToLocalView() to implement the actual behavior of applying the mutation
 * to some source document (see `setMutationApplyToRemoteDocument()` for an
 * example).
 */


class Ee {}
/**
 * A mutation that creates or replaces the document at the given key with the
 * object value contents.
 */


class Te extends Ee {
  constructor(t, e, n, r = []) {
    super(), this.key = t, this.value = e, this.precondition = n, this.fieldTransforms = r, this.type = 0
    /* Set */
    ;
  }

}
/**
 * A mutation that modifies fields of the document at the given key with the
 * given values. The values are applied through a field mask:
 *
 *  * When a field is in both the mask and the values, the corresponding field
 *    is updated.
 *  * When a field is in neither the mask nor the values, the corresponding
 *    field is unmodified.
 *  * When a field is in the mask but not in the values, the corresponding field
 *    is deleted.
 *  * When a field is not in the mask but is in the values, the values map is
 *    ignored.
 */


class Ae extends Ee {
  constructor(t, e, n, r, s = []) {
    super(), this.key = t, this.data = e, this.fieldMask = n, this.precondition = r, this.fieldTransforms = s, this.type = 1
    /* Patch */
    ;
  }

}
/** A mutation that deletes the document at the given key. */


class Ie extends Ee {
  constructor(t, e) {
    super(), this.key = t, this.precondition = e, this.type = 2
    /* Delete */
    , this.fieldTransforms = [];
  }

}
/**
 * A mutation that verifies the existence of the document at the given key with
 * the provided precondition.
 *
 * The `verify` operation is only used in Transactions, and this class serves
 * primarily to facilitate serialization into protos.
 */


class Re extends Ee {
  constructor(t, e) {
    super(), this.key = t, this.precondition = e, this.type = 3
    /* Verify */
    , this.fieldTransforms = [];
  }

}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const Pe = (() => {
  const t = {
    asc: "ASCENDING",
    desc: "DESCENDING"
  };
  return t;
})(),
      Ve = (() => {
  const t = {
    "<": "LESS_THAN",
    "<=": "LESS_THAN_OR_EQUAL",
    ">": "GREATER_THAN",
    ">=": "GREATER_THAN_OR_EQUAL",
    "==": "EQUAL",
    "!=": "NOT_EQUAL",
    "array-contains": "ARRAY_CONTAINS",
    in: "IN",
    "not-in": "NOT_IN",
    "array-contains-any": "ARRAY_CONTAINS_ANY"
  };
  return t;
})();
/**
 * This class generates JsonObject values for the Datastore API suitable for
 * sending to either GRPC stub methods or via the JSON/HTTP REST API.
 *
 * The serializer supports both Protobuf.js and Proto3 JSON formats. By
 * setting `useProto3Json` to true, the serializer will use the Proto3 JSON
 * format.
 *
 * For a description of the Proto3 JSON format check
 * https://developers.google.com/protocol-buffers/docs/proto3#json
 *
 * TODO(klimt): We can remove the databaseId argument if we keep the full
 * resource name in documents.
 */


class De {
  constructor(t, e) {
    this.databaseId = t, this.F = e;
  }

}
/**
 * Returns a value for a number (or null) that's appropriate to put into
 * a google.protobuf.Int32Value proto.
 * DO NOT USE THIS FOR ANYTHING ELSE.
 * This method cheats. It's typed as returning "number" because that's what
 * our generated proto interfaces say Int32Value must be. But GRPC actually
 * expects a { value: <number> } struct.
 */

/**
 * Returns a value for a Date that's appropriate to put into a proto.
 */


function Ne(t, e) {
  if (t.F) {
    return `${new Date(1e3 * e.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "")}.${("000000000" + e.nanoseconds).slice(-9)}Z`;
  }

  return {
    seconds: "" + e.seconds,
    nanos: e.nanoseconds
  };
}
/**
 * Returns a value for bytes that's appropriate to put in a proto.
 *
 * Visible for testing.
 */


function $e(t, e) {
  return t.F ? e.toBase64() : e.toUint8Array();
}

function Se(t, e) {
  return Ne(t, e.toTimestamp());
}

function xe(t) {
  return b(!!t), bt.fromTimestamp(function (t) {
    const e = Rt(t);
    return new gt(e.seconds, e.nanos);
  }(t));
}

function Fe(t, e) {
  return function (t) {
    return new X(["projects", t.projectId, "databases", t.database]);
  }(t).child("documents").child(e).canonicalString();
}

function qe(t, e) {
  return Fe(t.databaseId, e.path);
}

function Oe(t, e) {
  const n = function (t) {
    const e = X.fromString(t);
    return b(We(e)), e;
  }(e);

  if (n.get(1) !== t.databaseId.projectId) throw new U(I, "Tried to deserialize key from different project: " + n.get(1) + " vs " + t.databaseId.projectId);
  if (n.get(3) !== t.databaseId.database) throw new U(I, "Tried to deserialize key from different database: " + n.get(3) + " vs " + t.databaseId.database);
  return new et((b((r = n).length > 4 && "documents" === r.get(4)), r.popFirst(5)));
  var r;
  /** Creates a Document proto from key and fields (but no create/update time) */
}

function Ce(t, e) {
  return Fe(t.databaseId, e);
}

function Le(t) {
  return new X(["projects", t.databaseId.projectId, "databases", t.databaseId.database]).canonicalString();
}

function Ue(t, e, n) {
  return {
    name: qe(t, e),
    fields: n.value.mapValue.fields
  };
}

function ke(t, e) {
  return "found" in e ? function (t, e) {
    b(!!e.found), e.found.name, e.found.updateTime;
    const n = Oe(t, e.found.name),
          r = xe(e.found.updateTime),
          s = new zt({
      mapValue: {
        fields: e.found.fields
      }
    });
    return Gt.newFoundDocument(n, r, s);
  }(t, e) : "missing" in e ? function (t, e) {
    b(!!e.missing), b(!!e.readTime);
    const n = Oe(t, e.missing),
          r = xe(e.readTime);
    return Gt.newNoDocument(n, r);
  }(t, e) : g();
}

function je(t, e) {
  let n;
  if (e instanceof Te) n = {
    update: Ue(t, e.key, e.value)
  };else if (e instanceof Ie) n = {
    delete: qe(t, e.key)
  };else if (e instanceof Ae) n = {
    update: Ue(t, e.key, e.data),
    updateMask: Qe(e.fieldMask)
  };else {
    if (!(e instanceof Re)) return g();
    n = {
      verify: qe(t, e.key)
    };
  }
  return e.fieldTransforms.length > 0 && (n.updateTransforms = e.fieldTransforms.map(t => function (t, e) {
    const n = e.transform;
    if (n instanceof pe) return {
      fieldPath: e.field.canonicalString(),
      setToServerValue: "REQUEST_TIME"
    };
    if (n instanceof ye) return {
      fieldPath: e.field.canonicalString(),
      appendMissingElements: {
        values: n.elements
      }
    };
    if (n instanceof _e) return {
      fieldPath: e.field.canonicalString(),
      removeAllFromArray: {
        values: n.elements
      }
    };
    if (n instanceof ge) return {
      fieldPath: e.field.canonicalString(),
      increment: n.O
    };
    throw g();
  }(0, t))), e.precondition.isNone || (n.currentDocument = function (t, e) {
    return void 0 !== e.updateTime ? {
      updateTime: Se(t, e.updateTime)
    } : void 0 !== e.exists ? {
      exists: e.exists
    } : g();
  }(t, e.precondition)), n;
}

function Me(t, e) {
  // Dissect the path into parent, collectionId, and optional key filter.
  const n = {
    structuredQuery: {}
  },
        r = e.path;
  null !== e.collectionGroup ? (n.parent = Ce(t, r), n.structuredQuery.from = [{
    collectionId: e.collectionGroup,
    allDescendants: !0
  }]) : (n.parent = Ce(t, r.popLast()), n.structuredQuery.from = [{
    collectionId: r.lastSegment()
  }]);

  const s = function (t) {
    if (0 === t.length) return;
    const e = t.map(t => // visible for testing
    function (t) {
      if ("=="
      /* EQUAL */
      === t.op) {
        if (jt(t.value)) return {
          unaryFilter: {
            field: Ge(t.field),
            op: "IS_NAN"
          }
        };
        if (kt(t.value)) return {
          unaryFilter: {
            field: Ge(t.field),
            op: "IS_NULL"
          }
        };
      } else if ("!="
      /* NOT_EQUAL */
      === t.op) {
        if (jt(t.value)) return {
          unaryFilter: {
            field: Ge(t.field),
            op: "IS_NOT_NAN"
          }
        };
        if (kt(t.value)) return {
          unaryFilter: {
            field: Ge(t.field),
            op: "IS_NOT_NULL"
          }
        };
      }

      return {
        fieldFilter: {
          field: Ge(t.field),
          op: ze(t.op),
          value: t.value
        }
      };
    }(t));
    if (1 === e.length) return e[0];
    return {
      compositeFilter: {
        op: "AND",
        filters: e
      }
    };
  }(e.filters);

  s && (n.structuredQuery.where = s);

  const i = function (t) {
    if (0 === t.length) return;
    return t.map(t => // visible for testing
    function (t) {
      return {
        field: Ge(t.field),
        direction: Be(t.dir)
      };
    }(t));
  }(e.orderBy);

  i && (n.structuredQuery.orderBy = i);

  const o = function (t, e) {
    return t.F || ct(e) ? e : {
      value: e
    };
  }(t, e.limit);

  var u;
  return null !== o && (n.structuredQuery.limit = o), e.startAt && (n.structuredQuery.startAt = {
    before: (u = e.startAt).inclusive,
    values: u.position
  }), e.endAt && (n.structuredQuery.endAt = function (t) {
    return {
      before: !t.inclusive,
      values: t.position
    };
  } // visible for testing
  (e.endAt)), n;
}

function Be(t) {
  return Pe[t];
} // visible for testing


function ze(t) {
  return Ve[t];
}

function Ge(t) {
  return {
    fieldPath: t.canonicalString()
  };
}

function Qe(t) {
  const e = [];
  return t.fields.forEach(t => e.push(t.canonicalString())), {
    fieldPaths: e
  };
}

function We(t) {
  // Resource names have at least 4 components (project ID, database ID)
  return t.length >= 4 && "projects" === t.get(0) && "databases" === t.get(2);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function Ye(t) {
  return new De(t,
  /* useProto3Json= */
  !0);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A helper for running delayed tasks following an exponential backoff curve
 * between attempts.
 *
 * Each delay is made up of a "base" delay which follows the exponential
 * backoff curve, and a +/- 50% "jitter" that is calculated and added to the
 * base delay. This prevents clients from accidentally synchronizing their
 * delays causing spikes of load to the backend.
 */


class He {
  constructor(
  /**
   * The AsyncQueue to run backoff operations on.
   */
  t,
  /**
   * The ID to use when scheduling backoff operations on the AsyncQueue.
   */
  e,
  /**
   * The initial delay (used as the base delay on the first retry attempt).
   * Note that jitter will still be applied, so the actual delay could be as
   * little as 0.5*initialDelayMs.
   */
  n = 1e3
  /**
   * The multiplier to use to determine the extended base delay after each
   * attempt.
   */
  , r = 1.5
  /**
   * The maximum base delay after which no further backoff is performed.
   * Note that jitter will still be applied, so the actual delay could be as
   * much as 1.5*maxDelayMs.
   */
  , s = 6e4) {
    this.C = t, this.timerId = e, this.L = n, this.U = r, this.k = s, this.j = 0, this.M = null,
    /** The last backoff attempt, as epoch milliseconds. */
    this.B = Date.now(), this.reset();
  }
  /**
   * Resets the backoff delay.
   *
   * The very next backoffAndWait() will have no delay. If it is called again
   * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
   * subsequent ones will increase according to the backoffFactor.
   */


  reset() {
    this.j = 0;
  }
  /**
   * Resets the backoff delay to the maximum delay (e.g. for use after a
   * RESOURCE_EXHAUSTED error).
   */


  G() {
    this.j = this.k;
  }
  /**
   * Returns a promise that resolves after currentDelayMs, and increases the
   * delay for any subsequent attempts. If there was a pending backoff operation
   * already, it will be canceled.
   */


  W(t) {
    // Cancel any pending backoff operation.
    this.cancel(); // First schedule using the current base (which may be 0 and should be
    // honored as such).

    const e = Math.floor(this.j + this.Y()),
          n = Math.max(0, Date.now() - this.B),
          r = Math.max(0, e - n); // Guard against lastAttemptTime being in the future due to a clock change.

    r > 0 && m("ExponentialBackoff", `Backing off for ${r} ms (base delay: ${this.j} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`), this.M = this.C.enqueueAfterDelay(this.timerId, r, () => (this.B = Date.now(), t())), // Apply backoff factor to determine next delay and ensure it is within
    // bounds.
    this.j *= this.U, this.j < this.L && (this.j = this.L), this.j > this.k && (this.j = this.k);
  }

  H() {
    null !== this.M && (this.M.skipDelay(), this.M = null);
  }

  cancel() {
    null !== this.M && (this.M.cancel(), this.M = null);
  }
  /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */


  Y() {
    return (Math.random() - .5) * this.j;
  }

}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Datastore and its related methods are a wrapper around the external Google
 * Cloud Datastore grpc API, which provides an interface that is more convenient
 * for the rest of the client SDK architecture to consume.
 */

/**
 * An implementation of Datastore that exposes additional state for internal
 * consumption.
 */


class Ke extends class {} {
  constructor(t, e, n, r) {
    super(), this.authCredentials = t, this.appCheckCredentials = e, this.K = n, this.q = r, this.J = !1;
  }

  X() {
    if (this.J) throw new U(S, "The client has already been terminated.");
  }
  /** Invokes the provided RPC with auth and AppCheck tokens. */


  m(t, e, n) {
    return this.X(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then(([r, s]) => this.K.m(t, e, n, r, s)).catch(t => {
      throw "FirebaseError" === t.name ? (t.code === N && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), t) : new U(A, t.toString());
    });
  }
  /** Invokes the provided RPC with streamed results with auth and AppCheck tokens. */


  T(t, e, n) {
    return this.X(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then(([r, s]) => this.K.T(t, e, n, r, s)).catch(t => {
      throw "FirebaseError" === t.name ? (t.code === N && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), t) : new U(A, t.toString());
    });
  }

  terminate() {
    this.J = !0;
  }

} // TODO(firestorexp): Make sure there is only one Datastore instance per
// firestore-exp client.


async function Je(t, e) {
  const n = v(t),
        r = Le(n.q) + "/documents",
        s = {
    writes: e.map(t => je(n.q, t))
  };
  await n.m("Commit", r, s);
}

async function Xe(t, e) {
  const n = v(t),
        r = Le(n.q) + "/documents",
        s = {
    documents: e.map(t => qe(n.q, t))
  },
        i = await n.T("BatchGetDocuments", r, s),
        o = new Map();
  i.forEach(t => {
    const e = ke(n.q, t);
    o.set(e.key.toString(), e);
  });
  const u = [];
  return e.forEach(t => {
    const e = o.get(t.toString());
    b(!!e), u.push(e);
  }), u;
}

async function Ze(t, e) {
  const n = v(t),
        r = Me(n.q, fe(e));
  return (await n.T("RunQuery", r.parent, {
    structuredQuery: r.structuredQuery
  })).filter(t => !!t.document).map(t => function (t, e, n) {
    const r = Oe(t, e.name),
          s = xe(e.updateTime),
          i = new zt({
      mapValue: {
        fields: e.fields
      }
    }),
          o = Gt.newFoundDocument(r, s, i);
    return n && o.setHasCommittedMutations(), n ? o.setHasCommittedMutations() : o;
  }(n.q, t.document, void 0));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const tn = new Map();
/**
 * An instance map that ensures only one Datastore exists per Firestore
 * instance.
 */

/**
 * Returns an initialized and started Datastore for the given Firestore
 * instance. Callers must invoke removeComponents() when the Firestore
 * instance is terminated.
 */

function en(t) {
  if (t._terminated) throw new U(S, "The client has already been terminated.");

  if (!tn.has(t)) {
    m("ComponentProvider", "Initializing Datastore");

    const i = function (t) {
      return new wt(t, fetch.bind(null));
    }((e = t._databaseId, n = t.app.options.appId || "", r = t._persistenceKey, s = t._freezeSettings(), new H(e, n, r, s.host, s.ssl, s.experimentalForceLongPolling, s.experimentalAutoDetectLongPolling, s.useFetchStreams))),
          o = Ye(t._databaseId),
          u = function (t, e, n, r) {
      return new Ke(t, e, n, r);
    }(t._authCredentials, t._appCheckCredentials, i, o);

    tn.set(t, u);
  }

  var e, n, r, s;
  /**
  * @license
  * Copyright 2018 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

  return tn.get(t);
}
/**
 * Removes all components associated with the provided instance. Must be called
 * when the `Firestore` instance is terminated.
 */

/**
 * A concrete type describing all the values that can be applied via a
 * user-supplied `FirestoreSettings` object. This is a separate type so that
 * defaults can be supplied and the value can be checked for equality.
 */


class nn {
  constructor(t) {
    var e;

    if (void 0 === t.host) {
      if (void 0 !== t.ssl) throw new U(I, "Can't provide ssl option if host option is not set");
      this.host = "firestore.googleapis.com", this.ssl = true;
    } else this.host = t.host, this.ssl = null === (e = t.ssl) || void 0 === e || e;

    if (this.credentials = t.credentials, this.ignoreUndefinedProperties = !!t.ignoreUndefinedProperties, void 0 === t.cacheSizeBytes) this.cacheSizeBytes = 41943040;else {
      if (-1 !== t.cacheSizeBytes && t.cacheSizeBytes < 1048576) throw new U(I, "cacheSizeBytes must be at least 1048576");
      this.cacheSizeBytes = t.cacheSizeBytes;
    }
    this.experimentalForceLongPolling = !!t.experimentalForceLongPolling, this.experimentalAutoDetectLongPolling = !!t.experimentalAutoDetectLongPolling, this.useFetchStreams = !!t.useFetchStreams, function (t, e, n, r) {
      if (!0 === e && !0 === r) throw new U(I, `${t} and ${n} cannot be used together.`);
    }("experimentalForceLongPolling", t.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", t.experimentalAutoDetectLongPolling);
  }

  isEqual(t) {
    return this.host === t.host && this.ssl === t.ssl && this.credentials === t.credentials && this.cacheSizeBytes === t.cacheSizeBytes && this.experimentalForceLongPolling === t.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === t.experimentalAutoDetectLongPolling && this.ignoreUndefinedProperties === t.ignoreUndefinedProperties && this.useFetchStreams === t.useFetchStreams;
  }

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The Cloud Firestore service interface.
 *
 * Do not call this constructor directly. Instead, use {@link getFirestore}.
 */


class rn {
  /** @hideconstructor */
  constructor(t, e, n) {
    this._authCredentials = e, this._appCheckCredentials = n,
    /**
     * Whether it's a Firestore or Firestore Lite instance.
     */
    this.type = "firestore-lite", this._persistenceKey = "(lite)", this._settings = new nn({}), this._settingsFrozen = !1, t instanceof K ? this._databaseId = t : (this._app = t, this._databaseId = function (t) {
      if (!Object.prototype.hasOwnProperty.apply(t.options, ["projectId"])) throw new U(I, '"projectId" not provided in firebase.initializeApp.');
      return new K(t.options.projectId);
    }
    /**
    * Initializes a new instance of Cloud Firestore with the provided settings.
    * Can only be called before any other functions, including
    * {@link getFirestore}. If the custom settings are empty, this function is
    * equivalent to calling {@link getFirestore}.
    *
    * @param app - The {@link @firebase/app#FirebaseApp} with which the `Firestore` instance will
    * be associated.
    * @param settings - A settings object to configure the `Firestore` instance.
    * @returns A newly initialized `Firestore` instance.
    */
    (t));
  }
  /**
   * The {@link @firebase/app#FirebaseApp} associated with this `Firestore` service
   * instance.
   */


  get app() {
    if (!this._app) throw new U(S, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
    return this._app;
  }

  get _initialized() {
    return this._settingsFrozen;
  }

  get _terminated() {
    return void 0 !== this._terminateTask;
  }

  _setSettings(t) {
    if (this._settingsFrozen) throw new U(S, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
    this._settings = new nn(t), void 0 !== t.credentials && (this._authCredentials = function (t) {
      if (!t) return new M();

      switch (t.type) {
        case "gapi":
          const e = t.client; // Make sure this really is a Gapi client.

          return b(!("object" != typeof e || null === e || !e.auth || !e.auth.getAuthHeaderValueForFirstParty)), new Q(e, t.sessionIndex || "0", t.iamToken || null);

        case "provider":
          return t.client;

        default:
          throw new U(I, "makeAuthCredentialsProvider failed due to invalid credential type");
      }
    }(t.credentials));
  }

  _getSettings() {
    return this._settings;
  }

  _freezeSettings() {
    return this._settingsFrozen = !0, this._settings;
  }

  _delete() {
    return this._terminateTask || (this._terminateTask = this._terminate()), this._terminateTask;
  }
  /** Returns a JSON-serializable representation of this `Firestore` instance. */


  toJSON() {
    return {
      app: this._app,
      databaseId: this._databaseId,
      settings: this._settings
    };
  }
  /**
   * Terminates all components used by this client. Subclasses can override
   * this method to clean up their own dependencies, but must also call this
   * method.
   *
   * Only ever called once.
   */


  _terminate() {
    return function (t) {
      const e = tn.get(t);
      e && (m("ComponentProvider", "Removing Datastore"), tn.delete(t), e.terminate());
    }(this), Promise.resolve();
  }

}

exports.Firestore = rn;

function sn(t, e) {
  const n = (0, _app._getProvider)(t, "firestore/lite");
  if (n.isInitialized()) throw new U(S, "Firestore can only be initialized once per app.");
  return n.initialize({
    options: e
  });
}
/**
 * Returns the existing `Firestore` instance that is associated with the
 * provided {@link @firebase/app#FirebaseApp}. If no instance exists, initializes a new
 * instance with default settings.
 *
 * @param app - The {@link @firebase/app#FirebaseApp} instance that the returned `Firestore`
 * instance is associated with.
 * @returns The `Firestore` instance of the provided app.
 */


function on(e = (0, _app.getApp)()) {
  return (0, _app._getProvider)(e, "firestore/lite").getImmediate();
}
/**
 * Modify this instance to communicate with the Cloud Firestore emulator.
 *
 * Note: This must be called before this instance has been used to do any
 * operations.
 *
 * @param firestore - The `Firestore` instance to configure to connect to the
 * emulator.
 * @param host - the emulator host (ex: localhost).
 * @param port - the emulator port (ex: 9000).
 * @param options.mockUserToken - the mock auth token to use for unit testing
 * Security Rules.
 */


function un(t, e, n, r = {}) {
  var s;

  const i = (t = ot(t, rn))._getSettings();

  if ("firestore.googleapis.com" !== i.host && i.host !== e && y("Host has been set in both settings() and useEmulator(), emulator host will be used"), t._setSettings(Object.assign(Object.assign({}, i), {
    host: `${e}:${n}`,
    ssl: !1
  })), r.mockUserToken) {
    let e, n;
    if ("string" == typeof r.mockUserToken) e = r.mockUserToken, n = l.MOCK_USER;else {
      // Let createMockUserToken validate first (catches common mistakes like
      // invalid field "uid" and missing field "sub" / "user_id".)
      e = (0, _util.createMockUserToken)(r.mockUserToken, null === (s = t._app) || void 0 === s ? void 0 : s.options.projectId);
      const i = r.mockUserToken.sub || r.mockUserToken.user_id;
      if (!i) throw new U(I, "mockUserToken must contain 'sub' or 'user_id' field!");
      n = new l(i);
    }
    t._authCredentials = new B(new j(e, n));
  }
}
/**
 * Terminates the provided `Firestore` instance.
 *
 * After calling `terminate()` only the `clearIndexedDbPersistence()` functions
 * may be used. Any other function will throw a `FirestoreError`. Termination
 * does not cancel any pending writes, and any promises that are awaiting a
 * response from the server will not be resolved.
 *
 * To restart after termination, create a new instance of `Firestore` with
 * {@link getFirestore}.
 *
 * Note: Under normal circumstances, calling `terminate()` is not required. This
 * function is useful only when you want to force this instance to release all of
 * its resources or in combination with {@link clearIndexedDbPersistence} to
 * ensure that all local state is destroyed between test runs.
 *
 * @param firestore - The `Firestore` instance to terminate.
 * @returns A `Promise` that is resolved when the instance has been successfully
 * terminated.
 */


function cn(t) {
  return t = ot(t, rn), (0, _app._removeServiceInstance)(t.app, "firestore/lite"), t._delete();
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A `DocumentReference` refers to a document location in a Firestore database
 * and can be used to write, read, or listen to the location. The document at
 * the referenced location may or may not exist.
 */


class an {
  /** @hideconstructor */
  constructor(t,
  /**
   * If provided, the `FirestoreDataConverter` associated with this instance.
   */
  e, n) {
    this.converter = e, this._key = n,
    /** The type of this Firestore reference. */
    this.type = "document", this.firestore = t;
  }

  get _path() {
    return this._key.path;
  }
  /**
   * The document's identifier within its collection.
   */


  get id() {
    return this._key.path.lastSegment();
  }
  /**
   * A string representing the path of the referenced document (relative
   * to the root of the database).
   */


  get path() {
    return this._key.path.canonicalString();
  }
  /**
   * The collection this `DocumentReference` belongs to.
   */


  get parent() {
    return new ln(this.firestore, this.converter, this._key.path.popLast());
  }

  withConverter(t) {
    return new an(this.firestore, t, this._key);
  }

}
/**
 * A `Query` refers to a query which you can read or listen to. You can also
 * construct refined `Query` objects by adding filters and ordering.
 */


exports.DocumentReference = an;

class hn {
  // This is the lite version of the Query class in the main SDK.

  /** @hideconstructor protected */
  constructor(t,
  /**
   * If provided, the `FirestoreDataConverter` associated with this instance.
   */
  e, n) {
    this.converter = e, this._query = n,
    /** The type of this Firestore reference. */
    this.type = "query", this.firestore = t;
  }

  withConverter(t) {
    return new hn(this.firestore, t, this._query);
  }

}
/**
 * A `CollectionReference` object can be used for adding documents, getting
 * document references, and querying for documents (using {@link query}).
 */


exports.Query = hn;

class ln extends hn {
  /** @hideconstructor */
  constructor(t, e, n) {
    super(t, e, new ue(n)), this._path = n,
    /** The type of this Firestore reference. */
    this.type = "collection";
  }
  /** The collection's identifier. */


  get id() {
    return this._query.path.lastSegment();
  }
  /**
   * A string representing the path of the referenced collection (relative
   * to the root of the database).
   */


  get path() {
    return this._query.path.canonicalString();
  }
  /**
   * A reference to the containing `DocumentReference` if this is a
   * subcollection. If this isn't a subcollection, the reference is null.
   */


  get parent() {
    const t = this._path.popLast();

    return t.isEmpty() ? null : new an(this.firestore,
    /* converter= */
    null, new et(t));
  }

  withConverter(t) {
    return new ln(this.firestore, t, this._path);
  }

}

exports.CollectionReference = ln;

function fn(t, e, ...n) {
  if (t = (0, _util.getModularInstance)(t), nt("collection", "path", e), t instanceof rn) {
    const r = X.fromString(e, ...n);
    return st(r), new ln(t,
    /* converter= */
    null, r);
  }

  {
    if (!(t instanceof an || t instanceof ln)) throw new U(I, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");

    const r = t._path.child(X.fromString(e, ...n));

    return st(r), new ln(t.firestore,
    /* converter= */
    null, r);
  }
} // TODO(firestorelite): Consider using ErrorFactory -
// https://github.com/firebase/firebase-js-sdk/blob/0131e1f/packages/util/src/errors.ts#L106

/**
 * Creates and returns a new `Query` instance that includes all documents in the
 * database that are contained in a collection or subcollection with the
 * given `collectionId`.
 *
 * @param firestore - A reference to the root `Firestore` instance.
 * @param collectionId - Identifies the collections to query over. Every
 * collection or subcollection with this ID as the last segment of its path
 * will be included. Cannot contain a slash.
 * @returns The created `Query`.
 */


function dn(t, e) {
  if (t = ot(t, rn), nt("collectionGroup", "collection id", e), e.indexOf("/") >= 0) throw new U(I, `Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);
  return new hn(t,
  /* converter= */
  null,
  /**
  * Creates a new Query for a collection group query that matches all documents
  * within the provided collection group.
  */
  function (t) {
    return new ue(X.emptyPath(), t);
  }(e));
}

function wn(t, e, ...n) {
  if (t = (0, _util.getModularInstance)(t), // We allow omission of 'pathString' but explicitly prohibit passing in both
  // 'undefined' and 'null'.
  1 === arguments.length && (e = pt.R()), nt("doc", "path", e), t instanceof rn) {
    const r = X.fromString(e, ...n);
    return rt(r), new an(t,
    /* converter= */
    null, new et(r));
  }

  {
    if (!(t instanceof an || t instanceof ln)) throw new U(I, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");

    const r = t._path.child(X.fromString(e, ...n));

    return rt(r), new an(t.firestore, t instanceof ln ? t.converter : null, new et(r));
  }
}
/**
 * Returns true if the provided references are equal.
 *
 * @param left - A reference to compare.
 * @param right - A reference to compare.
 * @returns true if the references point to the same location in the same
 * Firestore database.
 */


function mn(t, e) {
  return t = (0, _util.getModularInstance)(t), e = (0, _util.getModularInstance)(e), (t instanceof an || t instanceof ln) && (e instanceof an || e instanceof ln) && t.firestore === e.firestore && t.path === e.path && t.converter === e.converter;
}
/**
 * Returns true if the provided queries point to the same collection and apply
 * the same constraints.
 *
 * @param left - A `Query` to compare.
 * @param right - A `Query` to compare.
 * @returns true if the references point to the same location in the same
 * Firestore database.
 */


function pn(t, e) {
  return t = (0, _util.getModularInstance)(t), e = (0, _util.getModularInstance)(e), t instanceof hn && e instanceof hn && t.firestore === e.firestore && de(t._query, e._query) && t.converter === e.converter;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A `FieldPath` refers to a field in a document. The path may consist of a
 * single field name (referring to a top-level field in the document), or a
 * list of field names (referring to a nested field in the document).
 *
 * Create a `FieldPath` by providing field names. If more than one field
 * name is provided, the path will point to a nested field in a document.
 */


class yn {
  /**
   * Creates a `FieldPath` from the provided field names. If more than one field
   * name is provided, the path will point to a nested field in a document.
   *
   * @param fieldNames - A list of field names.
   */
  constructor(...t) {
    for (let e = 0; e < t.length; ++e) if (0 === t[e].length) throw new U(I, "Invalid field name at argument $(i + 1). Field names must not be empty.");

    this._internalPath = new tt(t);
  }
  /**
   * Returns true if this `FieldPath` is equal to the provided one.
   *
   * @param other - The `FieldPath` to compare against.
   * @returns true if this `FieldPath` is equal to the provided one.
   */


  isEqual(t) {
    return this._internalPath.isEqual(t._internalPath);
  }

}
/**
 * Returns a special sentinel `FieldPath` to refer to the ID of a document.
 * It can be used in queries to sort or filter by the document ID.
 */


exports.FieldPath = yn;

function _n() {
  return new yn("__name__");
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * An immutable object representing an array of bytes.
 */


class gn {
  /** @hideconstructor */
  constructor(t) {
    this._byteString = t;
  }
  /**
   * Creates a new `Bytes` object from the given Base64 string, converting it to
   * bytes.
   *
   * @param base64 - The Base64 string used to create the `Bytes` object.
   */


  static fromBase64String(t) {
    try {
      return new gn(At.fromBase64String(t));
    } catch (t) {
      throw new U(I, "Failed to construct data from Base64 string: " + t);
    }
  }
  /**
   * Creates a new `Bytes` object from the given Uint8Array.
   *
   * @param array - The Uint8Array used to create the `Bytes` object.
   */


  static fromUint8Array(t) {
    return new gn(At.fromUint8Array(t));
  }
  /**
   * Returns the underlying bytes as a Base64-encoded string.
   *
   * @returns The Base64-encoded string created from the `Bytes` object.
   */


  toBase64() {
    return this._byteString.toBase64();
  }
  /**
   * Returns the underlying bytes in a new `Uint8Array`.
   *
   * @returns The Uint8Array created from the `Bytes` object.
   */


  toUint8Array() {
    return this._byteString.toUint8Array();
  }
  /**
   * Returns a string representation of the `Bytes` object.
   *
   * @returns A string representation of the `Bytes` object.
   */


  toString() {
    return "Bytes(base64: " + this.toBase64() + ")";
  }
  /**
   * Returns true if this `Bytes` object is equal to the provided one.
   *
   * @param other - The `Bytes` object to compare against.
   * @returns true if this `Bytes` object is equal to the provided one.
   */


  isEqual(t) {
    return this._byteString.isEqual(t._byteString);
  }

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Sentinel values that can be used when writing document fields with `set()`
 * or `update()`.
 */


exports.Bytes = gn;

class bn {
  /**
   * @param _methodName - The public API endpoint that returns this class.
   * @hideconstructor
   */
  constructor(t) {
    this._methodName = t;
  }

}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * An immutable object representing a geographic location in Firestore. The
 * location is represented as latitude/longitude pair.
 *
 * Latitude values are in the range of [-90, 90].
 * Longitude values are in the range of [-180, 180].
 */


exports.FieldValue = bn;

class vn {
  /**
   * Creates a new immutable `GeoPoint` object with the provided latitude and
   * longitude values.
   * @param latitude - The latitude as number between -90 and 90.
   * @param longitude - The longitude as number between -180 and 180.
   */
  constructor(t, e) {
    if (!isFinite(t) || t < -90 || t > 90) throw new U(I, "Latitude must be a number between -90 and 90, but was: " + t);
    if (!isFinite(e) || e < -180 || e > 180) throw new U(I, "Longitude must be a number between -180 and 180, but was: " + e);
    this._lat = t, this._long = e;
  }
  /**
   * The latitude of this `GeoPoint` instance.
   */


  get latitude() {
    return this._lat;
  }
  /**
   * The longitude of this `GeoPoint` instance.
   */


  get longitude() {
    return this._long;
  }
  /**
   * Returns true if this `GeoPoint` is equal to the provided one.
   *
   * @param other - The `GeoPoint` to compare against.
   * @returns true if this `GeoPoint` is equal to the provided one.
   */


  isEqual(t) {
    return this._lat === t._lat && this._long === t._long;
  }
  /** Returns a JSON-serializable representation of this GeoPoint. */


  toJSON() {
    return {
      latitude: this._lat,
      longitude: this._long
    };
  }
  /**
   * Actually private to JS consumers of our API, so this function is prefixed
   * with an underscore.
   */


  _compareTo(t) {
    return yt(this._lat, t._lat) || yt(this._long, t._long);
  }

}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.GeoPoint = vn;
const En = /^__.*__$/;
/** The result of parsing document data (e.g. for a setData call). */

class Tn {
  constructor(t, e, n) {
    this.data = t, this.fieldMask = e, this.fieldTransforms = n;
  }

  toMutation(t, e) {
    return null !== this.fieldMask ? new Ae(t, this.data, this.fieldMask, e, this.fieldTransforms) : new Te(t, this.data, e, this.fieldTransforms);
  }

}
/** The result of parsing "update" data (i.e. for an updateData call). */


class An {
  constructor(t, // The fieldMask does not include document transforms.
  e, n) {
    this.data = t, this.fieldMask = e, this.fieldTransforms = n;
  }

  toMutation(t, e) {
    return new Ae(t, this.data, this.fieldMask, e, this.fieldTransforms);
  }

}

function In(t) {
  switch (t) {
    case 0
    /* Set */
    : // fall through

    case 2
    /* MergeSet */
    : // fall through

    case 1
    /* Update */
    :
      return !0;

    case 3
    /* Argument */
    :
    case 4
    /* ArrayArgument */
    :
      return !1;

    default:
      throw g();
  }
}
/** A "context" object passed around while parsing user data. */


class Rn {
  /**
   * Initializes a ParseContext with the given source and path.
   *
   * @param settings - The settings for the parser.
   * @param databaseId - The database ID of the Firestore instance.
   * @param serializer - The serializer to use to generate the Value proto.
   * @param ignoreUndefinedProperties - Whether to ignore undefined properties
   * rather than throw.
   * @param fieldTransforms - A mutable list of field transforms encountered
   * while parsing the data.
   * @param fieldMask - A mutable list of field paths encountered while parsing
   * the data.
   *
   * TODO(b/34871131): We don't support array paths right now, so path can be
   * null to indicate the context represents any location within an array (in
   * which case certain features will not work and errors will be somewhat
   * compromised).
   */
  constructor(t, e, n, r, s, i) {
    this.settings = t, this.databaseId = e, this.q = n, this.ignoreUndefinedProperties = r, // Minor hack: If fieldTransforms is undefined, we assume this is an
    // external call and we need to validate the entire path.
    void 0 === s && this.Z(), this.fieldTransforms = s || [], this.fieldMask = i || [];
  }

  get path() {
    return this.settings.path;
  }

  get tt() {
    return this.settings.tt;
  }
  /** Returns a new context with the specified settings overwritten. */


  et(t) {
    return new Rn(Object.assign(Object.assign({}, this.settings), t), this.databaseId, this.q, this.ignoreUndefinedProperties, this.fieldTransforms, this.fieldMask);
  }

  nt(t) {
    var e;
    const n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t),
          r = this.et({
      path: n,
      rt: !1
    });
    return r.st(t), r;
  }

  it(t) {
    var e;
    const n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t),
          r = this.et({
      path: n,
      rt: !1
    });
    return r.Z(), r;
  }

  ot(t) {
    // TODO(b/34871131): We don't support array paths right now; so make path
    // undefined.
    return this.et({
      path: void 0,
      rt: !0
    });
  }

  ut(t) {
    return Qn(t, this.settings.methodName, this.settings.ct || !1, this.path, this.settings.at);
  }
  /** Returns 'true' if 'fieldPath' was traversed when creating this context. */


  contains(t) {
    return void 0 !== this.fieldMask.find(e => t.isPrefixOf(e)) || void 0 !== this.fieldTransforms.find(e => t.isPrefixOf(e.field));
  }

  Z() {
    // TODO(b/34871131): Remove null check once we have proper paths for fields
    // within arrays.
    if (this.path) for (let t = 0; t < this.path.length; t++) this.st(this.path.get(t));
  }

  st(t) {
    if (0 === t.length) throw this.ut("Document fields must not be empty");
    if (In(this.tt) && En.test(t)) throw this.ut('Document fields cannot begin and end with "__"');
  }

}
/**
 * Helper for parsing raw user input (provided via the API) into internal model
 * classes.
 */


class Pn {
  constructor(t, e, n) {
    this.databaseId = t, this.ignoreUndefinedProperties = e, this.q = n || Ye(t);
  }
  /** Creates a new top-level parse context. */


  ht(t, e, n, r = !1) {
    return new Rn({
      tt: t,
      methodName: e,
      at: n,
      path: tt.emptyPath(),
      rt: !1,
      ct: r
    }, this.databaseId, this.q, this.ignoreUndefinedProperties);
  }

}

function Vn(t) {
  const e = t._freezeSettings(),
        n = Ye(t._databaseId);

  return new Pn(t._databaseId, !!e.ignoreUndefinedProperties, n);
}
/** Parse document data from a set() call. */


function Dn(t, e, n, r, s, i = {}) {
  const o = t.ht(i.merge || i.mergeFields ? 2
  /* MergeSet */
  : 0
  /* Set */
  , e, n, s);
  Mn("Data must be an object, but it was:", o, r);
  const u = kn(r, o);
  let c, a;
  if (i.merge) c = new Tt(o.fieldMask), a = o.fieldTransforms;else if (i.mergeFields) {
    const t = [];

    for (const r of i.mergeFields) {
      const s = Bn(e, r, n);
      if (!o.contains(s)) throw new U(I, `Field '${s}' is specified in your field mask but missing from your input data.`);
      Wn(t, s) || t.push(s);
    }

    c = new Tt(t), a = o.fieldTransforms.filter(t => c.covers(t.field));
  } else c = null, a = o.fieldTransforms;
  return new Tn(new zt(u), c, a);
}

class Nn extends bn {
  _toFieldTransform(t) {
    if (2
    /* MergeSet */
    !== t.tt) throw 1
    /* Update */
    === t.tt ? t.ut(`${this._methodName}() can only appear at the top level of your update data`) : t.ut(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`); // No transform to add for a delete, but we need to add it to our
    // fieldMask so it gets deleted.

    return t.fieldMask.push(t.path), null;
  }

  isEqual(t) {
    return t instanceof Nn;
  }

}
/**
 * Creates a child context for parsing SerializableFieldValues.
 *
 * This is different than calling `ParseContext.contextWith` because it keeps
 * the fieldTransforms and fieldMask separate.
 *
 * The created context has its `dataSource` set to `UserDataSource.Argument`.
 * Although these values are used with writes, any elements in these FieldValues
 * are not considered writes since they cannot contain any FieldValue sentinels,
 * etc.
 *
 * @param fieldValue - The sentinel FieldValue for which to create a child
 *     context.
 * @param context - The parent context.
 * @param arrayElement - Whether or not the FieldValue has an array.
 */


function $n(t, e, n) {
  return new Rn({
    tt: 3
    /* Argument */
    ,
    at: e.settings.at,
    methodName: t._methodName,
    rt: n
  }, e.databaseId, e.q, e.ignoreUndefinedProperties);
}

class Sn extends bn {
  _toFieldTransform(t) {
    return new be(t.path, new pe());
  }

  isEqual(t) {
    return t instanceof Sn;
  }

}

class xn extends bn {
  constructor(t, e) {
    super(t), this.lt = e;
  }

  _toFieldTransform(t) {
    const e = $n(this, t,
    /*array=*/
    !0),
          n = this.lt.map(t => Un(t, e)),
          r = new ye(n);
    return new be(t.path, r);
  }

  isEqual(t) {
    // TODO(mrschmidt): Implement isEquals
    return this === t;
  }

}

class Fn extends bn {
  constructor(t, e) {
    super(t), this.lt = e;
  }

  _toFieldTransform(t) {
    const e = $n(this, t,
    /*array=*/
    !0),
          n = this.lt.map(t => Un(t, e)),
          r = new _e(n);
    return new be(t.path, r);
  }

  isEqual(t) {
    // TODO(mrschmidt): Implement isEquals
    return this === t;
  }

}

class qn extends bn {
  constructor(t, e) {
    super(t), this.ft = e;
  }

  _toFieldTransform(t) {
    const e = new ge(t.q, we(t.q, this.ft));
    return new be(t.path, e);
  }

  isEqual(t) {
    // TODO(mrschmidt): Implement isEquals
    return this === t;
  }

}
/** Parse update data from an update() call. */


function On(t, e, n, r) {
  const s = t.ht(1
  /* Update */
  , e, n);
  Mn("Data must be an object, but it was:", s, r);
  const i = [],
        o = zt.empty();
  Et(r, (t, r) => {
    const u = Gn(e, t, n); // For Compat types, we have to "extract" the underlying types before
    // performing validation.

    r = (0, _util.getModularInstance)(r);
    const c = s.it(u);
    if (r instanceof Nn) // Add it to the field mask, but don't add anything to updateData.
      i.push(u);else {
      const t = Un(r, c);
      null != t && (i.push(u), o.set(u, t));
    }
  });
  const u = new Tt(i);
  return new An(o, u, s.fieldTransforms);
}
/** Parse update data from a list of field/value arguments. */


function Cn(t, e, n, r, s, i) {
  const o = t.ht(1
  /* Update */
  , e, n),
        u = [Bn(e, r, n)],
        c = [s];
  if (i.length % 2 != 0) throw new U(I, `Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);

  for (let t = 0; t < i.length; t += 2) u.push(Bn(e, i[t])), c.push(i[t + 1]);

  const a = [],
        l = zt.empty(); // We iterate in reverse order to pick the last value for a field if the
  // user specified the field multiple times.

  for (let t = u.length - 1; t >= 0; --t) if (!Wn(a, u[t])) {
    const e = u[t];
    let n = c[t]; // For Compat types, we have to "extract" the underlying types before
    // performing validation.

    n = (0, _util.getModularInstance)(n);
    const r = o.it(e);
    if (n instanceof Nn) // Add it to the field mask, but don't add anything to updateData.
      a.push(e);else {
      const t = Un(n, r);
      null != t && (a.push(e), l.set(e, t));
    }
  }

  const f = new Tt(a);
  return new An(l, f, o.fieldTransforms);
}
/**
 * Parse a "query value" (e.g. value in a where filter or a value in a cursor
 * bound).
 *
 * @param allowArrays - Whether the query value is an array that may directly
 * contain additional arrays (e.g. the operand of an `in` query).
 */


function Ln(t, e, n, r = !1) {
  return Un(n, t.ht(r ? 4
  /* ArrayArgument */
  : 3
  /* Argument */
  , e));
}
/**
 * Parses user data to Protobuf Values.
 *
 * @param input - Data to be parsed.
 * @param context - A context object representing the current path being parsed,
 * the source of the data being parsed, etc.
 * @returns The parsed value, or null if the value was a FieldValue sentinel
 * that should not be included in the resulting parsed data.
 */


function Un(t, e) {
  if (jn( // Unwrap the API type from the Compat SDK. This will return the API type
  // from firestore-exp.
  t = (0, _util.getModularInstance)(t))) return Mn("Unsupported field value:", e, t), kn(t, e);
  if (t instanceof bn) // FieldValues usually parse into transforms (except deleteField())
    // in which case we do not want to include this field in our parsed data
    // (as doing so will overwrite the field directly prior to the transform
    // trying to transform it). So we don't add this location to
    // context.fieldMask and we return null as our parsing result.

    /**
    * "Parses" the provided FieldValueImpl, adding any necessary transforms to
    * context.fieldTransforms.
    */
    return function (t, e) {
      // Sentinels are only supported with writes, and not within arrays.
      if (!In(e.tt)) throw e.ut(`${t._methodName}() can only be used with update() and set()`);
      if (!e.path) throw e.ut(`${t._methodName}() is not currently supported inside arrays`);

      const n = t._toFieldTransform(e);

      n && e.fieldTransforms.push(n);
    }
    /**
    * Helper to parse a scalar value (i.e. not an Object, Array, or FieldValue)
    *
    * @returns The parsed value
    */
    (t, e), null;
  if (void 0 === t && e.ignoreUndefinedProperties) // If the input is undefined it can never participate in the fieldMask, so
    // don't handle this below. If `ignoreUndefinedProperties` is false,
    // `parseScalarValue` will reject an undefined value.
    return null;

  if ( // If context.path is null we are inside an array and we don't support
  // field mask paths more granular than the top-level array.
  e.path && e.fieldMask.push(e.path), t instanceof Array) {
    // TODO(b/34871131): Include the path containing the array in the error
    // message.
    // In the case of IN queries, the parsed data is an array (representing
    // the set of values to be included for the IN query) that may directly
    // contain additional arrays (each representing an individual field
    // value), so we disable this validation.
    if (e.settings.rt && 4
    /* ArrayArgument */
    !== e.tt) throw e.ut("Nested arrays are not supported");
    return function (t, e) {
      const n = [];
      let r = 0;

      for (const s of t) {
        let t = Un(s, e.ot(r));
        null == t && ( // Just include nulls in the array for fields being replaced with a
        // sentinel.
        t = {
          nullValue: "NULL_VALUE"
        }), n.push(t), r++;
      }

      return {
        arrayValue: {
          values: n
        }
      };
    }(t, e);
  }

  return function (t, e) {
    if (null === (t = (0, _util.getModularInstance)(t))) return {
      nullValue: "NULL_VALUE"
    };
    if ("number" == typeof t) return we(e.q, t);
    if ("boolean" == typeof t) return {
      booleanValue: t
    };
    if ("string" == typeof t) return {
      stringValue: t
    };

    if (t instanceof Date) {
      const n = gt.fromDate(t);
      return {
        timestampValue: Ne(e.q, n)
      };
    }

    if (t instanceof gt) {
      // Firestore backend truncates precision down to microseconds. To ensure
      // offline mode works the same with regards to truncation, perform the
      // truncation immediately without waiting for the backend to do that.
      const n = new gt(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3));
      return {
        timestampValue: Ne(e.q, n)
      };
    }

    if (t instanceof vn) return {
      geoPointValue: {
        latitude: t.latitude,
        longitude: t.longitude
      }
    };
    if (t instanceof gn) return {
      bytesValue: $e(e.q, t._byteString)
    };

    if (t instanceof an) {
      const n = e.databaseId,
            r = t.firestore._databaseId;
      if (!r.isEqual(n)) throw e.ut(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);
      return {
        referenceValue: Fe(t.firestore._databaseId || e.databaseId, t._key.path)
      };
    }

    throw e.ut(`Unsupported field value: ${it(t)}`);
  }
  /**
  * Checks whether an object looks like a JSON object that should be converted
  * into a struct. Normal class/prototype instances are considered to look like
  * JSON objects since they should be converted to a struct value. Arrays, Dates,
  * GeoPoints, etc. are not considered to look like JSON objects since they map
  * to specific FieldValue types other than ObjectValue.
  */
  (t, e);
}

function kn(t, e) {
  const n = {};
  return !function (t) {
    for (const e in t) if (Object.prototype.hasOwnProperty.call(t, e)) return !1;

    return !0;
  }(t) ? Et(t, (t, r) => {
    const s = Un(r, e.nt(t));
    null != s && (n[t] = s);
  }) : // If we encounter an empty object, we explicitly add it to the update
  // mask to ensure that the server creates a map entry.
  e.path && e.path.length > 0 && e.fieldMask.push(e.path), {
    mapValue: {
      fields: n
    }
  };
}

function jn(t) {
  return !("object" != typeof t || null === t || t instanceof Array || t instanceof Date || t instanceof gt || t instanceof vn || t instanceof gn || t instanceof an || t instanceof bn);
}

function Mn(t, e, n) {
  if (!jn(n) || !function (t) {
    return "object" == typeof t && null !== t && (Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t));
  }(n)) {
    const r = it(n);
    throw "an object" === r ? e.ut(t + " a custom object") : e.ut(t + " " + r);
  }
}
/**
 * Helper that calls fromDotSeparatedString() but wraps any error thrown.
 */


function Bn(t, e, n) {
  if (( // If required, replace the FieldPath Compat class with with the firestore-exp
  // FieldPath.
  e = (0, _util.getModularInstance)(e)) instanceof yn) return e._internalPath;
  if ("string" == typeof e) return Gn(t, e);
  throw Qn("Field path arguments must be of type string or ", t,
  /* hasConverter= */
  !1,
  /* path= */
  void 0, n);
}
/**
 * Matches any characters in a field path string that are reserved.
 */


const zn = new RegExp("[~\\*/\\[\\]]");
/**
 * Wraps fromDotSeparatedString with an error message about the method that
 * was thrown.
 * @param methodName - The publicly visible method name
 * @param path - The dot-separated string form of a field path which will be
 * split on dots.
 * @param targetDoc - The document against which the field path will be
 * evaluated.
 */

function Gn(t, e, n) {
  if (e.search(zn) >= 0) throw Qn(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`, t,
  /* hasConverter= */
  !1,
  /* path= */
  void 0, n);

  try {
    return new yn(...e.split("."))._internalPath;
  } catch (r) {
    throw Qn(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`, t,
    /* hasConverter= */
    !1,
    /* path= */
    void 0, n);
  }
}

function Qn(t, e, n, r, s) {
  const i = r && !r.isEmpty(),
        o = void 0 !== s;
  let u = `Function ${e}() called with invalid data`;
  n && (u += " (via `toFirestore()`)"), u += ". ";
  let c = "";
  return (i || o) && (c += " (found", i && (c += ` in field ${r}`), o && (c += ` in document ${s}`), c += ")"), new U(I, u + t + c);
}
/** Checks `haystack` if FieldPath `needle` is present. Runs in O(n). */


function Wn(t, e) {
  return t.some(t => t.isEqual(e));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A `DocumentSnapshot` contains data read from a document in your Firestore
 * database. The data can be extracted with `.data()` or `.get(<field>)` to
 * get a specific field.
 *
 * For a `DocumentSnapshot` that points to a non-existing document, any data
 * access will return 'undefined'. You can use the `exists()` method to
 * explicitly verify a document's existence.
 */


class Yn {
  // Note: This class is stripped down version of the DocumentSnapshot in
  // the legacy SDK. The changes are:
  // - No support for SnapshotMetadata.
  // - No support for SnapshotOptions.

  /** @hideconstructor protected */
  constructor(t, e, n, r, s) {
    this._firestore = t, this._userDataWriter = e, this._key = n, this._document = r, this._converter = s;
  }
  /** Property of the `DocumentSnapshot` that provides the document's ID. */


  get id() {
    return this._key.path.lastSegment();
  }
  /**
   * The `DocumentReference` for the document included in the `DocumentSnapshot`.
   */


  get ref() {
    return new an(this._firestore, this._converter, this._key);
  }
  /**
   * Signals whether or not the document at the snapshot's location exists.
   *
   * @returns true if the document exists.
   */


  exists() {
    return null !== this._document;
  }
  /**
   * Retrieves all fields in the document as an `Object`. Returns `undefined` if
   * the document doesn't exist.
   *
   * @returns An `Object` containing all fields in the document or `undefined`
   * if the document doesn't exist.
   */


  data() {
    if (this._document) {
      if (this._converter) {
        // We only want to use the converter and create a new DocumentSnapshot
        // if a converter has been provided.
        const t = new Hn(this._firestore, this._userDataWriter, this._key, this._document,
        /* converter= */
        null);
        return this._converter.fromFirestore(t);
      }

      return this._userDataWriter.convertValue(this._document.data.value);
    }
  }
  /**
   * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
   * document or field doesn't exist.
   *
   * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
   * field.
   * @returns The data at the specified field location or undefined if no such
   * field exists in the document.
   */
  // We are using `any` here to avoid an explicit cast by our users.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any


  get(t) {
    if (this._document) {
      const e = this._document.data.field(Xn("DocumentSnapshot.get", t));

      if (null !== e) return this._userDataWriter.convertValue(e);
    }
  }

}
/**
 * A `QueryDocumentSnapshot` contains data read from a document in your
 * Firestore database as part of a query. The document is guaranteed to exist
 * and its data can be extracted with `.data()` or `.get(<field>)` to get a
 * specific field.
 *
 * A `QueryDocumentSnapshot` offers the same API surface as a
 * `DocumentSnapshot`. Since query results contain only existing documents, the
 * `exists` property will always be true and `data()` will never return
 * 'undefined'.
 */


exports.DocumentSnapshot = Yn;

class Hn extends Yn {
  /**
   * Retrieves all fields in the document as an `Object`.
   *
   * @override
   * @returns An `Object` containing all fields in the document.
   */
  data() {
    return super.data();
  }

}
/**
 * A `QuerySnapshot` contains zero or more `DocumentSnapshot` objects
 * representing the results of a query. The documents can be accessed as an
 * array via the `docs` property or enumerated using the `forEach` method. The
 * number of documents can be determined via the `empty` and `size`
 * properties.
 */


exports.QueryDocumentSnapshot = Hn;

class Kn {
  /** @hideconstructor */
  constructor(t, e) {
    this._docs = e, this.query = t;
  }
  /** An array of all the documents in the `QuerySnapshot`. */


  get docs() {
    return [...this._docs];
  }
  /** The number of documents in the `QuerySnapshot`. */


  get size() {
    return this.docs.length;
  }
  /** True if there are no documents in the `QuerySnapshot`. */


  get empty() {
    return 0 === this.docs.length;
  }
  /**
   * Enumerates all of the documents in the `QuerySnapshot`.
   *
   * @param callback - A callback to be called with a `QueryDocumentSnapshot` for
   * each document in the snapshot.
   * @param thisArg - The `this` binding for the callback.
   */


  forEach(t, e) {
    this._docs.forEach(t, e);
  }

}
/**
 * Returns true if the provided snapshots are equal.
 *
 * @param left - A snapshot to compare.
 * @param right - A snapshot to compare.
 * @returns true if the snapshots are equal.
 */


exports.QuerySnapshot = Kn;

function Jn(t, e) {
  return t = (0, _util.getModularInstance)(t), e = (0, _util.getModularInstance)(e), t instanceof Yn && e instanceof Yn ? t._firestore === e._firestore && t._key.isEqual(e._key) && (null === t._document ? null === e._document : t._document.isEqual(e._document)) && t._converter === e._converter : t instanceof Kn && e instanceof Kn && pn(t.query, e.query) && _t(t.docs, e.docs, Jn);
}
/**
 * Helper that calls `fromDotSeparatedString()` but wraps any error thrown.
 */


function Xn(t, e) {
  return "string" == typeof e ? Gn(t, e) : e instanceof yn ? e._internalPath : e._delegate._internalPath;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A `QueryConstraint` is used to narrow the set of documents returned by a
 * Firestore query. `QueryConstraint`s are created by invoking {@link where},
 * {@link orderBy}, {@link (startAt:1)}, {@link (startAfter:1)}, {@link
 * endBefore:1}, {@link (endAt:1)}, {@link limit} or {@link limitToLast} and
 * can then be passed to {@link query} to create a new query instance that
 * also contains this `QueryConstraint`.
 */


class Zn {}
/**
 * Creates a new immutable instance of {@link Query} that is extended to also include
 * additional query constraints.
 *
 * @param query - The {@link Query} instance to use as a base for the new constraints.
 * @param queryConstraints - The list of {@link QueryConstraint}s to apply.
 * @throws if any of the provided query constraints cannot be combined with the
 * existing or new constraints.
 */


exports.QueryConstraint = Zn;

function tr(t, ...e) {
  for (const n of e) t = n._apply(t);

  return t;
}

class er extends Zn {
  constructor(t, e, n) {
    super(), this.dt = t, this.wt = e, this.yt = n, this.type = "where";
  }

  _apply(t) {
    const e = Vn(t.firestore),
          n = function (t, e, n, r, s, i, o) {
      let u;

      if (s.isKeyField()) {
        if ("array-contains"
        /* ARRAY_CONTAINS */
        === i || "array-contains-any"
        /* ARRAY_CONTAINS_ANY */
        === i) throw new U(I, `Invalid Query. You can't perform '${i}' queries on documentId().`);

        if ("in"
        /* IN */
        === i || "not-in"
        /* NOT_IN */
        === i) {
          pr(o, i);
          const e = [];

          for (const n of o) e.push(mr(r, t, n));

          u = {
            arrayValue: {
              values: e
            }
          };
        } else u = mr(r, t, o);
      } else "in"
      /* IN */
      !== i && "not-in"
      /* NOT_IN */
      !== i && "array-contains-any"
      /* ARRAY_CONTAINS_ANY */
      !== i || pr(o, i), u = Ln(n, e, o,
      /* allowArrays= */
      "in"
      /* IN */
      === i || "not-in"
      /* NOT_IN */
      === i);

      const c = Yt.create(s, i, u);
      return function (t, e) {
        if (e.N()) {
          const n = ae(t);
          if (null !== n && !n.isEqual(e.field)) throw new U(I, `Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${n.toString()}' and '${e.field.toString()}'`);
          const r = ce(t);
          null !== r && yr(t, e.field, r);
        }

        const n = function (t, e) {
          for (const n of t.filters) if (e.indexOf(n.op) >= 0) return n.op;

          return null;
        }(t,
        /**
        * Given an operator, returns the set of operators that cannot be used with it.
        *
        * Operators in a query must adhere to the following set of rules:
        * 1. Only one array operator is allowed.
        * 2. Only one disjunctive operator is allowed.
        * 3. `NOT_EQUAL` cannot be used with another `NOT_EQUAL` operator.
        * 4. `NOT_IN` cannot be used with array, disjunctive, or `NOT_EQUAL` operators.
        *
        * Array operators: `ARRAY_CONTAINS`, `ARRAY_CONTAINS_ANY`
        * Disjunctive operators: `IN`, `ARRAY_CONTAINS_ANY`, `NOT_IN`
        */
        function (t) {
          switch (t) {
            case "!="
            /* NOT_EQUAL */
            :
              return ["!="
              /* NOT_EQUAL */
              , "not-in"
              /* NOT_IN */
              ];

            case "array-contains"
            /* ARRAY_CONTAINS */
            :
              return ["array-contains"
              /* ARRAY_CONTAINS */
              , "array-contains-any"
              /* ARRAY_CONTAINS_ANY */
              , "not-in"
              /* NOT_IN */
              ];

            case "in"
            /* IN */
            :
              return ["array-contains-any"
              /* ARRAY_CONTAINS_ANY */
              , "in"
              /* IN */
              , "not-in"
              /* NOT_IN */
              ];

            case "array-contains-any"
            /* ARRAY_CONTAINS_ANY */
            :
              return ["array-contains"
              /* ARRAY_CONTAINS */
              , "array-contains-any"
              /* ARRAY_CONTAINS_ANY */
              , "in"
              /* IN */
              , "not-in"
              /* NOT_IN */
              ];

            case "not-in"
            /* NOT_IN */
            :
              return ["array-contains"
              /* ARRAY_CONTAINS */
              , "array-contains-any"
              /* ARRAY_CONTAINS_ANY */
              , "in"
              /* IN */
              , "not-in"
              /* NOT_IN */
              , "!="
              /* NOT_EQUAL */
              ];

            default:
              return [];
          }
        }(e.op));

        if (null !== n) // Special case when it's a duplicate op to give a slightly clearer error message.
          throw n === e.op ? new U(I, `Invalid query. You cannot use more than one '${e.op.toString()}' filter.`) : new U(I, `Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`);
      }(t, c), c;
    }(t._query, "where", e, t.firestore._databaseId, this.dt, this.wt, this.yt);

    return new hn(t.firestore, t.converter, function (t, e) {
      const n = t.filters.concat([e]);
      return new ue(t.path, t.collectionGroup, t.explicitOrderBy.slice(), n, t.limit, t.limitType, t.startAt, t.endAt);
    }(t._query, n));
  }

}
/**
 * Creates a {@link QueryConstraint} that enforces that documents must contain the
 * specified field and that the value should satisfy the relation constraint
 * provided.
 *
 * @param fieldPath - The path to compare
 * @param opStr - The operation string (e.g "&lt;", "&lt;=", "==", "&lt;",
 *   "&lt;=", "!=").
 * @param value - The value for comparison
 * @returns The created {@link Query}.
 */


function nr(t, e, n) {
  const r = e,
        s = Xn("where", t);
  return new er(s, r, n);
}

class rr extends Zn {
  constructor(t, e) {
    super(), this.dt = t, this._t = e, this.type = "orderBy";
  }

  _apply(t) {
    const e = function (t, e, n) {
      if (null !== t.startAt) throw new U(I, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
      if (null !== t.endAt) throw new U(I, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
      const r = new se(e, n);
      return function (t, e) {
        if (null === ce(t)) {
          // This is the first order by. It must match any inequality.
          const n = ae(t);
          null !== n && yr(t, n, e.field);
        }
      }(t, r), r;
    }
    /**
    * Create a `Bound` from a query and a document.
    *
    * Note that the `Bound` will always include the key of the document
    * and so only the provided document will compare equal to the returned
    * position.
    *
    * Will throw if the document does not contain all fields of the order by
    * of the query or if any of the fields in the order by are an uncommitted
    * server timestamp.
    */
    (t._query, this.dt, this._t);

    return new hn(t.firestore, t.converter, function (t, e) {
      // TODO(dimond): validate that orderBy does not list the same key twice.
      const n = t.explicitOrderBy.concat([e]);
      return new ue(t.path, t.collectionGroup, n, t.filters.slice(), t.limit, t.limitType, t.startAt, t.endAt);
    }(t._query, e));
  }

}
/**
 * Creates a {@link QueryConstraint} that sorts the query result by the
 * specified field, optionally in descending order instead of ascending.
 *
 * @param fieldPath - The field to sort by.
 * @param directionStr - Optional direction to sort by ('asc' or 'desc'). If
 * not specified, order will be ascending.
 * @returns The created {@link Query}.
 */


function sr(t, e = "asc") {
  const n = e,
        r = Xn("orderBy", t);
  return new rr(r, n);
}

class ir extends Zn {
  constructor(t, e, n) {
    super(), this.type = t, this.gt = e, this.bt = n;
  }

  _apply(t) {
    return new hn(t.firestore, t.converter, function (t, e, n) {
      return new ue(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), e, n, t.startAt, t.endAt);
    }(t._query, this.gt, this.bt));
  }

}
/**
 * Creates a {@link QueryConstraint} that only returns the first matching documents.
 *
 * @param limit - The maximum number of items to return.
 * @returns The created {@link Query}.
 */


function or(t) {
  return ut("limit", t), new ir("limit", t, "F"
  /* First */
  );
}
/**
 * Creates a {@link QueryConstraint} that only returns the last matching documents.
 *
 * You must specify at least one `orderBy` clause for `limitToLast` queries,
 * otherwise an exception will be thrown during execution.
 *
 * @param limit - The maximum number of items to return.
 * @returns The created {@link Query}.
 */


function ur(t) {
  return ut("limitToLast", t), new ir("limitToLast", t, "L"
  /* Last */
  );
}

class cr extends Zn {
  constructor(t, e, n) {
    super(), this.type = t, this.vt = e, this.Et = n;
  }

  _apply(t) {
    const e = wr(t, this.type, this.vt, this.Et);
    return new hn(t.firestore, t.converter, function (t, e) {
      return new ue(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, e, t.endAt);
    }(t._query, e));
  }

}

function ar(...t) {
  return new cr("startAt", t,
  /*inclusive=*/
  !0);
}

function hr(...t) {
  return new cr("startAfter", t,
  /*inclusive=*/
  !1);
}

class lr extends Zn {
  constructor(t, e, n) {
    super(), this.type = t, this.vt = e, this.Et = n;
  }

  _apply(t) {
    const e = wr(t, this.type, this.vt, this.Et);
    return new hn(t.firestore, t.converter, function (t, e) {
      return new ue(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, e);
    }(t._query, e));
  }

}

function fr(...t) {
  return new lr("endBefore", t,
  /*inclusive=*/
  !1);
}

function dr(...t) {
  return new lr("endAt", t,
  /*inclusive=*/
  !0);
}
/** Helper function to create a bound from a document or fields */


function wr(t, e, n, r) {
  if (n[0] = (0, _util.getModularInstance)(n[0]), n[0] instanceof Yn) return function (t, e, n, r, s) {
    if (!r) throw new U(P, `Can't use a DocumentSnapshot that doesn't exist for ${n}().`);
    const i = []; // Because people expect to continue/end a query at the exact document
    // provided, we need to use the implicit sort order rather than the explicit
    // sort order, because it's guaranteed to contain the document key. That way
    // the position becomes unambiguous and the query continues/ends exactly at
    // the provided document. Without the key (by using the explicit sort
    // orders), multiple documents could match the position, yielding duplicate
    // results.

    for (const n of le(t)) if (n.field.isKeyField()) i.push(Lt(e, r.key));else {
      const t = r.data.field(n.field);
      if (Dt(t)) throw new U(I, 'Invalid query. You are trying to start or end a query using a document for which the field "' + n.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');

      if (null === t) {
        const t = n.field.canonicalString();
        throw new U(I, `Invalid query. You are trying to start or end a query using a document for which the field '${t}' (used as the orderBy) does not exist.`);
      }

      i.push(t);
    }

    return new re(i, s);
  }
  /**
  * Converts a list of field values to a `Bound` for the given query.
  */
  (t._query, t.firestore._databaseId, e, n[0]._document, r);
  {
    const s = Vn(t.firestore);
    return function (t, e, n, r, s, i) {
      // Use explicit order by's because it has to match the query the user made
      const o = t.explicitOrderBy;
      if (s.length > o.length) throw new U(I, `Too many arguments provided to ${r}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);
      const u = [];

      for (let i = 0; i < s.length; i++) {
        const c = s[i];

        if (o[i].field.isKeyField()) {
          if ("string" != typeof c) throw new U(I, `Invalid query. Expected a string for document ID in ${r}(), but got a ${typeof c}`);
          if (!he(t) && -1 !== c.indexOf("/")) throw new U(I, `Invalid query. When querying a collection and ordering by documentId(), the value passed to ${r}() must be a plain document ID, but '${c}' contains a slash.`);
          const n = t.path.child(X.fromString(c));
          if (!et.isDocumentKey(n)) throw new U(I, `Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${r}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`);
          const s = new et(n);
          u.push(Lt(e, s));
        } else {
          const t = Ln(n, r, c);
          u.push(t);
        }
      }

      return new re(u, i);
    }
    /**
    * Parses the given `documentIdValue` into a `ReferenceValue`, throwing
    * appropriate errors if the value is anything other than a `DocumentReference`
    * or `string`, or if the string is malformed.
    */
    (t._query, t.firestore._databaseId, s, e, n, r);
  }
}

function mr(t, e, n) {
  if ("string" == typeof (n = (0, _util.getModularInstance)(n))) {
    if ("" === n) throw new U(I, "Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");
    if (!he(e) && -1 !== n.indexOf("/")) throw new U(I, `Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);
    const r = e.path.child(X.fromString(n));
    if (!et.isDocumentKey(r)) throw new U(I, `Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);
    return Lt(t, new et(r));
  }

  if (n instanceof an) return Lt(t, n._key);
  throw new U(I, `Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${it(n)}.`);
}
/**
 * Validates that the value passed into a disjunctive filter satisfies all
 * array requirements.
 */


function pr(t, e) {
  if (!Array.isArray(t) || 0 === t.length) throw new U(I, `Invalid Query. A non-empty array is required for '${e.toString()}' filters.`);
  if (t.length > 10) throw new U(I, `Invalid Query. '${e.toString()}' filters support a maximum of 10 elements in the value array.`);
}

function yr(t, e, n) {
  if (!n.isEqual(e)) throw new U(I, `Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Converts Firestore's internal types to the JavaScript types that we expose
 * to the user.
 *
 * @internal
 */

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Converts custom model object of type T into `DocumentData` by applying the
 * converter if it exists.
 *
 * This function is used when converting user objects to `DocumentData`
 * because we want to provide the user with a more specific error message if
 * their `set()` or fails due to invalid data originating from a `toFirestore()`
 * call.
 */


function _r(t, e, n) {
  let r; // Cast to `any` in order to satisfy the union type constraint on
  // toFirestore().
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  return r = t ? n && (n.merge || n.mergeFields) ? t.toFirestore(e, n) : t.toFirestore(e) : e, r;
}

class gr extends class {
  convertValue(t, e = "none") {
    switch (xt(t)) {
      case 0
      /* NullValue */
      :
        return null;

      case 1
      /* BooleanValue */
      :
        return t.booleanValue;

      case 2
      /* NumberValue */
      :
        return Pt(t.integerValue || t.doubleValue);

      case 3
      /* TimestampValue */
      :
        return this.convertTimestamp(t.timestampValue);

      case 4
      /* ServerTimestampValue */
      :
        return this.convertServerTimestamp(t, e);

      case 5
      /* StringValue */
      :
        return t.stringValue;

      case 6
      /* BlobValue */
      :
        return this.convertBytes(Vt(t.bytesValue));

      case 7
      /* RefValue */
      :
        return this.convertReference(t.referenceValue);

      case 8
      /* GeoPointValue */
      :
        return this.convertGeoPoint(t.geoPointValue);

      case 9
      /* ArrayValue */
      :
        return this.convertArray(t.arrayValue, e);

      case 10
      /* ObjectValue */
      :
        return this.convertObject(t.mapValue, e);

      default:
        throw g();
    }
  }

  convertObject(t, e) {
    const n = {};
    return Et(t.fields, (t, r) => {
      n[t] = this.convertValue(r, e);
    }), n;
  }

  convertGeoPoint(t) {
    return new vn(Pt(t.latitude), Pt(t.longitude));
  }

  convertArray(t, e) {
    return (t.values || []).map(t => this.convertValue(t, e));
  }

  convertServerTimestamp(t, e) {
    switch (e) {
      case "previous":
        const n = Nt(t);
        return null == n ? null : this.convertValue(n, e);

      case "estimate":
        return this.convertTimestamp($t(t));

      default:
        return null;
    }
  }

  convertTimestamp(t) {
    const e = Rt(t);
    return new gt(e.seconds, e.nanos);
  }

  convertDocumentKey(t, e) {
    const n = X.fromString(t);
    b(We(n));
    const r = new K(n.get(1), n.get(3)),
          s = new et(n.popFirst(5));
    return r.isEqual(e) || // TODO(b/64130202): Somehow support foreign references.
    p(`Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`), s;
  }

} {
  constructor(t) {
    super(), this.firestore = t;
  }

  convertBytes(t) {
    return new gn(t);
  }

  convertReference(t) {
    const e = this.convertDocumentKey(t, this.firestore._databaseId);
    return new an(this.firestore,
    /* converter= */
    null, e);
  }

}
/**
 * Reads the document referred to by the specified document reference.
 *
 * All documents are directly fetched from the server, even if the document was
 * previously read or modified. Recent modifications are only reflected in the
 * retrieved `DocumentSnapshot` if they have already been applied by the
 * backend. If the client is offline, the read fails. If you like to use
 * caching or see local modifications, please use the full Firestore SDK.
 *
 * @param reference - The reference of the document to fetch.
 * @returns A Promise resolved with a `DocumentSnapshot` containing the current
 * document contents.
 */


function br(t) {
  const e = en((t = ot(t, an)).firestore),
        n = new gr(t.firestore);
  return Xe(e, [t._key]).then(e => {
    b(1 === e.length);
    const r = e[0];
    return new Yn(t.firestore, n, t._key, r.isFoundDocument() ? r : null, t.converter);
  });
}
/**
 * Executes the query and returns the results as a {@link QuerySnapshot}.
 *
 * All queries are executed directly by the server, even if the the query was
 * previously executed. Recent modifications are only reflected in the retrieved
 * results if they have already been applied by the backend. If the client is
 * offline, the operation fails. To see previously cached result and local
 * modifications, use the full Firestore SDK.
 *
 * @param query - The `Query` to execute.
 * @returns A Promise that will be resolved with the results of the query.
 */


function vr(t) {
  !function (t) {
    if ("L"
    /* Last */
    === t.limitType && 0 === t.explicitOrderBy.length) throw new U(q, "limitToLast() queries require specifying at least one orderBy() clause");
  }((t = ot(t, hn))._query);
  const e = en(t.firestore),
        n = new gr(t.firestore);
  return Ze(e, t._query).then(e => {
    const r = e.map(e => new Hn(t.firestore, n, e.key, e, t.converter));
    return "L"
    /* Last */
    === t._query.limitType && // Limit to last queries reverse the orderBy constraint that was
    // specified by the user. As such, we need to reverse the order of the
    // results to return the documents in the expected order.
    r.reverse(), new Kn(t, r);
  });
}

function Er(t, e, n) {
  const r = _r((t = ot(t, an)).converter, e, n),
        s = Dn(Vn(t.firestore), "setDoc", t._key, r, null !== t.converter, n);

  return Je(en(t.firestore), [s.toMutation(t._key, ve.none())]);
}

function Tr(t, e, n, ...r) {
  const s = Vn((t = ot(t, an)).firestore); // For Compat types, we have to "extract" the underlying types before
  // performing validation.

  let i;
  i = "string" == typeof (e = (0, _util.getModularInstance)(e)) || e instanceof yn ? Cn(s, "updateDoc", t._key, e, n, r) : On(s, "updateDoc", t._key, e);
  return Je(en(t.firestore), [i.toMutation(t._key, ve.exists(!0))]);
}
/**
 * Deletes the document referred to by the specified `DocumentReference`.
 *
 * The deletion will only be reflected in document reads that occur after the
 * returned promise resolves. If the client is offline, the
 * delete fails. If you would like to see local modifications or buffer writes
 * until the client is online, use the full Firestore SDK.
 *
 * @param reference - A reference to the document to delete.
 * @returns A `Promise` resolved once the document has been successfully
 * deleted from the backend.
 */


function Ar(t) {
  return Je(en((t = ot(t, an)).firestore), [new Ie(t._key, ve.none())]);
}
/**
 * Add a new document to specified `CollectionReference` with the given data,
 * assigning it a document ID automatically.
 *
 * The result of this write will only be reflected in document reads that occur
 * after the returned promise resolves. If the client is offline, the
 * write fails. If you would like to see local modifications or buffer writes
 * until the client is online, use the full Firestore SDK.
 *
 * @param reference - A reference to the collection to add this document to.
 * @param data - An Object containing the data for the new document.
 * @throws Error - If the provided input is not a valid Firestore document.
 * @returns A `Promise` resolved with a `DocumentReference` pointing to the
 * newly created document after it has been written to the backend.
 */


function Ir(t, e) {
  const n = wn(t = ot(t, ln)),
        r = _r(t.converter, e),
        s = Dn(Vn(t.firestore), "addDoc", n._key, r, null !== n.converter, {});

  return Je(en(t.firestore), [s.toMutation(n._key, ve.exists(!1))]).then(() => n);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns a sentinel for use with {@link @firebase/firestore/lite#(updateDoc:1)} or
 * {@link @firebase/firestore/lite#(setDoc:1)} with `{merge: true}` to mark a field for deletion.
 */


function Rr() {
  return new Nn("deleteField");
}
/**
 * Returns a sentinel used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link @firebase/firestore/lite#(updateDoc:1)} to
 * include a server-generated timestamp in the written data.
 */


function Pr() {
  return new Sn("serverTimestamp");
}
/**
 * Returns a special value that can be used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link
 * @firebase/firestore/lite#(updateDoc:1)} that tells the server to union the given elements with any array
 * value that already exists on the server. Each specified element that doesn't
 * already exist in the array will be added to the end. If the field being
 * modified is not already an array it will be overwritten with an array
 * containing exactly the specified elements.
 *
 * @param elements - The elements to union into the array.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`.
 */


function Vr(...t) {
  // NOTE: We don't actually parse the data until it's used in set() or
  // update() since we'd need the Firestore instance to do this.
  return new xn("arrayUnion", t);
}
/**
 * Returns a special value that can be used with {@link (setDoc:1)} or {@link
 * updateDoc:1} that tells the server to remove the given elements from any
 * array value that already exists on the server. All instances of each element
 * specified will be removed from the array. If the field being modified is not
 * already an array it will be overwritten with an empty array.
 *
 * @param elements - The elements to remove from the array.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`
 */


function Dr(...t) {
  // NOTE: We don't actually parse the data until it's used in set() or
  // update() since we'd need the Firestore instance to do this.
  return new Fn("arrayRemove", t);
}
/**
 * Returns a special value that can be used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link
 * @firebase/firestore/lite#(updateDoc:1)} that tells the server to increment the field's current value by
 * the given value.
 *
 * If either the operand or the current field value uses floating point
 * precision, all arithmetic follows IEEE 754 semantics. If both values are
 * integers, values outside of JavaScript's safe number range
 * (`Number.MIN_SAFE_INTEGER` to `Number.MAX_SAFE_INTEGER`) are also subject to
 * precision loss. Furthermore, once processed by the Firestore backend, all
 * integer operations are capped between -2^63 and 2^63-1.
 *
 * If the current field value is not of type `number`, or if the field does not
 * yet exist, the transformation sets the field to the given value.
 *
 * @param n - The value to increment by.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`
 */


function Nr(t) {
  return new qn("increment", t);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A write batch, used to perform multiple writes as a single atomic unit.
 *
 * A `WriteBatch` object can be acquired by calling {@link writeBatch}. It
 * provides methods for adding writes to the write batch. None of the writes
 * will be committed (or visible locally) until {@link WriteBatch.commit} is
 * called.
 */


class $r {
  /** @hideconstructor */
  constructor(t, e) {
    this._firestore = t, this._commitHandler = e, this._mutations = [], this._committed = !1, this._dataReader = Vn(t);
  }

  set(t, e, n) {
    this._verifyNotCommitted();

    const r = Sr(t, this._firestore),
          s = _r(r.converter, e, n),
          i = Dn(this._dataReader, "WriteBatch.set", r._key, s, null !== r.converter, n);

    return this._mutations.push(i.toMutation(r._key, ve.none())), this;
  }

  update(t, e, n, ...r) {
    this._verifyNotCommitted();

    const s = Sr(t, this._firestore); // For Compat types, we have to "extract" the underlying types before
    // performing validation.

    let i;
    return i = "string" == typeof (e = (0, _util.getModularInstance)(e)) || e instanceof yn ? Cn(this._dataReader, "WriteBatch.update", s._key, e, n, r) : On(this._dataReader, "WriteBatch.update", s._key, e), this._mutations.push(i.toMutation(s._key, ve.exists(!0))), this;
  }
  /**
   * Deletes the document referred to by the provided {@link DocumentReference}.
   *
   * @param documentRef - A reference to the document to be deleted.
   * @returns This `WriteBatch` instance. Used for chaining method calls.
   */


  delete(t) {
    this._verifyNotCommitted();

    const e = Sr(t, this._firestore);
    return this._mutations = this._mutations.concat(new Ie(e._key, ve.none())), this;
  }
  /**
   * Commits all of the writes in this write batch as a single atomic unit.
   *
   * The result of these writes will only be reflected in document reads that
   * occur after the returned promise resolves. If the client is offline, the
   * write fails. If you would like to see local modifications or buffer writes
   * until the client is online, use the full Firestore SDK.
   *
   * @returns A `Promise` resolved once all of the writes in the batch have been
   * successfully written to the backend as an atomic unit (note that it won't
   * resolve while you're offline).
   */


  commit() {
    return this._verifyNotCommitted(), this._committed = !0, this._mutations.length > 0 ? this._commitHandler(this._mutations) : Promise.resolve();
  }

  _verifyNotCommitted() {
    if (this._committed) throw new U(S, "A write batch can no longer be used after commit() has been called.");
  }

}

exports.WriteBatch = $r;

function Sr(t, e) {
  if ((t = (0, _util.getModularInstance)(t)).firestore !== e) throw new U(I, "Provided document reference is from a different Firestore instance.");
  return t;
}
/**
 * Creates a write batch, used for performing multiple writes as a single
 * atomic operation. The maximum number of writes allowed in a single WriteBatch
 * is 500.
 *
 * The result of these writes will only be reflected in document reads that
 * occur after the returned promise resolves. If the client is offline, the
 * write fails. If you would like to see local modifications or buffer writes
 * until the client is online, use the full Firestore SDK.
 *
 * @returns A `WriteBatch` that can be used to atomically execute multiple
 * writes.
 */


function xr(t) {
  const e = en(t = ot(t, rn));
  return new $r(t, t => Je(e, t));
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Internal transaction object responsible for accumulating the mutations to
 * perform and the base versions for any documents read.
 */


class Fr {
  constructor(t) {
    this.datastore = t, // The version of each document that was read during this transaction.
    this.readVersions = new Map(), this.mutations = [], this.committed = !1,
    /**
     * A deferred usage error that occurred previously in this transaction that
     * will cause the transaction to fail once it actually commits.
     */
    this.lastWriteError = null,
    /**
     * Set of documents that have been written in the transaction.
     *
     * When there's more than one write to the same key in a transaction, any
     * writes after the first are handled differently.
     */
    this.writtenDocs = new Set();
  }

  async lookup(t) {
    if (this.ensureCommitNotCalled(), this.mutations.length > 0) throw new U(I, "Firestore transactions require all reads to be executed before all writes.");
    const e = await Xe(this.datastore, t);
    return e.forEach(t => this.recordVersion(t)), e;
  }

  set(t, e) {
    this.write(e.toMutation(t, this.precondition(t))), this.writtenDocs.add(t.toString());
  }

  update(t, e) {
    try {
      this.write(e.toMutation(t, this.preconditionForUpdate(t)));
    } catch (t) {
      this.lastWriteError = t;
    }

    this.writtenDocs.add(t.toString());
  }

  delete(t) {
    this.write(new Ie(t, this.precondition(t))), this.writtenDocs.add(t.toString());
  }

  async commit() {
    if (this.ensureCommitNotCalled(), this.lastWriteError) throw this.lastWriteError;
    const t = this.readVersions; // For each mutation, note that the doc was written.

    this.mutations.forEach(e => {
      t.delete(e.key.toString());
    }), // For each document that was read but not written to, we want to perform
    // a `verify` operation.
    t.forEach((t, e) => {
      const n = et.fromPath(e);
      this.mutations.push(new Re(n, this.precondition(n)));
    }), await Je(this.datastore, this.mutations), this.committed = !0;
  }

  recordVersion(t) {
    let e;
    if (t.isFoundDocument()) e = t.version;else {
      if (!t.isNoDocument()) throw g(); // For deleted docs, we must use baseVersion 0 when we overwrite them.

      e = bt.min();
    }
    const n = this.readVersions.get(t.key.toString());

    if (n) {
      if (!e.isEqual(n)) // This transaction will fail no matter what.
        throw new U(x, "Document version changed between two reads.");
    } else this.readVersions.set(t.key.toString(), e);
  }
  /**
   * Returns the version of this document when it was read in this transaction,
   * as a precondition, or no precondition if it was not read.
   */


  precondition(t) {
    const e = this.readVersions.get(t.toString());
    return !this.writtenDocs.has(t.toString()) && e ? ve.updateTime(e) : ve.none();
  }
  /**
   * Returns the precondition for a document if the operation is an update.
   */


  preconditionForUpdate(t) {
    const e = this.readVersions.get(t.toString()); // The first time a document is written, we want to take into account the
    // read time and existence

    if (!this.writtenDocs.has(t.toString()) && e) {
      if (e.isEqual(bt.min())) // The document doesn't exist, so fail the transaction.
        // This has to be validated locally because you can't send a
        // precondition that a document does not exist without changing the
        // semantics of the backend write to be an insert. This is the reverse
        // of what we want, since we want to assert that the document doesn't
        // exist but then send the update and have it fail. Since we can't
        // express that to the backend, we have to validate locally.
        // Note: this can change once we can send separate verify writes in the
        // transaction.
        throw new U(I, "Can't update a document that doesn't exist."); // Document exists, base precondition on document update time.

      return ve.updateTime(e);
    } // Document was not read, so we just use the preconditions for a blind
    // update.


    return ve.exists(!0);
  }

  write(t) {
    this.ensureCommitNotCalled(), this.mutations.push(t);
  }

  ensureCommitNotCalled() {}

}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const qr = {
  maxAttempts: 5
};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * TransactionRunner encapsulates the logic needed to run and retry transactions
 * with backoff.
 */

class Or {
  constructor(t, e, n, r, s) {
    this.asyncQueue = t, this.datastore = e, this.options = n, this.updateFunction = r, this.deferred = s, this.Tt = n.maxAttempts, this.At = new He(this.asyncQueue, "transaction_retry"
    /* TransactionRetry */
    );
  }
  /** Runs the transaction and sets the result on deferred. */


  run() {
    this.Tt -= 1, this.It();
  }

  It() {
    this.At.W(async () => {
      const t = new Fr(this.datastore),
            e = this.Rt(t);
      e && e.then(e => {
        this.asyncQueue.enqueueAndForget(() => t.commit().then(() => {
          this.deferred.resolve(e);
        }).catch(t => {
          this.Pt(t);
        }));
      }).catch(t => {
        this.Pt(t);
      });
    });
  }

  Rt(t) {
    try {
      const e = this.updateFunction(t);
      return !ct(e) && e.catch && e.then ? e : (this.deferred.reject(Error("Transaction callback must return a Promise")), null);
    } catch (t) {
      // Do not retry errors thrown by user provided updateFunction.
      return this.deferred.reject(t), null;
    }
  }

  Pt(t) {
    this.Tt > 0 && this.Vt(t) ? (this.Tt -= 1, this.asyncQueue.enqueueAndForget(() => (this.It(), Promise.resolve()))) : this.deferred.reject(t);
  }

  Vt(t) {
    if ("FirebaseError" === t.name) {
      // In transactions, the backend will fail outdated reads with FAILED_PRECONDITION and
      // non-matching document versions with ABORTED. These errors should be retried.
      const e = t.code;
      return "aborted" === e || "failed-precondition" === e || !
      /**
      * Determines whether an error code represents a permanent error when received
      * in response to a non-write operation.
      *
      * See isPermanentWriteError for classifying write errors.
      */
      function (t) {
        switch (t) {
          default:
            return g();

          case T:
          case A:
          case R:
          case $:
          case O:
          case C: // Unauthenticated means something went wrong with our token and we need
          // to retry with new credentials which will happen automatically.

          case N:
            return !1;

          case I:
          case P:
          case V:
          case D:
          case S: // Aborted might be retried in some scenarios, but that is dependant on
          // the context and should handled individually by the calling code.
          // See https://cloud.google.com/apis/design/errors.

          case x:
          case F:
          case q:
          case L:
            return !0;
        }
      }(e);
    }

    return !1;
  }

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** The Platform's 'document' implementation or null if not available. */


function Cr() {
  // `document` is not always available, e.g. in ReactNative and WebWorkers.
  // eslint-disable-next-line no-restricted-globals
  return "undefined" != typeof document ? document : null;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Represents an operation scheduled to be run in the future on an AsyncQueue.
 *
 * It is created via DelayedOperation.createAndSchedule().
 *
 * Supports cancellation (via cancel()) and early execution (via skipDelay()).
 *
 * Note: We implement `PromiseLike` instead of `Promise`, as the `Promise` type
 * in newer versions of TypeScript defines `finally`, which is not available in
 * IE.
 */


class Lr {
  constructor(t, e, n, r, s) {
    this.asyncQueue = t, this.timerId = e, this.targetTimeMs = n, this.op = r, this.removalCallback = s, this.deferred = new k(), this.then = this.deferred.promise.then.bind(this.deferred.promise), // It's normal for the deferred promise to be canceled (due to cancellation)
    // and so we attach a dummy catch callback to avoid
    // 'UnhandledPromiseRejectionWarning' log spam.
    this.deferred.promise.catch(t => {});
  }
  /**
   * Creates and returns a DelayedOperation that has been scheduled to be
   * executed on the provided asyncQueue after the provided delayMs.
   *
   * @param asyncQueue - The queue to schedule the operation on.
   * @param id - A Timer ID identifying the type of operation this is.
   * @param delayMs - The delay (ms) before the operation should be scheduled.
   * @param op - The operation to run.
   * @param removalCallback - A callback to be called synchronously once the
   *   operation is executed or canceled, notifying the AsyncQueue to remove it
   *   from its delayedOperations list.
   *   PORTING NOTE: This exists to prevent making removeDelayedOperation() and
   *   the DelayedOperation class public.
   */


  static createAndSchedule(t, e, n, r, s) {
    const i = Date.now() + n,
          o = new Lr(t, e, i, r, s);
    return o.start(n), o;
  }
  /**
   * Starts the timer. This is called immediately after construction by
   * createAndSchedule().
   */


  start(t) {
    this.timerHandle = setTimeout(() => this.handleDelayElapsed(), t);
  }
  /**
   * Queues the operation to run immediately (if it hasn't already been run or
   * canceled).
   */


  skipDelay() {
    return this.handleDelayElapsed();
  }
  /**
   * Cancels the operation if it hasn't already been executed or canceled. The
   * promise will be rejected.
   *
   * As long as the operation has not yet been run, calling cancel() provides a
   * guarantee that the operation will not be run.
   */


  cancel(t) {
    null !== this.timerHandle && (this.clearTimeout(), this.deferred.reject(new U(T, "Operation cancelled" + (t ? ": " + t : ""))));
  }

  handleDelayElapsed() {
    this.asyncQueue.enqueueAndForget(() => null !== this.timerHandle ? (this.clearTimeout(), this.op().then(t => this.deferred.resolve(t))) : Promise.resolve());
  }

  clearTimeout() {
    null !== this.timerHandle && (this.removalCallback(this), clearTimeout(this.timerHandle), this.timerHandle = null);
  }

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


class Ur {
  constructor() {
    // The last promise in the queue.
    this.Dt = Promise.resolve(), // A list of retryable operations. Retryable operations are run in order and
    // retried with backoff.
    this.Nt = [], // Is this AsyncQueue being shut down? Once it is set to true, it will not
    // be changed again.
    this.$t = !1, // Operations scheduled to be queued in the future. Operations are
    // automatically removed after they are run or canceled.
    this.St = [], // visible for testing
    this.xt = null, // Flag set while there's an outstanding AsyncQueue operation, used for
    // assertion sanity-checks.
    this.Ft = !1, // Enabled during shutdown on Safari to prevent future access to IndexedDB.
    this.qt = !1, // List of TimerIds to fast-forward delays for.
    this.Ot = [], // Backoff timer used to schedule retries for retryable operations
    this.At = new He(this, "async_queue_retry"
    /* AsyncQueueRetry */
    ), // Visibility handler that triggers an immediate retry of all retryable
    // operations. Meant to speed up recovery when we regain file system access
    // after page comes into foreground.
    this.Ct = () => {
      const t = Cr();
      t && m("AsyncQueue", "Visibility state changed to " + t.visibilityState), this.At.H();
    };
    const t = Cr();
    t && "function" == typeof t.addEventListener && t.addEventListener("visibilitychange", this.Ct);
  }

  get isShuttingDown() {
    return this.$t;
  }
  /**
   * Adds a new operation to the queue without waiting for it to complete (i.e.
   * we ignore the Promise result).
   */


  enqueueAndForget(t) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.enqueue(t);
  }

  enqueueAndForgetEvenWhileRestricted(t) {
    this.Lt(), // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.Ut(t);
  }

  enterRestrictedMode(t) {
    if (!this.$t) {
      this.$t = !0, this.qt = t || !1;
      const e = Cr();
      e && "function" == typeof e.removeEventListener && e.removeEventListener("visibilitychange", this.Ct);
    }
  }

  enqueue(t) {
    if (this.Lt(), this.$t) // Return a Promise which never resolves.
      return new Promise(() => {}); // Create a deferred Promise that we can return to the callee. This
    // allows us to return a "hanging Promise" only to the callee and still
    // advance the queue even when the operation is not run.

    const e = new k();
    return this.Ut(() => this.$t && this.qt ? Promise.resolve() : (t().then(e.resolve, e.reject), e.promise)).then(() => e.promise);
  }

  enqueueRetryable(t) {
    this.enqueueAndForget(() => (this.Nt.push(t), this.kt()));
  }
  /**
   * Runs the next operation from the retryable queue. If the operation fails,
   * reschedules with backoff.
   */


  async kt() {
    if (0 !== this.Nt.length) {
      try {
        await this.Nt[0](), this.Nt.shift(), this.At.reset();
      } catch (t) {
        if (!
        /**
        * @license
        * Copyright 2017 Google LLC
        *
        * Licensed under the Apache License, Version 2.0 (the "License");
        * you may not use this file except in compliance with the License.
        * You may obtain a copy of the License at
        *
        *   http://www.apache.org/licenses/LICENSE-2.0
        *
        * Unless required by applicable law or agreed to in writing, software
        * distributed under the License is distributed on an "AS IS" BASIS,
        * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        * See the License for the specific language governing permissions and
        * limitations under the License.
        */

        /** Verifies whether `e` is an IndexedDbTransactionError. */
        function (t) {
          // Use name equality, as instanceof checks on errors don't work with errors
          // that wrap other errors.
          return "IndexedDbTransactionError" === t.name;
        }
        /**
        * @license
        * Copyright 2020 Google LLC
        *
        * Licensed under the Apache License, Version 2.0 (the "License");
        * you may not use this file except in compliance with the License.
        * You may obtain a copy of the License at
        *
        *   http://www.apache.org/licenses/LICENSE-2.0
        *
        * Unless required by applicable law or agreed to in writing, software
        * distributed under the License is distributed on an "AS IS" BASIS,
        * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        * See the License for the specific language governing permissions and
        * limitations under the License.
        */
        (t)) throw t; // Failure will be handled by AsyncQueue

        m("AsyncQueue", "Operation failed with retryable error: " + t);
      }

      this.Nt.length > 0 && // If there are additional operations, we re-schedule `retryNextOp()`.
      // This is necessary to run retryable operations that failed during
      // their initial attempt since we don't know whether they are already
      // enqueued. If, for example, `op1`, `op2`, `op3` are enqueued and `op1`
      // needs to  be re-run, we will run `op1`, `op1`, `op2` using the
      // already enqueued calls to `retryNextOp()`. `op3()` will then run in the
      // call scheduled here.
      // Since `backoffAndRun()` cancels an existing backoff and schedules a
      // new backoff on every call, there is only ever a single additional
      // operation in the queue.
      this.At.W(() => this.kt());
    }
  }

  Ut(t) {
    const e = this.Dt.then(() => (this.Ft = !0, t().catch(t => {
      this.xt = t, this.Ft = !1;

      const e =
      /**
      * Chrome includes Error.message in Error.stack. Other browsers do not.
      * This returns expected output of message + stack when available.
      * @param error - Error or FirestoreError
      */
      function (t) {
        let e = t.message || "";
        t.stack && (e = t.stack.includes(t.message) ? t.stack : t.message + "\n" + t.stack);
        return e;
      }
      /**
      * @license
      * Copyright 2020 Google LLC
      *
      * Licensed under the Apache License, Version 2.0 (the "License");
      * you may not use this file except in compliance with the License.
      * You may obtain a copy of the License at
      *
      *   http://www.apache.org/licenses/LICENSE-2.0
      *
      * Unless required by applicable law or agreed to in writing, software
      * distributed under the License is distributed on an "AS IS" BASIS,
      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      * See the License for the specific language governing permissions and
      * limitations under the License.
      */
      // TODO(mrschmidt) Consider using `BaseTransaction` as the base class in the
      // legacy SDK.

      /**
      * A reference to a transaction.
      *
      * The `Transaction` object passed to a transaction's `updateFunction` provides
      * the methods to read and write data within the transaction context. See
      * {@link runTransaction}.
      */
      (t); // Re-throw the error so that this.tail becomes a rejected Promise and
      // all further attempts to chain (via .then) will just short-circuit
      // and return the rejected Promise.


      throw p("INTERNAL UNHANDLED ERROR: ", e), t;
    }).then(t => (this.Ft = !1, t))));
    return this.Dt = e, e;
  }

  enqueueAfterDelay(t, e, n) {
    this.Lt(), // Fast-forward delays for timerIds that have been overriden.
    this.Ot.indexOf(t) > -1 && (e = 0);
    const r = Lr.createAndSchedule(this, t, e, n, t => this.jt(t));
    return this.St.push(r), r;
  }

  Lt() {
    this.xt && g();
  }

  verifyOperationInProgress() {}
  /**
   * Waits until all currently queued tasks are finished executing. Delayed
   * operations are not run.
   */


  async Mt() {
    // Operations in the queue prior to draining may have enqueued additional
    // operations. Keep draining the queue until the tail is no longer advanced,
    // which indicates that no more new operations were enqueued and that all
    // operations were executed.
    let t;

    do {
      t = this.Dt, await t;
    } while (t !== this.Dt);
  }
  /**
   * For Tests: Determine if a delayed operation with a particular TimerId
   * exists.
   */


  Bt(t) {
    for (const e of this.St) if (e.timerId === t) return !0;

    return !1;
  }
  /**
   * For Tests: Runs some or all delayed operations early.
   *
   * @param lastTimerId - Delayed operations up to and including this TimerId
   * will be drained. Pass TimerId.All to run all delayed operations.
   * @returns a Promise that resolves once all operations have been run.
   */


  zt(t) {
    // Note that draining may generate more delayed ops, so we do that first.
    return this.Mt().then(() => {
      // Run ops in the same order they'd run if they ran naturally.
      this.St.sort((t, e) => t.targetTimeMs - e.targetTimeMs);

      for (const e of this.St) if (e.skipDelay(), "all"
      /* All */
      !== t && e.timerId === t) break;

      return this.Mt();
    });
  }
  /**
   * For Tests: Skip all subsequent delays for a timer id.
   */


  Gt(t) {
    this.Ot.push(t);
  }
  /** Called once a DelayedOperation is run or canceled. */


  jt(t) {
    // NOTE: indexOf / slice are O(n), but delayedOperations is expected to be small.
    const e = this.St.indexOf(t);
    this.St.splice(e, 1);
  }

}

class kr {
  /** @hideconstructor */
  constructor(t, e) {
    this._firestore = t, this._transaction = e, this._dataReader = Vn(t);
  }
  /**
   * Reads the document referenced by the provided {@link DocumentReference}.
   *
   * @param documentRef - A reference to the document to be read.
   * @returns A `DocumentSnapshot` with the read data.
   */


  get(t) {
    const e = Sr(t, this._firestore),
          n = new gr(this._firestore);
    return this._transaction.lookup([e._key]).then(t => {
      if (!t || 1 !== t.length) return g();
      const r = t[0];
      if (r.isFoundDocument()) return new Yn(this._firestore, n, r.key, r, e.converter);
      if (r.isNoDocument()) return new Yn(this._firestore, n, e._key, null, e.converter);
      throw g();
    });
  }

  set(t, e, n) {
    const r = Sr(t, this._firestore),
          s = _r(r.converter, e, n),
          i = Dn(this._dataReader, "Transaction.set", r._key, s, null !== r.converter, n);

    return this._transaction.set(r._key, i), this;
  }

  update(t, e, n, ...r) {
    const s = Sr(t, this._firestore); // For Compat types, we have to "extract" the underlying types before
    // performing validation.

    let i;
    return i = "string" == typeof (e = (0, _util.getModularInstance)(e)) || e instanceof yn ? Cn(this._dataReader, "Transaction.update", s._key, e, n, r) : On(this._dataReader, "Transaction.update", s._key, e), this._transaction.update(s._key, i), this;
  }
  /**
   * Deletes the document referred to by the provided {@link DocumentReference}.
   *
   * @param documentRef - A reference to the document to be deleted.
   * @returns This `Transaction` instance. Used for chaining method calls.
   */


  delete(t) {
    const e = Sr(t, this._firestore);
    return this._transaction.delete(e._key), this;
  }

}
/**
 * Executes the given `updateFunction` and then attempts to commit the changes
 * applied within the transaction. If any document read within the transaction
 * has changed, Cloud Firestore retries the `updateFunction`. If it fails to
 * commit after 5 attempts, the transaction fails.
 *
 * The maximum number of writes allowed in a single transaction is 500.
 *
 * @param firestore - A reference to the Firestore database to run this
 * transaction against.
 * @param updateFunction - The function to execute within the transaction
 * context.
 * @returns If the transaction completed successfully or was explicitly aborted
 * (the `updateFunction` returned a failed promise), the promise returned by the
 * `updateFunction `is returned here. Otherwise, if the transaction failed, a
 * rejected promise with the corresponding failure error is returned.
 */


exports.Transaction = kr;

function jr(t, e, n) {
  const r = en(t = ot(t, rn)),
        s = Object.assign(Object.assign({}, qr), n);
  !function (t) {
    if (t.maxAttempts < 1) throw new U(I, "Max attempts must be at least 1");
  }(s);
  const i = new k();
  return new Or(new Ur(), r, s, n => e(new kr(t, n)), i).run(), i.promise;
}
/**
 * Firestore Lite
 *
 * @remarks Firestore Lite is a small online-only SDK that allows read
 * and write access to your Firestore database. All operations connect
 * directly to the backend, and `onSnapshot()` APIs are not supported.
 * @packageDocumentation
 */


!function (t) {
  f = t;
}(`${_app.SDK_VERSION}_lite`), (0, _app._registerComponent)(new _component.Component("firestore/lite", (t, {
  options: e
}) => {
  const n = t.getProvider("app").getImmediate(),
        r = new rn(n, new z(t.getProvider("auth-internal")), new Y(t.getProvider("app-check-internal")));
  return e && r._setSettings(e), r;
}, "PUBLIC")), // RUNTIME_ENV and BUILD_TARGET are replaced by real values during the compilation
(0, _app.registerVersion)("firestore-lite", "3.4.9", ""), (0, _app.registerVersion)("firestore-lite", "3.4.9", "esm2017");
},{"@firebase/app":"e9459d5b84e577cc173668c671fb9cf6","@firebase/component":"351eabb5683e6da26cad6da070d97fac","@firebase/logger":"3a15e19ab036c3aaea02d8f124f3414e","@firebase/util":"139df1de1dfe98902ec8f2cbbe4db2c1"}]},{},["17687899992a6e792a525d64209a395a","eb397b394ebff17b5f4b9224cf897db4"], null)

//# sourceMappingURL=index.js.map
