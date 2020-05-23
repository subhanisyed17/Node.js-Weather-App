const request = require('request');

// getting location co-ordinates using map-box api

const geoCode = (location,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1Ijoic3ViaGFuaXN5ZWQxNyIsImEiOiJja2FkMDRueWIwMHlqMnJxdGlzaThpeXN2In0.lqkBjZz75hePe9ZCErkEoA`;
    request({url,json : true},(error,{body}) =>{
        if(error){
            callback(error,undefined);
        }
        else if(body.features.length === 0){
            callback('The location which you have searched does not exist, try searching for another location', undefined);
        }
        else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode;