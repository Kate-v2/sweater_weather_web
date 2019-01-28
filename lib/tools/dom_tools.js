

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

}
