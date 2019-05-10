<template>
    <div class="page-detail">
        <div class="wrapper-toolbar">
            <q-toolbar class="text-primary toolbar-detalle">
                <div class="icon-circle">
                    <div class="icon-circle circle-3">
                        <div class="icon-circle circle-2">
                            <div class="icon-circle circle-1"></div>
                        </div>
                    </div>
                </div>
                <q-toolbar-title>
                    Toolbar
                </q-toolbar-title>
            </q-toolbar>
            <q-toolbar class="toolbar-menu" color="primary">
                <q-btn id="test" flat round dense icon="" class="item-toolbar" data-item="primero" @click.native="onItem" />
                <q-btn flat round dense icon="" class="item-toolbar" data-item="segundo" @click.native="onItem" />
                <q-btn flat round dense icon="" class="item-toolbar" data-item="tercero" @click.native="onItem" />
                <q-btn flat round dense icon="" class="item-toolbar" data-item="cuarto" @click.native="onItem" />
                <q-btn flat round dense icon="" class="item-toolbar" data-item="quinto" @click.native="onItem" />
            </q-toolbar>
        </div>
        <div class="wrapper-items">
            <q-card inline class="q-ma-sm" name="primero">
                <q-card-title>
                    FACTURACIÓN
                    <!-- <span slot="subtitle">Subtitle</span> -->
                </q-card-title>
                <q-card-main>
                    <div class=" wrapper-card first-item">
                        <p class="text-card">NÚMERO FACTURA SUNAT: </p>
                        <span class="response-text">2389273 - A</span>
                    </div>
                    <div class=" wrapper-card content-item">
                        <div class="row">
                            <div class="col-xs-1">
                                <q-field>
                                    <q-icon class=""><img class="icon-item" src="~assets/images/img-traking/car.svg"></q-icon>
                                </q-field>
                            </div>
                            <div class="col-xs-11">
                                <q-field class="text-left title-item item-gray title-card-item">ASESOR</q-field>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-1">
                            </div>
                            <div class="col-xs-11">
                                <span class=" title-item item-black">CODIGO :</span> <span class="response-text item-black"> 23980 - MENDEZ</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-1">
                            </div>
                            <div class="col-xs-11">
                                <span class="title-item item-black">NOMBRE :</span> <span class="item-black response-text"> Marcelo Mendez Ramos</span>
                            </div>
                        </div>
                    </div>
                </q-card-main>
                <!-- <q-card-separator /> -->
                <q-card-actions>
                </q-card-actions>
            </q-card>
            <q-card inline class="q-ma-sm" name="segundo">
                <q-card-title>
                    TRAMITE PLACA Y TARJETA
                    <!-- <span slot="subtitle">Subtitle</span> -->
                </q-card-title>
                <q-card-main>
                    <div class=" wrapper-card first-item">
                        <p class="text-card">NÚMERO MOTOR : </p>
                        <span class="response-text">1GNCS18Z3M0115561</span>
                    </div>
                    <div class=" wrapper-card content-item">
                        <div class="row">
                            <div class="col-xs-1">
                                <q-field>
                                    <q-icon class=""><img class="icon-item" src="~assets/images/img-traking/car.svg"></q-icon>
                                </q-field>
                            </div>
                            <div class="col-xs-11">
                                <q-field class="text-left title-item item-gray title-card-item">DESCRIPCIÓN:</q-field>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-1">
                            </div>
                            <div class="col-xs-11">
                                <span class=" title-item item-black">NUM. CHASIS :</span> <span class="response-text item-black"> 3DJSUDT18Z3M0115561</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-1">
                            </div>
                            <div class="col-xs-11">
                                <span class="title-item item-black">NUM. VIN :</span> <span class="item-black response-text"> FRWE15561</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-1">
                            </div>
                            <div class="col-xs-11">
                                <span class="title-item item-black">COLOR :</span> <span class="item-black response-text"> Plateado</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-1">
                            </div>
                            <div class="col-xs-11">
                                <span class="title-item item-black">MODELO :</span> <span class="item-black response-text"> 4Runner V6 A/T SR5</span>
                            </div>
                        </div>
                    </div>
                </q-card-main>
                <q-card-actions>
                </q-card-actions>
            </q-card>
            <q-card inline class="q-ma-sm" name="tercero">
                <q-card-title>
                    PROGRAMACIÓN Y ENTREGA
                    <!-- <span slot="subtitle">Subtitle</span> -->
                </q-card-title>
                <q-card-main>
                    <div class=" wrapper-card first-item">
                        <p class="text-card">TITULAR : </p>
                        <span class="response-text">Ingrid Narvaez Mora</span>
                    </div>
                    <div class=" wrapper-card content-item">
                        <div class="row">
                            <div class="col-xs-1">
                                <q-field>
                                    <q-icon class=""><img class="icon-item" src="~assets/images/img-traking/car.svg"></q-icon>
                                </q-field>
                            </div>
                            <div class="col-xs-11">
                                <q-field class="text-left title-item item-gray title-card-item">DIRECCION :</q-field>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-1">
                            </div>
                            <div class="col-xs-11">
                                <span class=" title-item item-black">NUM. CHASIS :</span> <span class="response-text item-black"> 3DJSUDT18Z3M0115561</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-1">
                            </div>
                            <div class="col-xs-11">
                                <span class="title-item item-black">NUM. VIN :</span> <span class="item-black response-text"> FRWE15561</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-1">
                            </div>
                            <div class="col-xs-11">
                                <span class="title-item item-black">COLOR :</span> <span class="item-black response-text"> Plateado</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-1">
                            </div>
                            <div class="col-xs-11">
                                <span class="title-item item-black">MODELO :</span> <span class="item-black response-text"> 4Runner V6 A/T SR5</span>
                            </div>
                        </div>
                    </div>
                </q-card-main>
                <q-card-actions>
                </q-card-actions>
            </q-card>
            <q-card inline class="q-ma-sm" name="cuarto">
                <q-card-title>
                    LISTO PARA RECOJO
                    <!-- <span slot="subtitle">Subtitle</span> -->
                </q-card-title>
                <q-card-main>
                    <div class="wrapper-card">
                        <span class="text-card">Codigo asesor :</span> <span class="response-text">23980 - SOLO</span>
                    </div>
                    <div class="wrapper-card">
                        <span class="text-card">Asesor :</span><span class="response-text">Hilaria Solo Airoldi</span>
                    </div>
                    <div class="wrapper-card">
                        <span class="text-card">Num. Factura SUNAT : </span><span class="response-text">2389273 - A</span>
                    </div>
                </q-card-main>
                <!-- <q-card-separator /> -->
                <q-card-actions>
                </q-card-actions>
            </q-card>
            <q-card inline class="q-ma-sm" name="quinto">
                <q-card-title>
                    ENTREGADO
                    <!-- <span slot="subtitle">Subtitle</span> -->
                </q-card-title>
                <q-card-main>
                    <div class="wrapper-card">
                        <span class="text-card">Codigo asesor :</span> <span class="response-text">23980 - SOLO</span>
                    </div>
                    <div class="wrapper-card">
                        <span class="text-card">Asesor :</span><span class="response-text">Hilaria Solo Airoldi</span>
                    </div>
                    <div class="wrapper-card">
                        <span class="text-card">Num. Factura SUNAT : </span><span class="response-text">2389273 - A</span>
                    </div>
                </q-card-main>
                <!-- <q-card-separator /> -->
                <q-card-actions>
                </q-card-actions>
            </q-card>
        </div>
    </div>
</template>
<script src="../../../js/detalle.js"/>
