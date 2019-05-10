import util from "../../util/util";
import cte from "../../support/constant";
import homeServices from "../../services/HomeServices";
import home from "../../js/home";

export default {
    /*Servicies */
    servicieHome: function (ctx) {
        util.progresShow(ctx, cte.hm_start);
        this.dataNoticias(ctx);
        this.dataEventos(ctx);
        this.dataBeneficios(ctx);
        this.dataCanje(ctx);
    },
    dataNoticias: function (ctx) {
        var here = this;
        homeServices.noticias(function (result) {
            if (result.c === "s") {
                if (!util.dataService(ctx, result.data.oAuditResponse, cte.pointer_aut)) {
                    util.progresClose(ctx);
                } else {
                    //Provisorio
                    ctx.noticias = result.data.oResults;

                    setTimeout(() => {
                        
                    }, 500);
                    
                    //revizar
                    //faltaimplementar el validateElementServiciesxaray
                    //util.validateElementServicies(ctx,result.data.oResults,cte.hm_element,here.answerNoticias);
                }
            } else {
                util.progresClose(ctx);
                util.errorConection(ctx);
            }
        });
    },
    dataEventos: function (ctx) {
        var here = this;
        window.loadEvents = false;
        homeServices.eventos(function (result) {
            if (result.c === "s") {
                if (!util.dataService(ctx, result.data.oAuditResponse, cte.pointer_aut)) {
                    util.progresClose(ctx);
                } else {
                    ctx.eventos = result.data.oResults;
                    window.loadEvents = true;
                }
            } else {
                util.progresClose(ctx);
                util.errorConection(ctx);
            }
        });
    },
    dataBeneficios: function (ctx) {
        var here = this;
        homeServices.beneficios(function (result) {
            if (result.c === "s") {
                if (!util.dataService(ctx, result.data.oAuditResponse, cte.pointer_aut)) {
                    util.progresClose(ctx);
                } else {
                    ctx.beneficios = result.data.oResults;

                }
            } else {
                util.progresClose(ctx);
                util.errorConection(ctx);
            }
        });
    },
    dataCanje: function (ctx) {
        var here = this;
        homeServices.canjes(function (result) {
            if (result.c === "s") {
                if (!util.dataService(ctx, result.data.oAuditResponse, cte.pointer_aut)) {
                    util.progresClose(ctx);
                } else {
                    ctx.canje = result.data.oResults;
                    here.dataArticulos(ctx);
                }
            } else {
                util.progresClose(ctx);
                util.errorConection(ctx);
            }
        });
    },
    dataArticulos: function (ctx) {
        homeServices.articulos(function (result) {
            if (result.c === "s") {
                if (!util.dataService(ctx, result.data.oAuditResponse, cte.pointer_aut)) {
                    util.progresClose(ctx);
                } else {
                    util.progresClose(ctx);
                    util.changeCombobox(ctx, result.data.oResults, 'sCodigoSap', 'sDescripcion', 'categorias');
                }
            } else {
                util.progresClose(ctx);
                util.errorConection(ctx);
            }
        });
    },
    /*answerService(Pendiente)*/
    answerNoticias: function (ctx, data) {
        console.log("hola", data);
        //ctx.noticias=data;
        // ctx.username  = data.sNombre;
    },
    createEventDevice: function (ctx, item) {
        var fechaFin = new Date(item.dFechaFin);
        var ms = fechaFin.getTime() + 86400000;
        var tomorrow = new Date(ms);
        util.addEvent(item.sTitulo, item.sDireccion, item.sLocacion, new Date(item.dFechaInicio), tomorrow,
            function (data) {
                ctx.opened_agenda = true;
                 setTimeout(function () { ctx.opened_agenda = false; }, 2000);
                console.log("Create Event Success", data);
               
            },
            function (error) {
                util.snackbar(ctx, 'Error al registrar evento', 'negative', 'white', 'warning', 'bottom');
                console.log("Create Event Error", error);
            })
    },
    datos_generales: function (ctx) {
        ctx.$datos_generales(ctx);
    },
    noticia_interna_id: function (ctx,id) {
        util.progresShow(ctx, 'Consultando noticia');
        homeServices.noticias(function (result) {
            console.log(result);
            util.progresClose(ctx);
            util.resultValidate(
                ctx,
                result,
                {
                    exito: function (data) {
                        //util.openWebView()
                        console.log(data);
                        var arrayData = data.oResults;
                        var encontrado = false;
                        for(var i = 0 ; i < arrayData.length; i++){
                            var item = arrayData[i];
                            if(item.sTipoNoticia === "NI" && item.iId === parseInt(id)){
                                encontrado = true;
                                //util.selectItemNotification('noticia_' + item.iId + '_'+ item.sTipoNoticia);
                                util.setPositionItem('noticia_' + item.iId + '_'+ item.sTipoNoticia);
                                ctx.$root.$emit('showContenido2',{
                                    titulo: item.sTitulo,
                                    contenido: item.sContenido
                                  });
                                //util.openWebView(item.sUrl);
                            }
                        }

                        if(!encontrado){
                            return util.snackbar(ctx, 'No se encontro la noticia', 'negative', 'white', 'warning', 'bottom');
                        }
                    },
                    validacion: function (data, mensaje) {
                        return util.snackbar(ctx, 'No se encontro la noticia', 'negative', 'white', 'warning', 'bottom');
                    },
                    exepcion: function () {
                        return util.snackbar(ctx, 'No se encontro la noticia', 'negative', 'white', 'warning', 'bottom');
                    }
                });
        });
    },
    noticia_externa_id: function (ctx,id) {
        util.progresShow(ctx, 'Consultando noticia');
        homeServices.noticias(function (result) {
            console.log(result);
            util.progresClose(ctx);
            util.resultValidate(
                ctx,
                result,
                {
                    exito: function (data) {
                        //util.openWebView()
                        console.log(data);
                        var arrayData = data.oResults;
                        var encontrado = false;
                        for(var i = 0 ; i < arrayData.length; i++){
                            var item = arrayData[i];
                            if(item.sTipoNoticia === "NE" && item.iId === parseInt(id)){
                                encontrado = true;
                                util.setPositionItem('noticia_' + item.iId + '_'+ item.sTipoNoticia);
                                setTimeout(function(){
                                    util.openWebView(item.sUrl);
                                },1000);
                                i = arrayData.length;
                            }
                        }

                        if(!encontrado){
                            return util.snackbar(ctx, 'No se encontro la noticia', 'negative', 'white', 'warning', 'bottom');
                        }
                    },
                    validacion: function (data, mensaje) {
                        return util.snackbar(ctx, 'No se encontro la noticia', 'negative', 'white', 'warning', 'bottom');
                    },
                    exepcion: function () {
                        return util.snackbar(ctx, 'No se encontro la noticia', 'negative', 'white', 'warning', 'bottom');
                    }
                });
        });
    },
    evento_id: function (id, callback) {
        //utilHttp.requestHttp(URL_NOTICIA_EVENTO_ID + id, 'get', {}, callback);
        //showCanje
    },
    beneficio_id: function (ctx,id) {
        util.progresShow(ctx, 'Consultando beneficio');
        homeServices.beneficios(function (result) {
            console.log(result);
            util.progresClose(ctx);
            util.resultValidate(
                ctx,
                result,
                {
                    exito: function (data) {
                        //util.openWebView()
                        console.log(data);
                        var arrayData = data.oResults;
                        var encontrado = false;
                        for(var i = 0 ; i < arrayData.length; i++){
                            var item = arrayData[i];
                            console.log(item);
                            if(item.iId === parseInt(id)){
                                encontrado = true;
                                util.setPositionItem('beneficio_' + item.iId);
                                setTimeout(function(){
                                    util.openWebView(item.sUrl);
                                },1000);
                                i = arrayData.length;
                            }
                        }

                        if(!encontrado){
                            return util.snackbar(ctx, 'No se encontro el beneficio', 'negative', 'white', 'warning', 'bottom');
                        }
                    },
                    validacion: function (data, mensaje) {
                        return util.snackbar(ctx, 'No se encontro el beneficio', 'negative', 'white', 'warning', 'bottom');
                    },
                    exepcion: function () {
                        return util.snackbar(ctx, 'No se encontro el beneficio', 'negative', 'white', 'warning', 'bottom');
                    }
                });
        });
    },
    canje_id: function (ctx,id) {
        util.progresShow(ctx, 'Consultando productos del Club Mitsui');
        homeServices.canjes(function (result) {
            console.log(result);
            util.progresClose(ctx);
            util.resultValidate(
                ctx,
                result,
                {
                    exito: function (data) {
                        //util.openWebView()
                        console.log(data);
                        var arrayData = data.oResults;
                        var encontrado = false;
                        for(var i = 0 ; i < arrayData.length; i++){
                            var item = arrayData[i];
                            console.log(item);
                            if(item.iId === parseInt(id)){
                                encontrado = true;
                                util.setPositionItem('canje_' + item.iId);
                                ctx.$root.$emit('showCanje',item);
                            }
                        }

                        if(!encontrado){
                            return util.snackbar(ctx, 'No se encontro producto del Club Mitsui', 'negative', 'white', 'warning', 'bottom');
                        }
                    },
                    validacion: function (data, mensaje) {
                        return util.snackbar(ctx, 'No se encontro producto del Club Mitsui', 'negative', 'white', 'warning', 'bottom');
                    },
                    exepcion: function () {
                        return util.snackbar(ctx, 'No se encontro producto del Club Mitsui', 'negative', 'white', 'warning', 'bottom');
                    }
                });
        });
    }

}