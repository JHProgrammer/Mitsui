import contactoModel from '../models/footer/contactoModel';
import tallerModel from '../models/footer/citas/tallerModel';
import util from '../util/util'
export default
    {
        data() {
            return {
                taller: [

                ],
                redesSociales: [

                ],
                contendidos: [

                ],
                codSap: "",
                popup_mapa: false,
                widthMap: window.innerWidth,
                heigthMap: window.innerHeight,
                posicionMapa: { lat: 10, lng: 10 },
                vZoom: 8,
                mapa_html: ""
            }
        },
        created() {
            contactoModel.listar_redes_sociales(this);
            contactoModel.listar_contenido_html(this);
            tallerModel.listar(this);
        },
        methods: {
            openLink: function (item) {
                if(item.iOrden === 1){
                    util.openWebView(item.sCampo);
                }else if(item.iOrden === 2){
                    util.openWebView(item.sCampo);
                }
                //GNM------
                // else{

                //     var numero = "";

                //     for(var i = 0; i < item.sCodigoSap.length; i++){
                //         var charValue = item.sCodigoSap[i];
                //         if(!isNaN(charValue)){
                //             numero = numero + charValue;
                //         }
                //     }
                    
                //     window.open(item.sCampo);
                    
                // }
                //---------
            },
            showMap: function (lng, lat) {
                //util.conditionallyAddBySource('script','https://maps.googleapis.com/maps/api/js?key=AIzaSyB6-ds6YDCHDhm2Wxv0a5_fyWe26hxJYe');
                this.vZoom = 12;
                this.posicionMapa.lat = lat;
                this.posicionMapa.lng = lng;
                this.popup_mapa = true;
                util.showMapaGoogle(this,lat,lng);
            },
            closeMap: function () {
                this.popup_mapa = false;
            }
        },
        filters: {
            telefonoFormatter: function(valor){
                //(511) 625-3200
                return valor.replace('(','').replace(')','').replace('-','').replace(' ','').trim();//valor.split(")").join("").split("(").join("").split("-").join("").trim();
            }
        }

    }