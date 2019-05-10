import util from '../util/util';
import homeModel from "../models/footer/homeModel";
// import jQuery from "jquery";
// global.jQuery = jquery;
// global.$ = jQuery;


var store = require('store')
export default {
  data() {
    return {
  
    }
  },
  methods:
  {

    onActive: function (event) {
      console.log("holasss");
      this.$router.push({ name: 'detalle' });    
    },
    onItem:function(oEvent){

      var classElements=document.getElementsByClassName("item-toolbar");

     

      // $(".item-toolbar").removeClass("active");
       for(var i= 0; i< classElements.length ; i++ ){
        classElements[i].classList.remove("active");
       }     
       
       oEvent.target.classList.add("active");    
      var numItem= oEvent.target.dataset.item ;
      var itemSelect=document.getElementsByName(numItem);
      console.log("existe item seleccionado",itemSelect);
      // var scrollItem=itemSelect.offsetTop() + 220;

     var body =  document.body;
     body.animate({
      scrollTop: 100
  }, 1000);
    

    }  ,

    onScroll:function(){
      $('.item-menu').removeClass('active');
      $(this).addClass('active');
      $itemMenuSelect = $(this).data('item');
      $timeLineSelect = $('[data-time="' + $itemMenuSelect + '"]');
      if (widthWindows < 922) {
          $targetOffset = $timeLineSelect.offset().top - 240;
      } else {
          $targetOffset = $timeLineSelect.offset().top - 75;
      }
      $('html,body').animate({
          scrollTop: $targetOffset
      }, 1000);
    }
  },
  created() {
    // var recoveryDataUser = this.$route.params.dataMenu;
    // this.puntosDrawer = recoveryDataUser.iPuntos;
    // this.usuarioDrawer = recoveryDataUser.sNombre;
    // this.dniDrawer = recoveryDataUser.sNumIdentificacion;
    // this.emailDrawer = recoveryDataUser.sUsuario;
    // localStorage.puntos = recoveryDataUser.iPuntos;
    // this.icon_selector = "time";
    // this.$root.$on('backHistorial', this.backHistorial);
    // this.$root.$on('toHomeNotificacion', this.toHomeNotificacion);
  }
}
