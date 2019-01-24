

var session = false

loadNav()

function loadNav() {
  let nav = byId('navBar')
  addSearchBar(nav)
  addSessionButton(nav)
  session ? addFavoritesButton(nav) : addRegisterButton(nav)
}




// ---- Structure -----

// function addSearchBar(nav) {
//
// }



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


function makeNavButton(id, text) {
  let button = navSpan()
  button.id = id
  let node = document.createTextNode(text)
  button.appendChild(node)
  return button
}

function navSpan() {
  var navSpan = document.createElement("span")
  navSpan.className = 'nav_element'
  return navSpan
}


// ---- TOOLS ----


function byId(id) {
  return document.getElementById(id)
}
