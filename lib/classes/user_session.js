
import DOMTools from '../tools/dom_tools.js'
const tool = new DOMTools

import NavBar from './nav_bar.js'
const nav = new NavBar


export default class UserSession {


  // ---- Logout ----

  clearSession(){
    sessionStorage.setItem('api_key', null)
    nav.loadNav()
  }


  // ---- Register ----

  registerUser() {
    let content = tool.byId('content')
    tool.clearHTML(content)
    this.buildRegisterForm(content)
  }

  buildRegisterForm(element) {
    let form = tool.addSpan(element, 'registerFrom', null)
    this.emailField(form)
    this.passwordField(form)
    this.passwordConfirmationField(form)
    this.registerSubmit(form)
  }

  makeUser() {
    let user = newUser()
    this.makePostRequest(user)
  }

  newUser() {
    let user =  {
                  'verb': 'POST',
                  'url': 'https://sweater-weather-api-app.herokuapp.com/api/v1/users',
                  'body': {
                            'email':                  tool.byId('emailField').value,
                            'password':               tool.byId('passwordField').value,
                            'password_confirmation':  tool.byId('confirmField').value
                          },
                }
    return user
  }



  // ---- Login ----

  loginUserForm() {
    let content = tool.byId('content')
    tool.clearHTML(content)
    let form = tool.addSpan(content, 'loginFrom', null)
    this.emailField(form)
    this.passwordField(form)
    this.loginSubmit(form)
  }

  loginUser() {
    let user = user()
    this.makePostRequest(user)
  }

  user() {
    let user =  {
                  'verb': 'POST',
                  'url':  'https://sweater-weather-api-app.herokuapp.com/api/v1/sessions',
                  'body': {
                            'email':    tool.byId('emailField').value,
                            'password': tool.byId('passwordField').value,
                          },
                  // 'display': 'login'
                }
    return user
  }



  // ---- API ----

  makePostRequest(obj) {
    let verb    = obj['verb']
    let url     = obj['url']
    let body    = obj['body']

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
        this.newSession(data)
      }
      else { this.badCredentials() }
    }
    var blob = new Blob([ JSON.stringify(body)], {type : 'application/json'});
    req.send( blob )
  }

  badCredentials() {
    let feedback = tool.byId('feedback')
    tool.clearHTML(feedback)
    let msg = "Sorry, something went wrong."
    tool.appendText(feedback, msg)
  }

  newSession(data) {
    let key = data['data']['attributes']['api_key']
    sessionStorage.setItem('api_key', key)
    nav.loadNav()
    this.nowLoggedIn()
  }

  nowLoggedIn() {
    let feedback = tool.byId('feedback')
    tool.clearHTML(feedback)
    let msg = "You're now logged in, please explore and add favorite locations!"
    tool.appendText(feedback, msg)
    let content = tool.byId('content')
    tool.clearHTML(content)
  }


  // ---- HTML Fields ----

  emailField(form) {
    let email = tool.addDiv(form, 'email', 'row' )
    let title = tool.addSpan(email, null, 'title')
    tool.appendText(title, "Email")
    let field = tool.addSpan(email, 'email', 'field')
    field.appendChild( tool.makeInput('text', 'emailField', null) )
  }

  passwordField(form) {
    let password = tool.addDiv(form, 'password', 'row' )
    let title    = tool.addSpan(password, null, 'title')
    tool.appendText(title, "Password")
    let field    = tool.addSpan(password, 'password', 'field')
    field.appendChild( tool.makeInput('password', 'passwordField', null) )
  }

  passwordConfirmationField(form) {
    let confirm = tool.addDiv(form, 'confrim', 'row' )
    let title   = tool.addSpan(confirm, null, 'title')
    tool.appendText(title, "Confirm Password")
    let field   = tool.addSpan(confirm, 'confirm', 'field')
    field.appendChild( tool.makeInput('password', 'confirmField', null) )
  }

  registerSubmit(form) {
    let submit = tool.addDiv(form, 'submit', 'row')
    let button = tool.makeInput('submit', 'registerSubmit', null)
    button.addEventListener('click', function() { this.makeUser() } )
    submit.appendChild(button)
    form.appendChild(submit)
  }

  loginSubmit(form) {
    let submit = tool.addDiv(form, 'submit', 'row')
    let button = tool.makeInput('submit', 'loginSubmit', null)
    button.addEventListener('click', function() { this.loginUser() } )
    submit.appendChild(button)
    form.appendChild(submit)
  }

}
