import DOMTools from '../tools/dom_tools.js'
const tool = new DOMTools




export default class Forecast {

  // ---- Search ----

  buildSearchBar(element) {
    let field = tool.makeInput('text', 'navSearch', 'nav_element')
    element.appendChild(field)
    field = tool.byId('navSearch')
    field.placeholder = "Search for a US City"
    this.buildSearchSubmit(element)
  }

  buildSearchSubmit(element) {
    let submit = tool.makeInput('submit', 'navSearchButton', 'nav_element')
    element.appendChild(submit)
    submit = tool.byId('navSearchButton')
    submit.addEventListener('click', function() { this.getForecast() } )
  }


  // ---- Request ----

  getForecast() {


  }

}
