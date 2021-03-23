const Request = require("request");
const chalk = require("chalk");

const location_data = (address,callback) => {
 
    const dest_address  = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoidmFydW4yMzIiLCJhIjoiY2trZjhvZzg3MDI5ODJ2cXR4YjJmbThuNiJ9.vSsRN2SWwwO8psIGC3VxUw&limit=2";
    Request({url:dest_address, json:true},(error,Response)=>{      // we can use url, json sorthand notation
 
        if(error)
        {
            //console.log(chalk.grey("check if network not is working"));
            callback(error="Check Internet Connection",Response);
        }
        else if(Response.body.features.length==0)
        {
            // console.log(chalk.red("please enter another address, current address data is not available"));
            callback(error="Unable to find Location. Try another Search",Response);
        }
        else
        callback(error,Response);   // url is in small caps.

    })

}

module.exports = location_data;