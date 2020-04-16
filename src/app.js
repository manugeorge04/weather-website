const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

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
    res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia'
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

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})