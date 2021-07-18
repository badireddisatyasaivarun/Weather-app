const express = require('express');
const path = require('path');
const hbs = require('hbs');
const location_data = require("./Utils/w-address");
const get_data = require("./Utils/w-data");
const port = process.env.PORT||3000;
//decare express application;
const app = express();

 //console.log(__dirname);
//console.log(__filename);


//define paths for view engine extension and views.
const public_path = path.join(__dirname,'../public');
const views_path = path.join(__dirname,'../templates/views');
const partials_path = path.join(__dirname,'../templates/partials');

//console.log(public_path);
//console.log(views_path);

//set paths for view engine extension and views.
app.set('view engine', 'hbs');
app.set('views',views_path)

// register partials
hbs.registerPartials(partials_path);


//set up static directory to set.
app.use(express.static(public_path));

app.get('',(req,res)=>{
res.render('index',{
    title:'Weather App',
    name: 'Badireddi Satya Sai Varun'
});
})



app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Badireddi Satya Sai Varun',
        text: 'This is a Help Page',
        contact: 'For any queries, mail me at satysaivarun232@gmail.com'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Badireddi Satya Sai Varun'
    });
})

app.get('/about/*',(req,res)=>{
    res.render('error',{
        title:'About',
        name: 'Badireddi Satya Sai Varun',
        message: 'page not found'
    });  
    })
    
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Help',
        name: 'Badireddi Satya Sai Varun',
        message: 'page not found'
    }); 
    })

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
      return res.send({
          error:"Unable to find Location. Try another Search",
      });
    }


    
    // geocode data

    let location_address = req.query.address;

    location_data(location_address,(error,longitude_Response)=>{     

        // we can use object destructuring for longitude_responce as {body}, because we just are accessing body.
    
        if(error||longitude_Response.body.features.length==0)
        {
             return res.send({
        address: req.query.address,
        error: error,
                   })
        }

        console.log(longitude_Response.body.features[0].center);
        let lattitude = longitude_Response.body.features[0].center[1];
        let longitude = longitude_Response.body.features[0].center[0];
     

        get_data(longitude,lattitude,(error,response)=>{
     
            if(error)
            {
                 return res.send({
            address: req.query.address,
            error: "error",
                       })
            }


         res.send({
             forecast: "The tempearture is recorded at "+response.body.current.observation_time+". It has measured, "+response.body.current.temperature+" Degree Celcius Out, And has wind to be of "+response.body.current.weather_descriptions[0]+" with a speed of "+response.body.current.wind_speed+" Km/ph. and the humidity is "+response.body.current.humidity+"% period.",
             location: response.body.location.region+", "+response.body.location.country,
             address: req.query.address,
            });
         
         })
     
     })

     //




    // console.log(req.query);
    // res.send({
    //     address: req.query.address,
    // })

})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        name: 'Badireddi Satya Sai Varun',
        message: 'page not found'
    });   
})


app.listen(port,()=>{
    console.log('server started in '+port);
})