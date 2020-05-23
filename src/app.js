const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// setting up paths for express config
const publicDirectoryPath = path.join(__dirname , '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setting up hbs engine and custom path to render views from that path
app.set('view engine','hbs');
app.set('views',viewsPath);

//setting up partials configuration for hbs
hbs.registerPartials(partialsPath);

//setting up an directory path from where we can serve the files
app.use(express.static(publicDirectoryPath));

app.get('',(req,res) => {
    res.render('index',{
        title : 'Weather App',
        createdBy : 'Mohammad Subhani'
    })
})

app.get('/about' ,(req,res) => {
    res.render('about',{
        title : 'About Page',
        name : 'Robot',
        createdBy : 'Mohammad Subhani'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title : 'Help Page',
        message : 'Use below pointers, if you are facing any issues in using the application',
        createdBy : 'Mohammad Subhani'
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title : '404 page not found',
       message : 'Help article not found',
       createdBy : 'Mohammad Subhani'
    })
})

app.get('/weather', (request,response) => {
    if(!request.query.address){
        return response.send({
            error : "Must Provide Address to get weather updates"
        })
    }
    geocode(request.query.address, (error,{latitude,longitude,location} = {}) => {
        if(error){
          return response.send({
                error : error
            })
        }
        forecast(latitude,longitude, (error,forecastRes) => {
            if(error){
                return response.send({
                    error : error
                })
            }
            console.log(forecastRes);
            response.send({
                forecast : forecastRes,
                location : location,
                address : request.query.address
            })
        })
    })
})


app.get('*',(req,res) => {
    res.render('404',{
        title : '404',
        message: '404. Page Not Found',
        createdBy : 'Mohammad Subhani'
    })
})

app.listen(3000, () => {
    console.log('The server is up and running');
})