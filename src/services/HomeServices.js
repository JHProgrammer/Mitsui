import utilHttp from '../util/utilHTTP';
import { URL_NOTIC, URL_EVENT, URL_BENEF, URL_CANJE, URL_GENERICA, URL_NOTICIA_INTERNA, URL_NOTICIA_EXTERNA, URL_NOTICIA_EVENTO_ID, URL_BENEFICIO_ID } from '../support/parameter';

export default {

    noticias: function (callback) {
        var request =
        {
            "oResults": {}
        }
        utilHttp.requestHttp(URL_NOTIC, 'post', request, callback);
    },
    eventos: function (callback) {
        var request =
        {
            "oResults": {}
        }
        utilHttp.requestHttp(URL_EVENT, 'post', request, callback);
    },
    beneficios: function (callback) {
        var request =
        {
            "oResults": {}
        }
        utilHttp.requestHttp(URL_BENEF, 'post', request, callback);
    },
    canjes: function (callback) {
        var request =
        {
            "oResults": {
                "sJerarquia": ''
            }
        }
        utilHttp.requestHttp(URL_CANJE, 'post', request, callback);
    },
    articulos: function (callback) {
        var request =
        {
            "oResults": {
                "sCodigoTabla": "jerarquia_productos"
            }
        }
        utilHttp.requestHttp(URL_GENERICA, 'post', request, callback);
    },
    datos_generales: function (callback) {
        var request = { "oResults": { "sCodigoTabla": "datos_generales_app" } };
        utilHttp.requestHttp(URL_GENERICA, 'post', request, callback);
    },
    noticia_interna_id: function (id,callback) {
        utilHttp.requestHttp(URL_NOTICIA_INTERNA + id, 'get', { }, callback);
    },
    noticia_externa_id: function (id,callback) {
        utilHttp.requestHttp(URL_NOTICIA_EXTERNA + id, 'get', { }, callback);
    },
    evento_id: function (id,callback) {
        utilHttp.requestHttp(URL_NOTICIA_EVENTO_ID + id, 'get', { }, callback);
    },
    beneficio_id: function (id,callback) {
        utilHttp.requestHttp(URL_BENEFICIO_ID + id, 'get', { }, callback);
    }

}