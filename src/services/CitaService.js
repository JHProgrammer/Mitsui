import util from '../util/util'
import utilHttp from '../util/utilHTTP'
import cte from '../support/constant'
import {
  URL_CITAS_PENDIENTES,
  URL_CITAS_REGISTRAR,
  URL_CITAS_HISTORIAL,
  URL_CITAS_ELIMINAR,
  URL_CITAS_ACTUALIZAR,
  URL_CITAS_REGISTRAR_PROVICIONA,
  URL_ACTUALIZAR_CALENDARIO
} from '../support/parameter'

export default {
  pendientes: function (cliente, callback) {
    var request = {
      "oResults": {
        "iIdCliente": cliente
      }
    }
    utilHttp.requestHttp(URL_CITAS_PENDIENTES, 'post', request, callback);
  },
  historial: function (placa, callback) {
    var request = {
      "oResults": {
        "sPlaca": placa //placa
      }
    }
    utilHttp.requestHttp(URL_CITAS_HISTORIAL, 'post', request, callback);
  },
  registrar: function (sPlaca, sFechaCita, sHoraCita, iIdTaller, sCodTaller,
    iIdUsuario, sNumIdentificacion, iVehiculoNuevo, bExpress, sModelo, sServicio,
    sMedio, sCodigoTipoServicio, sCodigoServicioRealizar, sObservacion, iDuracionTaller,
    iId,sIdCitaC4c,iIdEstado,sMarca,sTipoValorTrabajo, sIdModelo, sIdClienteC4c,sNombre,
    sApellido, sCodFamiliaVehiculo,isProvisional,sIdCalendario, callback) {
    var request = {
      "oResults": {
        "iId": !iId ? null: parseInt(iId),
        "iIdEstado": iIdEstado,
        "sIdCitaC4c": sIdCitaC4c,
        "sPlaca": sPlaca,
        "sFechaCita": sFechaCita,
        "sHoraCita": sHoraCita,
        "iIdTaller": iIdTaller,
        "sCodTaller": sCodTaller,
        "iIdUsuario": iIdUsuario,
        "sNumIdentificacion": sNumIdentificacion,
        "iVehiculoNuevo": iVehiculoNuevo,
        "bExpress": bExpress,
        "sModelo": sModelo,
        "sServicio": sServicio,
        "sMedioContacto": sMedio,
        "sCodigoTipoServicio": sCodigoTipoServicio,
        "sCodigoServicioRealizar": sCodigoServicioRealizar,
        "sObservacion": sObservacion,
        "iDuracionTaller": iDuracionTaller,
        "sMarca": sMarca,
        "sTipoValorTrabajo" : sTipoValorTrabajo,
        "sIdModelo": sIdModelo,
        "sIdClienteC4c": sIdClienteC4c,
        "sNombre": sNombre,
        "sApellido": sApellido,
        "sCodFamiliaVehiculo" : sCodFamiliaVehiculo,
        "sIdCalendario" : sIdCalendario
      }
    }

    var URL_REGISTRO = !isProvisional ? URL_CITAS_REGISTRAR : URL_CITAS_REGISTRAR_PROVICIONA;

    utilHttp.requestHttp(!iId ? URL_REGISTRO: URL_CITAS_ACTUALIZAR, !iId ? 'post': 'put', request, callback);
  },
  eliminar: function (iId,sIdCitaC4c, callback) {
    var request = { "oResults": { "aItems": [{ "iId": iId, "sIdCitaC4c": sIdCitaC4c }] } }
    utilHttp.requestHttp(URL_CITAS_ELIMINAR, 'delete', request, callback);
  },
  registrar_codigo_calendario: function (params, callback) {
    var request = {
      "oResults": {
        "sCodCalendario": params.sIdCalendario,
        "sIdCita": params.sIdCita
      }
    }
    utilHttp.requestHttp(URL_ACTUALIZAR_CALENDARIO, 'put', request, callback);
  }
}
