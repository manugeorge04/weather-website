request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=965e306cb0f1e6203f511484c8a45da1&query="+encodeURIComponent(latitude)+","+encodeURIComponent(longitude)
    

    request({url, json: true},(error, {body}) => {                     //destructuring ; we use only body from response
        if(error){
            callback("Network error",undefined)
        }else if (body.error){
            callback(body.error.type+". "+body.error.info,undefined)
        }else   {

            callback(undefined, {
                weather_descriptions : body.current.weather_descriptions[0],
                temperature : body.current.temperature,
                feels_like: body.current.feelslike,
                humidity: body.current.humidity,
                weather_icon: body.current.weather_icons[0]
            })
                
                
            //     [body.current.weather_descriptions[0]+" It is currently "+body.current.temperature+" degrees out. It feels like "+body.current.feelslike+" degrees out.",
            //     "Humidity is at "+body.current.humidity,
            //     body.current.weather_icons
            // )

        } 
        
    
    })
}


module.exports = forecast


