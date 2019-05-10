<template>
    <q-layout :style="'min-height:' + $deviceSize.heigth +'px !important;position: absolute;'" view="lHR LPR FFR">
        <!--DRAWER-->
        <!--Cabecera-->
        <q-layout-header>
            <q-toolbar class="mytolbar">
                <q-btn flat dense round @click="drawer = !drawer">
                    <q-icon class="icono"><img class="house" src="statics/images/perfil.svg"></q-icon>
                </q-btn>
                <q-toolbar-title class="text-center">{{titulo_menu}}</q-toolbar-title>
                <q-btn flat dense round @click="toolbar(icon_selector)">
                    <q-icon class="icono"><img class="house" :src="icon_toolbar"></q-icon>
                    <div v-if="toltip_puntos" style="position:absolute;font-size:10px;right: 40px;font-weight: bold;width:60px;border:1px solid white;border-radius:25px">{{puntos}} PUNTOS</div>
                </q-btn>
            </q-toolbar>
        </q-layout-header>
        <!--drawer-->
        <q-layout-drawer v-model="drawer" side="left" :width=250>
            <div class="color-gray">
                <img class="drawe-img" src="~assets/images/ic_user.png">
                <div class="score-login">
                    <q-field class="zone-score"><img class="icon-score" src="statics/images/medidor-2.svg">
                        <div class="scoresl">{{puntosDrawer+' pts'}}</div>
                    </q-field>
                </div>
                <p class="text-center text-bold color-gray" style="font-size:20px">{{usuarioDrawer}}</p>
            </div>
            <q-list no-border link inset-delimiter class="color-gray">
                <q-item style="margin-left:10px; margin-top:12px;">DNI : {{dniDrawer}}</q-item>
                <q-item style="margin-left:10px; margin-top:12px;">email: {{emailDrawer}}</q-item>
            </q-list>
            <q-list link inset-delimiter class="color-gray item-auto" @click.native="goLista">
                <q-item style="margin-left:10px; margin-top:12px;">
                    <q-icon class="icon-menu "><img class="icon-car" src="~assets/images/img-traking/car.svg"></q-icon>
                    <span class="span-menu">Mi auto</span>
                   <q-icon class="icon-menu span-arrow"><img class="icon-arrow"  src="~assets/images/img-traking/right-arrow.svg"></q-icon>
                </q-item>
            </q-list>
            <q-btn class="btn-logout" flat @click="salir"><img class="icon-logout" src="~assets/images/btn-logout.svg">salir</q-btn>
        </q-layout-drawer>
        <!--Contenedor-->
        <q-page-container>
            <router-view/>
        </q-page-container>
        <!--Footer-->
        <q-layout-footer>
            <div style="height:20px; background-color:#FFF;"></div>
            <q-toolbar color="white" class="bg-menu">
                <q-btn @click="footer(1)" flat dense round class="col-xs-2 icon-home" ref="button1"></q-btn>
                <q-btn @click="footer(2)" flat dense round class="col-xs-2 icon-producto" ref="button2"></q-btn>
                <div class="col-xs-4 ">
                    <q-btn @click="footer(3)" flat dense round class="icon-marca" ref="button3"></q-btn>
                </div>
                <q-btn @click="footer(4)" flat dense round class="col-xs-2 icon-historial" ref="button4"></q-btn>
                <q-btn @click="footer(5)" flat dense round class="col-xs-2 icon-contacto" ref="button5"></q-btn>
            </q-toolbar>
        </q-layout-footer>
        <!--PopUp-->
        <!--div class="toltip-points">
                      <q-tooltip v-model="toltip_puntos" class="btnTooltip text-center">  
                        <label>{{puntos}} PUNTOS</label>
                        <<q-btn  flat dense  icon="close" color="white" @close="toltip_puntos=false"/>
                      </q-tooltip>
                    </div-->
    </q-layout>
</template>

<style>
.citas {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background-color: #1d5593;
    position: fixed;
    margin-top: -5px;
}

.citas img {
    width: 30px;
    height: 30px;
}
</style>

<script src="../js/menu.js"/>
