import serviceLogin from '../services/LoginService'
import util from '../util/util'
import cte from '../support/constant'
import LoginService from '../services/LoginService';
var store = require('store')
var usuario, password;

export default {
    popup: function (value, ctx) {
        switch (value) {
            case 'recovery': ctx.popup_recovery = true; break;
            case 'register': ctx.popup_register = true; this.cleanError(ctx); break;
        }
    },
    validation: function (ctx, data) {
        if (!data[0] || !data[1] || !util.validateEmail(data[0])) {
            util.messageValidator(ctx, true, cte.lg_validator);
        } else {
            this.start(data);
            ctx.authentication();
        }
    },
    /*Start*/
    start: function (data) {
        usuario = data[0];
        password = data[1];
        localStorage.user = data[0];
    },
    /*Clean*/
    cleanError: function (ctx) {
        ctx.errorName = false;
        ctx.errorLastName = false;
        ctx.erroridCar = false;
        ctx.errorCelphone = false;
        ctx.errorEmail = false;
        ctx.errorDate = false;
    },
    /*Validation*/
    validateChange: function (ctx, evt) {
        util.messageValidation(ctx, evt, cte.lg_change, util.validateEmail);
    },
    /*Services*/
    serviceAuthentication: function (ctx) {
        util.progresShow(ctx, cte.lg_authen);
        var here = this;
        serviceLogin.autentificacion(usuario, password, function (result) {
            if (result.c === "s") {
                if (!util.dataService(ctx, result.data.oAuditResponse, cte.pointer_aut)) {
                    util.progresClose(ctx);
                } else {
                    window.usuario = result.data.oResults;
                    store.set("SESSION_ACTIVA", window.usuario);
                    if (ctx.checkClave) {
                        store.set(window.usuario.sEmail.toUpperCase(), { data: window.usuario, clave: password });
                    } else {
                        store.remove(window.usuario.sEmail.toUpperCase())
                    }
                    util.validateElementServicies(ctx, result.data.oResults, cte.element_aut, here.answerAuthentication);
                }
            } else {
                util.progresClose(ctx);
                util.errorConection(ctx);
            }
        });
    },
    serviceCreateCuenta: function (ctx, data) {
        util.progresShow(ctx, cte.lg_create);
        var here = this;
        serviceLogin.createCuenta(data, function (result) {
            if (result.c === "s") {
                if (!util.dataService(ctx, result.data.oAuditResponse, cte.pointer_aut)) {
                    util.progresClose(ctx);
                } else {
                    here.cleanCreatedCuenta(ctx);
                    util.progresClose(ctx);
                    util.succesMovil(ctx, result.data.oAuditResponse.sMessage);
                    ctx.popup_register = false;
                }
            } else {
                util.progresClose(ctx);
                util.errorConection(ctx);
            }
        });
    },
    serviceRecoveryCuenta: function (ctx, email) {
        util.progresShow(ctx, cte.lg_recover);
        serviceLogin.recoveryCuenta(email, function (result) {
            if (result.c === "s") {
                if (!util.dataService(ctx, result.data.oAuditResponse, cte.pointer_aut)) {
                    util.progresClose(ctx);
                } else {
                    util.progresClose(ctx);
                    util.succesMovil(ctx, result.data.oAuditResponse.sMessage);
                    ctx.emailRecovery = '';
                    ctx.popup_recovery = false;
                }
            } else {
                util.progresClose(ctx);
                util.errorConection(ctx);
            }
        });
    },
    /*Recovery*/
    closeRecovery: function (ctx) {
        ctx.emailRecovery = '';
        ctx.popup_recovery = false;
        ctx.validatorEmail = false;
    },
    changeRecovery: function (ctx, val) {
        if (!util.validateEmail(val)) {
            ctx.valorEmail = "Ingrese un correo válido";
            ctx.validatorEmail = true;
            return true;
        } else {
            ctx.valorEmail = null;
            ctx.validatorEmail = false;
            return false;
        }
    },
    sendRecovery: function (ctx, val) {
        if (!this.changeRecovery(ctx, val[0])) {
            this.serviceRecoveryCuenta(ctx, val[0]);
        }
    },
    /*Register*/
    cleanCreatedCuenta: function (ctx) {
        ctx.name = null;
        ctx.lastName = null,
            ctx.idCar = null;
        ctx.celphone = null;
        ctx.email = null;
        ctx.date = null;
        ctx.emailRecovery = null;
        ctx.condiciones = false;
        ctx.validatorRegistro = false;
    },
    runCloseRegisterCuenta: function (ctx) {
        this.cleanCreatedCuenta(ctx);
        ctx.popup_register = false
    },
    runCreateCuenta: function (ctx, values, error) {
        //this.name, this.lastName, this.idCar, this.celphone, this.email, this.formatBirth(this.date)
        if (this.validateCreatedCuenta(ctx, values, error)) {
            this.serviceCreateCuenta(ctx, values);
        }
    },
    validateCreatedCuenta: function (ctx, values, error) {
        var ind;
        var cont = 0;
        for (var i = 0; i < values.length; i++) {
            //ctx[error[i]] = false;
            if (!values[i]) {

                if (ctx.isIOS) {
                    if (i === 3 || i === 5) {
                        ctx[error[i]] = false;
                    } else {
                        ctx[error[i]] = true;
                        cont++;
                    }
                } else {
                    ctx[error[i]] = true;
                    cont++;
                }

            } else {
                ctx[error[i]] = false;
                switch (i) {
                    case 2: if (values[2].length == 8 || values[2].length == 11) { } else { ind = 'd'; cont++; } break;
                    case 3: if (ctx.isIOS) { } else { if (values[3].length < 9) { ind = 'c'; cont++; } } break;
                    case 4: if (!util.validateEmail(values[4])) { ind = 'e'; cont++; } break;
                }
            }
        }
        return this.validateTerms(cont, ctx, ind);
    },
    validateTerms: function (cant, ctx, indicador) {
        if (cant == 0) {
            switch (ctx.condiciones) {
                case true: ctx.validatorRegistro = false; return true; break;
                case false: ctx.validatorRegistro = true; ctx.valorRegistro = 'Debe aceptar los terminos y condiciones.'; break;
            }
        } else {
            switch (indicador) {
                case 'e': ctx.validatorRegistro = true; ctx.valorRegistro = 'Ingrese un correo válido.'; return false; break;
                case 'd': ctx.validatorRegistro = true; ctx.valorRegistro = 'Ingrese un Dni o Ruc válido.'; return false; break;
                case 'c': ctx.validatorRegistro = true; ctx.valorRegistro = 'Ingrese un número de celular válido.'; return false; break;
                default: ctx.validatorRegistro = true; ctx.valorRegistro = 'Debe completar los campos resaltados.'; return false; break;
            }
        }
    },
    terminosCondiciones: function (ctx) {
        ctx.popup_condiciones = true;
    },
    politicasDatos: function (ctx) {
        ctx.popup_politicas = true;
    },
    /*answerService*/
    answerAuthentication: function (ctx, data) {
        ctx.popup_welcome = true;
        ctx.username = data.sNombre;
        setTimeout(function () {
            ctx.popup_welcome = false;
            ctx.$router.push({ name: 'marca', params: { dataMenu: data } });
        }, 3000);
    },
    setTokenFirebase(token) {
        LoginService.setTokenFirebase(token, function (result) {
            console.log("Result Service Token", result);
        });
    }
}

