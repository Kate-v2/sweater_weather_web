
import DOMTools from './tools/dom_tools.js'
const tool = new DOMTools

import Forecast from './classes/forecast.js'
const forecast = new Forecast

var session = false

loadNav()

function loadNav() {
  let nav = tool.byId('navBar')
  tool.clearHTML(nav)
  addSearchBar(nav)
  session ? addFavoritesButton(nav) : addRegisterButton(nav)
  addSessionButton(nav)  // TO DO - make this two buttons like above, SRP the function
}


// ---- Session ----

  function registerUser() {
    let content = tool.byId('content')
    tool.clearHTML(content)

    let feedback = tool.byId('feedback')
    tool.clearHTML(feedback)

    registerForm(content)
  }

  function registerForm(element) {
    let form = tool.addSpan(content, 'registerForm', null)

    emailField(form)
    passwordField(form)
    passwordFieldConfirmation(form)

    let submit = tool.addDiv(form, 'submit', 'row')
      addRegisterSubmit(submit)
  }

  function emailField(form) {
    let email = tool.addDiv(form, 'email', 'row' )
    let title = tool.addSpan(email, null, 'title')
    tool.appendText(title, "Email")
    let field = tool.addSpan(email, 'email', 'field')
    field.appendChild( makeInput('text', 'emailField', null) )
  }

  function passwordField(form){
    let password = tool.addDiv(form, 'password', 'row' )
    let title = tool.addSpan(password, null, 'title')
    tool.appendText(title, "Password")
    let field = tool.addSpan(password, 'password', 'field')
    field.appendChild( makeInput('password', 'passwordField', null) )
  }

  function passwordFieldConfirmation(form) {
    let confirm = tool.addDiv(form, 'confrim', 'row' )
    let title = tool.addSpan(confirm, null, 'title')
    tool.appendText(title, "Confirm Password")
    let field = tool.addSpan(confirm, 'confirm', 'field')
    field.appendChild( makeInput('password', 'confirmField', null) )
  }


  function makeUser() {
    let cred = {
      'verb': 'POST',
      'url': 'https://sweater-weather-api-app.herokuapp.com/api/v1/users',
      'body': {
                'email':                  tool.byId('emailField').value,
                'password':               tool.byId('passwordField').value,
                'password_confirmation':  tool.byId('confirmField').value
              },
      'display': 'register'
    }
    makePostRequest(cred)
  }

  function makePostRequest(obj) {
    let verb    = obj['verb']
    let url     = obj['url']
    let body    = obj['body']
    let display = obj['display']

    var data
    let req = new XMLHttpRequest()
    req.open(verb, url)
    req.setRequestHeader("CCONTENT_TYPE", "application/json")
    req.setRequestHeader("ACCEPT",        "application/json")
    req.onload = function() {
      let stat = this.status
      let valid = ( stat >= 200 && stat < 300 )
      if( valid ) {
        data = JSON.parse(this.responseText)
        assessPost(data, display)
      }
      else { badCredentials() }
    }
    var blob = new Blob([ JSON.stringify(body)], {type : 'application/json'});
    req.send( blob )
  }

  function badCredentials() {
    let feedback = tool.byId('feedback')
    tool.clearHTML(feedback)
    let msg = "Sorry, something went wrong."
    tool.appendText(feedback, msg)
  }

  function assessPost(data, display) {
    if (display == 'register' || display == 'login') { newSession(data) }
  }

  function newSession(data) {
    let key = data['data']['attributes']['api_key']
    sessionStorage.setItem('api_key', key)
    session = true
    loadNav()
    nowLoggedIn()
  }

  function nowLoggedIn() {
    let feedback = tool.byId('feedback')
    tool.clearHTML(feedback)
    let msg = "You're now logged in, please explore and add favorite locations!"
    tool.appendText(feedback, msg)
    let content = tool.byId('content')
    tool.clearHTML(content)
  }


  function clearSession(){
    sessionStorage.setItem('api_key', null)
    session = false
    loadNav()
    let feedback = tool.byId('feedback')
    tool.clearHTML(feedback)
  }

  function loginUserForm() {
    let content = tool.byId('content')
    tool.clearHTML(content)

    let feedback = tool.byId('feedback')
    tool.clearHTML(feedback)

    let form = tool.addSpan(content, 'loginForm', null)
    emailField(form)
    passwordField(form)

    let submit = tool.addDiv(form, 'submit', 'row')
      addLoginSubmit(submit)
  }

  function loginUser() {
    let cred = {
      'verb': 'POST',
      'url':  'https://sweater-weather-api-app.herokuapp.com/api/v1/sessions',
      'body': {
                'email':                  tool.byId('emailField').value,
                'password':               tool.byId('passwordField').value,
              },
      'display': 'login'
    }
    makePostRequest(cred)
  }


// ---- Structure -----

function addSearchBar(nav) {
  let field = makeInput('text', 'navSearch', 'nav_element')
  nav.appendChild(field)
  field = tool.byId('navSearch')
  field.placeholder = "Search for a US City"
  addSearchSubmit(nav)
}

function addSearchSubmit(nav) {
  let submit = makeInput('submit', 'navSearchButton', 'nav_element')
  nav.appendChild(submit)
  submit = tool.byId('navSearchButton')
  // submit.addEventListener('click', function() { getForecast() } )
  submit.addEventListener('click', function() { forecast.getForecast() } )
}

// TO DO - Merge these submit functions

function addRegisterSubmit(element) {
  let submit = makeInput('submit', 'registerSubmit', null)
  submit.addEventListener('click', function() { makeUser() } )
  element.appendChild(submit)
}

function addLoginSubmit(element) {
  let submit = makeInput('submit', 'loginSubmit', null)
  submit.addEventListener('click', function() { loginUser() } )
  element.appendChild(submit)
}


function addFavoritesButton(nav) {
  let favorites = makeNavButton("favorites", "Favorites")
  nav.appendChild(favorites)
}

function addRegisterButton(nav) {
  let register = makeNavButton('register', 'Register')
  register.addEventListener('click', function() { registerUser() } )
  nav.appendChild(register)
}

function addSessionButton(nav) {
  let txt = session ? "Logout" : 'Login'
  let seshButton = makeNavButton('session', txt)
  seshButton.addEventListener('click', function() { loginUserForm() } )
  seshButton.addEventListener('click', function() { clearSession() } )
  nav.appendChild(seshButton)
}


// ---- General HTML Elements ----

function makeNavButton(id, text) {
  let button = navSpan()
  button.id = id
  tool.appendText(button, text)
  return button
}

function navSpan() {
  var navSpan = document.createElement("span")
  navSpan.className = 'nav_element'
  return navSpan
}

// TO DO - make navSpan() more like this
function makeInput(type, id=null, className=null) {
  let field = document.createElement("INPUT");
  field.setAttribute("type", type);
  if (id) { field.id = id }
  if (className) { field.className = className }
  return field
}
