// import DOMTools from './tools/dom_tools.js'
// const tool = new DOMTools

// import UserSession from './classes/user_session.js'
// const sesh = new UserSession

import NavBar from './classes/nav_bar.js'
const navigation = new NavBar


// var session = false

navigation.loadNav()

// function loadNav() {
//   let nav = tool.byId('navBar')
//   tool.clearHTML(nav)
//   addSearchBar(nav)
//   let session = assessSession()
//   session ? addFavoritesButton(nav) : addRegisterButton(nav)
//   addSessionButton(nav)  // TO DO - make this two buttons like above, SRP the function
// }


// ---- Session ----

  // function sesh.registerUser() {
  //   let content = tool.byId('content')
  //   tool.clearHTML(content)
  //   registerForm(content)
  // }

  // function registerForm(element) {
  //   let form = tool.addSpan(content, 'registerFrom', null)
  //
  //   // TO DO - break email, password, submit into functions to be reused with login
  //
  //   let email = tool.addDiv(form, 'email', 'row' )
  //     let title = tool.addSpan(email, null, 'title')
  //     tool.appendText(title, "Email")
  //     let field = tool.addSpan(email, 'email', 'field')
  //     field.appendChild( tool.makeInput('text', 'emailField', null) )
  //
  //   let password = tool.addDiv(form, 'password', 'row' )
  //     title = tool.addSpan(password, null, 'title')
  //     tool.appendText(title, "Password")
  //     field = tool.addSpan(password, 'password', 'field')
  //     field.appendChild( tool.makeInput('password', 'passwordField', null) )
  //
  //   let confirm = tool.addDiv(form, 'confrim', 'row' )
  //     title = tool.addSpan(confirm, null, 'title')
  //     tool.appendText(title, "Confirm Password")
  //     field = tool.addSpan(confirm, 'confirm', 'field')
  //     field.appendChild( tool.makeInput('password', 'confirmField', null) )
  //
  //   let submit = tool.addDiv(form, 'submit', 'row')
  //     addRegisterSubmit(submit)
  // }

  // function makeUser() {
  //   let cred = {
  //     'verb': 'POST',
  //     'url': 'https://sweater-weather-api-app.herokuapp.com/api/v1/users',
  //     'body': {
  //               'email':                  tool.byId('emailField').value,
  //               'password':               tool.byId('passwordField').value,
  //               'password_confirmation':  tool.byId('confirmField').value
  //             },
  //     'display': 'register'
  //   }
  //   makePostRequest(cred)
  // }

  // function makePostRequest(obj) {
  //   let verb    = obj['verb']
  //   let url     = obj['url']
  //   let body    = obj['body']
  //   let display = obj['display']
  //
  //   var data
  //   let req = new XMLHttpRequest()
  //   req.open(verb, url)
  //   req.setRequestHeader("CCONTENT_TYPE", "application/json")
  //   req.setRequestHeader("ACCEPT",        "application/json")
  //   req.onload = function() {
  //     let stat = this.status
  //     let valid = ( stat >= 200 && stat < 300 )
  //     if( valid ) {
  //       data = JSON.parse(this.responseText)
  //       assessPost(data, display)
  //     }
  //     else { badCredentials() }
  //   }
  //   var blob = new Blob([ JSON.stringify(body)], {type : 'application/json'});
  //   req.send( blob )
  // }

  // function badCredentials() {
  //   let feedback = tool.byId('feedback')
  //   tool.clearHTML(feedback)
  //   let msg = "Sorry, something went wrong."
  //   tool.appendText(feedback, msg)
  // }

  // function assessPost(data, display) {
  //   if (display == 'register' || display == 'login') { newSession(data) }
  // }

  // function newSession(data) {
  //   let key = data['data']['attributes']['api_key']
  //   sessionStorage.setItem('api_key', key)
  //   session = true
  //   navigation.loadNav()
  //   nowLoggedIn()
  // }

  // function nowLoggedIn() {
  //   let feedback = tool.byId('feedback')
  //   tool.clearHTML(feedback)
  //   let msg = "You're now logged in, please explore and add favorite locations!"
  //   tool.appendText(feedback, msg)
  //   let content = tool.byId('content')
  //   tool.clearHTML(content)
  // }


  // function clearSession(){
  //   sessionStorage.setItem('api_key', null)
  //   session = false
  //   navigation.loadNav()
  // }

  // function loginUserForm() {
  //   let content = tool.byId('content')
  //   tool.clearHTML(content)
  //
  //   let form = tool.addSpan(content, 'loginFrom', null)
  //   let email = tool.addDiv(form, 'email', 'row' )
  //     let title = tool.addSpan(email, null, 'title')
  //     tool.appendText(title, "Email")
  //     let field = tool.addSpan(email, 'email', 'field')
  //     field.appendChild( tool.makeInput('text', 'emailField', null) )
  //
  //   let password = tool.addDiv(form, 'password', 'row' )
  //     title = tool.addSpan(password, null, 'title')
  //     tool.appendText(title, "Password")
  //     field = tool.addSpan(password, 'password', 'field')
  //     field.appendChild( tool.makeInput('password', 'passwordField', null) )
  //
  //   let submit = tool.addDiv(form, 'submit', 'row')
  //     addLoginSubmit(submit)
  // }

  // function loginUser() {
  //   let cred = {
  //     'verb': 'POST',
  //     'url':  'https://sweater-weather-api-app.herokuapp.com/api/v1/sessions',
  //     'body': {
  //               'email':                  tool.byId('emailField').value,
  //               'password':               tool.byId('passwordField').value,
  //             },
  //     'display': 'login'
  //   }
  //   makePostRequest(cred)
  // }


