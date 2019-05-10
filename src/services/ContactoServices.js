import util from '../util/util'
import utilHttp from '../util/utilHTTP'
import cte from '../support/constant'
import {
    URL_GENERICA
} from '../support/parameter'
//var moment = require('moment');
//moment.locale('es');
export default {
    lista_redes_sociales: function (callback) {
        var request = {
            "oResults": {
                "sCodigoTabla": "RedesSociales"
            }
        };

        utilHttp.requestHttp(URL_GENERICA, 'post', request, callback);
    },
    lista_contenido_HTML: function (callback) {
        var request = {
            "oResults": {
                "sCodigoTabla": "ContactoContenido"
            }
        };
        
        utilHttp.requestHttp(URL_GENERICA, 'post', request, callback);
    }
}
