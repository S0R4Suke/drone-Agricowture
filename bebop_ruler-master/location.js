"use strict";

var bebop = require("node-bebop");

var drone = bebop.createClient();

drone.connect(function() {
	drone.GPSSettings.sendControllerGPS();

	drone.on("PositionChanged", function(data) {
  		console.log(data);
	});
});