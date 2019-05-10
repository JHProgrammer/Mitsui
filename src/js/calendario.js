import calendarioModel from '../models/footer/citas/calendarioModel';
import util from '../util/util'
import moment from 'moment';
import Vue from 'vue'
const VueInputMask = require('vue-inputmask').default
Vue.use(VueInputMask)
/*
Data (){
Estos son los modelos
}

*/
export default {

  data() {
    return {
      taller: null,
      marcaSap: "",
      columnas: [],
      calendario: [],
      semanas: [],
      columnas2: [],
      calendario2: [],
      semanas2: [],
      semanas3: [],
      semanas4: [],
      fecha_seleccion: '',
      hora_seleccion: '',
      pagina: '',
      cita: null,
      open_calendario: false,
      //Creo el modelo fecha altenatvva
      fecha_alternativa: new Date()
    }
  },
  methods: {
    vertaller: function () {
      if (this.pagina === "taller") {
        this.$router.push({
          name: 'taller',
          params: {
            codSap: this.marcaSap
          }
        });
      } else {
        this.$router.push({
          name: 'historial'
        });
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
        //this.nuevo_seleccion = 0;
        //if (this.pagina === "taller") {
        //this.popup_vehiculo = true;
        //} else {
        //    this.popup_servicio = true;
        //}
        this.$router.push({
          name: 'cita',
          params: {
            taller: this.taller,
            marcaSap: this.marcaSap,
            fecha_seleccion: this.fecha_seleccion,
            hora_seleccion: this.hora_seleccion,
            pagina: this.pagina,
            cita: this.cita,
            calendario: this.calendario,
            columnas: this.columnas,
            semanas: this.semanas,
            listaVehiculos: this.listaVehiculos,
            isProvisional: false
          }
        });
      }
    },
    onCitaProvisional: function () {
      this.fecha_seleccion = moment(this.fecha_alternativa).format("YYYY-MM-DD");
      this.hora_seleccion = moment(this.fecha_alternativa).format("HH:mm");
      console.log(this.fecha_seleccion,this.hora_seleccion);
      this.$router.push({
        name: 'cita',
        params: {
          taller: this.taller,
          marcaSap: this.marcaSap,
          fecha_seleccion: this.fecha_seleccion,
          hora_seleccion: this.hora_seleccion,
          pagina: this.pagina,
          cita: this.cita,
          calendario: this.calendario,
          columnas: this.columnas,
          semanas: this.semanas,
          listaVehiculos: this.listaVehiculos,
          isProvisional: true
        }
      });
    },
    separar_cita: function () {
      this.open_calendario = true;
    }
  },
  created() {
    this.data_vehiculos = this.$route.params;
    this.taller = this.$route.params.taller;
    this.pagina = this.$route.params.pagina;
    this.cita = this.$route.params.cita;
    this.marcaSap = this.$route.params.marcaTaller;
    if (this.$route.params.back) {
      this.calendario = this.$route.params.calendario;
      this.columnas = this.$route.params.columnas;
      this.semanas = this.$route.params.semanas;
      this.marcaSap = this.$route.params.marcaSap;
      this.listaVehiculos = this.$route.params.listaVehiculos;
    } else {
      calendarioModel.listar(this);
      //29Abril
      //calendarioModel.listar_vehiculos(this);
    }

  },
  filters: {
    DiaOneChar: function (valor) {
      return valor.substring(0, 1).toUpperCase();
    },
    DiaOneNumb: function (valor) {
      return valor.split("-")[2];
    }
  }

}
