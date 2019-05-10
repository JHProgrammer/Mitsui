import { URL_GENERICA } from "../support/parameter";
import utilHTTP from "../util/utilHTTP";

export default {
    lista_marcas:function (callback) 
    {
        var request = 
                    {
                        "oResults": 
                        {
                            "sCodigoTabla": "marca_auto"
                        }
                    }   
        utilHTTP.requestHttp(URL_GENERICA, 'post', request, callback);
    }
}