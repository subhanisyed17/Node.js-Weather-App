const request = require('request');

const forecast = (latitude,longitude,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=4083182a3b18331f1b4e0ea6d5edf96f&query=${latitude},${longitude}&quuery=f`;
    request({url ,json:true}, (error,{body}) => {
        if(error){
            callback(error);
        }
        else if(body.error){
            callback('No location found with the provided latitude and longitude',undefined);
        }
        else{
            callback(undefined,
                `${body.current.weather_descriptions[0]}.It is currently ${body.current.temperature} degrees out and It feels like ${body.current.feelslike} degrees`,
            )
        }
    })
}

module.exports = forecast;