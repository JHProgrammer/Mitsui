<template>
 <div>
    <q-tabs color="" v-model="tab1" align="justify" text-color="primary" no-pane-border>  
        <q-tab id="noticias" name="noticias" slot="title" label="Noticias"/>
        <q-tab id="eventos" name="eventos" slot="title" label="Eventos"/>
        <q-tab id="clubmitsui" name="clubmitsui" slot="title" label="Club MITSUI"/>

        <!--Panel: Noticias-->
        <q-tab-pane name="noticias">
            <q-card inline :id="'noticia_' + item.iId + '_'+ item.sTipoNoticia" class="card-home" v-for="item in noticias" :key="item.iIdCorrelativo" @click.native="item.sTipoNoticia=='NI'? showContenido(item.sContenido,item.sTitulo) :openURL(item.sUrl)">      
                    <q-card-media><img width="296" height="161" :src="item.sImagen? item.sImagen:'statics/images/ic_noimagen.png'"></q-card-media>
                    <q-card-title style="padding-bottom: 7px;"><b>{{item.sTitulo}}</b> </q-card-title>
                    <q-card-main>
                        <p style="margin-bottom: 0px;" class="fecha">{{item.sTipoNoticia=='NI'?item.dFechaPublicacion : item.dFechaFuente |formatDate}}</p>
                        <p class="text-faded text-justify">{{item.sResumen}}</p>
                    </q-card-main>          
            </q-card>
        </q-tab-pane>
        <!--Panel: Eventos-->
        <q-tab-pane name="eventos">
            <q-card class="card-home" v-for="item in eventos" :id="'evento_' + item.iId" :key="item.iId">
                <div class="row">
                    <div id="hor-even" class="col-2">
                        <div class="date-events">
                            <div class="xm-2">
                                <p>{{item.sFechaPublicacion|formateDateDef1}}</p> 
                            </div> 
                            <div class="xm-2 separador_dia">
                                <p>{{item.sFechaPublicacion|formateDateDef2}}</p> 
                            </div> 
                            <div class="xm-2">
                                <p>{{item.sFechaPublicacion|formateDateDef3}}</p> 
                            </div>               
                        </div>
                    </div>
                    <div class="col-10 events-content">
                        <q-card-media>
                            <img width="247" height="134" :src="item.sImagen">
                        </q-card-media>
                        <q-card-title>
                            <big>{{item.sTitulo}}</big>
                        </q-card-title> 
                        <q-card-main class="relative-position">
                            <div class="row">
                                <label class="col-xs-2"><b>Del</b></label>
                                <label class="col-xs-10">{{item.dFechaInicio|formatedDateAll}}</label>
                                <br>
                                <label class="col-xs-2"><b>al</b></label>
                                <label class="col-xs-10">{{item.dFechaFin|formatedDateAll}}</label>
                                <br>
                                <label class="col-xs-2"><b>Hora</b></label>
                                <label class="col-xs-10">{{item.sHoraInicio}} - {{item.sHoraFin}}</label>
                            </div>
                            <big class="titulo text-faded">{{item.sLocacion}}</big>
                        </q-card-main>
                        <q-card-separator/>
                        <q-btn round color="primary" class="card-indicator icon-date" icon="today" @click="addEvento(item)"/>
                        <div class="q-pa-sm column">
                            <p>{{item.sDireccion}}</p>
                            <q-btn flat color="primary" label="VER EN EL MAPA" @click="mapEvento(item.iLatitud,item.iLongitud)"/>
                        </div>
                    </div>
                </div>
            </q-card>
        </q-tab-pane>
        <!--Panel:Club-->
        <q-tab-pane name="clubmitsui">
            <q-tabs v-model="tab2" color="" text-color="primary" no-pane-border class="tabs-2 body-swaps">
                <q-tab name="beneficios" slot=title label="BENEFICIOS"/>
                <q-tab name="canjes" slot=title label="CANJES" />
                <!--Beneficios-->
                <q-tab-pane name="beneficios">
                    <q-card inline class="card-home" v-for="item in beneficios" :key="item.iId" :id="'beneficio_' + item.iId" @click.native="openURL(item.sUrl)">
                        <q-card-media><img width="272" height="149" :src="item.sImagen? item.sImagen:'statics/images/ic_noimagen.png'"></q-card-media>
                        <q-card-main>
                            <b>{{item.sTitulo}}</b>
                            <p class="text-faded"><span class="customImg" v-html="item.sContenido"></span></p>
                        </q-card-main>
                    </q-card>
                </q-tab-pane>
                <!--Canjes-->
                <q-tab-pane name="canjes">
                    <div class="row fixDiv">
                        <div class="col-xs-1"/>
                        <div class="col-xs-4">
                            <q-btn flat dense round  @click="opened_articulos=true">
                                <q-icon class="icono"><img width="272" height="149" class="house" src="statics/images/settingof.svg"></q-icon>
                            </q-btn>
                        </div>
                        <div class="col-xs-6">
                            <q-field class="text-right"><b>{{canjePuntos}}</b> PUNTOS</q-field>
                        </div>
                    </div>
                    <br><br>
                    <q-card inline class="card-home" v-for="item in probando" :id="'canje_' + item.iId" :key="item.iId" @click.native="showCanje(item)">
                        <q-card-media><img width="327" height="178" :src="item.sImagen1? item.sImagen1:'statics/images/ic_noimagen.png'"></q-card-media>
                        <q-card-separator/>
                        <q-card-title class="relative-position">
                            <q-btn style="text-transform: none !important;" color="primary" :label="item.iPuntos +' PUNTOS'+' + s/'+ item.fPrecio" class="absolute card-indicator"/>
                       </q-card-title>                
                        <q-card-main>                        
                            <p class="text-faded">{{item.sDescripcion}}</p>
                        </q-card-main>
                    </q-card>
                </q-tab-pane>
            </q-tabs>
        </q-tab-pane>
    </q-tabs>
