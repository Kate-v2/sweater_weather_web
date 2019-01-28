
import DOMTools from '../tools/dom_tools.js'
const tool = new DOMTools

import Forecast from './forecast.js'
const forecast = new Forecast

import UserSession from './user_session.js'
const user = new UserSession


export default class NavBar {


  loadNav() {
    let nav = tool.byId('navBar')
    tool.clearHTML(nav)
    forecast.buildSearchBar(nav)
    this.key() ? this.buildFavoritesButton(nav) : this.buildRegisterButton(nav)
    this.buildSessionButton(nav)
  }

  key() {
    return sessionStorage.getItem('api_key')
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

  makeNavButton(id, text) {
    let button = this.navSpan()
    button.id = id
    tool.appendText(button, text)
    return button
  }

  navSpan() {
    var navSpan = document.createElement("span")
    navSpan.className = 'nav_element'
    return navSpan
  }

  buildFavoritesButton(nav) {
    let favorites = this.makeNavButton("favorites", "Favorites")
    nav.appendChild(favorites)
  }

  buildRegisterButton(nav) {
    let register = this.makeNavButton('register', 'Register')
    register.addEventListener('click', function() { user.registerUser() } )
    nav.appendChild(register)
  }

  buildSessionButton(nav) {
    let txt = this.key() ? "Logout" : 'Login'
    let seshButton = this.makeNavButton('session', txt)
    seshButton.addEventListener('click', function() { user.loginUserForm() } )
    seshButton.addEventListener('click', function() { user.clearSession() } )
    // seshButton.addEventListener('click', function() { this.logout() } )
    nav.appendChild(seshButton)
  }


}
