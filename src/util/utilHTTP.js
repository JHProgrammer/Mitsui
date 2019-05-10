import axios from 'axios'
import cte from '../support/constant'
import util from '../util/util'

export default {
    requestHttp: function (url, method, data, callback) {
        var consultado = false;
        axios({
            method: method,
            url: url,
            data: JSON.stringify(data),
            headers:
            {
                'Content-Type': cte.contentType,
                'sToken': !localStorage.user ? cte.stoken : util.generateToken(localStorage.user),
                'sIdTransaccion': util.generateIdTransaccion(),
                'sAplicacion': cte.sAplicacion,
                'Authorization': cte.isPRD ? cte.authorizationPRD: cte.authorization
            },
            responseType: 'json',
            responseEncoding: 'utf8'
        })
            .then(function (response) {
                consultado = true;
                return callback({
                    c: "s",
                    m: "",
                    data: response.data
                });
            })
            .catch(function (error) {
                if(!consultado){
                    return callback({
                        c: "ex",
                        m: "Error HTTP",
                        data: null
                    });
                }
            });
    }
}