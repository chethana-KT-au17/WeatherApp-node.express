const express = require('express');
const { copyFileSync } = require('fs');
var exphbs = require('express-handlebars')
const app = express()

const path = require('path')
const port= 5000;
const weatherData = require('../utils/weather')

const publicStatic = path.join(__dirname,'../public')
const hbs = exphbs.create({
    extname: '.hbs'
  })

app.use(express.static(publicStatic));

app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')



app.get('/',(req,res) =>{
    res.render(
        "indi", {title : "Weather App"})
})

app.get('/weather',(req,res) => {
    const city = req.query.city

    if(!city){
        res.send({error: 'pls enter city name'})
    }
    weatherData(city , (err, {temperature, description , cityName})=>{
        if(err){
            return res.send({ error })
        }
        console.log(temperature, description , cityName)
        res.send({temperature, description , cityName})
    })
})

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`)
})