/**
 *
 * IoT Client (nodejs)
 *
 */
(function(){
    'use strict';


    var express = require('express');
    var app = express();

    app.use(express.static('public_html'));
    
    app.get('/iotsrv/', function (req, res) {
        res.send('Hello World!');
    });

    app.get('/msrv/', function (req, res) {
    	res.json({ code : 200, status: 'ok' });
    });

    var server = app.listen(80, function () {

        var host = server.address().address;
        var port = server.address().port;

        console.log('Example app listening at http://%s:%s', host, port);

    });
    
    
    /* server started */  
    console.log('IoT Client - running on port 80');


}());
