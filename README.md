# homebridge-vizio-soundbar
A Homebridge plugin for controlling your Vizio Smartcast soundbar using HomeKit or Siri. 

## Getting Started
You'll need to install [Homebridge](https://github.com/nfarina/homebridge) first:

````
sudo npm install -g homebridge
````

Then, install `homebridge-vizio-soundbar`:

````
sudo npm install -g homebridge-vizio-soundbar
````

## Setting Up
To configure `homebridge-vizio-soundbar`, you'll need to know the LAN IP address or hostname of your soundbar.

## Configuring Homebridge
Homebridge uses a [JSON file](https://github.com/nfarina/homebridge#quick-overview) to determine what accessories are exposed to HomeKit. Add the following entry to your `config.json`:

````
"accessories": [
    {
        "accessory": "VizioSoundbar",
        "name": "Whatever Name You Want",
        "address": "YOUR DISPLAY'S IP ADDRESS"
    }
]
````
for example
````
"accessories": [
    {
        "accessory": "VizioSoundbar",
        "name": "Living Room Soundbar",
        "address": "192.168.0.43:9000" // port number 9000 for old model
    }
]

````

## Controlling Your Display
Currently, `homebridge-vizio-soundbar` only supports turning your display on and off. And this module has only been tested on model `SmartCast Sound Bar 4551-D5`

## How it Works
`homebridge-vizio-soundbar` is based on [`vizio-smart-cast`](https://github.com/heathbar/vizio-smart-cast/blob/master/README.md) by [Heath Paddock](https://github.com/heathbar) and [`homebridge-vizio
`](https://github.com/JohnWickham/homebridge-vizio) by [John Wickham](https://github.com/JohnWickham). Many thanks to them for their excellent work.