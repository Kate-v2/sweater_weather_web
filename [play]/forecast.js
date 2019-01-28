import DOMTools from '../tools/dom_tools.js'
const tool = new DOMTools



export default class Forecast {

  getForecast(city = null){
    let location = city ? city : tool.byId('navSearch').value
    let obj = {
      'verb': 'GET',
      'url': 'https://sweater-weather-api-app.herokuapp.com/api/v1/forecasts?location=',
      'term': location,
      'display': 'forecast'
    }
    makeGetRequest(obj)
  }

  displayForecast(data){

    tool.clearValue( tool.byId( 'navSearch' ) )


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

    let overview = tool.addDiv(content, 'overview', null )

    displayToday(showToday, overview)

  }

  displayToday(data, element) {

    let cityState = data['city'] + ', ' + data['state']
    let highLow = "High: " + data['high'] + " Low: " + data['low']

    let showToday = tool.addDiv(element, 'today', 'overview')

    let today1 = tool.addSpan(showToday, 'today1_temp', 'today')
      let today1_1 = tool.addDiv(today1, 'today1_1', 'today1')
        let today1_gif  = tool.addSpan(today1_1, 'today1_gif', 'today1_1')
        tool.appendText(today1_gif, "IMG")// TO DO - add gif image
        let today1_desc = tool.addSpan(today1_1, 'today1_desc', 'today1_1')
        tool.appendText(today1_desc, data['desc'])
      let today1_2 = tool.addDiv(today1, 'today1_2', 'today1')
        tool.appendText(today1_2, data['temp'])
      let today1_3 = tool.addDiv(today1, 'today1_3', 'today1')
        tool.appendText(today1_3, highLow)

    let today2 = tool.addSpan(showToday, 'today2_location', 'today')
      let today2_1 = tool.addDiv(today2, 'today2_1', 'today2')
      tool.appendText(today2_1, cityState)
      let today2_2 = tool.addDiv(today2, 'today2_2', 'today2')
      tool.appendText(today2_2, data['country'])
      let today2_3 = tool.addDiv(today2, 'today2_3', 'today2')
      tool.appendText(today2_3, data['time'])

    let today3 = tool.addSpan(showToday, 'today2_location', 'today')
      let today3_1 = tool.addDiv(today3, 'today3_1', 'today3')
      tool.appendText(today3_1, "Change Location")
      let today3_2 = tool.addDiv(today3, 'today3_2', 'today3')
      tool.appendText(today3_2, "Add to Favorites")

  }

  makeGetRequest(obj) {
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

  badLocation(){
    let feedback = tool.byId('feedback')
    tool.clearHTML(feedback)
    let msg = "Sorry, that location does not exist. Check spelling or try another location."
    tool.appendText(feedback, msg)
    // TO DO - grab all location search bars & clear them
  }

  assessDisplay(data, display){
    if (display == 'forecast') { displayForecast(data) }
    // else if (display == 'favorites') { displayFavorites(data) }
  }

}