<!--MODAL-->
<!--Popup-->
    <q-modal v-model="opened_noticias" minimized :content-css="{padding:'20px'}">
        <p class="text-center"><b>{{tituloNoticias}}</b></p>
        <q-scroll-area>
            <span class="customImg text-justify" v-html="contenidoHtml"></span>
        </q-scroll-area>
    </q-modal>       
    <!--Articulos-->
    <q-modal v-model="opened_articulos" @show="$bodyFixed" @hide="$bodyBlock" position="bottom" :content-css="{padding:'10px'}">
        <q-btn flat icon="close"  class="btnClose" v-close-overlay/>
        <br>
        <div class="text-bold text-center tit_popup">FILTRAR ARTICULOS</div>
        <div class="row divPopup">
            <div class="col-xs-8 text-left"><p>CATEGORÍA</p></div>
            <div class="col-xs-4 car-model">
                <q-select class="filter-category" v-model="select_categoria" :options="categorias" placeholder="Seleccione"/>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-5">
                <q-btn color="primary" @click="filterArticle" :disable="!select_categoria">Buscar</q-btn>
            </div>
            <div class="col-xs-2"></div>
            <div class="col-xs-5">
                <q-btn color="primary" @click="clearArticle" :disable="!select_categoria">Limpiar</q-btn>
            </div>
        </div>
    </q-modal>   
    <!--Evento-->
    <q-modal v-model="opened_agenda" maximized content-classes="background">
       <div class="fixed-center">
           <p style="text-align:center;"><b>Evento</b> Agendado</p>
           <p style="text-align:center;">Lo hemos agregado a tu <b>calendario</b></p>
           <img src="statics/images/imagenfondo3.png" style="width:200px; height:150px;" >
       </div> 
    </q-modal> 
    <!--Mapa-->
    <q-modal v-model="opened_map" maximized content-classes="mapas">  
        <div v-html="mapa_html"></div>  
        <!--div id="map_eventos" :style="'width: '+ widthMap +'px; height: '+heigthMap+'px'"></div-->
        <q-page-sticky position="bottom-right" :offset="[18,18]"> 
            <q-btn round v-close-overlay color="primary" class="backMap" icon="keyboard_backspace"/>
        </q-page-sticky>
    </q-modal> 
    <!--Carrusel-->
    <q-modal v-model="opened_canjes" @show="$bodyFixed" @hide="$bodyBlock" maximized>
        <q-layout view="lHR LPR FFR">
            <q-layout-header>
                <q-toolbar color="blue-10">
                    <q-btn flat round dense icon="arrow_back" @click="closeCanje"/>
                    <q-toolbar-title class="text-center">{{item_title}}</q-toolbar-title>        
                </q-toolbar>
            </q-layout-header>
            <q-page-container>
                <q-carousel  v-model="slide" color="white" arrows  quick-nav height="350px">
                    <!--<q-carousel-slide class="carousel-slide" :img-src="item_imagen?item_imagen:'statics/images/ic_noimagen.png'"/>
                    <q-carousel-slide class="carousel-slide" :img-src="carrusel_one?carrusel_one:'statics/images/ic_noimagen.png'"/>
                    <q-carousel-slide class="carousel-slide" :img-src="carrusel_two?carrusel_two:'statics/images/ic_noimagen.png'"/>--> 
                    <q-carousel-slide class="carousel-slide" v-if="item_imagen"  :img-src="item_imagen"/>
                    <q-carousel-slide class="carousel-slide" v-if="carrusel_one"  :img-src="carrusel_one"/>
                    <q-carousel-slide class="carousel-slide" v-if="carrusel_two"  :img-src="carrusel_two"/>
                </q-carousel><br>
                <div class="text-right"><q-chip color="primary" small class="q-mr-sm">{{item_precio}}</q-chip></div><br>
                <p class="text-center">Contáctanos para verificar disponibilidad</p>
                <q-card class="card-flex">
                    <q-card-title class="relative-position q-card-container2" style="background:#1d5593">
                        <div class="row">
                            <q-field class="title-swaps-clubmitsui">MITSUI AUTOMOTRIZ</q-field>
                            <!--q-field class="title-swaps-right" icon="send">a 2km</q-field-->              
                        </div>
                    </q-card-title> 
                    <q-card-main class="swaps-content">
                        <q-field icon="phone">
                            <div class="column">
                                <q-item-tile label><b>Central</b></q-item-tile>
                                <q-item-tile sublabel>{{ $formatDatosGenerales('contacto_puntos',datos_generales) }}</q-item-tile>
                            </div>
                        </q-field>
                        <q-field icon="email">
                            <div class="column">
                                <q-item-tile label><b>Mail</b></q-item-tile>
                                <q-item-tile sublabel>{{ $formatDatosGenerales('email-canje',datos_generales) }}</q-item-tile>
                            </div>
                        </q-field>
                    </q-card-main>
                </q-card>
            </q-page-container>
        </q-layout>
    </q-modal>
  </div>
</template>
<script src="../../js/home.js"/>
