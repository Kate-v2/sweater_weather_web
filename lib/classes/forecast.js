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
    this.makeGetRequest(obj)
    // this.makeGetRequest(obj, function() {debugger; this.assessDisplay(data, display)})
    // this.makeGetRequest(obj, this.assessDisplay(data, display))
    // this.makeGetRequest(obj, this.assessDisplay())
  }


  displayForecast(data){

    tool.clearValue( tool.byId( 'navSearch' ) )

    let content = tool.byId('content')
    tool.clearHTML(content)

    let feedback = tool.byId('feedback')
    tool.clearHTML(feedback)


    let info = data['data']['attributes']

    let location = info['location']
    let today    = info['today']
    let current  = info['current']
    let forecast = info['forecast']['data']['attributes']

    let showToday = {
      'gif':     null,
      'desc':    current['summary'],
      'temp':    `${current['temperature']}°`,
      'high':    `${today['high']}°`,
      'low':     `${today['low']}°`,
      'city':    location['city']['long_name'],
      'state':   location['state']['short_name'],
      'country': location['country']['long_name'],
      'time':    current['time'],
    }

    // let content = tool.byId('content')

    let overview = tool.addDiv(content, 'overview', null )

    this.displayToday(showToday, overview)


    debugger

    let showCurrent = {
      'gif':        null,
      'desc':       current['summary'],
      'today':      forecast['hourly'][11]['icon'],
      'tonight':    forecast['hourly'][22]['icon'],
      'feels_like': `${current['feels_like']}°`,
      'humidity':   `${today['humidity'] * 100}%`,
      'visibility': `${today['visibility']} miles`,
      'uv_index':   `${today['uv_index']} ${ today['uv_index'] <= 5 ? "(low)" : "(high)" }`
    }

    this.displayCurrent(showCurrent, overview)

  }



  displayToday(data, element) {

    let cityState = data['city'] + ', ' + data['state']
    let highLow = "High: " + data['high'] + " Low: " + data['low']

    // let showToday = tool.addDiv(element, 'today', 'overview')
    let showToday = tool.addSpan(element, 'today', 'overview')

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


  displayCurrent(data, element) {

    debugger


    let showCurrent = tool.addSpan(element, 'current', 'overview')

    let title = tool.addDiv(showCurrent, 'CurrentTitle', null)
    tool.appendText(title, "Details")

    let current = tool.addDiv(showCurrent, 'currentContainer', null)

    let current1 = tool.addSpan(current, 'current1', 'current')
      let current1_1 = tool.addSpan(current1, 'currentGif', null)
      tool.appendText(current1_1, "IMG")// TO DO - add gif image

      let current1_2 = tool.addSpan(current1, 'currentDesc', null)
      tool.appendText(current1_2, data["desc"])

      let current1_3 = tool.addSpan(current1, 'currentToday', null)
      tool.appendText(current1_3, `Today: ${data["today"]}`)

      let current1_4 = tool.addSpan(current1, 'currentTonight', null)
      tool.appendText(current1_4, `Tonight: ${data["tonight"]}`)


    let current2 = tool.addSpan(current, 'current2', 'current')
      let current2_1 = tool.addDiv(current2, 'current2_1', null)
      let current2_1_title = tool.addSpan(current2_1, null, 'currentTitle')
      tool.appendText(current2_1_title, "Feels Like")
      let current2_1_data = tool.addSpan(current2_1, null, 'currentData')
      tool.appendText(current2_1_data, data['feels_like'])

      let current2_2 = tool.addDiv(current2, 'current2_2', null)
      let current2_2_title = tool.addSpan(current2_2, null, 'currentTitle')
      tool.appendText(current2_2_title, "Humidity")
      let current2_2_data = tool.addSpan(current2_2, null, 'currentData')
      tool.appendText(current2_2_data, data['humidity'])

      let current2_3 = tool.addDiv(current2, 'current2_3', null)
      let current2_3_title = tool.addSpan(current2_3, null, 'currentTitle')
      tool.appendText(current2_3_title, "Visibility")
      let current2_3_data = tool.addSpan(current2_3, null, 'currentData')
      tool.appendText(current2_3_data, data['visibility'])

      let current2_4 = tool.addDiv(current2, 'current2_4', null)
      let current2_4_title = tool.addSpan(current2_4, null, 'currentTitle')
      tool.appendText(current2_4_title, "UV Index")
      let current2_4_data = tool.addSpan(current2_4, null, 'currentData')
      tool.appendText(current2_4_data, data['uv_index'])

  }



  // ---- API -----

  makeGetRequest(obj) {
    let verb = obj['verb']
    let url  = obj['url']
    let term = obj['term']
    let endpoint = url + term

    var data
    let req = new XMLHttpRequest()
    req.open(verb, endpoint, true)
    req.onload = function() {
      let stat = this.status
      let valid = ( stat >= 200 && stat < 300 )
      if( valid ) {
        data = JSON.parse(this.responseText)
        // I tried lots of things to get a callback to work, and nothing did..
        // so this feels terrible, but it works...
        let forecast = new Forecast
        forecast.assessDisplay(data, obj['display'])
      }
      else { this.badLocation() }
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
    if (display == 'forecast') { this.displayForecast(data) }
    // else if (display == 'favorites') { displayFavorites(data) }
  }

}
