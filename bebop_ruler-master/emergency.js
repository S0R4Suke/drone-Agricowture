var bebop = require('node-bebop');
var drone = bebop.createClient();

drone.connect(function() {
	drone.on('ready',function(){
		console.log('ready');
		drone.on('emergency',function(result){
			console.log('Emergency!!');
			console.log(result);
		});
	});
});