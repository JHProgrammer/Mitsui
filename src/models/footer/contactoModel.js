import ContactoServices from "../../services/ContactoServices";
import util from "../../util/util";

export default {

    listar_redes_sociales: function (ctx) {
        util.progresShow(ctx, 'Cargando contactos');
        ContactoServices.lista_redes_sociales(function (result) {
            util.progresClose(ctx);
            if (result.c === "s") {
                var response = result.data.oAuditResponse;
                if (response.iCode === -1) {
                    util.errorServer(ctx);
                } else {
                    ctx.redesSociales = result.data.oResults.sort(function(a, b){return a.iOrden - b.iOrden});;
                }
            } else {
                util.errorServer(ctx);
            }
        });
    },
    listar_contenido_html: function (ctx) {
        ContactoServices.lista_contenido_HTML(function (result) {
            if (result.c === "s") {
                var response = result.data.oAuditResponse;
                if (response.iCode === -1) {
                    util.errorServer(ctx);
                } else {
                    ctx.contendidos = result.data.oResults.sort(function(a, b){return a.iOrden - b.iOrden});
                }
            } else {
                util.errorServer(ctx);
            }
        });
    }
}
