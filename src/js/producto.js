import { openURL } from 'quasar'
import productoModel from '../models/footer/productoModel';
import util from '../util/util';
export default
    {
        data() {
            return {
                opened: false,
                accesorio: null,
                repuestos: null,
                popup_filtro: false,
                titleFilter: null,
                showAccesorio: false,
                showRepuesto: false,
                marcaAuto: [],
                modeloAuto: [],
                marcaAccesorio: [],
                tipoAccesorio: [],
                select_auto: '',
                select_modelo: '',
                select_marca: '',
                select_tipo: '',
                list_modelo: [],
                list_tipo: [],
                indicator_tipo: '',
                indicator_marca: '',
                indicator_auto: '',
                indicator_modelo: '',
                vacioAcc: false,
                vacioRep: false,
                indicator: ''
            }
        },
        methods:
        {
            openURL,
            openFiltro: function () {
                this.popup_filtro = true;
            },
            actionTab: function (tab) {
                switch (tab) {
                    case 0: this.titleFilter = this.$t('filtroAcs'); this.showAccesorio = true; this.showRepuesto = false; this.indicator = 'a'; break;
                    case 1: this.titleFilter = this.$t('filtroRep'); this.showAccesorio = false; this.showRepuesto = true; this.indicator = 'r'; break;
                }
            },
            /*Select*/
            selectAuto: function (item) {
                productoModel.onSelectMarca(this, item, this.list_modelo);
            },
            selectMarca: function (item) {
                productoModel.onSelectTipo(this, item, this.list_tipo);
            },
            searchProducto: function () {
                switch (this.indicator) {
                    case 'a':
                        this.popup_filtro = false;
                        this.indicator_tipo = this.select_tipo;
                        this.indicator_marca = util.codSapList(localStorage.marcaAccesorio, this.select_marca, 'sCodigoSap');
                        break;
                    case 'r':
                        this.popup_filtro = false;
                        this.indicator_modelo = this.select_modelo;
                        this.indicator_auto = util.codSapList(localStorage.marcaRepuesto, this.select_auto, 'sCampo');
                        break;
                }
            },
            clearProducto: function () {
                switch (this.indicator) {
                    case 'a':
                        this.indicator_marca = '';
                        this.indicator_tipo = '';
                        this.select_marca = '';
                        this.select_tipo = '';
                        break;
                    case 'r':
                        this.indicator_auto = '';
                        this.indicator_modelo = '';
                        this.select_auto = '';
                        this.select_modelo = '';
                        break;
                }
            },
        },
        computed:
        {
            filterAccesorio: function () {
                if (this.accesorio) {
                    var resp = this.accesorio.filter((item) => item.sMarca.includes(this.indicator_marca) && item.sTipo.includes(this.indicator_tipo));
                    if (!resp.length) { this.vacioAcc = true; } else { this.vacioAcc = false; }
                    return resp;
                }
            },
            filterRepuesto: function () {
                if (this.repuestos) {
                    var resp = this.repuestos.filter((item) => item.sMarca.includes(this.indicator_auto) && item.sModelo.includes(this.indicator_modelo));
                    if (!resp.length) { this.vacioRep = true; } else { this.vacioRep = false; }
                    return resp;
                }
            }
        },
        created() {
            productoModel.servicioProducto(this);
            this.$root.$on('openFiltroProducto', this.openFiltro);
        }
    }