const request = require('request');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.set("PORT", PORT);
request('http://ip-api.com/json/', function (error, response, body){
        var ip = JSON.parse(body);
        var city = ip['city'];
        var country = ip['country'];
        request(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=36dfbbbc29631e10218bea2c939e020d&units=imperial`, function (error, response, body){
            var weather = JSON.parse(body);
            var temperature = weather['main']['temp'];
            app.get('/', function (req, res) {
                var message = `${city}, ${country} - \n Temperature: ${temperature}°F`;
                res.send(message);
              });
});
});
app.listen(app.get('PORT'), function () {
    console.log('Server started on http://localhost: ' + app.get('PORT'));
});