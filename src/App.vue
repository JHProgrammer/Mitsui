<template>
  <div id="q-app" :style="'min-height:' + $deviceSize.heigth +'px !important;position: absolute;overflow: scroll;'">
    <router-view/>
     <!--<transition   enter-active-class="animated zoomOut" mode="out-in" appear>
        <router-view/>
     </transition>-->
  </div>
</template>
<script>
export default {name: 'App'}
</script>
<style/>