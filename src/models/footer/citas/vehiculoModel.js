import util from '../../../util/util'
import CalendarioServices from '../../../services/CalendarioServices';
import VehiculoServices from '../../../services/VehiculoServices';
import ExpressService from '../../../services/ExpressService';
import CitaService from '../../../services/CitaService';
var moment = require('moment');
moment.locale('es');


function obtenerSemanas(ListaDias, Columnas) {
  var nSemanas = (ListaDias.length / 7).toString().split(".")[0];
  var semanas = [];
  for (var i = 0; i < parseInt(nSemanas); i++) {
    var nroSemana = (i * 7);
    var objetoSemana = {};
    objetoSemana.Id = nroSemana;
    objetoSemana.Columnas = Columnas;
    objetoSemana.Dias = [];
    objetoSemana.Data = [];
    objetoSemana.Mes = "";
    var contadorPrimerDia = 0;
    for (var j = 0; j < ListaDias.length; j++) {
      var itemDias = ListaDias[j];
      if (itemDias.iItem - 1 >= objetoSemana.Id && itemDias.iItem - 1 < (objetoSemana.Id + 7)) {
        if (contadorPrimerDia === 0) {
          objetoSemana.Mes = moment(itemDias.sfecha).format("MMMM").toUpperCase();
        }
        objetoSemana.Dias.push(itemDias);
        contadorPrimerDia++;
        var contadorData = 0;
        for (var x = 0; x < objetoSemana.Columnas.length; x++) {
          var itemColumna = objetoSemana.Columnas[x];
          contadorData++;
          var itemData = {
            ItemId: contadorData,
            ItemDiaDesc: itemDias.sDia,
            ItemDiaNum: itemDias.iNumDia,
            ItemNum: itemDias.iItem,
            ItemFecha: itemDias.sfecha,
            ItemDisponibles: 0,
            ItemHora: itemColumna.rango
          }

          for (var y = 0; y < itemDias.aHorarios.length; y++) {
            var itemHorario = itemDias.aHorarios[y];
            var isPasado = moment(itemData.ItemFecha + ' ' + itemData.ItemHora).isBefore(new Date());

            if (itemHorario.Hora === itemData.ItemHora && !isPasado) {
              itemData.ItemDisponibles = itemHorario.Disponibles;
            }
          }
          objetoSemana.Data.push(itemData);
        }
      }
    }
    semanas.push(objetoSemana);
  }

  return semanas;
}

