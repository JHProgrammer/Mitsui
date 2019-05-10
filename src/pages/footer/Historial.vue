<template>
    <div>
      <q-tabs color="" v-model="selectedTab"  align="justify" text-color="primary" no-pane-border class="tabs-3">
            <q-tab  name="citas" @click="citaselect"  slot="title" label="Citas pendientes"/>
            <q-tab name="historial" @click="historialSelect" slot="title" label="Historial de Servicio"/>
            <!-- PanelCitas-->
            <q-tab-pane align="left" name="citas">
                <div v-if="citas.length < 1" class="fixed-center" style=" text-align:  center;font-size: 20px; color: #a1a1a1;">
                    {{mensajeEmptyCitas}}
                </div>
                <div v-if="citas.length > 0">
                    <q-card v-for="item in citas" :key="item.codigo" class="collapser"  @click.native="selectCita(item)">
                    <q-card-title class="collapser-item content_top-hs">
                        <div class="row">
                           <!-- <div class="col-9"><p>{{item.zDetalleServicioName}}</p></div>-->
                            <div class="col-9"><p>{{item.sServicioRealizar}}</p></div>
                            <div class="col-3"> <p>{{item.zFecha | diaFormat}}</p></div>
                        </div>
                        <div class="row">
                            <div class="col-9"><p>{{item.zPlaca}}</p></div>
                            <div class="col-3"> <p>{{item.zHoraInicio | horaFormat}}</p></div>
                        </div>
                    </q-card-title>
                    <q-card-separator />
                    <q-card-main>
                          <div v-if="$HideElementText(item.sDescripcion)">
                            <p class="text-bold label_h">Descripcion</p> 
                            <p>{{item.sDescripcion}}</p>
                        </div>
                        <!--div>
                            <p class="text-bold label_h">Kilometraje</p> 
                            <p>{{item.zKilometrajeVeh}} km</p>
                        </div-->
                        <div v-if="$HideElementText(item.sTipoServicio)">
                            <p class="text-bold label_h">Tipo de Servicio</p> 
                            <p>{{item.sTipoServicio}}</p>
                        </div>
                        <div v-if="$HideElementText(item.sTaller)">
                            <p class="text-bold label_h">Taller</p> 
                            <p>{{item.sTaller}}</p>
                        </div>
                        <div v-if="$HideElementText(item.sModeloDesc)">
                            <p class="text-bold label_h">Modelo</p> 
                            <p>{{item.sModeloDesc}}</p>
                        </div>
                    </q-card-main>
                </q-card>
                </div>
            </q-tab-pane>
            <!-- PanelHistorial-->
            <q-tab-pane align="left" name="historial">
                <div v-if="listaVehiculos.length < 1" class="fixed-center" style=" text-align:  center;font-size: 20px; color: #a1a1a1;">
                    {{mensajeEmptyCitas}}
                </div>
                <div v-if="listaVehiculos.length > 0">
                    <q-card v-for="item in listaVehiculos" :key="item.zPlaca">
                    <q-card-main>
                        <div class="row">
                            <div class="col-xs-3">
                                <img class="img-auto" :src="item.sUrlImagenModelo ? item.sUrlImagenModelo : 'https://documentserviceq8wpzjji9u.us1.hana.ondemand.com/documentservice/DocumentService/DocumentService/?accion=show_file_inline&id_documento=RRML4TxAIU5Mtq-DEruESj7tNHoKqrszrwgJhjWZXJU'">
                            </div>
                            <div class="col-xs-8 row item-card">
                                <div class="col-xs-11">       
                                    <div class="row">
                                        <div class="col-xs-3"><q-field>Placa</q-field></div>
                                        <div class="col-xs-1"><q-field>:</q-field></div>
                                        <div class="col-xs-8"><q-field>{{item.zPlaca}}</q-field></div>
                                    </div> 
                                     <q-field>{{item.zAnnio}}&#160;<b>{{item.zDescFamiliaModelo}}</b></q-field>                           
                                </div>
                                <div class="col-xs-1">
                                <q-btn flat dense round @click="goServices(item)"><q-icon class="icono" name="keyboard_arrow_right"/></q-btn>
                                </div>
                            </div>                       
                        </div>   
                    </q-card-main> 
                </q-card>
                </div>
                
            </q-tab-pane>
        </q-tabs>
    <!--Modal:SeleccionarAccion-->
        <q-modal v-model="opened_accion" @show="$bodyFixed" @hide="$bodyBlock" position="bottom" :content-css="{padding:'20px'}">
            <q-btn flat icon="close" @click="opened_accion=false" class="btnClose"/> 
            <div class="popup_title margen-from-title text-bold text-center">SELECIONAR ACCIÓN</div>
            <div class="column">
                <q-btn v-if="citaSeleccionada.bVieneC4c === false" class="btn-blue format" label="REPROGRAMAR CITA" @click="accion(1)"/>
                <q-btn class="btn-red" label="CANCELAR CITA" @click="accion(2)"/>
            </div>          
        </q-modal>
        <q-modal v-model="opened_cancelar" @show="$bodyFixed" @hide="$bodyBlock" position="bottom" :content-css="{padding:'20px'}">            
            <div class="popup_title margen-from-title text-bold text-center">¿Seguro que desea cancelar la cita?</div>
            <div class="column">
                <q-btn class="btn-blue" label="NO" @click="cancelar"/>
                <q-btn class="btn-red" label="SI" @click="aceptarCancelacion"/>
            </div>          
        </q-modal>
    <!--Modal:Calendario-->
        <q-modal v-model="opened_calendario" @show="$bodyFixed" @hide="$bodyBlock" maximized:content-css="{padding:'30px'}">
            <q-btn flat round dense icon="arrow_back_ios" @click="opened_calendario = false"/>
            <div class="text-center">SELECCIONA CITA DISPONIBLE</div>
            <div ref="calendarMin">
                <q-btn label="15" @click="calendar('max')"/> 
                 <label> calendar min</label>
            </div>
            <div ref="calendarMax" style="display:none" @click="calendar('min')">
                <q-btn label="18"/> 
                <label> calendar max</label>
            </div> 

        </q-modal>
    </div> 
</template>
<script src="../../js/historial.js"/>