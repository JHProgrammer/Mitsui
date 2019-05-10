import modelLogin from '../models/loginModel'
import { required, email } from 'vuelidate/lib/validators'
import util from '../util/util';
import moment from 'moment';
import loginModel from '../models/loginModel';
import marcaModel from "../models/footer/citas/marcaModel";
var store = require('store')
var attachFastClick = require('fastclick');

export default {
  data() {
    return {
      isPassword: true,
      popup_splash: false,
      popup_recovery: false,
      popup_register: false,
      popup_welcome: false,
      popup_condiciones: false,
      popup_politicas: false,
      condiciones: false,
      politicas: false,
      username: '',
      correo: null,
      psw: null,
      name: null,
      lastName: null,
      idCar: null,
      celphone: null,
      email: null,
      date: null,
      emailRecovery: null,
      validator: false,
      msgValidation: null,
      validatorEmail: true,
      validatorRegistro: true,
      valorEmail: null,
      valorRegistro: null,
      errorName: false,
      errorLastName: false,
      erroridCar: false,
      errorCelphone: false,
      errorEmail: false,
      errorDate: false,
      checkClave: false,
      isIOS: true,
      show_form_login: false,
      datos_generales: [],
      show: function (val) { modelLogin.popup(val, this); }
    }
  },
  methods:
  {
    changeTypePass: function(){
      this.isPassword = !this.isPassword;
    },
    login: function () { var login = [this.correo, this.psw]; modelLogin.validation(this, login); },
    authentication: function () { modelLogin.serviceAuthentication(this); },
    createCuenta: function () {
      var create = [this.name, this.lastName, this.idCar, this.celphone, this.email, this.formatBirth(this.date)];
      //var error = ['errorName', 'errorLastName', 'erroridCar', 'errorCelphone', 'errorEmail', 'errorDate'];
      var error = ['errorName', 'errorLastName', 'erroridCar', 'errorCelphone', 'errorEmail', 'errorDate'];
      modelLogin.runCreateCuenta(this, create, error);
    },
    recoverySend: function () { var recovery = [this.emailRecovery]; modelLogin.sendRecovery(this, recovery); },
    recoveryClose: function () { modelLogin.closeRecovery(this); },
    recoveryChange: function (evt) { modelLogin.changeRecovery(this, evt); },
    dataRegistro: function () { var registro = [this.name, this.lastName, this.idCar, this.celphone, this.email, this.date]; return registro; },
    onchange: function (evt) { modelLogin.validateChange(this, evt); },
    closeRegister: function () { modelLogin.runCloseRegisterCuenta(this); },
    openTerminosCondiciones: function () { modelLogin.terminosCondiciones(this); },
    openPoliticasDatos: function () { modelLogin.politicasDatos(this); },
    /*validaciones*/
    changeName: function (value) { util.validateInput(this, 'name', value, /^[A-Za-z\s]+$/); },
    changeLast: function (value) { util.validateInput(this, 'lastName', value, /^[A-Za-z\s]+$/); },
    changeDniRuc: function (value) { util.maxlength(this, 'idCar', value, 0, 11); },
    getPass: function (evt) {

      var self = this;
      util.progresShow(self, "Buscando clave");
      setTimeout(function () {
        util.progresClose(self);
        var item = store.get(self.correo.toUpperCase());
        if (item) {
          self.psw = item.clave;
          self.checkClave = true;
        } else {
          self.psw = "";
          self.checkClave = false;
        }
      }, 1000);

    },
    /*Formater*/
    formatBirth: function (date) { return util.formaterDate(date, 'YYYY-MM-DD'); },
  },
  created: function () {
    
    var dataSession = store.get("SESSION_ACTIVA");
    var self = this;
    marcaModel.listarMarcas(self, true);
    if (dataSession) {
      window.usuario = dataSession;
      loginModel.answerAuthentication(self, dataSession);
    } else {
      self.show_form_login = true;
    }
    setTimeout(function () {
      navigator.splashscreen.hide();
      screen.orientation.lock('portrait');
    }, 2000);
    this.$datos_generales(this);
    attachFastClick(document.body);
    this.isIOS = (device.platform === 'iOS');
  },
  filters: {
    obligatorioAsterisco: function (isIOS) {
      return isIOS ? '*' : '';
    }
  }
};
