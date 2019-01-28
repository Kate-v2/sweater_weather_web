import DOMTools from '../tools/dom_tools.js'
const tool = new DOMTools

// import UserSession from './user_session.js'
import UserSession from '../classes/user_session.js';
const seshy = new UserSession



export default class NavBar {

  loadNav() {
    let nav = tool.byId('navBar')
    tool.clearHTML(nav)

    debugger

    addSearchBar(nav)
    let session = assessSession()
    session ? addFavoritesButton(nav) : addRegisterButton(nav)
    addSessionButton(nav)  // TO DO - make this two buttons like above, SRP the function
  }



  // TO DO - Move to Forecast Class
  // addSearchBar(nav) {
  //   let field = tool.makeInput('text', 'navSearch', 'nav_element')
  //   nav.appendChild(field)
  //   field = tool.byId('navSearch')
  //   field.placeholder = "Search for a US City"
  //   addSearchSubmit(nav)
  // }
  //
  // addSearchSubmit(nav) {
  //   let submit = tool.makeInput('submit', 'navSearchButton', 'nav_element')
  //   nav.appendChild(submit)
  //   submit = tool.byId('navSearchButton')
  //   submit.addEventListener('click', function() { getForecast() } )
  // }

  // addFavoritesButton(nav) {
  //   let favorites = makeNavButton("favorites", "Favorites")
  //   nav.appendChild(favorites)
  // }

  // addRegisterButton(nav) {
  //   let register = makeNavButton('register', 'Register')
  //   register.addEventListener('click', function() { sesh.registerUser() } )
  //   nav.appendChild(register)
  // }

  // addSessionButton(nav) {
  //   let session = assessSession()
  //   // debugger
  //   let txt = session ? "Logout" : 'Login'
  //   let seshButton = makeNavButton('session', txt)
  //   seshButton.addEventListener('click', function() { loginUserForm() } )
  //   seshButton.addEventListener('click', function() { clearSession() } )
  //   nav.appendChild(seshButton)
  // }

  assessSession() {
    return sessionStorage.getItem('api_key')
  }

  // ---- HTML Elements ----

  makeNavButton(id, text) {
    let button = navSpan()
    button.id = id
    tool.appendText(button, text)
    return button
  }

  navSpan() {
    var navSpan = document.createElement("span")
    navSpan.className = 'nav_element'
    return navSpan
  }

}
