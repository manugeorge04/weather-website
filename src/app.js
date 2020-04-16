const path = require('path')
const express = require('express')

console.log(__dirname)

const app = express()
const indexfile = path.join(__dirname, '../public')

app.use(express.static(indexfile))

app.get('', (req,res) =>{                               //'' has nothing for the root page that is, app.com
    res.send('<h1>Weather<h1>')
})

app.get('/help', (req, res) => {                          
    res.send([{
        name : 'Manu'
    }, {
        name : 'Jenu'
    }])
})

app.get('/about', (req,res) =>{
    res.send('<h2>About Page<h2>')
})

app.get('/weather', (req,res) =>{
    res.send([
        {
            Forecast : 'Hot'
        },
        {
            Location : 'Bangalore'
        }
    ])
})

app.listen(3000,() => {                               //port number 3000 is usually used for development callback is optional
    console.log("Server is up on port 3000!")
})

