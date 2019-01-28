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

	var _dom_tools = __webpack_require__(1);

	var _dom_tools2 = _interopRequireDefault(_dom_tools);

	var _forecast = __webpack_require__(2);

	var _forecast2 = _interopRequireDefault(_forecast);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var tool = new _dom_tools2.default();

	var forecast = new _forecast2.default();

	var session = false;

	loadNav();

	function loadNav() {
	  var nav = tool.byId('navBar');
	  tool.clearHTML(nav);
	  addSearchBar(nav);
	  session ? addFavoritesButton(nav) : addRegisterButton(nav);
	  addSessionButton(nav); // TO DO - make this two buttons like above, SRP the function
	}

	// ---- Session ----

	function registerUser() {
	  var content = tool.byId('content');
	  tool.clearHTML(content);

	  var feedback = tool.byId('feedback');
	  tool.clearHTML(feedback);

	  registerForm(content);
	}

	function registerForm(element) {
	  var form = tool.addSpan(content, 'registerForm', null);

	  emailField(form);
	  passwordField(form);
	  passwordFieldConfirmation(form);

	  var submit = tool.addDiv(form, 'submit', 'row');
	  addRegisterSubmit(submit);
	}

	function emailField(form) {
	  var email = tool.addDiv(form, 'email', 'row');
	  var title = tool.addSpan(email, null, 'title');
	  tool.appendText(title, "Email");
	  var field = tool.addSpan(email, 'email', 'field');
	  field.appendChild(makeInput('text', 'emailField', null));
	}

	function passwordField(form) {
	  var password = tool.addDiv(form, 'password', 'row');
	  var title = tool.addSpan(password, null, 'title');
	  tool.appendText(title, "Password");
	  var field = tool.addSpan(password, 'password', 'field');
	  field.appendChild(makeInput('password', 'passwordField', null));
	}

	function passwordFieldConfirmation(form) {
	  var confirm = tool.addDiv(form, 'confrim', 'row');
	  var title = tool.addSpan(confirm, null, 'title');
	  tool.appendText(title, "Confirm Password");
	  var field = tool.addSpan(confirm, 'confirm', 'field');
	  field.appendChild(makeInput('password', 'confirmField', null));
	}

	function makeUser() {
	  var cred = {
	    'verb': 'POST',
	    'url': 'https://sweater-weather-api-app.herokuapp.com/api/v1/users',
	    'body': {
	      'email': tool.byId('emailField').value,
	      'password': tool.byId('passwordField').value,
	      'password_confirmation': tool.byId('confirmField').value
	    },
	    'display': 'register'
	  };
	  makePostRequest(cred);
	}

	function makePostRequest(obj) {
	  var verb = obj['verb'];
	  var url = obj['url'];
	  var body = obj['body'];
	  var display = obj['display'];

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
	      assessPost(data, display);
	    } else {
	      badCredentials();
	    }
	  };
	  var blob = new Blob([JSON.stringify(body)], { type: 'application/json' });
	  req.send(blob);
	}

	function badCredentials() {
	  var feedback = tool.byId('feedback');
	  tool.clearHTML(feedback);
	  var msg = "Sorry, something went wrong.";
	  tool.appendText(feedback, msg);
	}

	function assessPost(data, display) {
	  if (display == 'register' || display == 'login') {
	    newSession(data);
	  }
	}

	function newSession(data) {
	  var key = data['data']['attributes']['api_key'];
	  sessionStorage.setItem('api_key', key);
	  session = true;
	  loadNav();
	  nowLoggedIn();
	}

	function nowLoggedIn() {
	  var feedback = tool.byId('feedback');
	  tool.clearHTML(feedback);
	  var msg = "You're now logged in, please explore and add favorite locations!";
	  tool.appendText(feedback, msg);
	  var content = tool.byId('content');
	  tool.clearHTML(content);
	}

	function clearSession() {
	  sessionStorage.setItem('api_key', null);
	  session = false;
	  loadNav();
	  var feedback = tool.byId('feedback');
	  tool.clearHTML(feedback);
	}

	function loginUserForm() {
	  var content = tool.byId('content');
	  tool.clearHTML(content);

	  var feedback = tool.byId('feedback');
	  tool.clearHTML(feedback);

	  var form = tool.addSpan(content, 'loginForm', null);
	  emailField(form);
	  passwordField(form);

	  var submit = tool.addDiv(form, 'submit', 'row');
	  addLoginSubmit(submit);
	}

	function loginUser() {
	  var cred = {
	    'verb': 'POST',
	    'url': 'https://sweater-weather-api-app.herokuapp.com/api/v1/sessions',
	    'body': {
	      'email': tool.byId('emailField').value,
	      'password': tool.byId('passwordField').value
	    },
	    'display': 'login'
	  };
	  makePostRequest(cred);
	}

	// ---- Structure -----

	function addSearchBar(nav) {
	  var field = makeInput('text', 'navSearch', 'nav_element');
	  nav.appendChild(field);
	  field = tool.byId('navSearch');
	  field.placeholder = "Search for a US City";
	  addSearchSubmit(nav);
	}

	function addSearchSubmit(nav) {
	  var submit = makeInput('submit', 'navSearchButton', 'nav_element');
	  nav.appendChild(submit);
	  submit = tool.byId('navSearchButton');
	  // submit.addEventListener('click', function() { getForecast() } )
	  submit.addEventListener('click', function () {
	    forecast.getForecast();
	  });
	}

	// TO DO - Merge these submit functions

	function addRegisterSubmit(element) {
	  var submit = makeInput('submit', 'registerSubmit', null);
	  submit.addEventListener('click', function () {
	    makeUser();
	  });
	  element.appendChild(submit);
	}

	function addLoginSubmit(element) {
	  var submit = makeInput('submit', 'loginSubmit', null);
	  submit.addEventListener('click', function () {
	    loginUser();
	  });
	  element.appendChild(submit);
	}

	function addFavoritesButton(nav) {
	  var favorites = makeNavButton("favorites", "Favorites");
	  nav.appendChild(favorites);
	}

	function addRegisterButton(nav) {
	  var register = makeNavButton('register', 'Register');
	  register.addEventListener('click', function () {
	    registerUser();
	  });
	  nav.appendChild(register);
	}

	function addSessionButton(nav) {
	  var txt = session ? "Logout" : 'Login';
	  var seshButton = makeNavButton('session', txt);
	  seshButton.addEventListener('click', function () {
	    loginUserForm();
	  });
	  seshButton.addEventListener('click', function () {
	    clearSession();
	  });
	  nav.appendChild(seshButton);
	}

	// ---- General HTML Elements ----

	function makeNavButton(id, text) {
	  var button = navSpan();
	  button.id = id;
	  tool.appendText(button, text);
	  return button;
	}

	function navSpan() {
	  var navSpan = document.createElement("span");
	  navSpan.className = 'nav_element';
	  return navSpan;
	}

	// TO DO - make navSpan() more like this
	function makeInput(type) {
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

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _dom_tools = __webpack_require__(1);

	var _dom_tools2 = _interopRequireDefault(_dom_tools);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var tool = new _dom_tools2.default();

	var Forecast = function () {
	  function Forecast() {
	    _classCallCheck(this, Forecast);
	  }

	  _createClass(Forecast, [{
	    key: 'getForecast',
	    value: function getForecast() {
	      var city = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

	      var location = city ? city : tool.byId('navSearch').value;
	      var obj = {
	        'verb': 'GET',
	        'url': 'https://sweater-weather-api-app.herokuapp.com/api/v1/forecasts?location=',
	        'term': location,
	        'display': 'forecast'
	      };
	      this.makeGetRequest(obj);
	    }
	  }, {
	    key: 'displayForecast',
	    value: function displayForecast(data) {

	      tool.clearValue(tool.byId('navSearch'));

	      var content = tool.byId('content');
	      tool.clearHTML(content);

	      var feedback = tool.byId('feedback');
	      tool.clearHTML(feedback);

	      var info = data['data']['attributes'];

	      var location = info['location'];
	      var today = info['today'];
	      var current = info['current'];
	      var forecast = info['forecast']['data']['attributes'];

	      var showToday = {
	        'gif': null,
	        'desc': current['summary'],
	        'temp': current['temperature'] + '\xB0',
	        'high': today['high'] + '\xB0',
	        'low': today['low'] + '\xB0',
	        'city': location['city']['long_name'],
	        'state': location['state']['short_name'],
	        'country': location['country']['long_name'],
	        'time': current['time']
	      };

	      var overview = tool.addDiv(content, 'overview', null);

	      this.displayToday(showToday, overview);

	      var showCurrent = {
	        'gif': null,
	        'desc': current['summary'],
	        'today': forecast['hourly'][11]['icon'],
	        'tonight': forecast['hourly'][22]['icon'],
	        'feels_like': current['feels_like'] + '\xB0',
	        'humidity': today['humidity'] * 100 + '%',
	        'visibility': today['visibility'] + ' miles',
	        'uv_index': today['uv_index'] + ' ' + (today['uv_index'] <= 5 ? "(low)" : "(high)")
	      };

	      this.displayCurrent(showCurrent, overview);
	    }
	  }, {
	    key: 'displayToday',
	    value: function displayToday(data, element) {

	      var cityState = data['city'] + ', ' + data['state'];
	      var highLow = "High: " + data['high'] + " Low: " + data['low'];

	      // let showToday = tool.addDiv(element, 'today', 'overview')
	      var showToday = tool.addSpan(element, 'today', 'overview');

	      var today1 = tool.addSpan(showToday, 'today1_temp', 'today');
	      var today1_1 = tool.addDiv(today1, 'today1_1', 'today1');
	      var today1_gif = tool.addSpan(today1_1, 'today1_gif', 'today1_1');
	      tool.appendText(today1_gif, "IMG"); // TO DO - add gif image
	      var today1_desc = tool.addSpan(today1_1, 'today1_desc', 'today1_1');
	      tool.appendText(today1_desc, data['desc']);
	      var today1_2 = tool.addDiv(today1, 'today1_2', 'today1');
	      tool.appendText(today1_2, data['temp']);
	      var today1_3 = tool.addDiv(today1, 'today1_3', 'today1');
	      tool.appendText(today1_3, highLow);

	      var today2 = tool.addSpan(showToday, 'today2_location', 'today');
	      var today2_1 = tool.addDiv(today2, 'today2_1', 'today2');
	      tool.appendText(today2_1, cityState);
	      var today2_2 = tool.addDiv(today2, 'today2_2', 'today2');
	      tool.appendText(today2_2, data['country']);
	      var today2_3 = tool.addDiv(today2, 'today2_3', 'today2');
	      tool.appendText(today2_3, data['time']);

	      var today3 = tool.addSpan(showToday, 'today2_location', 'today');
	      var today3_1 = tool.addDiv(today3, 'today3_1', 'today3');
	      tool.appendText(today3_1, "Change Location");
	      var today3_2 = tool.addDiv(today3, 'today3_2', 'today3');
	      tool.appendText(today3_2, "Add to Favorites");
	    }
	  }, {
	    key: 'displayCurrent',
	    value: function displayCurrent(data, element) {

	      var showCurrent = tool.addSpan(element, 'current', 'overview');

	      var title = tool.addDiv(showCurrent, 'CurrentTitle', null);
	      tool.appendText(title, "Details");

	      var current = tool.addDiv(showCurrent, 'currentContainer', null);

	      var current1 = tool.addSpan(current, 'current1', 'current');
	      var current1_1 = tool.addSpan(current1, 'currentGif', null);
	      tool.appendText(current1_1, "IMG"); // TO DO - add gif image

	      var current1_2 = tool.addSpan(current1, 'currentDesc', null);
	      tool.appendText(current1_2, data["desc"]);

	      var current1_3 = tool.addSpan(current1, 'currentToday', null);
	      tool.appendText(current1_3, 'Today: ' + data["today"]);

	      var current1_4 = tool.addSpan(current1, 'currentTonight', null);
	      tool.appendText(current1_4, 'Tonight: ' + data["tonight"]);

	      var current2 = tool.addSpan(current, 'current2', 'current');
	      var current2_1 = tool.addDiv(current2, 'current2_1', null);
	      var current2_1_title = tool.addSpan(current2_1, null, 'currentTitle');
	      tool.appendText(current2_1_title, "Feels Like");
	      var current2_1_data = tool.addSpan(current2_1, null, 'currentData');
	      tool.appendText(current2_1_data, data['feels_like']);

	      var current2_2 = tool.addDiv(current2, 'current2_2', null);
	      var current2_2_title = tool.addSpan(current2_2, null, 'currentTitle');
	      tool.appendText(current2_2_title, "Humidity");
	      var current2_2_data = tool.addSpan(current2_2, null, 'currentData');
	      tool.appendText(current2_2_data, data['humidity']);

	      var current2_3 = tool.addDiv(current2, 'current2_3', null);
	      var current2_3_title = tool.addSpan(current2_3, null, 'currentTitle');
	      tool.appendText(current2_3_title, "Visibility");
	      var current2_3_data = tool.addSpan(current2_3, null, 'currentData');
	      tool.appendText(current2_3_data, data['visibility']);

	      var current2_4 = tool.addDiv(current2, 'current2_4', null);
	      var current2_4_title = tool.addSpan(current2_4, null, 'currentTitle');
	      tool.appendText(current2_4_title, "UV Index");
	      var current2_4_data = tool.addSpan(current2_4, null, 'currentData');
	      tool.appendText(current2_4_data, data['uv_index']);
	    }

	    // ---- API -----

	  }, {
	    key: 'makeGetRequest',
	    value: function makeGetRequest(obj) {
	      var verb = obj['verb'];
	      var url = obj['url'];
	      var term = obj['term'];
	      var endpoint = url + term;

	      var data;
	      var req = new XMLHttpRequest();
	      req.open(verb, endpoint, true);
	      req.onload = function () {
	        var stat = this.status;
	        var valid = stat >= 200 && stat < 300;
	        if (valid) {
	          data = JSON.parse(this.responseText);
	          // I tried lots of things to get a callback to work, and nothing did..
	          // so this feels terrible, but it works...
	          var forecast = new Forecast();
	          forecast.assessDisplay(data, obj['display']);
	        } else {
	          this.badLocation();
	        }
	      };
	      req.send();
	    }
	  }, {
	    key: 'badLocation',
	    value: function badLocation() {
	      var feedback = tool.byId('feedback');
	      tool.clearHTML(feedback);
	      var msg = "Sorry, that location does not exist. Check spelling or try another location.";
	      tool.appendText(feedback, msg);
	      // TO DO - grab all location search bars & clear them
	    }
	  }, {
	    key: 'assessDisplay',
	    value: function assessDisplay(data, display) {
	      if (display == 'forecast') {
	        this.displayForecast(data);
	      }
	      // else if (display == 'favorites') { displayFavorites(data) }
	    }
	  }]);

	  return Forecast;
	}();

	exports.default = Forecast;

/***/ })
/******/ ]);