// ---- Forecast -----

// function getForecast(city = null){
//   let location = city ? city : tool.byId('navSearch').value
//   let obj = {
//     'verb': 'GET',
//     'url': 'https://sweater-weather-api-app.herokuapp.com/api/v1/forecasts?location=',
//     'term': location,
//     'display': 'forecast'
//   }
//   makeGetRequest(obj)
// }

// function displayForecast(data){
//
//   tool.clearValue( tool.byId( 'navSearch' ) )
//
//
//   let info = data['data']['attributes']
//
//   let location = info['location']
//   let today    = info['today']
//   let current  = info['current']
//   let forecast = info['forecast']['data']['attributes']
//
//   let showToday = {
//     'gif':     null,
//     'desc':    current['summary'],
//     'temp':    current['temperature'],
//     'high':    today['high'],
//     'low':     today['low'],
//     'city':    location['city']['long_name'],
//     'state':   location['state']['short_name'],
//     'country': location['country']['long_name'],
//     'time':    current['time'],
//   }
//
//   let content = tool.byId('content')
//
//   let overview = tool.addDiv(content, 'overview', null )
//
//   displayToday(showToday, overview)
//
// }

  // function displayToday(data, element) {
  //
  //   let cityState = data['city'] + ', ' + data['state']
  //   let highLow = "High: " + data['high'] + " Low: " + data['low']
  //
  //   let showToday = tool.addDiv(element, 'today', 'overview')
  //
  //   let today1 = tool.addSpan(showToday, 'today1_temp', 'today')
  //     let today1_1 = tool.addDiv(today1, 'today1_1', 'today1')
  //       let today1_gif  = tool.addSpan(today1_1, 'today1_gif', 'today1_1')
  //       tool.appendText(today1_gif, "IMG")// TO DO - add gif image
  //       let today1_desc = tool.addSpan(today1_1, 'today1_desc', 'today1_1')
  //       tool.appendText(today1_desc, data['desc'])
  //     let today1_2 = tool.addDiv(today1, 'today1_2', 'today1')
  //       tool.appendText(today1_2, data['temp'])
  //     let today1_3 = tool.addDiv(today1, 'today1_3', 'today1')
  //       tool.appendText(today1_3, highLow)
  //
  //   let today2 = tool.addSpan(showToday, 'today2_location', 'today')
  //     let today2_1 = tool.addDiv(today2, 'today2_1', 'today2')
  //     tool.appendText(today2_1, cityState)
  //     let today2_2 = tool.addDiv(today2, 'today2_2', 'today2')
  //     tool.appendText(today2_2, data['country'])
  //     let today2_3 = tool.addDiv(today2, 'today2_3', 'today2')
  //     tool.appendText(today2_3, data['time'])
  //
  //   let today3 = tool.addSpan(showToday, 'today2_location', 'today')
  //     let today3_1 = tool.addDiv(today3, 'today3_1', 'today3')
  //     tool.appendText(today3_1, "Change Location")
  //     let today3_2 = tool.addDiv(today3, 'today3_2', 'today3')
  //     tool.appendText(today3_2, "Add to Favorites")
  //
  // }