export default {
  obtener_kilometraje: function (ctx, noOpenServicio, spinner) {
    if(!spinner){
      util.progresShow(ctx, 'Obtenido kilometraje');
    }
    
    VehiculoServices.kilometraje(ctx.placa_seleccion, function (result) {
      console.log(result);
      if(!spinner){
        util.progresClose(ctx);
      }
      
      if (!noOpenServicio) {
        ctx.popup_servicio = true;
      } else {
        ctx.popup_servicio = false;
      }

      util.resultValidate(
        ctx,
        result,
        {
          exito: function (data) {
            ctx.kilometraje = data.oResults.kmAuto;
            
            if(ctx.pagina === "taller"){
              ctx.select_servicio = ctx.options.servicio[0].value;
              ctx.consultarClaseServicio(ctx.select_servicio);
            }
            
          },
          validacion: function (data, mensaje) {
            ctx.kilometraje = 0;
            if(ctx.pagina === "taller"){
              ctx.select_servicio = ctx.options.servicio[0].value;
              ctx.consultarClaseServicio(ctx.select_servicio);
            }
          },
          exepcion: function () {
            ctx.kilometraje = 0;
            if(ctx.pagina === "taller"){
              ctx.select_servicio = ctx.options.servicio[0].value;
              ctx.consultarClaseServicio(ctx.select_servicio);
            }
          }
        });
    });
  },
  listar: function (ctx) {
    util.spinnerShow(ctx, 'Consultando calendario');
    CalendarioServices.calendario(ctx.taller.sCentroSap, function (result) {
      
      util.resultValidate(
        ctx,
        result,
        {
          exito: function (data) {
            var columnas = [];
            data.oResults.aHoras = data.oResults.aHoras.sort();
            for (var i = 0; i < data.oResults.aHoras.length; i++) {
              var itemHora = data.oResults.aHoras[i];
              columnas.push({
                rango: itemHora
              });
            }
            util.spinnerShow(ctx, 'Generando calendario');
            ctx.semanas = obtenerSemanas(data.oResults.aListDias, columnas);
            console.log(ctx.semanas);
            ctx.iDuracionTaller = data.oResults.iDuracionTaller;
            util.spinnerClose(ctx);
          },
          validacion: function (data, mensaje) {
            ctx.semanas = [];
            util.spinnerClose(ctx);
          },
          exepcion: function () {
            ctx.semanas = [];
            util.spinnerClose(ctx);
          }
        });
    })
  },
  listar_tipo_servicio: function (ctx) {
    CalendarioServices.lista_tipo_servicio(function (result) {
      util.resultValidate(
        ctx,
        result,
        {
          exito: function (datax) {
            var data = datax.oResults.sort(function (a, b) {
              return a.iOrden - b.iOrden;
            });
            var dataOptions = [];
            for (var i = 0; i < data.length; i++) {
              var item = data[i];
              var itemOption = {};
              if (i === 0 && ctx.pagina === "taller") {
                ctx.select_servicio = item.sCodigoSap;
              }
              itemOption.value = item.sCodigoSap;
              itemOption.label = item.sDescripcion;
              dataOptions.push(itemOption);
            }

            
            ctx.arrayServicios = data;
            if(ctx.pagina !== "taller"){
              ctx.consultarClaseServicio(ctx.select_servicio,true);
            }
            ctx.options.servicio = dataOptions;
          },
          validacion: function (data, mensaje) {
            ctx.options.servicio = [];
          },
          exepcion: function () {
            ctx.options.servicio = [];
          }
        });
    });
  },
  listar_clase_servicio: function (iIdPadre,ctx,noShowSpinner) {
    if(!noShowSpinner){
      util.spinnerShow(ctx, 'Consultando mantenimientos');
    }
    
    CalendarioServices.lista_clase_servicio(iIdPadre,function (result) {
      if(!noShowSpinner){
        util.spinnerClose(ctx);
      }
      
      util.resultValidate(
        ctx,
        result,
        {
          exito: function (datax) {
            var data = datax.oResults.sort(function (a, b) {
              return a.iOrden - b.iOrden;
            });
            var dataOptions = [];
            var seleccionado = false;
            for (var i = 0; i < data.length; i++) {
              var item = data[i];
              var itemOption = {};
              var valor = parseInt(item.sDescripcion.toUpperCase().replace(" KM","").replace(",",""));
              if (valor > ctx.kilometraje && !seleccionado && ctx.select_servicio === '01' && ctx.pagina === "taller") {
                seleccionado = true;
                ctx.select_realizar = item.sCodigoSap;
              }
              itemOption.value = item.sCodigoSap;
              itemOption.label = item.sDescripcion;
              dataOptions.push(itemOption);
            }

            /*if(ctx.select_servicio === '03'){
              ctx.select_realizar = data[0].sCodigoSap;
            }*/
            ctx.options.realizar = dataOptions;
          },
          validacion: function (data, mensaje) {
            ctx.options.realizar = [];
          },
          exepcion: function () {
            ctx.options.realizar = [];
          }
        });

    });
  },
  listar_vehiculos: function (ctx) {
    VehiculoServices.vehiculos(window.usuario.iIdC4C, window.usuario.sNumIdentificacion, ctx.marcaSap, function (result) {
      util.resultValidate(
        ctx,
        result,
        {
          exito: function (data) {
            ctx.listaVehiculos = data.oResults.BOVehiculo;
          },
          validacion: function (data, mensaje) {
            ctx.listaVehiculos = [];
          },
          exepcion: function () {
            ctx.listaVehiculos = [];
          }
        });
    });
  },
  lista_tipo_medio: function(ctx){
    CalendarioServices.lista_tipo_medio(function(result){
      util.resultValidate(
        ctx,
        result,
        {
          exito: function (datax) {
            var data = datax.oResults.sort(function (a, b) {
              return a.iOrden - b.iOrden;
            });
            var dataOptions = [];
            for (var i = 0; i < data.length; i++) {
              var item = data[i];
              var itemOption = {};
              itemOption.value = item.sCodigoSap;
              itemOption.label = item.sDescripcion;
              dataOptions.push(itemOption);
            }

            ctx.options.medio = dataOptions;
          },
          validacion: function (data, mensaje) {
            ctx.options.medio = [];
          },
          exepcion: function () {
            ctx.options.medio = [];
          }
        });
    })
  },
  express: function (ctx) {
    ctx.bExpress = false;
    util.progresShow(ctx, 'Consultando servicio Express');
    ExpressService.express(
      ctx.taller.sCentroSap,
      ctx.vehiculo.zIDModelo,
      ctx.select_realizar,
      ctx.hora_seleccion,
      ctx.fecha_seleccion,
      ctx.codFamiliaVehiculo,
      function (result) {
        util.progresClose(ctx);
        util.resultValidate(
          ctx,
          result,
          {
            exito: function (data) {
              ctx.vExpress = true;
            },
            validacion: function (data, mensaje) {
              ctx.vExpress = false;
            },
            exepcion: function () {
              ctx.vExpress = false;
            }
          });
      });
  },
  expressActualizar: function (ctx) {
    ctx.bExpress = false;
    util.progresShow(ctx, 'Consultando servicio Express');
    ExpressService.express(
      ctx.taller.sCentroSap,
      ctx.cita.zModeloVeh,
      ctx.select_realizar,
      ctx.hora_seleccion,
      ctx.fecha_seleccion,
      ctx.codFamiliaVehiculo,
      function (result) {
        util.progresClose(ctx);
        util.resultValidate(
          ctx,
          result,
          {
            exito: function (data) {
              ctx.vExpress = true;
            },
            validacion: function (data, mensaje) {
              ctx.vExpress = false;
            },
            exepcion: function () {
              ctx.vExpress = false;
            }
          });
      });
  },
  citas_pendientes: function (ctx) {
    ctx.bExpress = false;
    util.progresShow(ctx, 'Consultando citas pendientes');
    CitaService.pendientes(window.usuario.iIdC4C, function (result) {
      util.progresClose(ctx);
      util.resultValidate(
        ctx,
        result,
        {
          exito: function (data) {
            ctx.citas = data.oResults.Activity;
          },
          validacion: function (data, mensaje) {
            ctx.citas = [];
          },
          exepcion: function () {
            ctx.citas = [];
          }
        });
    });
  },
  registrar: function (ctx) {

    if (ctx.placa_seleccion.length < 1 && ctx.nuevo_seleccion) {
      return util.snackbar(ctx, 'La placa es requerida', 'negative', 'white', 'warning', 'bottom');
    }

    if (ctx.modelo_seleccion.length < 1 && ctx.nuevo_seleccion) {
      return util.snackbar(ctx, 'El modelo es requerido', 'negative', 'white', 'warning', 'bottom');
    }

    if (ctx.observacion_seleccion_2.length < 1 && ctx.nuevo_seleccion_2) {
      return util.snackbar(ctx, 'El servicio a realizar es requerido', 'negative', 'white', 'warning', 'bottom');
    }

    util.progresShow(ctx, 'Registrando cita');
    CitaService.registrar(
      ctx.placa_seleccion,
      ctx.fecha_seleccion,
      ctx.hora_seleccion,
      ctx.taller.iId,
      ctx.taller.sCentroSap,
      window.usuario.iIdHana,
      window.usuario.sNumIdentificacion,
      ctx.nuevo_seleccion,
      ctx.bExpress,
      ctx.modelo_seleccion,
      ctx.observacion_seleccion,
      ctx.select_medio,
      ctx.select_servicio,
      ctx.select_realizar,
      ctx.observacion_seleccion_2,
      ctx.iDuracionTaller,
      null,
      null,
      null,
      ctx.marcaSap,
      ctx.valorTrabajo,
      ctx.sIdModelo,
      window.usuario.iIdC4C,
      window.usuario.sNombre, 
      window.usuario.sApellido,
      ctx.codFamiliaVehiculo,
      function (result) {
        util.progresClose(ctx);
        util.resultValidate(
          ctx,
          result,
          {
            exito: function (data) {
              ctx.popup_confirmarcita = true;
              util.snackbar(ctx, "Su cita ha sido registrada", 'positive', 'white', 'done', 'bottom');
            },
            validacion: function (data, mensaje, iCode) {
              ctx.popup_confirmarcita = false;
              util.snackbar(ctx, mensaje,'negative', 'white', 'warning', 'bottom');
              if(iCode === 3){
                ctx.$router.push({
                  name: 'taller', params: { codSap: ctx.marcaSap}
                });
              }
            },
            exepcion: function () {
              ctx.popup_confirmarcita = false;
            }
          });
      });
  },
  actualizar: function (ctx) {
    util.progresShow(ctx, 'Reprogramando cita');
    CitaService.registrar(
      ctx.placa_seleccion,
      ctx.fecha_seleccion,
      ctx.hora_seleccion,
      ctx.taller.iId,
      ctx.taller.sCentroSap,
      window.usuario.iIdHana,
      window.usuario.sNumIdentificacion,
      ctx.nuevo_seleccion,
      ctx.bExpress,
      ctx.modelo_seleccion,
      ctx.observacion_seleccion,
      ctx.select_medio,
      ctx.select_servicio,
      ctx.select_realizar,
      ctx.observacion_seleccion_2,
      ctx.iDuracionTaller,
      ctx.iId,
      ctx.iIdC4C,
      ctx.iIdEstado,
      ctx.cita.sMarca,
      ctx.cita.sTipoValorTrabajo,
      ctx.cita.sModelo,
      window.usuario.iIdC4C,
      window.usuario.sNombre, 
      window.usuario.sApellido,
      ctx.codFamiliaVehiculo,
      function (result) {
        util.progresClose(ctx);
        util.resultValidate(
          ctx,
          result,
          {
            exito: function (data) {
              ctx.popup_confirmarcita = true;
              util.snackbar(ctx, "Su cita ha sido reprogramada", 'positive', 'white', 'done', 'bottom');
            },
            validacion: function (data, mensaje,codigo) {
              ctx.popup_confirmarcita = false;
              if(codigo  === 2){
                util.snackbar(ctx, mensaje, 'negative', 'white', 'warning', 'bottom');
              }
            },
            exepcion: function () {
              ctx.popup_confirmarcita = false;
            }
          });
      });
  }
}
