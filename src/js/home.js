import homeModel from "../models/footer/homeModel";
import { openURL } from 'quasar'
import moment from 'moment'
import util from "../util/util";

export default
    {
        data() {
            return {
                tab1: "noticias",
                tab2: "",
                opened_articulos: false,
                select_categoria: '',
                opened_agenda: false,
                opened_map: false,
                opened_canjes: false,
                opened_noticias: false,
                item_title: null,
                item_imagen: null,
                carrusel_one: null,
                carrusel_two: null,
                slide: 0,
                item_precio: null,
                contenidoHtml: null,
                canjePuntos: null,
                noticias: null,
                tituloNoticias: null,
                eventos: null,
                beneficios: null,
                canje: null,
                widthMap: window.innerWidth,
                heigthMap: window.innerHeight,
                mapa_html: "",
                categorias: [],
                mora: "",
                datos_generales: []
            }
        },
        methods:
        {
            openURL,
            showCanje: function (item) {
                this.slide = 0;
                this.opened_canjes = true;
                this.item_title = item.sDescripcion;
                this.item_imagen = item.sImagen1;
                this.item_precio = item.iPuntos + ' PUNTOS' + ' + S/.' + item.fPrecio;
                this.carrusel_one = item.sImagen2;
                this.carrusel_two = item.sImagen3;
            },
            closeCanje: function () {
                this.opened_canjes = false;
            },
            addEvento: function (item) {
                homeModel.createEventDevice(this, item);
            },
            showContenido: function (contenido, titulo) {
                this.opened_noticias = true;
                this.tituloNoticias = titulo;
                this.contenidoHtml = contenido;
            },
            showContenido2: function (objeto) {
                this.opened_noticias = true;
                this.tituloNoticias = objeto.titulo;
                this.contenidoHtml = objeto.contenido;
            },
            mapEvento: function (lat, lng) {
                this.opened_map = true;
                util.showMapaGoogle(this, lat, lng);
            },
            filterArticle: function () {
                this.opened_articulos = false;
                this.mora = this.select_categoria;
            },
            clearArticle: function () {
                this.select_categoria = '';
                this.mora = '';
            },
            setTabs: function(tabs){
                this.tab1 = tabs.tab1;
                this.tab2 = tabs.tab2;
            }
        },
        /*Formater*/
        filters:
        {
            formatDate: function (val) {
                moment.locale('es');
                if (val == '') { return 'Sin fecha'; } else { return moment(String(val)).format('DD MMM YYYY'); }
            },
            formatedDateAll: function (val) {
                moment.locale('es');
                if (val == '') { return 'Sin fecha'; } else { return moment(String(val)).format('dddd, DD MMMM YYYY'); }
            },
            formateDateDef: function (val) {
                moment.locale('es');
                if (val == '') { return 'Sin fecha'; } else { return moment(String(val)).format('ddd DD MMM'); }
            },
            formateDateDef1: function (val) {
                moment.locale('es');
                if (val == '') { return 'Sin fecha'; } else { return moment(String(val)).format('ddd').toUpperCase().replace(".", ""); }
            },
            formateDateDef2: function (val) {
                moment.locale('es');
                if (val == '') { return 'Sin fecha'; } else { return moment(String(val)).format('D'); }
            },
            formateDateDef3: function (val) {
                moment.locale('es');
                if (val == '') { return 'Sin fecha'; } else { return moment(String(val)).format('MMM').toUpperCase().replace(".", ""); }
            },
            formatDatosGenerales: function (campo, datos_generales) {
                return this.$formatDatosGenerales(campo,datos_generales);
                /*var valor = "";
                for (var i = 0; i < datos_generales.length; i++) {
                    var item = datos_generales[i];
                    if (item.sCampo === campo) {
                        valor = item.sDescripcion;
                    }
                }

                return valor;*/
            }
        },
        computed:
        {
            probando: function () {
                if (this.canje) {
                    return this.canje.filter((item) => item.sJerarquia.includes(this.mora));
                }
            }
        },
        created() {
            this.canjePuntos = localStorage.puntos;
            this.tab1 = this.$route.params.tab1;
            this.tab2 = this.$route.params.tab2;
            homeModel.servicieHome(this);
            homeModel.datos_generales(this);
            this.$root.$on('setTab', this.setTabs);
            this.$root.$on('showContenido2', this.showContenido2);
            this.$root.$on('showCanje',this.showCanje);

            
        }
    }