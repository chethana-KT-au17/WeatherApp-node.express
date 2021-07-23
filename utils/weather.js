const request = require('request');
const consts = require('../config')

const weatherdata = (city, cb)=>{
    const url = consts.weatherapi.URL + encodeURIComponent(city) + '&appid=' + consts.weatherapi.API_KEY;
    console.log(url)
    request({url , json:true}, (err, {body}) => {
        console.log(body)
        if(err){
            cb('cant get data', undefined)
        }else{
            cb(undefined,{
                temperature : body.main.temp,
                description : body.weather[0].description,
                cityName : body.name
            })
        }
    })
}

module.exports = weatherdata