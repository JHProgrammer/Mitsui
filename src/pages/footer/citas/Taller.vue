<template>
<div class="home-taller">
    <div class="row">
        <div class="col-2">
            <q-btn class="btn_back_taller" flat icon="arrow_back_ios" @click="back_taller" round/>
        </div>
        <div class="col-8 text-center desc_taller no-ripple">
            SELECCIONA EL TALLER {{marca | tallerDesc}}
        </div>
    </div>
    <div>
        <q-card v-for="item in taller" :key="item.codigo" class="card-locales">
            <q-collapsible class="collapser" header-class="collapser-item">
                <template slot="header">
                    <q-card-title class="title">
                        <div class="row">
                            <p class="nom-taller">{{item.sDescripcion}}</p>
                            <div class="rows-taller">
                                <div class="col-3 ubi-taller">
                                    <q-icon name="near_me" /> a {{item.distancia === 0 ? item.distanciaMeters: item.distancia}} {{item.distancia === 0 ? 'm': 'km'}} </div>
                                <div class="col-1 icono_taller">
                                    <q-icon name="visibility" /></div>
                            </div>
                        </div>
                    </q-card-title>
                </template>
                <div class="row">
                    <div class="col-10">
                        <div>
                            <p style="margin: 0;"><b>Dirección</b></p>
                            <p style="font-size:13px">{{item.sDireccion}}</p>
                            <q-btn style="font-weight: bolder;font-size: 11px;" flat dense color="primary" @click="showMap(item.fLongitud,item.fLatitud)" label="Ver en el mapa" />
                        </div>
                    </div>
                    <div id="nx-btn" class="col-2">
                        <div>
                            <q-btn class="btn-go-calendar" flat dense color="grey-7" size="xl" icon="keyboard_arrow_right" @click="calendario(item)" />
                        </div>
                    </div>
                </div>
            </q-collapsible>
        </q-card>
        <q-modal class="model_map" v-model="popup_mapa" maximized>
            <div v-html="mapa_html"></div>
            <q-btn round icon="keyboard_arrow_left" style="bottom:20px;left:20px;" color="primary" class="fixed-bottom" @click="closeMap" />
        </q-modal>
    </div>

</div>
</template>

<script src="../../../js/taller.js"/>
