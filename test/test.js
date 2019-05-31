let smartcast = require('vizio-smart-cast');
// smartcast.discover(device => {
//   console.log(device);
// });

let tv = new smartcast('192.168.0.43:9000');
// tv.control.power.on();

tv.power.currentMode().then((data) => {
    console.log(data);
    // tv.control.power.toggle();
});

tv.control.volume.down().then((data) => {
    console.log(data);
});