<template>
    <q-tabs class="pag_listado shadow-2 tabs-menu q-tabs flex no-wrap overflow-hidden q-tabs-position-top q-tabs-normal">
        <q-tab default slot="title" name="tab-1" icon="icon-main icon-1">Facturado</q-tab>
        <q-tab slot="title" name="tab-2" icon="icon-main icon-2">Trámite <br> placa / tarjeta</q-tab>
        <q-tab slot="title" name="tab-3" icon="icon-main icon-3">Programación entrega</q-tab>
        <q-tab slot="title" name="tab-4" icon="icon-main icon-4">Listo para recojo</q-tab>
        <q-tab slot="title" name="tab-5" icon="icon-main icon-5">Entregado</q-tab>
        <q-tab-pane name="tab-1">
            <q-card inline class="q-ma-sm">
                <q-card-title>
                    <div class="icon-circle">
                        <div class="icon-circle circle-3">
                            <div class="icon-circle circle-2">
                                <div class="icon-circle circle-1"></div>
                            </div>
                        </div>
                    </div> 1GNCS18Z3M0115561
                    <!-- <span slot="subtitle">Subtitle</span> -->
                </q-card-title>
                <q-card-main>
                    <div>
                        <span class="text-card">Codigo asesor :</span> <span class="response-text">23980 - SOLO</span>
                    </div>
                    <div>
                        <span class="text-card">Asesor :</span><span class="response-text">Hilaria Solo Airoldi</span>
                    </div>
                    <div>
                        <span class="text-card">Num. Factura SUNAT : </span><span class="response-text">2389273 - A</span>
                    </div>
                </q-card-main>
                <!-- <q-card-separator /> -->
                <q-card-actions>
                    <!-- <q-btn flat>Action 1</q-btn>
                                <q-btn flat>Action 2</q-btn> -->

                <q-btn flat dense round @click.native="goDetalle" class="btn-detalle">
                     <!-- <q-icon class="icono"  /> -->
                      <span class="ver-mas">Ver detalle</span> <i class="icon-ver-mas fas fa-chevron-right"></i>
                </q-btn>

                   
                </q-card-actions>
            </q-card>
          
        </q-tab-pane>
        <q-tab-pane name="tab-2">
            <q-card inline class="q-ma-sm">
                <q-card-title> Title
                    <!-- <span slot="subtitle">Subtitle</span> --></q-card-title>
                <q-card-main>
                    <p class="text-card">Ti-VCT GDI I-4 Engine</p>
                    <p class="text-card">6- Speed PowerShift</p>
                    <p class="text-card">Fecha y Hora : 24 . 05 . 2019</p>
                </q-card-main>
                <!-- <q-card-separator /> -->
                <q-card-actions>
                    <!-- <q-btn flat>Action 1</q-btn> <q-btn flat>Action 2</q-btn> --><span class="ver-mas">Ver detalle</span> <i class="icon-ver-mas fas fa-chevron-right"></i> </q-card-actions>
            </q-card>
        </q-tab-pane>
        <q-tab-pane name="tab-3">
            <q-card inline class="q-ma-sm">
                <q-card-title> Title
                    <!-- <span slot="subtitle">Subtitle</span> --></q-card-title>
                <q-card-main>
                    <p class="text-card">Ti-VCT GDI I-4 Engine</p>
                    <p class="text-card">6- Speed PowerShift</p>
                    <p class="text-card">Fecha y Hora : 24 . 05 . 2019</p>
                </q-card-main>
                <!-- <q-card-separator /> -->
                <q-card-actions>
                    <!-- <q-btn flat>Action 1</q-btn>  <q-btn flat>Action 2</q-btn> --><span class="ver-mas">Ver detalle</span> <i class="icon-ver-mas fas fa-chevron-right"></i> </q-card-actions>
            </q-card>
        </q-tab-pane>
        <q-tab-pane name="tab-4">Tab cuatro</q-tab-pane>
        <q-tab-pane name="tab-5">Tab Cinco</q-tab-pane>
    </q-tabs>
</template>
<script src="../../../js/lista.js"/>
