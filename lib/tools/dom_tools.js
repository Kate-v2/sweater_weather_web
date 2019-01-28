

export default class DOMTools {


  byId(id) {
    return document.getElementById(id)
  }

  clearHTML(element){
    element.innerHTML = ''
  }

  clearValue(element) {
    element.value = ''
  }

  addDiv(element, id=null, className=null) {
    let div = document.createElement('div')
    if (id) {div.id = id}
    if (className) {div.className = className}
    element.appendChild(div)
    return div
  }

  addSpan(element, id=null, className=null) {
    let span = document.createElement('span')
    if (id) {span.id = id}
    if (className) {span.className = className}
    element.appendChild(span)
    return span
  }

  makeInput(type, id=null, className=null) {
    let field = document.createElement("INPUT");
    field.setAttribute("type", type);
    if (id) { field.id = id }
    if (className) { field.className = className }
    return field
  }

  appendText(element, text) {
    let node = document.createTextNode(text)
    element.appendChild(node)
  }

}
