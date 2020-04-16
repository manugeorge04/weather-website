const express = require('express')

const app = express()

app.get('', (req, res) => {                           //'' has nothing for the root page that is, app.com
    res.send('Hello express')
})

app.get('/help', (req,res) =>{
    res.send('Help Page')
})

app.listen(3000,() => {                               //port number 3000 is usually used for development callback is optional
    console.log("Server is up on port 3000!")
})

