const request = require('postman-request')


const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=856eb07c434d80ac3cf4bfac9a5da8be&query=' + longitude + ',' + latitude + '&units=m'
//    const url = 'http://api.weatherstack.com/current?access_key=856eb07c434d80ac3cf4bfac9a5da8be&query=37.8267,-122.4233&units=m'

    request({ url, json: true }, (error, { body }) => {
    //NO se puede hacer con try and catch, porque eso solo funciona con "excepciones" (y aca siempre tengo un dato a devolver)

        if (error) {
            callback('Unable to connect to weather services!', undefined)

        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const weater_descriptions = body.current.weather_descriptions[0]
            const temperature = body.current.temperature
            const feelsTemperature = body.current.feelslike
            const humidity = body.current.humidity
            
            callback(undefined, `${weater_descriptions}. It is currently ${temperature} degress out there. It feels like ${feelsTemperature} degress out. The humidity is ${humidity}%. `)
        }
    })
}

module.exports = forecast