/**
 *
 * Register to IoT Name Server.
 *
 */
var os = require('os'),
    ifaces = os.networkInterfaces(),
    id = 'RSAP01AB89C43SA24',
    ip = '',
    url = 'https://www.mangoict.com/iotns/srv.php';

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