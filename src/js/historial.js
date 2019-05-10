import calendarioModel from '../models/footer/citas/calendarioModel';
import historialModel from '../models/footer/historialModel';
import util from '../util/util'
var moment = require('moment');
moment.locale('es');
export default
    {
        data() {
            return {
                opened_accion: false,
                opened_cancelar: false,
                opened_calendario: false,
                show: function () { this.opened_accion = true; },
                citaSeleccionada: {
                    bVieneC4c: false
                },
                citas: [],
                listaVehiculos: [],
                mensajeEmptyCitas: "",
                mensajeEmptyHistorial: "",
                selectedTab: ""
            }
        },
        methods:
        {
            historialSelect: function () {
                var self = this;
                util.spinnerShow(this, 'Consultando historial');
                setTimeout(function () {
                    util.spinnerClose(self);
                }, 1000);
            },
            citaselect: function () {
                var self = this;
                util.spinnerShow(this, 'Consultando citas pendientes');
                setTimeout(function () {
                    util.spinnerClose(self);
                }, 1000);
            },
            goServices: function (item) {
                historialModel.historial(item, this);
            },
            selectCita: function (item) {
                this.citaSeleccionada = item;
                this.opened_accion = true;
            },
            accion: function (val) {
                switch (val) {
                    case 1:
                        this.opened_accion = false;
                        this.$router.push({
                            name: 'calendario', params: {
                                taller: {
                                    sCentroSap: this.citaSeleccionada.zIDCentro
                                },
                                pagina: 'citas_pendientes',
                                cita: this.citaSeleccionada
                            }
                        });
                        break;
                    case 2:
                        this.opened_accion = false;
                        this.opened_cancelar = true;
                        break;

                }
            },
            cancelar: function (val) {
                this.opened_accion = true;
                this.opened_cancelar = false;
            },
            aceptarCancelacion: function (val) {
                historialModel.eliminar_cita(this.citaSeleccionada, this);
            },
            calendar: function (val) {
                switch (val) {
                    case 'max':
                        this.$refs.calendarMax.style.display = 'block';
                        this.$refs.calendarMin.style.display = 'none';
                        break;
                    case 'min':
                        this.$refs.calendarMin.style.display = 'block';
                        this.$refs.calendarMax.style.display = 'none';
                        break;
                }
            },
            loadIni: function () {
                if(this.$route.params.backHistorial){
                    this.selectedTab = "historial";
                }else{
                    this.selectedTab = "citas";
                }
                calendarioModel.citas_pendientes(this);
                historialModel.listar_vehiculos(this);
            }
        },
        created() {
            this.loadIni();
        },
        filters: {
            horaFormat: function (valor) {
                var nuevoValor = '';
                if(valor !== undefined && valor !== null){
                       var splitVal = valor.split(":");
                       nuevoValor   = splitVal[0] + ":" + splitVal[1];
                }   
               return nuevoValor
           },
            diaFormat: function (valor) {
                return moment(valor).format("DD MMM").toUpperCase();
            }
        }
    }





    