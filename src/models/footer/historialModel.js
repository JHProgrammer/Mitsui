import util from '../../util/util'
import VehiculoServices from '../../services/VehiculoServices';
import CitaService from '../../services/CitaService';
var moment = require('moment');
moment.locale('es');

export default {
  listar_vehiculos: function (ctx) {
    ctx.mensajeEmptyHistorial = "";
    VehiculoServices.vehiculos(window.usuario.iIdC4C, window.usuario.sNumIdentificacion,'', function (result) {
      util.resultValidate(
        ctx,
        result,
        {
          exito: function (data) {
            ctx.listaVehiculos = data.oResults.BOVehiculo;
            if(listaVehiculos.length < 1){
              ctx.mensajeEmptyHistorial = "No se encontró información registrada";
            }
          },
          validacion: function (data) {
            ctx.listaVehiculos = [];
            ctx.mensajeEmptyHistorial = "No se encontró información registrada";
          },
          exepcion: function () {
            ctx.listaVehiculos = [];
            ctx.mensajeEmptyHistorial = "No se encontró información registrada";
          }
        });
    });
  },
  historial: function (item, ctx) {
    var historial = new Object();
    historial.listHistorial = item;
    util.progresShow(ctx, 'Cargando el historial de su vehículo');
    CitaService.historial(item.zPlaca, function (result) {
      util.progresClose(ctx);
      if (result.c !== "s") {
        var response = result.data.oAuditResponse;
        util.errorServer(ctx);
        return;
      }

      var response = result.data.oAuditResponse;
      if (response.iCode != 1) {
        util.snackbar(ctx, response.sMessage, 'negative', 'white', 'warning', 'bottom');
        historial.listCitas = [];
      } else {
        historial.listCitas = result.data.oResults.EtOrdVlc.item;
        ctx.$router.push({ name: 'servicios', params: { servicios: historial } });
      }
    });
  },
  eliminar_cita: function (item, ctx) {
    util.progresShow(ctx, 'Cancelando cita');
    CitaService.eliminar(item.zIdC4c, item.zUUID, function (result) {
      util.progresClose(ctx);
      ctx.opened_accion = false;
      ctx.opened_cancelar = false;
      ctx.loadIni();
      util.resultValidate(
        ctx,
        result,
        {
          exito: function (data) {
            window.plugins.calendar.deleteEventById(item.sCodCalendario,null,function(){
              console.log("Evento borrado Success:" + item.sCodCalendario)
            },function(){
              console.log("Evento borrado Error:" + item.sCodCalendario)
            });
          },
          validacion: function (data) {
            var response = result.data.oAuditResponse;
            util.snackbar(ctx, response.sMessage, 'positive', 'white', 'warning', 'bottom');

          },
          exepcion: function () {}
        });
    });
  }
}
