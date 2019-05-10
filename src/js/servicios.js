export default {
    created() {
        this.data_historial = this.$route.params;
        this.listaCitas = this.data_historial.servicios.listCitas;
    },
    methods:
    {
        verhistorial: function () {
            //this.$parent.$parent.$parent.footer(4);
            this.$root.$emit('backHistorial');
        }
    }

}