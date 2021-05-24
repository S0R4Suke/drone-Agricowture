//経度longitude　緯度latitude
var bebop = require('node-bebop');
var drone = bebop.createClient();

var x2 = 35.607119;					//ゴール地点
var y2 = 139.748995;
x2 = toFixed(6);
y2 = toFixed(6);
var count = 0;
var x,y,nowx,nowy,ideal,real;

drone.connect(function() {
	drone.on('ready', function(){   //ドローンとの接続
		drone.on('PositionChanged', function(result){	//座標取得
			console.log('PositionChange');
			console.log(result);

			if(count == 0){
				x = result.latitude;
				y = result.longitude;
				radian = Math.atan2( y2 - y, x2 - x);	//ラジアン単位で返ってくる
				console.log('radian');
				console.log(radian);
				ideal = radian * 57.298;				//単位を角度に変換
				ideal = toFixed(6);
				console.log('IdealAngle');
				console.log(ideal);
				count++;
			}else{
				nowx = result.latitude;
				nowy = result.longitude;
				radian = Math.atan2(nowy - y,nowx - x);	//ラジアン単位で返ってくる
				console.log('radian');
				console.log(radian);
				real = radian * 57.298;
				real = toFixed(6);					//単位を角度に変換
				console.log('RealAngle');
				console.log(real);
			}

			nowx = toFixed(6);
			nowy = toFixed(6);
			x2 = toFixed(6);
			y2 = toFixed(6);
			if(nowx == x2 && nowy == y2){
				console.log('目的地に到着しました');
			}


			if(ideal >= 0){
				if(ideal > real){
					console.log("左へ");
				}else if(ideal < real){
					console.log("右へ");
				}else{
					console.log("まっすぐ");
				}
			}else{
				if(ideal > real){
					console.log("右へ");
				}else if(ideal < real){
					console.log("左へ");
				}else{
					console.log("まっすぐ");
				}
			}


		});
	});
});