import calendarioModel from '../models/footer/citas/calendarioModel';
import util from '../util/util'
import Vue from 'vue'
/*import MaskedInput from 'vue-masked-input' 
//Vue.use(MaskedInput);
Vue.component('masked-input', MaskedInput)*/
const VueInputMask = require('vue-inputmask').default
//import VueMask from 'v-mask'
//Vue.use(VueMask)
Vue.use(VueInputMask)

export default
    {
        data() {
            return {
                taller: null,
                marcaSap: "",
                calendario: [],
                columnas: [],
                semanas: [],
                fecha_seleccion: '',
                hora_seleccion: '',
                observacion_seleccion_2: '',
                placa_seleccion: '',
                nuevo_seleccion: 0,
                modelo_seleccion: '',
                observacion_seleccion: '',
                listaVehiculos: [],
                valorTrabajo: '',
                codFamiliaVehiculo: '',
                citas_pendientes: [],
                kilometraje: 0,
                vExpress: false,
                vehiculo: null,
                bExpress: false,
                mora: '1',
                opened_historial: false,
                popup_vehiculo: false,
                popup_servicio: false,
                popup_pendiente: false,
                popup_newAuto: false,
                popup_expres: false,
                popup_confirmarcita: false,
                select_medio: '01',
                select_servicio: '-1',
                select_realizar: -1,
                sIdModelo: "",
                mensajeEmptyCitas: "",
                mensajeEmptyHistorial: "",
                options: {
                    "medio": [],
                    "servicio": [],
                    "realizar": []

                },
                miscitas: [
                ]
            }
        },
        methods:
        {
            vertaller: function () {
                if (this.pagina === "taller") {
                    this.$router.push({ name: 'taller', params: { codSap: this.marcaSap } });
                } else {
                    this.$router.push({ name: 'historial' });
                }

            },
            returnCalendar: function () {
                this.$router.push({
                    name: 'calendario', params: {
                        taller: this.taller,
                        marcaSap: this.marcaSap,
                        fecha_seleccion: this.fecha_seleccion,
                        hora_seleccion: this.hora_seleccion,
                        pagina: this.pagina,
                        cita: this.cita,
                        back: true,
                        calendario: this.calendario,
                        columnas: this.columnas,
                        semanas: this.semanas,
                        listaVehiculos: this.listaVehiculos
                    }
                });
            },
            accionSeleccion: function (item) {

                this.vehiculo = item;
                this.popup_pendiente = false;
                this.popup_servicio = false;
                this.placa_seleccion = item.zPlaca;
                this.nuevo_seleccion = 0;
                this.modelo_seleccion = item.zDescFamiliaModelo ? item.zDescFamiliaModelo : item.zIDModelo;
                this.observacion_seleccion = '';
                this.valorTrabajo = item.zTipoValorTrabajo;
                this.sIdModelo = item.zIDModelo;
                this.codFamiliaVehiculo = item.zFamiliaModelo;
                if (this.vehiculo.citaPendiente) {
                    this.popup_pendiente = true;
                } else {

                    calendarioModel.obtener_kilometraje(this, false);
                    //this.popup_servicio = true;
                }
            },
            goHistory: function () {
                this.$router.push({ name: 'historial' });
            },
            accionCalendario: function (val) {
                switch (val) {
                    case '1': this.popup_vehiculo = true; break;
                    case '2': this.popup_servicio = true; break;
                }
            },
            setIsla: function (hora, dia, data) {
                //console.log(data);

                for (var i = 0; i < data.length; i++) {
                    var item = data[i];

                    if (item.ItemHora === hora && item.ItemNum === dia) {
                        if (this.pagina !== "taller") {
                            if ((item.ItemHora + ":00") === this.cita.zHoraInicio && item.ItemFecha === this.cita.zFecha) {
                                return "#9b9999"
                            }
                        }

                        return item.ItemDisponibles > 0 ? '#0085CA' : '#EB0A1E';
                    }
                }
            },
            onIsla: function (hora, dia, fecha, data) {
                var disponible = false;
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    if (item.ItemHora === hora && item.ItemNum === dia) {
                        if (this.pagina !== "taller") {
                            if ((item.ItemHora + ":00") === this.cita.zHoraInicio && item.ItemFecha === this.cita.zFecha) {
                                disponible = false;
                            } else {
                                disponible = item.ItemDisponibles > 0;
                            }
                        } else {
                            disponible = item.ItemDisponibles > 0;
                        }

                    }
                }

                if (disponible) {
                    this.fecha_seleccion = fecha;
                    this.hora_seleccion = hora;
                    this.nuevo_seleccion = 0;
                    if (this.pagina === "taller") {
                        this.popup_vehiculo = true;
                    } else {
                        this.popup_servicio = true;
                    }
                }
                //console.log(this.$parent.$parent.$parent.$parent.footer(1));

            },
            change_realizar: function () {
                if (this.pagina === "taller") {
                    calendarioModel.express(this);
                } else {
                    calendarioModel.expressActualizar(this);
                }
            },
            change_servicio: function (item, item2) {
                this.select_realizar = -1;
                this.bExpress = false;
                this.vExpress = false;
                this.consultarClaseServicio(item);

            },
            consultarClaseServicio: function (item, noShowSpinner) {
                console.log(item);
                if (item === '01' || item === '03') {
                    var valorPadre = 0;
                    for (var i = 0; i < this.arrayServicios.length; i++) {
                        if (this.arrayServicios[i].sCodigoSap === item) {
                            valorPadre = this.arrayServicios[i];
                        }
                    }
                    calendarioModel.listar_clase_servicio(valorPadre.iId, this, noShowSpinner);
                }
            },
            confirmarCitaclick: function () {
                if (this.select_servicio === "-1") {
                    return util.snackbar(this, "Seleccione el tipo de servicio", 'negative', 'white', 'warning', 'bottom');
                }

                if (this.select_servicio === '01' || this.select_servicio === '03') {
                    if (this.select_realizar === -1) {
                        return util.snackbar(this, "Seleccione el servicio a realizar", 'negative', 'white', 'warning', 'bottom');
                    }
                }

                if (this.pagina === "taller") {
                    calendarioModel.registrar(this);
                } else {
                    calendarioModel.actualizar(this);
                }
            },
            onOpenNewVehiculo: function () {
                this.select_servicio = null;
                this.select_realizar = null;
                this.placa_seleccion = "";
                this.modelo_seleccion = "";
                this.observacion_seleccion = "";
                this.observacion_seleccion_2 = "";
                this.nuevo_seleccion = 1;
                this.popup_newAuto = true;
            },
            onRegistrarCitaNueva: function () {
                calendarioModel.registrar(this);
            },
            onCloseConfirmacion: function () {
                this.$parent.$parent.$parent.$parent.footer(1)
            },
            changePlaca: function (value) {
                util.validateInput2(this, 'placa_seleccion', /^[A-Za-z0-9\s]+$/);
            },
            keyPressPlaca: function (event) {
                console.log(event);
                if (event.data) {
                    if (event.data.length <= 6) {
                        var charValue = event.data[event.data.length - 1];

                        if (!util.validateRegex(charValue, /^[A-Za-z0-9\s]+$/)) {
                            event.target.value = event.target.value.replace(charValue, "");
                        }

                        if (charValue === '-' || charValue === '-' || charValue === '-') {
                            console.log(charValue);
                            event.target.value = event.target.value.replace(charValue, "");
                        }
                    } else {
                        event.target.value = event.target.value.substring(0, 6);
                    }
                    this.placa_seleccion = event.target.value.toUpperCase();
                }
            },
            blurPlaca: function (event) {
                if (event.target.value) {
                    var valor = event.target.value;
                    if (valor.length > 3 && valor.indexOf("-") < 0) {
                        valor = (valor[0] ? valor[0] : '') +
                            (valor[1] ? valor[1] : '') +
                            (valor[2] ? valor[2] : '') +
                            '-' +
                            (valor[3] ? valor[3] : '') +
                            (valor[4] ? valor[4] : '') +
                            (valor[5] ? valor[5] : '');
                    }
                    //event.target.value = valor.toUpperCase();
                    this.placa_seleccion = valor.toUpperCase();
                }
            },
            closeServicio: function () {
                if (this.pagina !== "taller") {
                    this.returnCalendar();
                } else {
                    this.popup_vehiculo = true;
                    this.popup_servicio = false;
                }
            }
        },
        created() {
            this.data_vehiculos = this.$route.params;
            this.taller = this.$route.params.taller;
            this.pagina = this.$route.params.pagina;
            this.fecha_seleccion = this.$route.params.fecha_seleccion;
            this.hora_seleccion = this.$route.params.hora_seleccion;
            this.cita = this.$route.params.cita;
            this.calendario = this.$route.params.calendario;
            this.columnas = this.$route.params.columnas;
            this.semanas = this.$route.params.semanas;

            if (this.cita) {
                this.iId = this.cita.zIdC4c;
                this.iIdC4C = this.cita.zUUID;
                this.placa_seleccion = this.cita.zPlaca;
                this.modelo_seleccion = this.cita.zIDModelo;
                this.iIdEstado = this.cita.zEstadoCita;
                //this.marcaSap = "";
                this.valorTrabajo = "";
                this.sIdModelo = "";
                this.select_servicio = this.cita.sCodTipoServicio;
                this.select_realizar = this.cita.sCodServicioRealizar;
                //this.observacion_seleccion = this.cita.sDescripcion;
                this.observacion_seleccion_2 = this.cita.sDescripcion;
                this.select_medio = this.cita.sMedioContacto;
                //this.consultarClaseServicio(this.select_servicio);
                this.popup_vehiculo = false;
                calendarioModel.obtener_kilometraje(this, false, false);
            } else {
                this.popup_servicio = false;
                this.popup_vehiculo = true;
            }

            this.listaVehiculos = this.$route.params.listaVehiculos;
            this.marcaSap = this.$route.params.marcaSap;
            calendarioModel.listar_tipo_servicio(this);
            calendarioModel.lista_tipo_medio(this);

            console.log("usuario", window.usuario);
        },
        filters: {
            DiaOneChar: function (valor) {
                return valor.substring(0, 1).toUpperCase();
            },
            DiaOneNumb: function (valor) {
                return valor.split("-")[2];
            },
            setIsla: function (hora, dia) {
                for (var i = 0; i < this.data.length; i++) {
                    var item = this.data[i];
                    if (item.ItemHora === hora && item.ItemNum === dia) {
                        return item.ItemDisponibles > 0 ? 'lightblue' : 'antiquewhite';
                    }
                }
            },
            fecha_display_format: function (valor) {
                return valor.split("-")[2] + "-" + valor.split("-")[1] + "-" + valor.split("-")[0]
            }
        }

    }

