<template>
    <div style="margin-top: 5%">
        <div  id="principal-title" class="text-center cont-title">SELECCIONA LA MARCA PARA<br>REALIZAR TU CITA</div>
        <div class="row" v-if="visible_marcas">
            <div class="col-6" style="margin:auto;padding: 10px; text-align:center; margin-bottom: 40px;" v-for="item in marcas" :key="item.iId">
               <img class="img-auto" :src="$imageMemory(item.sDescripcion)" @click="marca(item.sCodigoSap)">
            </div>
        </div>
    </div>
</template>
<script src="../../../js/marca.js"/>

