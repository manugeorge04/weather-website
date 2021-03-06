const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Manu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Manu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is of no help.',
        title: 'Help',
        name : "Manu"        
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send("Error please enter address")
    }

    const address = req.query.address

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({error:error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error:error})
            }
            console.log(forecastData.weather_icon)
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address

        })

    })
    

    })
})

app.get('/help/*', (req, res) =>{
    res.render('error', {
        errorMessage: 'Help article not found',
        title: 'Error 404',
        name : "Manu"        
    })
})
app.get('*', (req, res) =>{                          //we use a wild card * so it HAS TO COME IN THE END as express check for one by one till it finds a match
    res.render('error', {
        errorMessage: 'Page not found',
        title: 'Error 404',
        name : "Manu"        
    })
})

app.listen(port, () => {
    console.log('Server is up on port',port)
})