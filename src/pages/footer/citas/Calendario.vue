<template>
<div>
    <div class="fc-view-container" style="">
        <q-modal v-model="open_calendario" :style="$deviceSize.heigth +'px !important;position: absolute' + $deviceSize.width +'px !important;position: absolute'">

            <q-datetime-picker class = "calendarioProxMes" id="idCalendario" v-model="fecha_alternativa" type="datetime" 
            :style="$deviceSize.width +'px !important;'"/>

            <q-btn
            id="id_btn_cerrar"
            color="primary"
            @click="open_calendario = false"
            label="Cerrar"

            />

            <q-btn
            id="id_btn_ok"
            color="primary"
            @click="onCitaProvisional"
            label="Ok"
            />

        </q-modal>

        <q-carousel class="text-white">
            <q-carousel-slide v-for="sem in semanas" :key="sem.Id">
                <div id="calendar" class="fc fc-unthemed fc-ltr">
                    <div>
                        <div class="fc-center" style="color:black">
                            <div class="row">
                                <div class="col-2">
                                    <q-btn flat round icon="arrow_back_ios" @click="vertaller" />
                                </div>
                                <div class="col-8">
                                    <p style="margin: 0;margin-top: 7.5px;margin-bottom: 20px;" class="title-cal">SELECCIONA <b>CITA</b> DISPONIBLE <b>({{sem.Mes}})</b></p>
                                </div>

                                <!--asdas
                                COL CUALQUIER TIPO DE DISPOSITIVO LE DARA DICHA FORMA
                                Todas las col siempre deben sumar 12 Ejm
                                -->
                                <div class="col-2">
                                    <div>PROX.MES</div>
                                    <div class="btn_round" style="background-color:#57A639" @click="separar_cita">



                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="fc-clear" />
                </div>
                <div class="fc-view fc-agendaDay-view fc-agenda-view" style="">
                    <div v-if="pagina === 'taller'" class="row" style="color:black;margin-bottom: 20px;">
                        <div class="col-2">

                        </div>
                        <div class="col-4 row" style="margin-left: 5px;">
                            <div class="col-4">
                                <div class="btn_round" style="background-color:#0085CA"></div>
                            </div>
                            <div class="col-8" style="margin-top: 5.5px;">Libre</div>
                        </div>
                        <div class="col-4 row">
                            <div class="col-4">
                                <div class="btn_round" style="background-color:#EB0A1E"></div>
                            </div>
                            <div class="col-8" style="margin-top: 5.5px;">Ocupado</div>
                        </div>
                    </div>
                    <div v-if="pagina !== 'taller'" class="row" style="color:black;margin-bottom: 20px;">
                        <div class="col-4 row">
                            <div class="col-4">
                                <div class="btn_round" style="background-color:#0085CA"></div>
                            </div>
                            <div class="col-8" style="margin-top: 5.5px;">Libre</div>
                        </div>
                        <div class="col-4 row">
                            <div class="col-4">
                                <div class="btn_round" style="background-color:#EB0A1E"></div>
                            </div>
                            <div class="col-8" style="margin-top: 5.5px;">Ocupado</div>
                        </div>
                        <div class="col-4 row">
                            <div class="col-4">
                                <div class="btn_round" style="background-color:#9b9999"></div>
                            </div>
                            <div class="col-8" style="margin-top: 5.5px;">Seleccionado</div>
                        </div>
                    </div>
                    <div class="col-8 days" style="color:black">
                        <table>
                            <tr>
                                <th> </th>
                                <th class="color-gray-2" v-for="cal in sem.Dias" :key="cal.iItem">
                                    {{ cal.sDia | DiaOneChar }}
                                </th>
                            </tr>
                            <tr>
                                <th> </th>
                                <th v-for="cal in sem.Dias" :key="cal.iItem">
                                    {{ cal.sfecha | DiaOneNumb }}
                                </th>
                            </tr>
                        </table>
                    </div>
                    <div style="height:300px;overflow:auto" class="col-12">
                        <table class="text-faded-calendary">
                            <!--HORA 9:00-->
                            <tr v-for="rango in sem.Columnas" :key="rango.rango">
                                <td style="font-weight: bold;">{{rango.rango}}</td>
                                <td v-for="dias in sem.Dias" :key="dias.iItem">
                                    <div class="btn_round" v-on:click.once="onIsla(rango.rango,dias.iItem,dias.sfecha,sem.Data)" :style="'background-color:'+setIsla(rango.rango,dias.iItem,sem.Data)"></div>
                                    <!--q-btn round size="6px" :color="setIsla(rango.rango,dias.iItem,sem.Data)"
                                            v-on:click.once="onIsla(rango.rango,dias.iItem,dias.sfecha,sem.Data)" /-->
                                </td>
                            </tr>
                        </table>
                    </div>

                </div>
            </q-carousel-slide>
            <q-carousel-slide v-for="sem in semanas2" :key="sem.Id">
                <div id="calendar" class="fc fc-unthemed fc-ltr">
                    <div>
                        <div class="fc-center" style="color:black">
                            <div class="row">
                                <div class="col-2">
                                    <q-btn flat round icon="arrow_back_ios" @click="vertaller" />
                                </div>
                                <div class="col-8">
                                    <p style="margin: 0;margin-top: 7.5px;margin-bottom: 20px;" class="title-cal">SELECCIONA <b>CITA</b> DISPONIBLE <b>({{sem.Mes}})</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="fc-clear" />
                </div>
                <div class="fc-view fc-agendaDay-view fc-agenda-view" style="">
                    <div v-if="pagina === 'taller'" class="row" style="color:black;margin-bottom: 20px;">
                        <div class="col-2">

                        </div>
                        <div class="col-4 row" style="margin-left: 5px;">
                            <div class="col-4">
                                <div class="btn_round" style="background-color:#0085CA"></div>
                            </div>
                            <div class="col-8" style="margin-top: 5.5px;">Libre</div>
                        </div>
                        <div class="col-4 row">
                            <div class="col-4">
                                <div class="btn_round" style="background-color:#EB0A1E"></div>
                            </div>
                            <div class="col-8" style="margin-top: 5.5px;">Ocupado</div>
                        </div>
                    </div>
                    <div v-if="pagina !== 'taller'" class="row" style="color:black;margin-bottom: 20px;">
                        <div class="col-4 row">
                            <div class="col-4">
                                <div class="btn_round" style="background-color:#0085CA"></div>
                            </div>
                            <div class="col-8" style="margin-top: 5.5px;">Libre</div>
                        </div>
                        <div class="col-4 row">
                            <div class="col-4">
                                <div class="btn_round" style="background-color:#EB0A1E"></div>
                            </div>
                            <div class="col-8" style="margin-top: 5.5px;">Ocupado</div>
                        </div>
                        <div class="col-4 row">
                            <div class="col-4">
                                <div class="btn_round" style="background-color:#9b9999"></div>
                            </div>
                            <div class="col-8" style="margin-top: 5.5px;">Seleccionado</div>
                        </div>
                    </div>
                    <div class="col-8 days" style="color:black">
                        <table>
                            <tr>
                                <th> </th>
                                <th class="color-gray-2" v-for="cal in sem.Dias" :key="cal.iItem">
                                    {{ cal.sDia | DiaOneChar }}
                                </th>
                            </tr>
                            <tr>
                                <th> </th>
                                <th v-for="cal in sem.Dias" :key="cal.iItem">
                                    {{ cal.sfecha | DiaOneNumb }}
                                </th>
                            </tr>
                        </table>
                    </div>
                    <div style="height:300px;overflow:auto" class="col-12">
                        <table class="text-faded-calendary">
                            <!--HORA 9:00-->
                            <tr v-for="rango in sem.Columnas" :key="rango.rango">
                                <td style="font-weight: bold;">{{rango.rango}}</td>
                                <td v-for="dias in sem.Dias" :key="dias.iItem">
                                    <div class="btn_round" v-on:click.once="onIsla(rango.rango,dias.iItem,dias.sfecha,sem.Data)" :style="'background-color:'+setIsla(rango.rango,dias.iItem,sem.Data)"></div>
                                    <!--q-btn round size="6px" :color="setIsla(rango.rango,dias.iItem,sem.Data)"
                                            v-on:click.once="onIsla(rango.rango,dias.iItem,dias.sfecha,sem.Data)" /-->
                                </td>
                            </tr>
                        </table>
                    </div>

                </div>
            </q-carousel-slide>
            <q-carousel-slide v-for="sem in semanas3" :key="sem.Id">
                <div id="calendar" class="fc fc-unthemed fc-ltr">
                    <div>
                        <div class="fc-center" style="color:black">
                            <div class="row">
                                <div class="col-2">
                                    <q-btn flat round icon="arrow_back_ios" @click="vertaller" />
                                </div>
                                <div class="col-8">
                                    <p style="margin: 0;margin-top: 7.5px;margin-bottom: 20px;" class="title-cal">SELECCIONA <b>CITA</b> DISPONIBLE <b>({{sem.Mes}})</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="fc-clear" />
                </div>
                <div class="fc-view fc-agendaDay-view fc-agenda-view" style="">
                    <div v-if="pagina === 'taller'" class="row" style="color:black;margin-bottom: 20px;">
                        <div class="col-2">

                        </div>
                        <div class="col-4 row" style="margin-left: 5px;">
                            <div class="col-4">
                                <div class="btn_round" style="background-color:#0085CA"></div>
                            </div>
                            <div class="col-8" style="margin-top: 5.5px;">Libre</div>
                        </div>
                        <div class="col-4 row">
                            <div class="col-4">
                                <div class="btn_round" style="background-color:#EB0A1E"></div>
                            </div>
                            <div class="col-8" style="margin-top: 5.5px;">Ocupado</div>
                        </div>
                    </div>
                    <div v-if="pagina !== 'taller'" class="row" style="color:black;margin-bottom: 20px;">
                        <div class="col-4 row">
                            <div class="col-4">
                                <div class="btn_round" style="background-color:#0085CA"></div>
                            </div>
                            <div class="col-8" style="margin-top: 5.5px;">Libre</div>
                        </div>
                        <div class="col-4 row">
                            <div class="col-4">
                                <div class="btn_round" style="background-color:#EB0A1E"></div>
                            </div>
                            <div class="col-8" style="margin-top: 5.5px;">Ocupado</div>
                        </div>
                        <div class="col-4 row">
                            <div class="col-4">
                                <div class="btn_round" style="background-color:#9b9999"></div>
                            </div>
                            <div class="col-8" style="margin-top: 5.5px;">Seleccionado</div>
                        </div>
                    </div>
                    <div class="col-8 days" style="color:black">
                        <table>
                            <tr>
                                <th> </th>
                                <th class="color-gray-2" v-for="cal in sem.Dias" :key="cal.iItem">
                                    {{ cal.sDia | DiaOneChar }}
                                </th>
                            </tr>
                            <tr>
                                <th> </th>
                                <th v-for="cal in sem.Dias" :key="cal.iItem">
                                    {{ cal.sfecha | DiaOneNumb }}
                                </th>
                            </tr>
                        </table>
                    </div>
                    <div style="height:300px;overflow:auto" class="col-12">
                        <table class="text-faded-calendary">
                            <!--HORA 9:00-->
                            <tr v-for="rango in sem.Columnas" :key="rango.rango">
                                <td style="font-weight: bold;">{{rango.rango}}</td>
                                <td v-for="dias in sem.Dias" :key="dias.iItem">
                                    <div class="btn_round" v-on:click.once="onIsla(rango.rango,dias.iItem,dias.sfecha,sem.Data)" :style="'background-color:'+setIsla(rango.rango,dias.iItem,sem.Data)"></div>
                                    <!--q-btn round size="6px" :color="setIsla(rango.rango,dias.iItem,sem.Data)"
                                            v-on:click.once="onIsla(rango.rango,dias.iItem,dias.sfecha,sem.Data)" /-->
                                </td>
                            </tr>
                        </table>
                    </div>

                </div>
            </q-carousel-slide>
            <q-carousel-slide v-for="sem in semanas4" :key="sem.Id">
                <div id="calendar" class="fc fc-unthemed fc-ltr">
                    <div>
                        <div class="fc-center" style="color:black">
                            <div class="row">
                                <div class="col-2">
                                    <q-btn flat round icon="arrow_back_ios" @click="vertaller" />
                                </div>
                                <div class="col-8">
                                    <p style="margin: 0;margin-top: 7.5px;margin-bottom: 20px;" class="title-cal">SELECCIONA <b>CITA</b> DISPONIBLE <b>({{sem.Mes}})</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="fc-clear" />
                </div>
                <div class="fc-view fc-agendaDay-view fc-agenda-view" style="">
                    <div v-if="pagina === 'taller'" class="row" style="color:black;margin-bottom: 20px;">
                        <div class="col-2">

                        </div>
                        <div class="col-4 row" style="margin-left: 5px;">
                            <div class="col-4">
                                <div class="btn_round" style="background-color:#0085CA"></div>
                            </div>
                            <div class="col-8" style="margin-top: 5.5px;">Libre</div>
                        </div>
                        <div class="col-4 row">
                            <div class="col-4">
                                <div class="btn_round" style="background-color:#EB0A1E"></div>
                            </div>
                            <div class="col-8" style="margin-top: 5.5px;">Ocupado</div>
                        </div>
                    </div>
                    <div v-if="pagina !== 'taller'" class="row" style="color:black;margin-bottom: 20px;">
                        <div class="col-4 row">
                            <div class="col-4">
                                <div class="btn_round" style="background-color:#0085CA"></div>
                            </div>
                            <div class="col-8" style="margin-top: 5.5px;">Libre</div>
                        </div>
                        <div class="col-4 row">
                            <div class="col-4">
                                <div class="btn_round" style="background-color:#EB0A1E"></div>
                            </div>
                            <div class="col-8" style="margin-top: 5.5px;">Ocupado</div>
                        </div>
                        <div class="col-4 row">
                            <div class="col-4">
                                <div class="btn_round" style="background-color:#9b9999"></div>
                            </div>
                            <div class="col-8" style="margin-top: 5.5px;">Seleccionado</div>
                        </div>
                    </div>
                    <div class="col-8 days" style="color:black">
                        <table>
                            <tr>
                                <th> </th>
                                <th class="color-gray-2" v-for="cal in sem.Dias" :key="cal.iItem">
                                    {{ cal.sDia | DiaOneChar }}
                                </th>
                            </tr>
                            <tr>
                                <th> </th>
                                <th v-for="cal in sem.Dias" :key="cal.iItem">
                                    {{ cal.sfecha | DiaOneNumb }}
                                </th>
                            </tr>
                        </table>
                    </div>
                    <div style="height:300px;overflow:auto" class="col-12">
                        <table class="text-faded-calendary">
                            <!--HORA 9:00-->
                            <tr v-for="rango in sem.Columnas" :key="rango.rango">
                                <td style="font-weight: bold;">{{rango.rango}}</td>
                                <td v-for="dias in sem.Dias" :key="dias.iItem">
                                    <div class="btn_round" v-on:click.once="onIsla(rango.rango,dias.iItem,dias.sfecha,sem.Data)" :style="'background-color:'+setIsla(rango.rango,dias.iItem,sem.Data)"></div>
                                    <!--q-btn round size="6px" :color="setIsla(rango.rango,dias.iItem,sem.Data)"
                                            v-on:click.once="onIsla(rango.rango,dias.iItem,dias.sfecha,sem.Data)" /-->
                                </td>
                            </tr>
                        </table>
                    </div>

                </div>
            </q-carousel-slide>
        </q-carousel>
    </div>
</div>
</template>

<script src="../../../js/calendario.js"/>
