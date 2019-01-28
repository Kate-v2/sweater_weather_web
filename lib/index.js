import DOMTools from './tools/dom_tools.js'

const tool = new DOMTools

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
    registerForm(content)
  }

  function registerForm(element) {
    let form = addSpan(content, 'registerFrom', null)

    // TO DO - break email, password, submit into functions to be reused with login

    let email = addDiv(form, 'email', 'row' )
      let title = addSpan(email, null, 'title')
      appendText(title, "Email")
      let field = addSpan(email, 'email', 'field')
      field.appendChild( makeInput('text', 'emailField', null) )

    let password = addDiv(form, 'password', 'row' )
      title = addSpan(password, null, 'title')
      appendText(title, "Password")
      field = addSpan(password, 'password', 'field')
      field.appendChild( makeInput('password', 'passwordField', null) )

    let confirm = addDiv(form, 'confrim', 'row' )
      title = addSpan(confirm, null, 'title')
      appendText(title, "Confirm Password")
      field = addSpan(confirm, 'confirm', 'field')
      field.appendChild( makeInput('password', 'confirmField', null) )

    let submit = addDiv(form, 'submit', 'row')
      addRegisterSubmit(submit)
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
    appendText(feedback, msg)
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
    appendText(feedback, msg)
    let content = tool.byId('content')
    tool.clearHTML(content)
  }


  function clearSession(){
    sessionStorage.setItem('api_key', null)
    session = false
    loadNav()
  }

  function loginUserForm() {
    let content = tool.byId('content')
    tool.clearHTML(content)

    let form = addSpan(content, 'loginFrom', null)
    let email = addDiv(form, 'email', 'row' )
      let title = addSpan(email, null, 'title')
      appendText(title, "Email")
      let field = addSpan(email, 'email', 'field')
      field.appendChild( makeInput('text', 'emailField', null) )

    let password = addDiv(form, 'password', 'row' )
      title = addSpan(password, null, 'title')
      appendText(title, "Password")
      field = addSpan(password, 'password', 'field')
      field.appendChild( makeInput('password', 'passwordField', null) )

    let submit = addDiv(form, 'submit', 'row')
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


// ---- Forecast -----

function getForecast(city = null){
  let location = city ? city : tool.byId('navSearch').value
  let obj = {
    'verb': 'GET',
    'url': 'https://sweater-weather-api-app.herokuapp.com/api/v1/forecasts?location=',
    'term': location,
    'display': 'forecast'
  }
  makeGetRequest(obj)
}

function displayForecast(data){

  clearValue( tool.byId( 'navSearch' ) )


  let info = data['data']['attributes']

  let location = info['location']
  let today    = info['today']
  let current  = info['current']
  let forecast = info['forecast']['data']['attributes']

  let showToday = {
    'gif':     null,
    'desc':    current['summary'],
    'temp':    current['temperature'],
    'high':    today['high'],
    'low':     today['low'],
    'city':    location['city']['long_name'],
    'state':   location['state']['short_name'],
    'country': location['country']['long_name'],
    'time':    current['time'],
  }

  let content = tool.byId('content')

  let overview = addDiv(content, 'overview', null )

  displayToday(showToday, overview)

}

  function displayToday(data, element) {

    let cityState = data['city'] + ', ' + data['state']
    let highLow = "High: " + data['high'] + " Low: " + data['low']

    let showToday = addDiv(element, 'today', 'overview')

    let today1 = addSpan(showToday, 'today1_temp', 'today')
      let today1_1 = addDiv(today1, 'today1_1', 'today1')
        let today1_gif  = addSpan(today1_1, 'today1_gif', 'today1_1')
        appendText(today1_gif, "IMG")// TO DO - add gif image
        let today1_desc = addSpan(today1_1, 'today1_desc', 'today1_1')
        appendText(today1_desc, data['desc'])
      let today1_2 = addDiv(today1, 'today1_2', 'today1')
        appendText(today1_2, data['temp'])
      let today1_3 = addDiv(today1, 'today1_3', 'today1')
        appendText(today1_3, highLow)

    let today2 = addSpan(showToday, 'today2_location', 'today')
      let today2_1 = addDiv(today2, 'today2_1', 'today2')
      appendText(today2_1, cityState)
      let today2_2 = addDiv(today2, 'today2_2', 'today2')
      appendText(today2_2, data['country'])
      let today2_3 = addDiv(today2, 'today2_3', 'today2')
      appendText(today2_3, data['time'])

    let today3 = addSpan(showToday, 'today2_location', 'today')
      let today3_1 = addDiv(today3, 'today3_1', 'today3')
      appendText(today3_1, "Change Location")
      let today3_2 = addDiv(today3, 'today3_2', 'today3')
      appendText(today3_2, "Add to Favorites")

  }





// ---- API -----

function makeGetRequest(obj) {
  let verb = obj['verb']
  let url  = obj['url']
  let term = obj['term']
  let endpoint = url + term

  var data
  let req = new XMLHttpRequest()
  req.open(verb, endpoint)
  req.onload = function() {
    let stat = this.status
    let valid = ( stat >= 200 && stat < 300 )
    if( valid ) {
      data = JSON.parse(this.responseText)
      assessDisplay(data, obj['display'])
    }
    else { badLocation() }
  }
  req.send()
}

function badLocation(){
  let feedback = tool.byId('feedback')
  tool.clearHTML(feedback)
  let msg = "Sorry, that location does not exist. Check spelling or try another location."
  appendText(feedback, msg)
  // TO DO - grab all location search bars & clear them
}

function assessDisplay(data, display){
  if (display == 'forecast') { displayForecast(data) }
  // else if (display == 'favorites') { displayFavorites(data) }
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
  submit.addEventListener('click', function() { getForecast() } )
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


// function clearValue(element) {
//   element.value = ''
// }

function addDiv(element, id=null, className=null) {
  let div = document.createElement('div')
  if (id) {div.id = id}
  if (className) {div.className = className}
  element.appendChild(div)
  return div
}

function addSpan(element, id=null, className=null) {
  let span = document.createElement('span')
  if (id) {span.id = id}
  if (className) {span.className = className}
  element.appendChild(span)
  return span
}


function makeNavButton(id, text) {
  let button = navSpan()
  button.id = id
  appendText(button, text)
  return button
}

function appendText(element, text) {
  let node = document.createTextNode(text)
  element.appendChild(node)
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
