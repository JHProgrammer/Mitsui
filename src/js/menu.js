import util from '../util/util';
import homeModel from "../models/footer/homeModel";
var store = require('store')
export default {
  data() {
    return {
      drawer: true,
      titulo_menu: "Citas",
      icon_toolbar: "statics/images/medidor.svg",
      icon_selector: null,
      toltip_puntos: false,
      usuarioDrawer: store.get("SESSION_ACTIVA").sNombre,
      dniDrawer: null,
      emailDrawer: null,
      puntosDrawer: null,
      puntos: window.usuario.iPuntos
    }
  },
  methods:
  {
    salir: function () {
      store.remove("SESSION_ACTIVA");
      this.$router.push({ name: 'login' });
    },
    goLista: function () {
      this.$router.push({ name: 'lista' });    
    },
    toolbar: function (val) {
      switch (val) {
        case 'time':
          /*var self = this;
          self.$q.dialog({
           title: 'Usted tiene ' + self.puntos + " puntos"
         });*/
          this.toltip_puntos = !this.toltip_puntos;
          break;
        case 'buscar': this.$root.$emit("openFiltroProducto"); break;
      }
    },
    footer: function (val) {
      var qBtn = document.querySelectorAll(".q-layout-footer .q-btn");
      var tab1 = "noticias";
      var tab2 = "beneficios";
      qBtn.forEach(function (el) {
        el.classList.remove("home-activado");
        el.classList.remove("producto-activado");
        el.classList.remove("marca-activado");
        el.classList.remove("historial-activado");
        el.classList.remove("contacto-activado");
      })
      switch (val) {
        case 1:
          this.$router.push({ name: 'home', params: { tab1: tab1, tab2: tab2 } });
          this.titulo_menu = "Hola " + this.usuarioDrawer;
          this.icon_toolbar = "statics/images/medidor.svg";
          this.icon_selector = "time";
          this.$refs.button1.$el.classList.add("home-activado");
          break;
        case 2:
          this.$router.push({ name: 'producto' });
          this.titulo_menu = "Producto del Mes";
          this.icon_toolbar = "statics/images/setting.svg";
          this.icon_selector = "buscar";
          this.$refs.button2.$el.classList.add("producto-activado");
          break;
        case 3:
          this.$router.push({ name: 'marca' });
          this.titulo_menu = "Citas";
          this.icon_toolbar = "statics/images/medidor.svg";
          this.icon_selector = "time";
          this.$refs.button3.$el.classList.add("marca-activado");
          break;
        case 4:
          this.$router.push({ name: 'historial' });
          this.titulo_menu = "Historial";
          this.icon_toolbar = "statics/images/ic_sinhead.png";
          this.icon_selector = "";
          this.$refs.button4.$el.classList.add("historial-activado");
          break;
        case 5:
          this.$router.push({ name: 'contacto' });
          this.titulo_menu = "Contáctenos";
          this.icon_toolbar = "statics/images/ic_sinhead.png";
          this.icon_selector = "";
          this.$refs.button5.$el.classList.add("contacto-activado");
          break;
      }
    },
    backHistorial: function () {
      this.titulo_menu = "Historial";
      this.icon_toolbar = "statics/images/ic_sinhead.png";
      this.icon_selector = "";
      this.$refs.button4.$el.classList.add("historial-activado");
      this.$router.push({ name: 'historial', params: { backHistorial: true } });
    },
    toHomeNotificacion: function (data) {

      var self = this;
      var tab1 = "noticias";
      var tab2 = "beneficios";
      console.log(data);
      if (data.modulo.toUpperCase() === 'GEN') { // GENERICA

        self.$q.dialog({
          preventClose: true,
          title: 'General',
          message: data.titulo,
          ok: 'Aceptar'
        });
      }

      if (data.modulo.toUpperCase() === 'NI') { // NOTICIA INTERNA
        if (data.wasTapped) {
          self.$q.dialog({
            preventClose: false,
            title: 'Noticia Mitsui',
            message: data.titulo,
            ok: 'Ir',
            cancel: 'Cancelar'
          }).then(() => {
            homeModel.noticia_interna_id(self, data.moduloDetalle);
          }).catch(() => {

          });
        } else {
          homeModel.noticia_interna_id(self, data.moduloDetalle);
        }


      }

      if (data.modulo.toUpperCase() === 'NE') { // NOTICIA EXTERNA
        if (data.wasTapped) {
          self.$q.dialog({
            preventClose: true,
            title: 'Noticia Externa',
            message: data.titulo,
            ok: 'Ir',
            cancel: 'Cancelar'
          }).then(() => {
            homeModel.noticia_externa_id(self, data.moduloDetalle);
          }).catch(() => {

          });
        } else {
          util.setPositionItem('noticia_' + data.moduloDetalle + '_'+ data.modulo);
          //homeModel.noticia_externa_id(self, data.moduloDetalle);
        }

      }

      if (data.modulo.toUpperCase() === 'EVT') { // EVENTO
        tab1 = "eventos";
        if (data.wasTapped) {
          self.$q.dialog({
            preventClose: true,
            title: 'Eventos',
            message: data.titulo,
            ok: 'Aceptar'
          });
        }
        util.setPositionItem('evento_' + data.moduloDetalle);
      }

      if (data.modulo.toUpperCase() === 'CM') { // CLUB MITSUI
        tab1 = "clubmitsui";
        tab2 = "canjes";
        if (data.wasTapped) {
          self.$q.dialog({
            preventClose: true,
            title: 'Club Mitsui',
            message: data.titulo,
            ok: 'Ir',
            cancel: 'Cancelar'
          }).then(() => {
            homeModel.canje_id(self, data.moduloDetalle);
          }).catch(() => {

          });
        } else {
          homeModel.canje_id(self, data.moduloDetalle);
        }


      }

      if (data.modulo.toUpperCase() === 'BEN') { // BENEFICIOS
        tab1 = "clubmitsui";
        tab2 = "beneficios";
        if (data.wasTapped) {
          self.$q.dialog({
            preventClose: true,
            title: 'Beneficios',
            message: data.titulo,
            ok: 'Ir',
            cancel: 'Cancelar'
          }).then(() => {
            homeModel.beneficio_id(self,data.moduloDetalle);
          }).catch(() => {
            
          });
        }else{
          //util.setPositionItem('noticia_' + data.moduloDetalle + '_'+ data.modulo);
          util.setPositionItem('beneficio_' + data.moduloDetalle);
          //homeModel.beneficio_id(self, data.moduloDetalle);
        }
      }

      setTimeout(function () {
        var qBtn = document.querySelectorAll(".q-layout-footer .q-btn");
        qBtn.forEach(function (el) {
          //el.classList.remove("home-activado");
          el.classList.remove("producto-activado");
          el.classList.remove("marca-activado");
          el.classList.remove("historial-activado");
          el.classList.remove("contacto-activado");
        })
        self.$router.push({ name: 'home', params: { tab1: tab1, tab2: tab2 } });
        self.titulo_menu = "Hola " + store.get("SESSION_ACTIVA").sNombre;
        self.icon_toolbar = "statics/images/medidor.svg";
        self.icon_selector = "time";
        self.$refs.button1.$el.classList.add("home-activado");

      }, 500);

      self.$root.$emit('setTab', {
        tab1: tab1,
        tab2: tab2
      });
      //if(notificacion.modulo === )

    }
  },
  created() {
    var recoveryDataUser = this.$route.params.dataMenu;
    this.puntosDrawer = recoveryDataUser.iPuntos;
    this.usuarioDrawer = recoveryDataUser.sNombre;
    this.dniDrawer = recoveryDataUser.sNumIdentificacion;
    this.emailDrawer = recoveryDataUser.sUsuario;
    localStorage.puntos = recoveryDataUser.iPuntos;
    this.icon_selector = "time";
    this.$root.$on('backHistorial', this.backHistorial);
    this.$root.$on('toHomeNotificacion', this.toHomeNotificacion);
  }
}
