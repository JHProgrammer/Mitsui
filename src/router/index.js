import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import VueMask from 'v-mask'
import homeServices from "../services/HomeServices";
import util from "../util/util";
var imageBase64 = require('image-base64');
const store = require('store')


//import MaskedInput from 'vue-masked-input'

Vue.use(VueRouter)
Vue.use(VueMask)

Vue.prototype.$deviceSize = {
  heigth: window.innerHeight,
  width: window.innerWidth,
  position: 0
}



Vue.prototype.$format_message_calendario = "";
Vue.prototype.$format_titulo_calendario = "";
Vue.prototype.$datos_generales = function (ctx) {
  ctx.datos_generales = [];
  homeServices.datos_generales(function (result) {
    util.resultValidate(
      ctx,
      result,
      {
        exito: function (data) {
          for(var i = 0; i < data.oResults.length; i++){
            var item = data.oResults[i];
            if(item.sCampo === "msg_calendario"){
              Vue.prototype.$format_message_calendario = item.sDescripcion;
            }

            if(item.sCampo === "tituto_calendario_agenda"){
              Vue.prototype.$format_titulo_calendario = item.sDescripcion;
            }

          }
          ctx.datos_generales = data.oResults;
        },
        validacion: function (data, mensaje) {
          ctx.datos_generales = [];
        },
        exepcion: function () {
          ctx.datos_generales = [];
        }
      });
  });
}


Vue.prototype.$formatDatosGenerales = function (campo, datos_generales) {
  var valor = "";
  for (var i = 0; i < datos_generales.length; i++) {
      var item = datos_generales[i];
      if (item.sCampo === campo) {
          valor = item.sDescripcion;
      }
  }

  return valor;
}

Vue.prototype.$bodyFixed = function () {
  //console.log("fixed");
  //document.body.style.position = "fixed";
}

Vue.prototype.$bodyBlock = function () {
  //console.log("static");
  //document.body.style.position = "static";
}



Vue.prototype.$HideElementText = function (valor) {
  if (valor) {
    return true;
  } else {
    return false;
  }
}

Vue.prototype.$imageMemory = function (url) {

  function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        console.log(reader.result);
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  var imageMemory = store.get(url);
  console.log("imageMemory", imageMemory);
  console.log("url", url);
  if (imageMemory) {
    return imageMemory;
  } else {
    toDataUrl(url, function (base64) {
      store.set(url, base64);
    });
    return url;
  }
}
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
