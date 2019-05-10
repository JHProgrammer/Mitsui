import util from '../util/util'
import utilHttp from '../util/utilHTTP'
import cte from '../support/constant'
import { URL_LOGIN, URL_REGIS, URL_CONTR, URL_TOKEN } from '../support/parameter'


export default {
    autentificacion: function (user, pass, callback) {
        var request =
        {
            "oResults":
            {
                "sAcceso": util.generateEncripto(user + ':' + pass)
            }
        }
        utilHttp.requestHttp(URL_LOGIN, 'post', request, callback);
    },
    createCuenta: function (data, callback) {
        var request =
        {
            'oResults':
            {
                'sUsuario': data[4],
                'sNumIdentificacion': data[2],
                'sNombre': data[0],
                'sApellido': data[1],
                'sEmail': data[4],
                'iIdTipoUsuario': cte.tipoUsuario,
                "dFechaNacimiento": data[5],
                "sTelefono": data[3]
            }
        }
        utilHttp.requestHttp(URL_REGIS, 'post', request, callback);
    },
    recoveryCuenta: function (email, callback) {
        var request =
        {
            'oResults':
            {
                "sUsuario": email
            }
        }
        utilHttp.requestHttp(URL_CONTR, 'post', request, callback);
    },
    setTokenFirebase: function (token, callback) {
        var request =
        {
            'oResults':
            {
                "sTokeDeviceFB": token
            }
        }
        utilHttp.requestHttp(URL_TOKEN+window.usuario.iIdHana, 'put', request, callback);
    }
}