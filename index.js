var vizio = require('vizio-smart-cast');
var Accessory, Service, Characteristic;

module.exports = function(homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;

	homebridge.registerAccessory('homebridge-vizio', 'VizioSoundbar', VizioSoundbar);
}

function VizioSoundbar(log, config, api) {

	var platform = this;
	this.log = log;
	this.config = config;
	this.accessories = [];

	this.log("Connecting to Vizio soundbar…");

	this.deviceAddress = config.address;
	this.accessToken = config.token;
	this.displayDevice = new vizio(this.deviceAddress);
	this.displayDevice.pairing.useAuthToken(this.accessToken);

	this.log("Connected to Vizio soundbar at " + this.deviceAddress);

	//Create a service to expose the power state of the soundbar
	var powerService = new Service.Switch(this.name);
	powerService.getCharacteristic(Characteristic.On).on('get', this.getPowerState.bind(this)).on('set', this.setPowerState.bind(this));

	this.services = [powerService];

}

/* Power Service */

// Get the power state of the soundbar
VizioSoundbar.prototype.getPowerState = function(callback) {

	this.log("Fetching Vizio soundbar power state…");

	if (!this.displayDevice) {
		this.log("Couldn't fetch Vizio soundbar power state because no soundbar is connected.");
		callback(null, false);
		return;
	}

	this.displayDevice.power.currentMode().then((result) => {

		var powerState = result.ITEMS[0].VALUE;
		var isPowerOn = powerState == 1;

		this.log("Vizio soundbar is", (isPowerOn ? "on" : "off"));

		callback(null, isPowerOn);

	}).catch(callback);

}

// Set the power state of the soundbar
VizioSoundbar.prototype.setPowerState = function(state, callback) {

    this.displayDevice.power.currentMode().then((result) => {

		var powerState = result.ITEMS[0].VALUE;
		var isPowerOn = powerState == 1;

		this.log("Vizio soundbar is", (isPowerOn ? "on" : "off"));

		var powerPromise;

        if (state == 1 && !isPowerOn) {

            powerPromise = this.displayDevice.control.power.on();
        }
        else if (state == 0 && isPowerOn) {
            powerPromise = this.displayDevice.control.power.off();
        } else {
            callback(null, state);
        }

        this.log("Turning Vizio soundbar", (state == 1 ? "on" : "off"));

        if (powerPromise) {
            powerPromise.then((result) => {

                var status = result.STATUS.RESULT;
                var success = status == "SUCCESS" ? 1 : 0;
                callback(null, success);
            }).catch(callback);
        }
	}).catch(callback);



}

VizioSoundbar.prototype.getServices = function() {
	return this.services;
}
