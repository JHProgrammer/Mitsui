<template>
<div>
    <div class="row">
        <div class="col-2">
            <q-btn style="margin-left: 10px;margin-top: 10px;" flat round icon="arrow_back_ios" @click="verhistorial" />
        </div>
        <div class="col-8">
            <div class="popup_title margen-from-title text-bold text-center">SERVICIOS</div>
        </div>
    </div>
    <div class="flex flex-center">
        <div>
            <div class="row">
                <label>Placa</label>&#160;&#160;
                <label><b>{{data_historial.servicios.listHistorial.zPlaca}}</b></label>
            </div>
            <div class="row">
                <label>{{data_historial.servicios.listHistorial.zAnnio}}</label>&#160;&#160;
                <label><b>{{data_historial.servicios.listHistorial.zDescFamiliaModelo}}</b></label>
            </div>
        </div>
    </div>
    <div style="margin:5%;height: 500px;overflow: auto;">
        <div v-if="listaCitas.length < 1" class="fixed-center" style=" text-align:  center;font-size: 20px; color: #a1a1a1;">
            No se encontró información registrada
        </div>
        <div v-if="listaCitas.length > 0">
            <q-card v-for="item in listaCitas" :key="item.Orden">
                <q-collapsible class="collapser box-service" header-class="collapser-item">
                    <template slot="header">
                        <q-item-main class="item_title-hs">
                            <q-card-title>
                                {{item.Servicio}}
                            </q-card-title>
                        </q-item-main>
                    </template>
                    <div>
                        <div v-if="$HideElementText(item.Kilometraje)">
                            <p class="text-bold label_h">Kilometraje</p>
                            <p>{{item.Kilometraje}} {{item.Um}}</p>
                        </div>
                        <div v-if="$HideElementText(item.FechaServ)">
                            <p class="text-bold label_h">Fecha</p>
                            <p>{{item.FechaServ}} {{item.HoraServ}}</p>
                        </div>
                        <div v-if="$HideElementText(item.TallerDesc)">
                            <p class="text-bold label_h">Taller</p>
                            <p>{{item.TallerDesc}}</p>
                        </div>
                        <div v-if="$HideElementText(item.sObservacion)">
                            <p class="text-bold label_h">Observaciones</p>
                            <p>{{item.sObservacion}}</p>
                        </div>
                        <div v-if="$HideElementText(item.AsesorDesc)">
                            <p class="text-bold label_h">Asesor</p>
                            <p>{{item.AsesorDesc}}</p>
                        </div>
                    </div>
                </q-collapsible>
            </q-card>
        </div>

    </div>
</div>
</template>

<script src="../../js/servicios.js"/>
