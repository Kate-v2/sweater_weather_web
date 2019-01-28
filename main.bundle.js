/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _nav_bar = __webpack_require__(1);

	var _nav_bar2 = _interopRequireDefault(_nav_bar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var nav = new _nav_bar2.default();

	nav.loadNav();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _dom_tools = __webpack_require__(2);

	var _dom_tools2 = _interopRequireDefault(_dom_tools);

	var _forecast = __webpack_require__(3);

	var _forecast2 = _interopRequireDefault(_forecast);

	var _user_session = __webpack_require__(4);

	var _user_session2 = _interopRequireDefault(_user_session);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var tool = new _dom_tools2.default();

	var forecast = new _forecast2.default();

	var user = new _user_session2.default();

	var NavBar = function () {
	  function NavBar() {
	    _classCallCheck(this, NavBar);
	  }

	  _createClass(NavBar, [{
	    key: 'loadNav',
	    value: function loadNav() {
	      var nav = tool.byId('navBar');
	      tool.clearHTML(nav);
	      forecast.buildSearchBar(nav);
	      this.key() ? this.buildFavoritesButton(nav) : this.buildRegisterButton(nav);
	      this.buildSessionButton(nav);
	    }
	  }, {
	    key: 'key',
	    value: function key() {
	      return sessionStorage.getItem('api_key');
	    }

	    // ---- Buttons ----

	    // logout() {
	    //   user.clearSession()
	    //   this.loadNav()
	    // }

	    // login() {
	    //
	    // }


	    // ---- HTML ----

	  }, {
	    key: 'makeNavButton',
	    value: function makeNavButton(id, text) {
	      var button = this.navSpan();
	      button.id = id;
	      tool.appendText(button, text);
	      return button;
	    }
	  }, {
	    key: 'navSpan',
	    value: function navSpan() {
	      var navSpan = document.createElement("span");
	      navSpan.className = 'nav_element';
	      return navSpan;
	    }
	  }, {
	    key: 'buildFavoritesButton',
	    value: function buildFavoritesButton(nav) {
	      var favorites = this.makeNavButton("favorites", "Favorites");
	      nav.appendChild(favorites);
	    }
	  }, {
	    key: 'buildRegisterButton',
	    value: function buildRegisterButton(nav) {
	      var register = this.makeNavButton('register', 'Register');
	      register.addEventListener('click', function () {
	        user.registerUser();
	      });
	      nav.appendChild(register);
	    }
	  }, {
	    key: 'buildSessionButton',
	    value: function buildSessionButton(nav) {
	      var txt = this.key() ? "Logout" : 'Login';
	      var seshButton = this.makeNavButton('session', txt);
	      seshButton.addEventListener('click', function () {
	        user.loginUserForm();
	      });
	      seshButton.addEventListener('click', function () {
	        user.clearSession();
	      });
	      // seshButton.addEventListener('click', function() { this.logout() } )
	      nav.appendChild(seshButton);
	    }
	  }]);

	  return NavBar;
	}();

	exports.default = NavBar;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DOMTools = function () {
	  function DOMTools() {
	    _classCallCheck(this, DOMTools);
	  }

	  _createClass(DOMTools, [{
	    key: 'byId',
	    value: function byId(id) {
	      return document.getElementById(id);
	    }
	  }, {
	    key: 'clearHTML',
	    value: function clearHTML(element) {
	      element.innerHTML = '';
	    }
	  }, {
	    key: 'clearValue',
	    value: function clearValue(element) {
	      element.value = '';
	    }
	  }, {
	    key: 'addDiv',
	    value: function addDiv(element) {
	      var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	      var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	      var div = document.createElement('div');
	      if (id) {
	        div.id = id;
	      }
	      if (className) {
	        div.className = className;
	      }
	      element.appendChild(div);
	      return div;
	    }
	  }, {
	    key: 'addSpan',
	    value: function addSpan(element) {
	      var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	      var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	      var span = document.createElement('span');
	      if (id) {
	        span.id = id;
	      }
	      if (className) {
	        span.className = className;
	      }
	      element.appendChild(span);
	      return span;
	    }
	  }, {
	    key: 'makeInput',
	    value: function makeInput(type) {
	      var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	      var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	      var field = document.createElement("INPUT");
	      field.setAttribute("type", type);
	      if (id) {
	        field.id = id;
	      }
	      if (className) {
	        field.className = className;
	      }
	      return field;
	    }
	  }, {
	    key: 'appendText',
	    value: function appendText(element, text) {
	      var node = document.createTextNode(text);
	      element.appendChild(node);
	    }
	  }]);

	  return DOMTools;
	}();

	exports.default = DOMTools;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _dom_tools = __webpack_require__(2);

	var _dom_tools2 = _interopRequireDefault(_dom_tools);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var tool = new _dom_tools2.default();

	var Forecast = function () {
	  function Forecast() {
	    _classCallCheck(this, Forecast);
	  }

	  _createClass(Forecast, [{
	    key: 'buildSearchBar',


	    // ---- Search ----

	    value: function buildSearchBar(element) {
	      var field = tool.makeInput('text', 'navSearch', 'nav_element');
	      element.appendChild(field);
	      field = tool.byId('navSearch');
	      field.placeholder = "Search for a US City";
	      this.buildSearchSubmit(element);
	    }
	  }, {
	    key: 'buildSearchSubmit',
	    value: function buildSearchSubmit(element) {
	      var submit = tool.makeInput('submit', 'navSearchButton', 'nav_element');
	      element.appendChild(submit);
	      submit = tool.byId('navSearchButton');
	      submit.addEventListener('click', function () {
	        this.getForecast();
	      });
	    }

	    // ---- Request ----

	  }, {
	    key: 'getForecast',
	    value: function getForecast() {}
	  }]);

	  return Forecast;
	}();

	exports.default = Forecast;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _dom_tools = __webpack_require__(2);

	var _dom_tools2 = _interopRequireDefault(_dom_tools);

	var _nav_bar = __webpack_require__(1);

	var _nav_bar2 = _interopRequireDefault(_nav_bar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var tool = new _dom_tools2.default();

	var nav = new _nav_bar2.default();

	var UserSession = function () {
	  function UserSession() {
	    _classCallCheck(this, UserSession);
	  }

	  _createClass(UserSession, [{
	    key: 'clearSession',


	    // ---- Logout ----

	    value: function clearSession() {
	      sessionStorage.setItem('api_key', null);
	      nav.loadNav();
	    }

	    // ---- Register ----

	  }, {
	    key: 'registerUser',
	    value: function registerUser() {
	      var content = tool.byId('content');
	      tool.clearHTML(content);
	      this.buildRegisterForm(content);
	    }
	  }, {
	    key: 'buildRegisterForm',
	    value: function buildRegisterForm(element) {
	      var form = tool.addSpan(element, 'registerFrom', null);
	      this.emailField(form);
	      this.passwordField(form);
	      this.passwordConfirmationField(form);
	      this.registerSubmit(form);
	    }
	  }, {
	    key: 'makeUser',
	    value: function makeUser() {
	      var user = newUser();
	      this.makePostRequest(user);
	    }
	  }, {
	    key: 'newUser',
	    value: function newUser() {
	      var user = {
	        'verb': 'POST',
	        'url': 'https://sweater-weather-api-app.herokuapp.com/api/v1/users',
	        'body': {
	          'email': tool.byId('emailField').value,
	          'password': tool.byId('passwordField').value,
	          'password_confirmation': tool.byId('confirmField').value
	        }
	      };
	      return user;
	    }

	    // ---- Login ----

	  }, {
	    key: 'loginUserForm',
	    value: function loginUserForm() {
	      var content = tool.byId('content');
	      tool.clearHTML(content);
	      var form = tool.addSpan(content, 'loginFrom', null);
	      this.emailField(form);
	      this.passwordField(form);
	      this.loginSubmit(form);
	    }
	  }, {
	    key: 'loginUser',
	    value: function loginUser() {
	      var user = user();
	      this.makePostRequest(user);
	    }
	  }, {
	    key: 'user',
	    value: function user() {
	      var user = {
	        'verb': 'POST',
	        'url': 'https://sweater-weather-api-app.herokuapp.com/api/v1/sessions',
	        'body': {
	          'email': tool.byId('emailField').value,
	          'password': tool.byId('passwordField').value
	        }
	        // 'display': 'login'
	      };
	      return user;
	    }

	    // ---- API ----

	  }, {
	    key: 'makePostRequest',
	    value: function makePostRequest(obj) {
	      var verb = obj['verb'];
	      var url = obj['url'];
	      var body = obj['body'];

	      var data;
	      var req = new XMLHttpRequest();
	      req.open(verb, url);
	      req.setRequestHeader("CCONTENT_TYPE", "application/json");
	      req.setRequestHeader("ACCEPT", "application/json");
	      req.onload = function () {
	        var stat = this.status;
	        var valid = stat >= 200 && stat < 300;
	        if (valid) {
	          data = JSON.parse(this.responseText);
	          this.newSession(data);
	        } else {
	          this.badCredentials();
	        }
	      };
	      var blob = new Blob([JSON.stringify(body)], { type: 'application/json' });
	      req.send(blob);
	    }
	  }, {
	    key: 'badCredentials',
	    value: function badCredentials() {
	      var feedback = tool.byId('feedback');
	      tool.clearHTML(feedback);
	      var msg = "Sorry, something went wrong.";
	      tool.appendText(feedback, msg);
	    }
	  }, {
	    key: 'newSession',
	    value: function newSession(data) {
	      var key = data['data']['attributes']['api_key'];
	      sessionStorage.setItem('api_key', key);
	      // navigation.loadNav()
	      nav.loadNav();
	      this.nowLoggedIn();
	    }
	  }, {
	    key: 'nowLoggedIn',
	    value: function nowLoggedIn() {
	      var feedback = tool.byId('feedback');
	      tool.clearHTML(feedback);
	      var msg = "You're now logged in, please explore and add favorite locations!";
	      tool.appendText(feedback, msg);
	      var content = tool.byId('content');
	      tool.clearHTML(content);
	    }

	    // ---- HTML Fields ----

	  }, {
	    key: 'emailField',
	    value: function emailField(form) {
	      var email = tool.addDiv(form, 'email', 'row');
	      var title = tool.addSpan(email, null, 'title');
	      tool.appendText(title, "Email");
	      var field = tool.addSpan(email, 'email', 'field');
	      field.appendChild(tool.makeInput('text', 'emailField', null));
	    }
	  }, {
	    key: 'passwordField',
	    value: function passwordField(form) {
	      var password = tool.addDiv(form, 'password', 'row');
	      var title = tool.addSpan(password, null, 'title');
	      tool.appendText(title, "Password");
	      var field = tool.addSpan(password, 'password', 'field');
	      field.appendChild(tool.makeInput('password', 'passwordField', null));
	    }
	  }, {
	    key: 'passwordConfirmationField',
	    value: function passwordConfirmationField(form) {
	      var confirm = tool.addDiv(form, 'confrim', 'row');
	      var title = tool.addSpan(confirm, null, 'title');
	      tool.appendText(title, "Confirm Password");
	      var field = tool.addSpan(confirm, 'confirm', 'field');
	      field.appendChild(tool.makeInput('password', 'confirmField', null));
	    }
	  }, {
	    key: 'registerSubmit',
	    value: function registerSubmit(form) {
	      var submit = tool.addDiv(form, 'submit', 'row');
	      var button = tool.makeInput('submit', 'registerSubmit', null);
	      button.addEventListener('click', function () {
	        this.makeUser();
	      });
	      submit.appendChild(button);
	      form.appendChild(submit);
	    }
	  }, {
	    key: 'loginSubmit',
	    value: function loginSubmit(form) {
	      var submit = tool.addDiv(form, 'submit', 'row');
	      var button = tool.makeInput('submit', 'loginSubmit', null);
	      button.addEventListener('click', function () {
	        this.loginUser();
	      });
	      submit.appendChild(button);
	      form.appendChild(submit);
	    }
	  }]);

	  return UserSession;
	}();

	exports.default = UserSession;

/***/ })
/******/ ]);