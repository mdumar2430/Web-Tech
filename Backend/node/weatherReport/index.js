const express = require('express')
const app = express()
const port = 3000
const API_KEY = '09eebe8af618424d9f382254231207'
app.use(express.json())
var cors = require('cors')
app.use(cors())
app.post('/getWeather', async (req, res)=> {
    const {cities} = req.body
    const weatherData = {};
    const weatherPromises = cities.map((city) =>
        fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city})&aqi=no`)
        .then(resp => {
            if(!resp.ok) throw new Error(resp.statusText)
            return(resp.json())
        })
        .then(data => {
            weatherData[city] = data.current.temp_c+'C'
        })
        .catch(console.error)
      )
    await Promise.all(weatherPromises)
    res.json({
        weather:weatherData
    })
})

app.listen(port, () => {
    console.log("App running at port", port)
})
