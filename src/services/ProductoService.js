import {URL_ACCES, URL_REPUS, URL_GENERICA} from "../support/parameter";
import utilHttp from '../util/utilHTTP'
export default {
    accesorios:function(callback)
    {
        var request =
                    {
                       "oResults": 
                       {
                       }  
                    }           
        utilHttp.requestHttp(URL_ACCES,'post',request,callback);
    },
    repuestos:function(callback)
    {
        var request =
                    {
                    "oResults": {}  
                    }           
        utilHttp.requestHttp(URL_REPUS,'post',request,callback);
    },
    marcaAuto:function(callback)
    {
        var request = 
                    {
                        "oResults" : 
                                    {	
                                     "sCodigoTabla": "marca_auto"                             
                                    }
                    }
        utilHttp.requestHttp(URL_GENERICA,'post',request,callback);
    },
    modeloAuto:function(callback)
    {
        var request = 
                    {
                        "oResults" : 
                                    {	
                                    "sCodigoTabla": "carro_modelos",
                                    "iIdPadre": ""                            
                                    }
                    }
        utilHttp.requestHttp(URL_GENERICA,'post',request,callback);
    },
    marcaAccesorio:function(callback)
    {
        var request = 
                    {
                        'oResults' : 
                                    {	
                                        'sCodigoTabla': 'marca_accesorio',
                                        'iIdPadre':''    
                                    }
                    }
        utilHttp.requestHttp(URL_GENERICA,'post',request,callback);
    },
    tipoAccesorio:function(callback)
    {
        var request = 
                    {
                        'oResults' : 
                                    {	
                                        'sCodigoTabla':'tipo_accesorio',
			                            'iIdPadre': ''  
                                    }
                    }
        utilHttp.requestHttp(URL_GENERICA,'post',request,callback);
    }
}