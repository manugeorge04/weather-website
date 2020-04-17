console.log('Client side javascript file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector("#message1")
const msg2 = document.querySelector("#message2")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()                                           //prevents default behavior of webpage to refresh after a form is submitted
    const location = search.value
    msg1.textContent = "Loading"
    msg2.textContent = ""
    fetch('http://localhost:3000/weather?address=!'+encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
        if (data.error){
            msg1.textContent = data.error 
            msg2.textContent = ""         
        }else{
            msg1.textContent = data.location
            msg2.textContent = data.forecast
        }

    })
})

})