// ---- API -----

// function makeGetRequest(obj) {
//   let verb = obj['verb']
//   let url  = obj['url']
//   let term = obj['term']
//   let endpoint = url + term
//
//   var data
//   let req = new XMLHttpRequest()
//   req.open(verb, endpoint)
//   req.onload = function() {
//     let stat = this.status
//     let valid = ( stat >= 200 && stat < 300 )
//     if( valid ) {
//       data = JSON.parse(this.responseText)
//       assessDisplay(data, obj['display'])
//     }
//     else { badLocation() }
//   }
//   req.send()
// }

// function badLocation(){
//   let feedback = tool.byId('feedback')
//   tool.clearHTML(feedback)
//   let msg = "Sorry, that location does not exist. Check spelling or try another location."
//   tool.appendText(feedback, msg)
//   // TO DO - grab all location search bars & clear them
// }

// function assessDisplay(data, display){
//   if (display == 'forecast') { displayForecast(data) }
//   // else if (display == 'favorites') { displayFavorites(data) }
// }

// ---- Structure -----

// function addSearchBar(nav) {
//   let field = tool.makeInput('text', 'navSearch', 'nav_element')
//   nav.appendChild(field)
//   field = tool.byId('navSearch')
//   field.placeholder = "Search for a US City"
//   addSearchSubmit(nav)
// }

// function addSearchSubmit(nav) {
//   let submit = tool.makeInput('submit', 'navSearchButton', 'nav_element')
//   nav.appendChild(submit)
//   submit = tool.byId('navSearchButton')
//   submit.addEventListener('click', function() { getForecast() } )
// }

// TO DO - Merge these submit functions

// function addRegisterSubmit(element) {
//   let submit = tool.makeInput('submit', 'registerSubmit', null)
//   submit.addEventListener('click', function() { makeUser() } )
//   element.appendChild(submit)
// }

// function addLoginSubmit(element) {
//   let submit = tool.makeInput('submit', 'loginSubmit', null)
//   submit.addEventListener('click', function() { loginUser() } )
//   element.appendChild(submit)
// }


// function addFavoritesButton(nav) {
//   let favorites = makeNavButton("favorites", "Favorites")
//   nav.appendChild(favorites)
// }

// function addRegisterButton(nav) {
//   let register = makeNavButton('register', 'Register')
//   register.addEventListener('click', function() { sesh.registerUser() } )
//   nav.appendChild(register)
// }

// function addSessionButton(nav) {
//   let session = assessSession()
//   let txt = session ? "Logout" : 'Login'
//   let seshButton = makeNavButton('session', txt)
//   seshButton.addEventListener('click', function() { loginUserForm() } )
//   seshButton.addEventListener('click', function() { clearSession() } )
//   nav.appendChild(seshButton)
// }

// function assessSession() {
//   return sessionStorage.getItem('api_key')
// }

// ---- General HTML Elements ----

// function makeNavButton(id, text) {
//   let button = navSpan()
//   button.id = id
//   tool.appendText(button, text)
//   return button
// }

// function tool.appendText(element, text) {
//   let node = document.createTextNode(text)
//   element.appendChild(node)
// }

// function navSpan() {
//   var navSpan = document.createElement("span")
//   navSpan.className = 'nav_element'
//   return navSpan
// }

// TO DO - make navSpan() more like this
// function tool.makeInput(type, id=null, className=null) {
//   let field = document.createElement("INPUT");
//   field.setAttribute("type", type);
//   if (id) { field.id = id }
//   if (className) { field.className = className }
//   return field
// }
