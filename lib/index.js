

var session = false

loadNav()

function loadNav() {
  let nav = byId('navBar')
  addSearchBar(nav)
  session ? addFavoritesButton(nav) : addRegisterButton(nav)
  addSessionButton(nav)
}




// ---- Forecast -----

function getForecast(city = null){
  let location = city ? city : byId('navSearch').value
  obj = {
    'verb': 'GET',
    'url': 'https://sweater-weather-api-app.herokuapp.com/api/v1/forecasts?location=',
    'term': location,
    'display': 'forecast'
  }
  makeRequest(obj)
}

function displayForecast(data){
  // debugger
  // User Story / Issue #12

}


// ---- API -----

function makeRequest(obj) {
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
  let feedback = byId('feedback')
  feedback.innerHTML = ''
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
  field = byId('navSearch')
  field.placeholder = "Search for a US City"
  addSearchSubmit(nav)
}

function addSearchSubmit(nav) {
  let submit = makeInput('submit', 'navSearchButton', 'nav_element')
  nav.appendChild(submit)
  submit = byId('navSearchButton')
  submit.addEventListener('click', function() { getForecast() } )
}

function addFavoritesButton(nav) {
  let favorites = makeNavButton("favorites", "Favorites")
  nav.appendChild(favorites)
}

function addRegisterButton(nav) {
  let register = makeNavButton('register', 'Register')
  nav.appendChild(register)
}

function addSessionButton(nav) {
  let txt = session ? "Logout" : 'Login'
  let seshButton = makeNavButton('session', txt)
  nav.appendChild(seshButton)
}


// ---- General HTML Elements ----

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


// ---- TOOLS ----


function byId(id) {
  return document.getElementById(id)
}
