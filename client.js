/**
 *
 * IoT Client (nodejs)
 *
 */

'use strict';

var http = require('http'),
    os = require('os');

/**
 *
 * Register to IoT Name Server.
 *
 */
var ifaces = os.networkInterfaces(),
    id = 'RSAP01AB89C43SA24',
    ip = '',
    url = 'http://www.edens-ict.com/iotns/srv.php';

 console.log('IoT Client - register to IoT Name Server');

function sendRequest(){
    // Request
    var request = require('request');
    var propertiesObject = { ip: ip, id: id, a: 'i' };

    request({url:url, qs:propertiesObject}, function(err, response, body) {
        if(err) { console.log(err); return; }
        console.log('> IoT Client - get response -' +  response.statusCode);
        console.log(body);
    });
}

Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }

        if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            console.log(ifname + ':' + alias, iface.address);
            ip = iface.address;
            sendRequest();
        } else {
            // this interface has only one ipv4 adress
            console.log(ifname, iface.address);
            ip = iface.address;
            sendRequest();
        }
    });
});

/**
 *
 * Register a small webserver to run forever!
 *
 */
http.createServer(function (req, res) {  
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('hello, world.')
    res.end();
}).listen(8080);

/* server started */  
console.log('IoT Client - running on port 8080');