"use strict";

var bebop = require("node-bebop");//サーバーサイドでnode-bebopを使えるようにしたもの

var drone = bebop.createClient();//new Bebopを返す(謎)

var alreadyFlying = false;

drone.connect(function() {
//飛行準備ができたらこのプログラムを実行する
  drone.on("GPSFixStateChanged", function(data) {
    console.log("GPSFixStateChanged", data);
    //GPSの状態を修正(謎)
  });

  drone.on("MavlinkPlayErrorStateChanged", function(data) {
    console.log("MavlinkPlayErrorStateChanged", data);
    //Mavlinkとはドローン向けの遠隔測定したデータを機体とPCで情報交換をするやつ(謎)
    //FlightPlanを実行したときのエラー状態(謎)
  });

  drone.on("MavlinkFilePlayingStateChanged", function(data) {
    console.log("MavlinkFilePlayingStateChanged", data);
    //ドローンが飛行中に飛ばしてくるデータの状態が変わったとき(謎)
  });

  drone.on("AvailabilityStateChanged", function(data) {
    console.log("AvailabilityStateChanged", data);
    //Availabilityとは信頼性が高い、有用性があるという意味
    //FrightPlanが実行可能がどうか状態の変化を確認する
    if (data.AvailabilityState === 1 && ! alreadyFlying) {
      alreadyFlying = true;
      //状態が良好であれば、フライトを行う
      drone.Mavlink.start("/data/ftp/internal_000/flightplans/flightPlan.mavlink", 0);
      //drone.mavlink.start(obj↑)
      //FlightPlanに沿って飛行を開始する
    }
  });

  drone.on("ComponentStateListChanged", function(data) {
    console.log("ComponentStateListChanged", data);
    //ドローンのFlightPlanの一部が変更されたときにリストを変更する。(たぶん)
  });

  drone.on("ready", function () {
    console.log("ready");
    //飛行準備
  });

  drone.on("battery", function (data) {
    console.log(data);
    //バッテリーデータ
  });

  drone.on("landed", function () {
    console.log("landed");
    //着陸
  });

  drone.on("takingOff", function () {
    console.log("takingOff");
    //離陸
  });

  drone.on("hovering", function () {
    console.log("hovering");
    //ホバリング
  });

  drone.on("FlyingStateChanged", function () {
    console.log("FlyingStateChanged");
    //離着陸状態が変化した際にデータの送信
  });

  drone.on("BatteryStateChanged", function () {
    console.log("BatteryStateChanged");
    //バッテリーの状態変化
  });

  drone.on("flying", function() {
    console.log("flying");
    //ドローンが空を飛んでいるってことを示す
  });

  drone.on("landing", function() {
    console.log("landing");
    //ドローンが着地したことを示す
  });

  drone.on("unknown", function(data) {
    console.log("unknown", data);
    //おそらくだがMavlinkのデータを送信している
  });
});