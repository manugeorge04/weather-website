request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoia3VtYXIxNTY3IiwiYSI6ImNrOHg2YXowbTAzOWozbHAxam9jbDdlNnAifQ.3IqP5XP3PeW48u7uv5bitA&limit=1"
    request({url, json: true},(error, {body}) =>{               //destructuring
        if(error)
            callback("Network Error",undefined)
        else if (body.features.length === 0)
            callback("enter valid location",undefined)
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode