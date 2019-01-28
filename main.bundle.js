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
/***/ (function(module, exports) {

	'use strict';

	var session = false;

	loadNav();

	function loadNav() {
	  var nav = byId('navBar');
	  clearHTML(nav);
	  addSearchBar(nav);
	  session ? addFavoritesButton(nav) : addRegisterButton(nav);
	  addSessionButton(nav); // TO DO - make this two buttons like above, SRP the function
	}

	// ---- Session ----

	function registerUser() {
	  var content = byId('content');
	  clearHTML(content);
	  registerForm(content);
	}

	function registerForm(element) {
	  var form = addSpan(content, 'registerFrom', null);

	  // TO DO - break email, password, submit into functions to be reused with login

	  var email = addDiv(form, 'email', 'row');
	  var title = addSpan(email, null, 'title');
	  appendText(title, "Email");
	  var field = addSpan(email, 'email', 'field');
	  field.appendChild(makeInput('text', 'emailField', null));

	  // TO DO - add characters as private attribute
	  var password = addDiv(form, 'password', 'row');
	  title = addSpan(password, null, 'title');
	  appendText(title, "Password");
	  field = addSpan(password, 'password', 'field');
	  field.appendChild(makeInput('text', 'passwordField', null));

	  // TO DO - add characters as private attribute
	  var confirm = addDiv(form, 'confrim', 'row');
	  title = addSpan(confirm, null, 'title');
	  appendText(title, "Confirm Password");
	  field = addSpan(confirm, 'confirm', 'field');
	  field.appendChild(makeInput('text', 'confirmField', null));

	  var submit = addDiv(form, 'submit', 'row');
	  addRegisterSubmit(submit);
	}

	function makeUser() {
	  var cred = {
	    'verb': 'POST',
	    'url': 'https://sweater-weather-api-app.herokuapp.com/api/v1/users',
	    'body': {
	      'email': byId('emailField').value,
	      'password': byId('passwordField').value,
	      'password_confirmation': byId('confirmField').value
	    },
	    'display': 'register'
	  };
	  makePostRequest(cred);
	}

	function makePostRequest(obj) {
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
	      assessPost(data, obj['display']);
	    } else {
	      badCredentials();
	    }
	  };
	  var blob = new Blob([JSON.stringify(body)], { type: 'application/json' });
	  req.send(blob);
	}

	function badCredentials() {
	  var feedback = byId('feedback');
	  clearHTML(feedback);
	  var msg = "Sorry, something went wrong.";
	  appendText(feedback, msg);
	}

	function assessPost(data, display) {
	  debugger;
	  if (display == 'register') {
	    newSession(data, true);
	  }
	  if (display == 'login') {
	    newSession(data);
	  }
	}

	function newSession(data) {
	  var isNewUser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  if (isNewUser) {
	    thankForJoining();
	  }
	  var key = data['data']['attributes']['api_key'];
	  sessionStorage.setItem('api_key', key);
	  session = true;
	  loadNav();
	  debugger;
	}

	function thankForJoining() {
	  var msg = "Thanks for joining, you're now logged in!";
	  alert(msg);
	}

	function clearSession() {
	  sessionStorage.setItem('api_key', null);
	  session = false;
	  loadNav();
	}

	function loginUserForm() {
	  var content = byId('content');
	  clearHTML(content);

	  var form = addSpan(content, 'loginFrom', null);
	  var email = addDiv(form, 'email', 'row');
	  var title = addSpan(email, null, 'title');
	  appendText(title, "Email");
	  var field = addSpan(email, 'email', 'field');
	  field.appendChild(makeInput('text', 'emailField', null));

	  // TO DO - add characters as private attribute
	  var password = addDiv(form, 'password', 'row');
	  title = addSpan(password, null, 'title');
	  appendText(title, "Password");
	  field = addSpan(password, 'password', 'field');
	  field.appendChild(makeInput('text', 'passwordField', null));

	  var submit = addDiv(form, 'submit', 'row');
	  addLoginSubmit(submit);
	}

	function loginUser() {
	  var cred = {
	    'verb': 'POST',
	    'url': 'https://sweater-weather-api-app.herokuapp.com/api/v1/sessions',
	    'body': {
	      'email': byId('emailField').value,
	      'password': byId('passwordField').value
	    },
	    'display': 'login'
	  };
	  makePostRequest(cred);
	}

	// ---- Forecast -----

	function getForecast() {
	  var city = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

	  var location = city ? city : byId('navSearch').value;
	  var obj = {
	    'verb': 'GET',
	    'url': 'https://sweater-weather-api-app.herokuapp.com/api/v1/forecasts?location=',
	    'term': location,
	    'display': 'forecast'
	  };
	  makeGetRequest(obj);
	}

	function displayForecast(data) {

	  clearValue(byId('navSearch'));

	  var info = data['data']['attributes'];

	  var location = info['location'];
	  var today = info['today'];
	  var current = info['current'];
	  var forecast = info['forecast']['data']['attributes'];

	  var showToday = {
	    'gif': null,
	    'desc': current['summary'],
	    'temp': current['temperature'],
	    'high': today['high'],
	    'low': today['low'],
	    'city': location['city']['long_name'],
	    'state': location['state']['short_name'],
	    'country': location['country']['long_name'],
	    'time': current['time']
	  };

	  var content = byId('content');

	  var overview = addDiv(content, 'overview', null);

	  displayToday(showToday, overview);
	}

	function displayToday(data, element) {

	  var cityState = data['city'] + ', ' + data['state'];
	  var highLow = "High: " + data['high'] + " Low: " + data['low'];

	  var showToday = addDiv(element, 'today', 'overview');

	  var today1 = addSpan(showToday, 'today1_temp', 'today');
	  var today1_1 = addDiv(today1, 'today1_1', 'today1');
	  var today1_gif = addSpan(today1_1, 'today1_gif', 'today1_1');
	  appendText(today1_gif, "IMG"); // TO DO - add gif image
	  var today1_desc = addSpan(today1_1, 'today1_desc', 'today1_1');
	  appendText(today1_desc, data['desc']);
	  var today1_2 = addDiv(today1, 'today1_2', 'today1');
	  appendText(today1_2, data['temp']);
	  var today1_3 = addDiv(today1, 'today1_3', 'today1');
	  appendText(today1_3, highLow);

	  var today2 = addSpan(showToday, 'today2_location', 'today');
	  var today2_1 = addDiv(today2, 'today2_1', 'today2');
	  appendText(today2_1, cityState);
	  var today2_2 = addDiv(today2, 'today2_2', 'today2');
	  appendText(today2_2, data['country']);
	  var today2_3 = addDiv(today2, 'today2_3', 'today2');
	  appendText(today2_3, data['time']);

	  var today3 = addSpan(showToday, 'today2_location', 'today');
	  var today3_1 = addDiv(today3, 'today3_1', 'today3');
	  appendText(today3_1, "Change Location");
	  var today3_2 = addDiv(today3, 'today3_2', 'today3');
	  appendText(today3_2, "Add to Favorites");
	}

	// ---- API -----

	function makeGetRequest(obj) {
	  var verb = obj['verb'];
	  var url = obj['url'];
	  var term = obj['term'];
	  var endpoint = url + term;

	  var data;
	  var req = new XMLHttpRequest();
	  req.open(verb, endpoint);
	  req.onload = function () {
	    var stat = this.status;
	    var valid = stat >= 200 && stat < 300;
	    if (valid) {
	      data = JSON.parse(this.responseText);
	      assessDisplay(data, obj['display']);
	    } else {
	      badLocation();
	    }
	  };
	  req.send();
	}

	function badLocation() {
	  var feedback = byId('feedback');
	  clearHTML(feedback);
	  var msg = "Sorry, that location does not exist. Check spelling or try another location.";
	  appendText(feedback, msg);
	  // TO DO - grab all location search bars & clear them
	}

	function assessDisplay(data, display) {
	  if (display == 'forecast') {
	    displayForecast(data);
	  }
	  // else if (display == 'favorites') { displayFavorites(data) }
	}

	// ---- Structure -----

	function addSearchBar(nav) {
	  var field = makeInput('text', 'navSearch', 'nav_element');
	  nav.appendChild(field);
	  field = byId('navSearch');
	  field.placeholder = "Search for a US City";
	  addSearchSubmit(nav);
	}

	function addSearchSubmit(nav) {
	  var submit = makeInput('submit', 'navSearchButton', 'nav_element');
	  nav.appendChild(submit);
	  submit = byId('navSearchButton');
	  submit.addEventListener('click', function () {
	    getForecast();
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

	function clearHTML(element) {
	  element.innerHTML = '';
	}

	function clearValue(element) {
	  element.value = '';
	}

	function addDiv(element) {
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

	function addSpan(element) {
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

	function makeNavButton(id, text) {
	  var button = navSpan();
	  button.id = id;
	  appendText(button, text);
	  return button;
	}

	function appendText(element, text) {
	  var node = document.createTextNode(text);
	  element.appendChild(node);
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

	// ---- TOOLS ----


	function byId(id) {
	  return document.getElementById(id);
	}

/***/ })
/******/ ]);