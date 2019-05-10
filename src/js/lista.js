import util from '../util/util';
import homeModel from "../models/footer/homeModel";
var store = require('store')
export default {
  data() {
    return {
  
    }
  },
  methods:
  {
    goDetalle: function () {
      this.$router.push({ name: 'detalle' });    
    },

    // onActive: function (event) {
    //   console.log("holasss");
    //   this.$router.push({ name: 'detalle' });    
    // },
  
  },
  created() {
    // var recoveryDataUser = this.$route.params.dataMenu;
    // this.puntosDrawer = recoveryDataUser.iPuntos;
    // this.usuarioDrawer = recoveryDataUser.sNombre;
    // this.dniDrawer = recoveryDataUser.sNumIdentificacion;
    // this.emailDrawer = recoveryDataUser.sUsuario;
    // localStorage.puntos = recoveryDataUser.iPuntos;
    // this.icon_selector = "time";
    // this.$root.$on('backHistorial', this.backHistorial);
    // this.$root.$on('toHomeNotificacion', this.toHomeNotificacion);
  }
}
