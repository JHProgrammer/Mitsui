import { HalfCircleSpinner } from 'epic-spinners';
import { QSpinnerIos } from 'quasar';
import cte from '../support/constant';
import moment from 'moment';

export default {
    snackbar: function (context, msg, tipo, color, icono, pos) {
        context.$q.notify({
            message: msg,
            timeout: 3000,
            type: tipo,
            textColor: color,
            icon: icono,
            position: pos
        });
    },
    snackbarConfirm: function (context, msg, okCallback, cancelCallback) {
        context.$q.notify({
            message: msg,
            timeout: 0,
            type: 'positive',
            textColor: 'white',
            icon: 'warning',
            position: 'top',
            actions: [
                {
                    label: 'Confirmar',
                    icon: 'done', // optional
                    noDismiss: false, // optional, v0.15.11+
                    handler: () => {
                        okCallback();
                    }
                },
                {
                    label: 'Cancelar',
                    icon: 'highlight_off', // optional
                    handler: () => {
                        cancelCallback();
                    }
                }
            ],

            onDismiss() { // v0.15.11+
                cancelCallback();
            }
        });
    },
    progresShow: function (context, msg) {
        context.$q.loading.show({
            spinner: HalfCircleSpinner,
            spinnerColor: 'white',
            spinnerSize: 80,
            message: msg,
            messageColor: 'white'
        });
    },
    progresClose: function (context) {
        context.$q.loading.hide();
    },
    /*Generator*/
    generateEncripto: function (userPass) {
        if (/([^\u0000-\u00ff])/.test(userPass)) throw Error('userPassing must be ASCII');
        var o1, o2, o3, bits, h1, h2, h3, h4, e = [], pad = '';
        var c = userPass.length % 3;
        if (c > 0) { while (c++ < 3) { pad += '='; userPass += '\0'; } }
        for (c = 0; c < userPass.length; c += 3) {
            o1 = userPass.charCodeAt(c);
            o2 = userPass.charCodeAt(c + 1);
            o3 = userPass.charCodeAt(c + 2);
            bits = o1 << 16 | o2 << 8 | o3;
            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;
            e[c / 3] = cte.keyUtil.charAt(h1) + cte.keyUtil.charAt(h2) + cte.keyUtil.charAt(h3) + cte.keyUtil.charAt(h4);
        }
        userPass = e.join('');
        userPass = userPass.slice(0, userPass.length - pad.length) + pad;
        return userPass;
    },
    generateIdTransaccion: function () {
        var fecha = new Date();
        var fechaIso = fecha.toISOString();
        var fechaString = fechaIso.toString().replace(/:/g, "").replace(/-/g, "").replace(".", "").replace("Z", "").replace("T", "");
        var randon = Math.floor((Math.random() * 1000000) + 1);
        var idTransaccion = fechaString + "" + randon;
        return idTransaccion;
    },
    generateToken: function (user) {
        return this.random() + this.encode(user);
    },
    random: function () {
        var tad1 = cte.keyRandom;
        var aleat = Math.floor(Math.random() * tad1.length);
        return tad1[aleat];
    },
    remove_utf8: function (utftext) {
        var string = "";
        var i = 0, c = 0, c1 = 0, c2 = 0, c3 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c); i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    },
    encode: function (val) {
        var i = 0;
        var keyStr = cte.keyUtil;
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        val = this.remove_utf8(val);
        while (i < val.length) {
            chr1 = val.charCodeAt(i++);
            chr2 = val.charCodeAt(i++);
            chr3 = val.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) { enc3 = enc4 = 64; } else if (isNaN(chr3)) { enc4 = 64; }
            output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }
        return output;
    },
    /*Error*/
    errorServer: function (context) {
        this.snackbar(context, 'Sin conexión al servidor. Intentente en unos minutos.', 'negative', 'white', 'warning', 'bottom');
    },
    errorMovil: function (context, msg) {
        this.snackbar(context, msg, 'negative', 'white', 'warning', 'bottom');
    },
    errorConection: function (context) {
        this.snackbar(context, 'Algo salio mal. Revise su conexión y vuelva intentarlo en unos minutos.', 'negative', 'white', 'warning', 'bottom');
    },
    /*Succes*/
    succesMovil: function (context, msg) {
        this.snackbar(context, msg, 'positive', 'white', 'thumb_up', 'top');
    },
    /*Validation*/
    validateEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    messageValidation: function (context, evt, msg, callback) {
        if (callback(evt)) {
            context.validator = false;
            context.msgValidation = '';

        } else {
            context.validator = true;
            context.msgValidation = msg;
        }
    },
    messageValidator: function (context, bolean, msg) {
        context.validator = bolean;
        context.msgValidation = msg;
    },
    nullVacio: function (val) {
        if (!val) { return false; } else { return true; }
    },
    dataService: function (context, data, parameter) {
        if (!this.nullVacio(data)) {
            this.errorServer(context);
            return false;
        } else if (!data[parameter]) {

            this.errorServer(context);
            return false;
        } else if (data[parameter] != 1) {

            this.errorMovil(context, data.sMessage);
            return false;
        } else {
            return true;
        }
    },
    validateElementServicies: function (context, list, elements, callback) {
        this.progresClose(context);
        var cont = 0;
        for (var i = 0; i < elements.length; i++) {
            if (!list[elements[i]]) { list[elements[i]] = 0; }
            if (!list[elements[i]].toString()) { cont++; }
        }
        if (cont > 0) { this.errorServer(context); } else { callback(context, list); }
    },
    spinnerShow: function (ctx, msg) {
        ctx.$q.loading.show({
            spinner: HalfCircleSpinner,
            spinnerColor: 'white',
            spinnerSize: 80,
            message: msg,
            messageColor: 'white'
        });
    },
    spinnerClose: function (ctx) {
        ctx.$q.loading.hide();
    },
    maxlength: function (ctx, model, valueModel, min, max) {
        ctx[model] = valueModel.substring(min, max);
    },
    validateInput: function (ctx, model, valor, validation) {
        if (!validation.test(valor)) { ctx[model] = valor.substr(0, valor.length - 1); }
    },
    validateRegex: function (valor, validation) {
        return validation.test(valor);
    },
    /*Formater*/
    formaterDate: function (date, formater) {
        if (!date) { return null; } else { return moment(String(date)).format(formater); }
    },
    /*Mapa*/
    showMapaGoogle: function (ctx, lat, lng) {
        ctx.mapa_html = "";
        var idmap = "map_html" + (new Date()).getTime().toString();
        ctx.mapa_html = '<div id="' + idmap + '" style="width: ' + ctx.widthMap + 'px; height: ' + ctx.heigthMap + 'px"></div>';
        this.progresShow(ctx, 'Generando mapa');
        var self = this;
        setTimeout(function () {
            self.progresClose(ctx);
            ctx.Mapa = new google.maps.Map(document.getElementById(idmap), {
                zoom: 14,
                center: { lat: lat, lng: lng },
                gestureHandling: 'greedy'
            });

            ctx.Mapa.setCenter({ lat: lat, lng: lng });
            var markerGoogle = new google.maps.Marker({
                position: { lat: lat, lng: lng },
                map: ctx.Mapa
            });

            markerGoogle.setAnimation(google.maps.Animation.BOUNCE);
            google.maps.event.trigger(ctx.Mapa, 'resize');
        }, 1000);
    },
    resultValidate: function (ctx, result, callbacks) {
        if (result.c === "s") {
            var response = result.data.oAuditResponse;
            if (response.iCode === -1) {
                callbacks.exepcion();
                this.errorServer(ctx);
            } else if (response.iCode === 1) {
                callbacks.exito(result.data);
            } else {
                //this.snackbar(ctx, response.sMessage, 'negative', 'white', 'warning', 'bottom');
                callbacks.validacion(result.data, response.sMessage, response.iCode);
            }
        } else {
            callbacks.exepcion();
            this.errorServer(ctx);
        }
    },
    conditionallyAddBySource: function (tagName, src) {
        if (document.getElementById("ScriptMap")) {
            document.getElementById("ScriptMap").remove();
        }

        // Otherwise, add an element of the required type
        tagName = tagName.toLowerCase();
        var propToCheck = { script: 'src', link: 'href' }[tagName];
        var element = document.createElement(tagName);
        element[propToCheck] = src;
        element.id = "ScriptMap";
        document.getElementsByTagName('head')[0].appendChild(element);
    },
    deleteEvent: function (titulo, direccion, descripcion, fecha_inicio, fecha_fin, successCallback, errorCallback) {
        // BORRAR EVENTO AL CALENDARIO
        window.plugins.calendar.deleteEvent(
            titulo,
            direccion,
            descripcion,
            fecha_inicio,
            fecha_fin,
            successCallback,
            errorCallback);
    },
    addEvent: function (titulo, direccion, descripcion, fecha_inicio, fecha_fin, successCallback, errorCallback) {
        // AGREGAR EVENTO AL CALENDARIO
        function triggerFunction() {
            window.plugins.calendar.createEvent(
                titulo,
                direccion,
                descripcion,
                fecha_inicio,
                fecha_fin,
                successCallback,
                errorCallback);
        }

        this.deleteEvent(titulo, direccion, descripcion, fecha_inicio, fecha_fin,
            function (data) {
                console.log("Delete Event Success", data);
                triggerFunction();
            }, function (error) {
                console.log("Delete Event Error", error);
                triggerFunction();
            });
    },
    addEvent2: function (titulo, direccion, descripcion, fecha_inicio, fecha_fin, successCallback, errorCallback) {
      // AGREGAR EVENTO AL CALENDARIO
      function triggerFunction() {
          window.plugins.calendar.createEvent(
              titulo,
              direccion,
              descripcion,
              fecha_inicio,
              fecha_fin,
              successCallback,
              errorCallback);
      }
      triggerFunction();
  },
    openWebView(url) {
        cordova.InAppBrowser.open(url, '_blank', 'location=yes');
    },
    call: function (number) {
        //window.open("tel:+"+number,'_blank')
        cordova.plugins.CordovaCall.callNumber(number,
            function (data) {
                console.log("call success", data);
            }, function (error) {
                console.log("call error", error);
            });
        /*window.plugins.CallNumber.callNumber(function(data){
            console.log("call success", data);
        }, function(error){
            console.log("call error", error);
        }, number, true);*/
    },
    changeCombobox: function (ctx, list, value, label, cbx) {
        var listCbx = [];
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var itemOption = {};
            itemOption.value = item[value];
            itemOption.label = item[label];
            listCbx.push(itemOption);
        }
        return ctx[cbx] = listCbx;
    },
    codSapList: function (store, valor, parameter) {
        var retorno = [];
        var list = JSON.parse(store);
        for (var i = 0; i < list.length; i++) {
            if (list[i].iId == valor) {
                retorno.push(list[i][parameter]);
            }
        }
        return retorno;
    },
    selectItemNotification: function (id_elemento, afinamientoposicion) {
        var element = document.getElementById(id_elemento);
        if(element){
            var positionTop = element.offsetTop;
            document.getElementById("q-app").scrollTop = positionTop - (afinamientoposicion ? afinamientoposicion : 150);
        }

    },
    setPositionItem(itemId,afinPos){
        var self = this;
        self.selectItemNotification(itemId,afinPos);
        var myInterval = setInterval(myTimer,1000);
        function myTimer(){
          if(document.getElementById(itemId)){
            self.selectItemNotification(itemId,afinPos);
            clearInterval(myInterval);
          }
        }
    },
    generarCitaCalendario: function (message_format, data, callback) {
      var direcion = data.taller.sDireccion;
      var titulo = data.select_servicio + ' - ' + data.select_realizar;
      var fechaInicio = new Date(data.fecha_seleccion + ' ' + data.hora_seleccion + ':00');
      var fechaFin = new Date(fechaInicio.getTime() + 60 * 60000);
      var mensaje = message_format.
      replace("{{P_MODELO}}", data.placa_seleccion).
      replace("{{P_PLACA}}", data.modelo_seleccion).
      replace("{{P_TALLER}}", data.taller.sDescripcion);

      this.addEvent(titulo,direcion,mensaje,fechaInicio,fechaFin, function(sIdCalendario){
        callback(sIdCalendario);
      },function(){
        callback(null);
      });
    },
    generarCitaCalendarioV2: function (data,ctx, callback) {
      var direcion = data.direccion;
      var titulo = ctx.$format_titulo_calendario;
      var fechaInicio;
      var fechaFin
         if(device.platform === "iOS"){
            fechaInicio = new Date((data.fecha + ' ' + data.hora).replace(/-/g, "/"));
            fechaFin = new Date(fechaInicio.getTime() + 60 * 60000);
        }else {
            fechaInicio = new Date(data.fecha + ' ' + data.hora);
            fechaFin = new Date(fechaInicio.getTime() + 60 * 60000);
        }


    //   var fechaInicio = new Date(data.fecha + ' ' + data.hora);
    //   var fechaFin = new Date(fechaInicio.getTime() + 60 * 60000);
      var mensaje = ctx.$format_message_calendario.
      replace("{{P_MODELO}}", data.placa).
      replace("{{P_PLACA}}", data.modelo).
      replace("{{P_TALLER}}", data.taller);

      this.addEvent2(titulo,direcion,mensaje,fechaInicio,fechaFin, function(sIdCalendario){
        callback(sIdCalendario);
      },function(){
        callback(null);
      });
    },
}
