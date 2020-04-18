console.log('Client side javascript file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')                     
const msg1 = document.querySelector("#message1")                 //pound sign to signify its a id ; dot "."  is to signify class
const msg2 = document.querySelector("#message2")
const msg3 = document.querySelector("#message3")
const icon = document.querySelector("#weather_icon")
const image = document.querySelector("#weatherpic")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()                                           //prevents default behavior of webpage to refresh after a form is submitted
    const location = search.value
    msg1.textContent = "Loading"
    msg2.textContent = ""
    msg3.textContent = "" 
    icon.style.display = "none"

    fetch('/weather?address=!'+encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
        if (data.error){
            msg1.textContent = data.error 
            msg2.textContent = ""    
            msg3.textContent = ""     
            icon.style.display = "none"
        }else{
            msg1.textContent = data.location
            msg2.textContent = data.forecast.weather_descriptions+". The temperature is "+data.forecast.temperature+", but it feels like it is "+data.forecast.feels_like+" degrees"    
            msg3.textContent = "The humidity is at "+data.forecast.humidity   
            icon.style.display = "block"     
            image.src = data.forecast.weather_icon
        }

    })
})

})