import serviceLogin from '../../../services/tallerServices'
import util from '../../../util/util'
import tallerServices from '../../../services/tallerServices';


function calculate_distance(p1, p2,division) {
  var rad = function (x) {
    return x * Math.PI / 180;
  };
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng - p1.lng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d / division; // returns the distance in km
}

function currentPosition(callback) {
  navigator.geolocation.getCurrentPosition(function (position) {

    console.log("------ CORDOVA GEOLOCALIZACION ------");

    console.log('Latitude: ' + position.coords.latitude + '\n' +
      'Longitude: ' + position.coords.longitude + '\n' +
      'Altitude: ' + position.coords.altitude + '\n' +
      'Accuracy: ' + position.coords.accuracy + '\n' +
      'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
      'Heading: ' + position.coords.heading + '\n' +
      'Speed: ' + position.coords.speed + '\n' +
      'Timestamp: ' + position.timestamp + '\n');
    return callback({
      c: "s",
      m: "m",
      data: position
    });
  },
    function (error) {
      console.log("------ CORDOVA GEOLOCALIZACION ------");
      console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
      return callback({
        c: "ex",
        m: error.message,
        data: error
      });
    },{
      timeout: 5000
    });
}
export default {
  listar: function (ctx) {
    util.spinnerShow(ctx, 'Consultando talleres');
    tallerServices.talleres(ctx.codSap, function (result) {
      if (result.c === "s") {
        var response = result.data.oAuditResponse;
        if (response.iCode != 1) {
          util.spinnerClose(ctx);
          util.snackbar(ctx, response.sMessage, 'negative', 'white', 'warning', 'bottom');
          ctx.taller = [];
        } else {
          var data = result.data.oResults;
          util.spinnerShow(ctx, 'Consultando coordenadas');
          currentPosition(function (resultPosition) {
            util.spinnerClose(ctx);
            if (resultPosition.c === "s") {
              var CurrentCoords = { lat: resultPosition.data.coords.latitude, lng: resultPosition.data.coords.longitude }
              for (var i = 0; i < data.length; i++) {
                var pointTaller = { lat: data[i].fLatitud, lng: data[i].fLongitud };
                data[i].distancia = parseInt(calculate_distance(CurrentCoords, pointTaller,1000));
                data[i].distanciaMeters = parseInt(calculate_distance(CurrentCoords, pointTaller,1));
              }
            } else {
              util.snackbar(ctx, 'No se pudo obtener sus coordenadas', 'negative', 'white', 'warning', 'bottom');
            }
            ctx.taller = data.sort(function (a, b) {
              return a.distanciaMeters - b.distanciaMeters;
            });
          });
        }
      }
    })
  }
}
