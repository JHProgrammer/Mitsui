<template>
<div>
    <div class="column text-center contenedor rs-contact">
        <div v-for="item in redesSociales" :key="item.iId" @click="openLink(item)" style="margin-bottom: 12.5px;">
            <div style="display:inline">
                <img class="house img_contactos" :src="item.sDescripcion">
            </div>
            <label>{{item.sCodigoSap}}</label>
        </div>
        <!--a href="https://wa.me/5116253000">Send Message</a-->
        <!--div @click.native="openURL(facebook)"><img class="house" src="statics/images/face.png"><label>@mitusuioficial</label></div>
        <div @click.native="openURL(twitter)"><img class="house" src="statics/images/twitter.png"><label>@mitusuioficial</label></div>
        <div><img class="house" src="statics/images/whattsap.png"><label>(511) 625-3000</label></div-->
    </div>
    <div id="contacto" class="colum ">
        <div v-for="item in contendidos" :key="item.iId" v-html="item.sDescripcion"></div>
    </div>
    <!--colapsop-->
    <q-card v-for="item in taller" :key="item.iId" class="card-locales content-contact">
        <q-collapsible class="collapser" header-class="collapser-item">
            <template slot="header">
                <q-card-title class="relative-position card-contact" style="background:#1d5593">
                    <div class="row">
                        <p>{{item.sDescripcion}}</p>
                        <q-field icon="near_me" class="distance">a {{item.distancia === 0 ? item.distanciaMeters: item.distancia}} {{item.distancia === 0 ? 'm': 'km'}}</q-field>
                    </div>
                </q-card-title>
            </template>
            <div>
                <q-field icon="phone">
                    <div class="column">
                        <q-item-tile label><b>Central</b></q-item-tile>
                        <q-item-tile sublabel>

                            <b>
                                <a class="quitarFormatoLink" v-bind:href="'tel:+' + item.sCentral|telefonoFormatter">
                                        {{item.sCentral}}
                                </a>
                            </b>
                            
                            </q-item-tile>
                    </div>
                    <div class="column">
                        <q-item-tile label><b>Servicio de Mantenimiento</b></q-item-tile>
                        <q-item-tile sublabel>
                            <!--
                            <b>
                                <a class="quitarFormatoLink" v-bind:href="'tel:+' + item.sServicioMantenimiento|telefonoFormatter">
                                        {{item.sServicioMantenimiento}}
                                </a>
                            </b>
                                -->
                             {{item.sServicioMantenimiento}}
                            
                            
                            </q-item-tile>
                    </div>
                </q-field>
                <q-card-separator/>
                <q-field icon="email">
                    <div class="column">
                        <q-item-tile label><b>Mail</b></q-item-tile>
                        <q-item-tile sublabel>
                            <!--GNM{ -->
                            <b>
                                <a class="quitarFormatoLink" v-bind:href="'mailto:' + item.sEmail">
                                        {{item.sEmail}}
                                </a>
                            </b>
                            <!--} -->
                           
                            </q-item-tile>
                    </div>
                </q-field>
                <q-card-separator/>
                <q-field icon="place">
                    <div class="column">
                        <q-item-tile label><b>Dirección</b></q-item-tile>
                        <q-item-tile sublabel>{{item.sDireccion}}</q-item-tile>
                    </div>
                    <div>
                        <q-btn flat dense color="blue" @click="showMap(item.fLongitud,item.fLatitud)" class="viewmap">Ver en el mapa</q-btn>
                    </div>
                </q-field>
                <q-card-separator/>
                <q-field icon="timer">
                    <div class="column">
                        <q-item-tile label><b>Horario de atención</b></q-item-tile>
                        <q-item-tile sublabel>
                            <div class="row">
                                <div class="col-7">Lunes a viernes: </div>
                                <div class="col-5">{{item.sHorario1}}</div>
                                <div class="col-7">Sábado: </div>
                                <div class="col-5">{{item.sHorario2}}</div>
                                <div class="col-7">Domingo: </div>
                                <div class="col-5">{{item.sHorario3}}</div>
                            </div>
                        </q-item-tile>
                    </div>
                    <div class="column">
                        <q-item-tile sublabel :class="item.iDisponible ? 'availability': 'no_availability'">Actualmente {{item.iDisponible ? 'abierto': 'cerrado'}}</q-item-tile>
                    </div>
                </q-field>
            </div>
        </q-collapsible>
    </q-card>
    <q-modal class="model_map" v-model="popup_mapa" maximized>
        <div v-html="mapa_html"></div> 
        <q-btn round icon="keyboard_arrow_left" style="bottom:20px;left:20px;" color="primary" class="fixed-bottom" @click="closeMap" />
    </q-modal>

</div>
</template>

<script src="../../js/contacto.js"/>
