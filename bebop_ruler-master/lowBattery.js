var bebop = require('node-bebop');
var drone = bebop.createClient();


drone.connect(function() {  //connect
    drone.on('ready', function(){   //ドローンとの接続
        drone.on('battery',function(result){
            console.log('Battery');
            console.log(result);
        });

        drone.on('PositionChanged', function(result){
            console.log('PositionChange');
            console.log(result);
        });
    });
});