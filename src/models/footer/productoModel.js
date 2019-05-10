import productoService from "../../services/ProductoService";
import util from "../../util/util";

export default {
    /*Servicios*/
    servicioProducto: function (ctx) {
        util.progresShow(ctx, "Cargando Productos ...");
        this.dataAccesorio(ctx);
        this.dataRepuestos(ctx);
    },
    dataAccesorio: function (ctx) {
        var here = this;
        productoService.accesorios(function (result) {
            util.progresClose(ctx);
            ctx.accesorio = result.data.oResults;
        });
    },
    dataRepuestos: function (ctx) {
        var here = this;
        productoService.repuestos(function (result) {
            util.progresClose(ctx);
            ctx.repuestos = result.data.oResults;
            here.dataMarcaAuto(ctx);
        });
    },
    /*Filtros*/
    dataMarcaAuto: function (ctx) {
        var here = this;
        productoService.marcaAuto(function (result) {
            util.changeCombobox(ctx, result.data.oResults, 'iId', 'sCampo', 'marcaAuto');
            localStorage.marcaRepuesto = JSON.stringify(result.data.oResults);
            here.dataModeloAuto(ctx);
        });
    },
    dataModeloAuto: function (ctx) {
        var here = this;
        productoService.modeloAuto(function (result) {
            ctx.list_modelo = result.data.oResults;
            here.dataMarcaAccesorio(ctx);
        });
    },
    dataMarcaAccesorio: function (ctx) {
        var here = this;
        productoService.marcaAccesorio(function (result) {
            util.changeCombobox(ctx, result.data.oResults, 'iId', 'sCodigoSap', 'marcaAccesorio');
            localStorage.marcaAccesorio = JSON.stringify(result.data.oResults);
            here.dataTipoAccesorio(ctx);
        });
    },
    dataTipoAccesorio: function (ctx) {
        productoService.tipoAccesorio(function (result) {
            
            ctx.list_tipo = result.data.oResults;
        });
    },
    /*Select*/
    onSelectMarca: function (ctx, item, list) {
        this.list_final = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].iIdPadre == item) {
                this.list_final.push(list[i]);
            }
        }
        util.changeCombobox(ctx, this.list_final, 'sDescripcion', 'sCampo', 'modeloAuto');
    },
    onSelectTipo: function (ctx, item, list) {
        this.list_final = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].iIdPadre == item) {
                this.list_final.push(list[i]);
            }
        }
        util.changeCombobox(ctx, this.list_final, 'sCodigoSap', 'sDescripcion', 'tipoAccesorio');
    }
}