import marcasServices from "../../../services/MarcasServices";
import util from "../../../util/util";

export default {

    listarMarcas: function (ctx, noShowSpinner) {
        this.serviceMarcas(ctx,noShowSpinner);
    },
    /*Servicios*/
    serviceMarcas: function (ctx,noShowSpinner) {
        ctx.visible_marcas = false;
        if (!noShowSpinner) {
            util.progresShow(ctx, 'Cargando Marcas');
        }

        marcasServices.lista_marcas(function (result) {
            var data = result.data.oResults;
            for (var i = 0; i < data.length; i++) {
                ctx.$imageMemory(data[i].sDescripcion);
            }

            ctx.marcas = data.sort(function (a, b) {
                return a.iOrden - b.iOrden;
            });;
            ctx.visible_marcas = true;
            if (!noShowSpinner) {
                util.progresClose(ctx);
            }

        });
    }
}
