//y:139.74899599999995
//x:35.60711999999982
//現在
var x3 = 35.58893758484893;
var y3 = 139.69348298384832;
//ゴール
var x2 = 35.60711999999982;
var y2 = 139.74899599999995;
//スタート
var x1 = 35.0;
var y1 = 140;
var count = 0,ideal = 0,real = 0;

var test = function(){
	var a = Math.atan2(y2 - y1, x2 - x1);
	var b = Math.atan2(y3 - y1, x3 - x1);
	console.log(a);
	console.log(b);
	ideal = a * 57.298;
	real = b * 57.298;
	console.log('IdealAngle');
	console.log(ideal);
	console.log('realAngle');
	console.log(real);

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
}

test();