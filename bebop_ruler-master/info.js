var bebop = require('node-bebop');
var drone = bebop.createClient();
var alreadyFlying = false;
//module.exports.info = function(){      //exportで関数をexportして他ファイルで呼び出せるように
    drone.connect(function() {  //connect
        drone.on('ready', function(){   //ドローンとの接続
            drone.on('battery',function(result){
                // var Battery = 'Battery';
                // var result = result;
                // return Battery;
                // return result;
                console.log('Battery');
                console.log(result);
            });
              drone.on("GPSFixStateChanged", function(data) {
                console.log("GPSFixStateChanged", data);
              });
              drone.on("ComponentStateListChanged", function(data) {
                console.log("ComponentStateListChanged", data);
              });
                          drone.on("MavlinkPlayErrorStateChanged", function(data) {
                console.log("MavlinkPlayErrorStateChanged", data);
              });

              drone.on("MavlinkFilePlayingStateChanged", function(data) {
                console.log("MavlinkFilePlayingStateChanged", data);
              });

            drone.on('PositionChanged', function(result){
                console.log('PositionChange');
                console.log(result);
            });
            drone.on("AvailabilityStateChanged", function(data) {
                 console.log("AvailabilityStateChanged", data);
                if (data.AvailabilityState === 1 && !alreadyFlying) {
                alreadyFlying = true;
                drone.Mavlink.start("/data/ftp/internal_000/flightplans/flightPlan.mavlink", 0);
                }
            });
        });
    });
//};