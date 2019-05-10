import util from '../util/util'
import utilHttp from '../util/utilHTTP'
import cte from '../support/constant'
import {
  URL_CALENDARIO,
  URL_GENERICA,
  URL_SERVICIO_MARCA,
  URL_ACTUALIZAR_CALENDARIO
} from '../support/parameter'
var moment = require('moment');
moment.locale('es');

export default {
  calendario: function (taller, callback) {
    var fechaActual = new Date();

    console.log(fechaActual);
    let fechaInicio = moment(fechaActual).format("YYYY-MM-DD");
    let fechaFin = moment(fechaActual).add(34, 'days').format("YYYY-MM-DD");
    var request = {
      "oResults": {
        "sCodigoCentro": taller,
        "sFechaInicio": fechaInicio,
        "sFechaFinal": fechaFin
      }
    }
    utilHttp.requestHttp(URL_CALENDARIO, 'post', request, callback);
  },
  calendario2: function (taller, callback) {
    var fechaActual = new Date();

    console.log(fechaActual);
    let fechaInicio = moment(fechaActual).add(7, 'days').format("YYYY-MM-DD");
    let fechaFin = moment(fechaActual).add(14, 'days').format("YYYY-MM-DD");
    var request = {
      "oResults": {
        "sCodigoCentro": taller,
        "sFechaInicio": fechaInicio,
        "sFechaFinal": fechaFin
      }
    }
    utilHttp.requestHttp(URL_CALENDARIO, 'post', request, callback);
  },
  calendario3: function (taller, callback) {
    var fechaActual = new Date();

    console.log(fechaActual);
    let fechaInicio = moment(fechaActual).add(14, 'days').format("YYYY-MM-DD");
    let fechaFin = moment(fechaActual).add(21, 'days').format("YYYY-MM-DD");
    var request = {
      "oResults": {
        "sCodigoCentro": taller,
        "sFechaInicio": fechaInicio,
        "sFechaFinal": fechaFin
      }
    }
    utilHttp.requestHttp(URL_CALENDARIO, 'post', request, callback);
  },
  calendario4: function (taller, callback) {
    var fechaActual = new Date();

    console.log(fechaActual);
    let fechaInicio = moment(fechaActual).add(21, 'days').format("YYYY-MM-DD");
    let fechaFin = moment(fechaActual).add(28, 'days').format("YYYY-MM-DD");
    var request = {
      "oResults": {
        "sCodigoCentro": taller,
        "sFechaInicio": fechaInicio,
        "sFechaFinal": fechaFin
      }
    }
    utilHttp.requestHttp(URL_CALENDARIO, 'post', request, callback);
  },
  lista_tipo_servicio: function (callback) {
    var request = {
      "oResults": {
        "sCodigoTabla": "tipo_servicio"
      }
    }
    utilHttp.requestHttp(URL_GENERICA, 'post', request, callback);
  },
  lista_tipo_medio: function (callback) {
    var request = {
      "oResults": {
        "sCodigoTabla": "medios_contacto"
      }
    }
    utilHttp.requestHttp(URL_GENERICA, 'post', request, callback);
  },
  _lista_clase_servicio: function (iIdPadre, sCodigoMarca, callback) {
    var sCodigoMarcaFinal;
    if(sCodigoMarca.cita === undefined){
      sCodigoMarcaFinal = sCodigoMarca.marcaSap;
    } else{
      sCodigoMarcaFinal = sCodigoMarca.cita.sMarca;
    }
    var request = {
      "oResults": {
        "iIdPadre": iIdPadre,
        // "sCodigoMarca": sCodigoMarca
        "sCodigoMarca": sCodigoMarcaFinal
      }
    }
    utilHttp.requestHttp(URL_SERVICIO_MARCA, 'post', request, callback);
  },
  lista_clase_servicio: function (iIdPadre, callback) {
    var request = {
      "oResults": {
        "iIdPadre": iIdPadre
      }
    }
    utilHttp.requestHttp(URL_GENERICA, 'post', request, callback);
  }
}
