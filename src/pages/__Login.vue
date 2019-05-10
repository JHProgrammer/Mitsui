<template>
<q-layout>
    <q-modal v-model="popup_splash" maximized :content-css="{background:'#1d5593',padding: '0'}">
        <div class="fixed-center">
            <img src="~assets/images/ic_mitsui.png" class="logoSplash">
                </div>
    </q-modal>
    <!--Welcome-->
    <q-modal v-model="popup_welcome" maximized content-classes="background">
        <div class="fixed-center">
            <img src="statics/images/imagenfondo2.png" style="width:200px; height:150px;" >
            <h2 color="white" style="text-align:center;">Hola<br><b>{{username}}</b></h2>
        </div>
    </q-modal>
    <q-page-container v-if="show_form_login" class="fondo">

        <q-page class="flex flex-center">
            <div class="login_content">
                <div class="container">
                    <div class="text-center">
                        <img src="~assets/images/ic_mitsui2.png" class="logo">
                        <p class="validationText" v-if="validator">{{msgValidation}}</p>
                    </div>
                    <div>
                        <q-input v-model="correo" @input="onchange(correo)" @blur="getPass" class="login_input login shadow-1 usr" type="email" placeholder="Correo" hide-underline />
                        <q-input v-model="psw" class="login_input login shadow-1 pass" type="password" placeholder="Contraseña" hide-underline />
                    </div>
                    <div class="forgot-pass">
                        <div class="row">
                            <q-item class="text-left col-6">
                                <q-checkbox v-model="checkClave" class="checkClave login_texto" />
                                <q-item-main style="flex: none;" label="Recordar clave" class="login_texto" />
                            </q-item>
                            <q-item @click.native="show('recovery')" class="text-right col-6">
                                <q-item-main label="Olvidé mi contraseña" class="login_texto" />
                            </q-item>
                        </div>
                    </div>
                    <div>
                        <q-btn label="ENTRAR" class="full-width btn-login" @click="login" />
                    </div>
                </div>
            </div>
            <!--POPUP-->
            <!--Recovery-->

            <q-modal v-model="popup_recovery" maximized :content-css="{background:'#f6f7f8',padding: '40px'}">
                <div class="containerLogin">
                    <div>
                        <q-btn flat icon="close" @click="recoveryClose" class="btnClose" />
                    </div>
                    <div class="text-center text-bold letter-spacing color-title">
                        <label>OLVIDÉ MI <b>CONTRASEÑA</b></label>
                    </div>
                    <div>
                        <p class="text-center validationText" v-if="validatorEmail">{{valorEmail}}</p>
                    </div>
                    <div>
                        <q-input v-model="emailRecovery" @input="recoveryChange(emailRecovery)" class="shadow-1 font_xs input-forgot-pass" type="email" placeholder="Email" hide-underline />
                        <p class="popup_p letras text-justify txt-forgot-pass">Ingresa tu email y te enviaremos un correo electrónico con instrucciones para restablecer tu contraseña.</p>
                    </div>
                    <div>
                        <q-btn class="full-width popup_btn btn-forgot-pass" @click="recoverySend" label="Enviar" />
                    </div>
                </div>
            </q-modal>
            <!--Registrio-->
            <q-modal class="create-account" v-model="popup_register" maximized :content-css="{background:'#f6f7f8',padding:'11%'}">
                <q-btn flat icon="close" @click="closeRegister" class="btnClose" />
                <!--<div class="containerRegister">
                    <div class="popup_title margen-from-title text-center"><b>CREAR</b> CUENTA NUEVA</div>
                    <div><p class="text-center validationText" v-if="validatorRegistro">{{valorRegistro}}FFF</p></div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                </div>-->

                <q-btn flat icon="close" @click="closeRegister" class="btnClose" />
                <div class="popup_title margen-from-title text-center"><b>CREAR</b> CUENTA NUEVA</div>
                <p class="text-center validationText" v-if="validatorRegistro">{{valorRegistro}}</p>
                <div class="row">
                    <div class="col-xs-6">
                        <input  v-model="name"
                                @input="changeName(name)"
                                :class="errorName? 'login_input login shadow-1 radius_xs mora1':'login_input-newaccount login shadow-1 radius_xs mora2 b-right'"
                                type="text"
                                placeholder="Nombre *"/>
                    </div>
                        <div class="col-xs-6">
                            <input v-model="lastName"
                               @input="changeLast(lastName)"
                               :class="errorLastName? 'login_input login shadow-1 radius_xs mora1':'login_input-newaccount login shadow-1 radius_xs mora2'"
                               type="text"
                               placeholder="Apellido *"/>
                    </div>
                        </div>
                        <input v-model="idCar"
                       @input="changeDniRuc(idCar)"
                       :class="erroridCar?'login_input login shadow-1 radius_xs mora1':'login_input-newaccount login shadow-1 radius_xs mora2 hdni'"
                       type="number"
                       placeholder="DNI o RUC del propietario del vehículo"/>

                        <input  v-model="celphone"
                        :class="errorCelphone?'login_input login shadow-1 radius_xs mora1':'login_input-newaccount login shadow-1 radius_xs mora2'"
                        type="number"
                        placeholder="Celular"
                        v-mask="'#########'"
                        hide-underline />
                        <q-input v-model="email" :class="errorEmail? 'login_input login shadow-1 radius_xs mora1':'login_input-newaccount login shadow-1 radius_xs mora2'" type="email" placeholder="Email *" hide-underline />
                        <q-datetime v-model="date" placeholder="Fecha de Nacimiento" type="date" :class="errorDate?'login_input login shadow-1 radius_xs mora1':'login_input-newaccount login shadow-1 radius_xs mora2'" format="DD-MM-YYYY" hide-underline ok-label="OK" cancel-label="Cerrar"/>
                        <br/>
                        <div style="text-align: left;color: #6b6b6b !important;font-size:11px">* Estos campos son obligatorios</div>
                        <!--condiciones-politicas-->
                        <q-checkbox class="letras popup_p terms-policies checkClave login_texto" @click.native="openTerminosCondiciones" v-model="condiciones" color="primary" label="Al presionar <b>&nbspCREAR CUENTA</b> , estas aceptando los <a style= color:red><u>términos y condiciones.</u></a>" />
                        <q-checkbox class="letras popup_p font_sm terms-policies checkClave login_texto" @click.native="openPoliticasDatos" v-model="politicas" color="primary" label="Autorización de la <a style= color:red>&nbsp<u>Politíca de protección de datos personales y tratamiento de los mismos.</u></a>" />
                        <!--boton-->
                        <q-btn class="full-width popup_btn btn-newaccount" color="primary" @click="createCuenta" label="Crear Cuenta" />

            </q-modal>

            <!--TerminoCondiciones-->
            <q-modal v-model="popup_condiciones" maximized :content-css="{padding:'20px'}">
                <div class="row fixPopup">
                    <div class="col-xs-2">
                        <q-btn flat icon="keyboard_arrow_left" @click="popup_condiciones=false" class="btnClose" />
                    </div>
                    <div class="col-xs-10 text-justify">
                        <div class="text-center">
                            <label class="text-bold">{{$t('titleCondiciones')}}</label>
                        </div>
                    </div>
                </div>
                <br><br>
                <div class="text-justify">
                    <div class="column">
                        <div v-html="$t('containerCondiciones1')+$t('containerCondiciones2')+$t('containerCondiciones3')+$t('containerCondiciones4')"></div>
                        <div v-html="$t('containerCondiciones5')+$t('containerCondiciones6')+$t('containerCondiciones7')"></div>
                        <div v-html="$t('containerCondiciones8')+$t('containerCondiciones9')"></div>
                        <div v-html="$t('containerCondiciones10')+$t('containerCondiciones11')"></div>
                        <div v-html="$t('containerCondiciones12')"></div>
                        <div v-html="$t('containerCondiciones13')"></div>
                        <div v-html="$t('containerCondiciones14')"></div>
                        <div v-html="$t('containerCondiciones15')"></div>
                        <div v-html="$t('containerCondiciones16')"></div>
                        <div v-html="$t('containerCondiciones17')"></div>
                    </div>
                </div>
            </q-modal>
            <!--Politicas-->
            <q-modal v-model="popup_politicas" maximized :content-css="{padding:'20px'}">
                <div class="row fixPopup">
                    <div class="col-xs-2">
                        <q-btn flat icon="keyboard_arrow_left" @click="popup_politicas=false" class="btnClose" />
                    </div>
                    <div class="col-xs-10 text-justify">
                        <div class="text-center">
                            <label class="text-bold">{{$t('titlePoliticas')}}</label>
                        </div>
                    </div>
                </div>
                <br>
                <div class="text-justify containerPopup">
                    <div class="row">
                        <div class="col-xs-1">1.-</div>
                        <div class="col-xs-11">{{$t('containerPoliticasOne')}}<br><br>{{$t('containerPoliticasTwo')}}</div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-xs-1">2.-</div>
                        <div class="col-xs-11">{{$t('containerPoliticasTree')}}</div>
                    </div>
                </div>
            </q-modal>
        </q-page>
    </q-page-container>
    <q-layout-footer v-if="show_form_login" class="border-footer">
        <q-item @click.native="show('register')">
            <q-item-main style="margin: auto;" class="text-center login_texto">
                <label>¿No estas registrado?</label><br><label style="color:red"><b>Regístrate aquí</b></label>
            </q-item-main>
        </q-item>
    </q-layout-footer>
</q-layout>
</template>

<!--=====SCRIPT=====-->
<script src="../js/login.js"/>
