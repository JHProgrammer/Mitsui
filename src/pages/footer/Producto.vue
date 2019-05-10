<template>
    <div>
    <!--Data-->    
        <q-tabs color=""  align="justify" text-color="primary" no-pane-border class="tabs-3">           
            <q-tab default name="accesorios"  slot="title" :label="$t('accesorio')" @click="actionTab(0)"/>
            <q-tab name="repuestos" slot="title" :label="$t('repuesto')" @click="actionTab(1)"/>
            <!--Panel-Accesorio-->
            <q-tab-pane align="left" name="accesorios">
                <div  class="fixed-center text-center" v-if="vacioAcc"><p>No se encontró Información.</p></div>
                <!--<q-card v-for="item in accesorio" :key="item.ruta" v-if="verifica">-->
                    <!-- <q-card inline class="cardApp" v-for="item in accesorio" :key="item.iId" @click.native="openURL(item.sLinkInformacion)">-->
                <q-card inline class="cardApp" v-for="item in filterAccesorio" :key="item.iId" @click.native="openURL(item.sLinkInformacion)">
                    <q-card-media>
                        <img  class="card-image" :src="item.sImagen? item.sImagen:'statics/images/ic_noimagen.png'">
                    </q-card-media>
                    <q-card-title class="relative-position">
                        <q-btn color="primary" @click="opened = true" :label="item.sMonedaSimbolo+' '+ item.fPrecio" class="absolute card-indicator"/>
                    </q-card-title>                   
                    <q-card-main>
                        <p>{{item.sDescripcion}}</p>
                        <!--q-card-separator/-->
                        <div>                           
                           <p><b>{{$t('marca')}}</b></p>
                           <p>{{item.sMarca}}</p>
                           <!--q-card-separator/-->
                           <div class="row">
                                <div class="col-xs-10">
                                    <p><b>{{$t('tipoAc')}}</b></p>
                                    <p>{{item.sTipo}}</p>
                                </div>
                           </div>                       
                        </div>                                             
                    </q-card-main>
                </q-card>
                <!--<q-layout class="hiddenBackground" v-else/>-->
            </q-tab-pane>
            <!--Panel-Repuesto-->
            <q-tab-pane align="left" name="repuestos">
                <div  class="fixed-center text-center" v-if="vacioRep"><p>No se encontró Información.</p></div>
                <!--<q-card inline class="cardApp" v-for="item in repuestos" :key="item.iId"  @click.native="openURL(item.sLinkInformacion)">-->
                <q-card inline class="cardApp" v-for="item in filterRepuesto" :key="item.iId"  @click.native="openURL('http://www.mitsuiautomotriz.com/mejorar/repuestos')">    
                    <q-card-media>
                        <img  class="card-image" :src="item.sImagen? item.sImagen:'statics/images/ic_noimagen.png'">
                    </q-card-media>
                    <q-card-title class="relative-position">
                        <q-btn color="primary" :label="item.sMonedaSimbolo+' '+item.fPrecio" class="absolute card-indicator"/>
                    </q-card-title>                    
                    <q-card-main>
                        <p>{{item.sDescripcion}}</p>
                        <!--q-card-separator/-->
                        <div>                           
                           <p><b>{{$t('marca')}}</b></p>
                           <p>{{item.sMarca}}</p>
                           <!--q-card-separator/-->
                           <div class="row">
                                <div class="col-xs-10">
                                    <p><b>{{$t('modelo')}}</b></p>
                                    <p>{{item.sModelo}}</p>
                                </div>
                           </div>                         
                        </div>                                             
                    </q-card-main>
                </q-card>
            </q-tab-pane>
        </q-tabs>
    <!--PopUp-->
        <q-modal @show="$bodyFixed" @hide="$bodyBlock" v-model="popup_filtro" position="bottom" :content-css="{padding:'10px'}">            
            <div class="column">
                <div class="text-left closePopup"><q-btn flat icon="close" v-close-overlay></q-btn></div>
                <div class="text-bold text-center">{{titleFilter}}</div>
            </div>
            <br>
            <!--Accesorio-->
            <div v-if="showAccesorio">
                <div class="row divPopup">
                    <div class="col-xs-8 text-left"><p>MARCA DE ACCESORIO</p></div>
                    <div class="col-xs-4 car-model">
                        <q-select v-model="select_marca" :options="marcaAccesorio" @input="selectMarca" placeholder="Seleccione"/>
                    </div>   
                </div>
                <div class="row divPopup">
                    <div class="col-xs-8 text-left"><p>TIPO DE ACCESORIO</p></div>
                    <div class="col-xs-4 car-model">
                        <q-select v-model="select_tipo" :options="tipoAccesorio" placeholder="Seleccione"/>
                    </div>   
                </div>
            </div>
            <!--Repuesto-->
            <div class="row divPopup" v-if="showRepuesto">
                <div class="col-xs-8 text-left"><p>MARCA DE AUTO</p></div>
                <div class="col-xs-4 car-model">
                    <q-select v-model="select_auto" :options="marcaAuto" @input="selectAuto" placeholder="Seleccione"/>                     
                </div>
                <br><br><br>
                <div class="col-xs-8 text-left"><p>MODELO DE AUTO</p></div>
                <div class="col-xs-4 car-model">
                    <q-select v-model="select_modelo" :options="modeloAuto" placeholder="Seleccione"/>
                </div>   
            </div>
            <!--Botones-->
            <div class="row">
                <div class="col-xs-5">
                    <!--<q-btn color="primary"  @click="searchProducto" label="Buscar" :disable="!select_tipo && !select_marca"/>-->
                    <q-btn color="primary"  @click="searchProducto" label="Buscar" :disable="indicator=='a'? !select_tipo && !select_marca :!select_auto && !select_modelo"/>      
                </div>
                <div class="col-xs-2"></div>
                <div class="col-xs-5">
                    <q-btn color="primary" @click="clearProducto" label="limpiar" :disable="indicator=='a'? !select_tipo && !select_marca :!select_auto && !select_modelo"/>
                </div>
            </div>
       </q-modal>
    </div>    
</template>
<script src="../../js/producto.js"/>