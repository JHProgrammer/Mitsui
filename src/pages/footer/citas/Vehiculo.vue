<template>
<div>
    <div class="fc-view-container" style="">
        
    </div>
    <!--POPUP-->
    <!--Lista Vehiculo-->
    <q-modal v-model="popup_vehiculo" maximized :content-css="{padding:'20px 20px 100px 20px',}">
        <div class="row">
            <div class="col-2">
                <q-btn flat icon="arrow_back_ios" @click="returnCalendar" class="arrow-back-2" />
            </div>
            <div class="col-10">
                <div id="titulo"><label>SELECCIONA TU <b>AUTO</b></label></div>
            </div>     
        </div>
        <q-card v-for="item in listaVehiculos" :key="item.zPlaca" class="shadow-8 cardVehiculo">
                <q-card-main>
                    <div class="row">
                        <div class="col-xs-3">
                            <img class="img-auto" :src="item.sUrlImagenModelo ? item.sUrlImagenModelo : 'https://documentserviceq8wpzjji9u.us1.hana.ondemand.com/documentservice/DocumentService/DocumentService/?accion=show_file_inline&id_documento=RRML4TxAIU5Mtq-DEruESj7tNHoKqrszrwgJhjWZXJU'">
                        </div>
                        <div class="col-xs-8 row item-card">
                                <div class="col-xs-11">                            
                                    <div class="row">
                                        <div class="col-xs-3">
                                            <q-field>Placa</q-field>
                                        </div>
                                        <div class="col-xs-1">
                                            <q-field>:</q-field>
                                        </div>
                                        <div class="col-xs-8">
                                            <q-field class="text-left">{{item.zPlaca}}</q-field>
                                        </div>
                                    </div>
                                    <q-field class="text-left">{{item.zAnnio}}&#160;<b>{{item.zDescFamiliaModelo}}</b></q-field>
                                </div>
                                <div class="col-xs-1">
                                    <q-btn flat dense round @click.stop="accionSeleccion(item)">
                                        <q-icon class="icono" :name=" (!item.citaPendiente) ?'keyboard_arrow_right':'error_outline'" />
                                    </q-btn>
                                </div>
                        </div>    
                    </div>
                </q-card-main>
            </q-card>    
        <div class="stabilizeDiv downDiv">
            <q-btn color="primary" class="btnAdd" @click="onOpenNewVehiculo">Nuevo vehículo</q-btn>
        </div>      
    </q-modal>
    <!--CitaPendiente-->
    <q-modal @show="$bodyFixed" @hide="$bodyBlock" v-model="popup_pendiente" minimized>
        <q-btn flat icon="close" @click="popup_pendiente=false" class="btnClose"/>
        <div style="padding: 50px">
            <div class="q-display-1 q-mb-md"><b>Cita</b> pendiente</div>
            <p>Solo se puede agendar una cita por vehículo.Puede reprogramar la cita o cancelarla.</p>
            <q-btn color="primary" @click="goHistory" label="Ir a mis citas" class="fontNormal"/>
        </div>
    </q-modal>
    <!--NuevoAuto-->
    <q-modal :style="'top:auto !important;min-height:' + $deviceSize.heigth +'px !important;position: absolute'" v-model="popup_newAuto" @show="$bodyFixed" @hide="$bodyBlock" position="bottom">
        <q-btn flat icon="close" @click.native="popup_newAuto = false" class="btn-close-register"/>
        <div class="containerNew">
            <div class="popup_title margen-from-title text-bold text-center">REGISTRA TU VEHICULO</div>
            <div class="row">
                <div class="row-date-register">
                    <div class="q-if row no-wrap items-end relative-position q-input shadow-1 radius_xs q-if-hide-underline text-primary">
                        <div class="q-if-inner col row no-wrap relative-position">
                            <input @input="keyPressPlaca" @blur="blurPlaca" maxlength="6" placeholder="PLACA" v-model="placa_seleccion" class="col q-input-target q-no-input-spinner">
                        </div>
                    </div>
                </div>
                <div class="row-date-register">
                        <div class="q-if row no-wrap items-end relative-position q-input shadow-1 radius_xs q-if-hide-underline text-primary">
                            <div class="q-if-inner col row no-wrap relative-position">
                                <input type="text" placeholder="MODELO" v-model="modelo_seleccion" class="col q-input-target q-no-input-spinner">
                            </div>
                        </div>
                        <!--q-input class="login_input login shadow-1 radius_xs" type="text" placeholder="MODELO" v-model="modelo_seleccion" no-pass-toggle hide-underline /-->
                </div>   
                <div class="row-date-register">
                        <div class="q-if row no-wrap items-end relative-position q-input shadow-1 radius_xs q-if-hide-underline text-primary">
                            <div class="q-if-inner col row no-wrap relative-position">
                                <input type="text" placeholder="DETALLE DE SERVICIO A REALIZAR U OTROS" v-model="observacion_seleccion_2" class="col q-input-target q-no-input-spinner">
                            </div>
                        </div>
                </div>
            </div>
            <div class="row-filter-art">
                    <p>CONTÁCTAME</p>
                    <q-select class="filter-category" v-model="select_medio" :options="options.medio" />
            </div>
            <q-btn class="popup_btn" color="primary" label="Confirmar cita" @click="onRegistrarCitaNueva"/>
        </div>           
    </q-modal>
    <!--Servicios-->
    <q-modal :style="'min-height:' + $deviceSize.heigth +'px !important;position: absolute'" v-model="popup_servicio" maximized>
        <div class="flex-row-docs page-servicio">
            <div class="row">
                <div class="col-2">
                    <q-btn flat icon="arrow_back_ios" size="lg" @click="closeServicio" class="iback-checkservice" />
                </div>
                <div id="title-page" class="col-8">ELIGE TU <b>SERVICIO</b></div>
            </div>
            <div class="doc-container">
                <div class="row">
                    <div id="ult-km" class="col-8">ÚLTIMO KILOMETRAJE</div>
                    <div id="km-act" class="col-4">{{kilometraje}} KM</div>
                </div>
                <div class="row tipo-servicio">
                    <div id="tip-serv" class="col-6">
                        <p>TIPO DE SERVICIO</p>
                    </div>
                    <div class="col-6">
                        <q-select color="blue-9" @input="change_servicio" v-model="select_servicio" :options="options.servicio" />
                    </div>
                    <div v-if="false" class="col-12" style="color:red;">El tipo de servicio es requerido</div>
                </div>
                <div v-if="select_servicio === '01' || select_servicio === '03'" class="row do-servicio">
                    <div id="do-serv" class="col-8">
                        <p>SERVICIO A REALIZAR</p>
                    </div>
                    <div class="col-4">
                        <q-select v-model="select_realizar" @input="change_realizar" :options="options.realizar" color="blue" />
                    </div>
                    <div v-if="false" class="col-12" style="color:red;">El servicio a realizar es requerido</div>
                </div>
                <div v-if="vExpress" class="row exp-servicio">
                    <div id="exp-serv" class="col-7">
                        <p>SERVICIO EXPRESS</p>
                    </div>
                    <div class="col-5" style="margin-top: 10px;">
                        <q-toggle v-model="bExpress" color="primary" size="xl" class="q-mr-none toogle_express" />
                        <q-btn class="btn-exp" flat @click="popup_expres=true" color="blue-9" size="xl"><i class="material-icons">error_outline</i></q-btn>
                    </div>
                </div>
                <div tabindex="-1" class="q-if row no-wrap items-end relative-position q-input obs-servicio text-primary" maxlength="256">
                    <div class="q-if-inner col row no-wrap relative-position">
                        <input maxlength="256" type="text" placeholder="OBSERVACIÓN (Opcional)"
                        v-model="observacion_seleccion_2" step="any"
                        class="col q-input-target q-no-input-spinner">
                    </div>
                    </div>
                    <!--q-input :maxlength="256" class="obs-servicio" v-model="observacion_seleccion_2" placeholder="OBSERVACIÓN" /-->
                    <div class="row cont-servicio">
                        <div id="cont-serv" class="col-8">CONTÁCTAME</div>
                        <div class="col-4">
                            <q-select color="secondary" v-model="select_medio" :options="options.medio" />
                        </div>
                    </div><br>
                    <q-btn class="btn-confirmar" color="blue-9" icon="build" label="Confirmar cita" @click="confirmarCitaclick" />
                </div>
            </div>
    </q-modal>
    <!--ServicioExpress-->
    <q-modal @show="$bodyFixed" @hide="$bodyBlock" v-model="popup_expres" minimized content-css="border-radius:8px;">
        <q-btn flat icon="close" v-close-overlay class="btnClose2" />
        <div id="mod-exp" style="padding: 20px 20px">
            <div class="q-display-1">Servicio <b>express</b></div>
            <p class="info-exp">El servicio express sólo está disponible para ciertos <b>modelos</b> y <b>tipo</b> de vehículo. Asimismo, este servicio deberá separarse hasta con un día de <b>anticipación.</b>
            </p>
        </div>
    </q-modal>
    <!--ConformarCita-->
    <!--<q-modal v-model="popup_confirmarcita" maximized content-css="background:blue">
            <div style="padding: 50px">
                <q-btn flat dense round @click="popup_confirmarcita=false">
                    <q-icon class="icono" name="close"/>
                </q-btn>
                <div class="q-display-1 q-mb-md"><b>Cita</b>Programada</div>
                <p>cita Programada</p>
            </div>
        </q-modal>-->
    <q-modal v-model="popup_confirmarcita" maximized content-css="background:#0066b1">
        <div style="padding: 26px">
            <q-btn class="close-pop absolute-top-left" color="white" flat dense round @click="onCloseConfirmacion">
                <q-icon class="icono" name="close" size="xl" />
            </q-btn>
            <div class="q-display-2"><b>Cita</b> programada!</div>
            <p class="aviso-cita">Para revisar los detalles, ingresa a la sección <b>“Mis Citas”</b></p>
                <div id="info-cita" class="row">
                    <div class="col-3">
                        <p class="fc-cita">Fecha</p>
                        <p class="dt-cita">{{fecha_seleccion|fecha_display_format}}</p>
                    </div>
                    <div class="col-4">
                        <p class="hr-cita">Hora entrada</p>
                        <p class="ho-cita">{{hora_seleccion}}</p>
                    </div>
                    <div class="col-5">
                        <p class="sl-cita">Hora salida</p>
                        <p class="co-cita">Previa coordinación con su asesor</p>
                    </div>
                </div>
                <div class="img-marcas">
                    <img src="~assets/images/logo_confirmacion.png">
            </div>
                </div>
    </q-modal>
    <!--Historial-->
    <q-modal v-model="opened_historial" maximized>
        <div>
            <q-btn flat icon="close" @click="opened_historial=false" class="btnClose" />
            <p class="text-center">HISTORIAL DE SERVICIOS</p>
            <q-card v-for="item in miscitas" :key="item.codigo" class="card-flex">
                <q-card-title class="relative-position" style="background:#1d5593; color: #fff;">
                    <div class="row">
                        <div class="ellipsis">{{item.tipo}}</div>
                    </div>
                </q-card-title>
                <q-card-main>
                    <div class="q-card-details">
                        <q-field>{{item.ano}}&#160;<b>{{item.name}}</b></q-field>
                        <div>
                            <q-item-tile label class="text-bold">Descripción</q-item-tile>
                            <q-item-tile sublabel>{{item.descripcion}}</q-item-tile>
                        </div><br>
                        <div>
                            <q-item-tile label class="text-bold">Kilometraje</q-item-tile>
                            <q-item-tile sublabel>{{item.kilometraje}}</q-item-tile>
                        </div><br>
                        <div>
                            <q-item-tile label class="text-bold">Fecha</q-item-tile>
                            <q-item-tile sublabel>{{item.fecha}}&#160;<b>{{item.hora}}</b></q-item-tile>
                        </div><br>
                        <div>
                            <q-item-tile label class="text-bold">Taller</q-item-tile>
                            <q-item-tile sublabel>{{item.taller}}</q-item-tile>
                        </div><br>
                        <div>
                            <q-item-tile label class="text-bold">Observaciones</q-item-tile>
                            <q-item-tile sublabel>{{item.observacion}}</q-item-tile>
                        </div>
                    </div>
                </q-card-main>
            </q-card>
        </div>
    </q-modal>
</div>
</template>

<script src="../../../js/vehiculos.js"/>
