import { openURL } from 'quasar'
import tallerModel from '../models/footer/citas/tallerModel';
import util from '../util/util';


export default {
  data() {
    return {
      marca: "",
      taller: [
      ],
      columnas: [

      ],
      popup_mapa: false,
      widthMap: window.innerWidth,
      heigthMap: window.innerHeight,
      posicionMapa: { lat: 10, lng: 10 },
      vZoom: 8,
      mapa_html: ""
    }
  },
  created: function () {
    this.codSap = this.$route.params.codSap;
    tallerModel.listar(this);
    this.$datos_generales(this);
  },
  methods: {
    calendario: function (item) {
      this.$router.push({
        name: 'calendario',
        params: {
          taller: item,
          pagina: "taller",
          marcaTaller: this.codSap
        }
      });
    },
    showMap: function (lng, lat) {
      //util.conditionallyAddBySource('script', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB6-ds6YDCHDhm2Wxv0a5_fyWe26hxJYeg');
      this.vZoom = 12;
      this.posicionMapa.lat = lat;
      this.posicionMapa.lng = lng;
      this.popup_mapa = true;
      util.showMapaGoogle(this,lat,lng);
    },
    closeMap: function () {
      this.popup_mapa = false;
    },
    back_taller: function () {
      this.$router.push({
        name: 'marca'
      });
    }
  },
  filters: {
    tallerDesc: function (valor) {
      if (valor === "TOY") {
        return "TOYOTA";
      }

      if (valor === "LEX") {
        return "LEXUS";
      }

      if (valor === "HIN") {
        return "HINO";
      }
    }
  }
}
