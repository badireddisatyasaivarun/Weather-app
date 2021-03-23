const request = require("request");

const get_data = (longitude,lattitude,callback)=>{

    const dest_address = "http://api.weatherstack.com/current?access_key=6fdc08e203cc638b5a552997810a0fb1&query="+lattitude+","+longitude+"&units=m";
    // m units stand for celcius, f for fahrenhite.

    request({url: dest_address, json: true},(error,response)=>{      // we can use url, json sorthand notation

        callback(error,response);

    })

}

module.exports = get_data;