import util from '../util/util'
import utilHttp from '../util/utilHTTP'
import cte from '../support/constant'
import {URL_TALLER, URL_GENERICA} from '../support/parameter'

export default {
  talleres: function (marca, callback) 
  {
    var request = 
                  {
                    "oResults": 
                    {
                      "sMarca": marca
                    }
                  }
    utilHttp.requestHttp(URL_TALLER, 'post', request, callback);
  }
}
