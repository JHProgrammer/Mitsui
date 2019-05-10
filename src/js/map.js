import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'
Vue.use(VueGoogleMaps, {
    load: {
      key: 'YOUR_API_TOKEN',
      libraries: 'places'
    }
  });
export default
    {
        data() {
            return {
                popup_recovery: false,
                popup_register: false,
                popup_welcome: false,
                condiciones: false,
                politicas: false,
                username: '',
                dni: null,
                psw: null,
                name: null,
                lastName: null,
                idCar: null,
                celphone: null,
                email: null,
                date: null,
                emailRecovery: null,
                show: function (val) { modelLogin.popup(val, this); }
            }
        },
        created() {
            var ctx = this;
            setTimeout(function () {
                ctx.$router.push({ name: 'login' });
            }.bind(ctx), 4000);
        }
    }