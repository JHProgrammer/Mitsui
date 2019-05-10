import util from '../util/util'
import utilHttp from '../util/utilHTTP'
import cte from '../support/constant'
import {
  URL_EXPRESS
} from '../support/parameter'

export default {
  express: function (sCodTaller,sModeloVeh,iIdClaseMant,sHorario,sFecha, sCodFamiliaVehiculo, callback) {
    var request = {
      "oResults": {
        "sCodTaller": sCodTaller,
        "sCodigoModelo": sModeloVeh,
        "sCodigoMant": iIdClaseMant,
        "sHoraCita": sHorario+ ":00",
        "sFechaCita": sFecha,
        "sCodFamiliaVehiculo" : sCodFamiliaVehiculo
      }
    }
    utilHttp.requestHttp(URL_EXPRESS, 'post', request, callback);
  }
}
