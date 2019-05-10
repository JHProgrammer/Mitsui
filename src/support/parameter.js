import cte from '../support/constant';

/*Base*/
export const BASE   = process.env.DEV ? '/mitsuicitas/' : 'https://mitsuib1747ff0c.us1.hana.ondemand.com/'; //'https://mitsuib1747ff0c.us1.hana.ondemand.com/';
export const AMB_ID = cte.isPRD ? 'MitsuiCitasPrd/Movil/' : 'MitsuiCitasDev/Movil/';

/*Metodo*/
export const MET_LOGIN = 'Autenticacion/';
export const MET_REGIS = 'Usuarios/';
export const MET_CONTR = 'RecuperarClave/';
export const MET_NOTIC = 'Noticias/';
export const MET_BENEF = 'Beneficios/';
export const MET_EVENT = 'Eventos/';
export const MET_ACCES = 'Accesorios/';
export const MET_REPUS = 'Repuestos/';
export const MET_CANJE = 'Productos/';
export const MET_TALLER = 'Taller/';
export const MET_CALENDARIO = 'TallerCalendario/';
export const MET_GENERICA = 'Generica/';
export const MET_VEHICULO = 'Vehiculo/';
export const MET_EXPRESS = 'Express/';
export const MET_CITAS_PENDIENTES = 'CitasPendientes/';
export const MET_CITAS_REGISTRAR = 'RegistrarCita/';

export const MET_HISTORIAL = 'HistorialCitas/';
export const MET_ELIMINAR_CITA = 'EliminarCita/';
export const MET_ACTUALIZAR_CITA = 'ActualizarCita/';
export const MET_KILOMETRAJE = 'Kilometraje/';
export const MET_TOKEN = 'TokenFirebase/';
export const MET_NOTICIA_INTERNA = 'NoticiaInterna/';
export const MET_NOTICIA_EXTERNA = 'NoticiaExterna/';
export const MET_EVENTO_ID = 'Evento/';
export const MET_BENEFICIO_ID = 'Beneficio/';
//GNM{
export const MET_MARCA_SERVICIO = 'MarcaServicios/';
export const MET_CITAS_PROVICIONAL = 'RegistrarCitaProvisional/';
export const MET_ACTUALIZAR_CALENDARIO = 'ActualizarCitaCalendario/';
//}https://mitsuib1747ff0c.us1.hana.ondemand.com/MitsuiCitasDev/Movil/RegistrarCitaProvisional/

/*Url*/
export const URL_LOGIN = BASE + AMB_ID + MET_LOGIN;
export const URL_REGIS = BASE + AMB_ID + MET_REGIS;
export const URL_CONTR = BASE + AMB_ID + MET_CONTR;
export const URL_NOTIC = BASE + AMB_ID + MET_NOTIC;
export const URL_BENEF = BASE + AMB_ID + MET_BENEF;
export const URL_EVENT = BASE + AMB_ID + MET_EVENT;
export const URL_ACCES = BASE + AMB_ID + MET_ACCES;
export const URL_REPUS = BASE + AMB_ID + MET_REPUS;
export const URL_CANJE = BASE + AMB_ID + MET_CANJE;
export const URL_TALLER = BASE + AMB_ID + MET_TALLER;
export const URL_CALENDARIO = BASE + AMB_ID + MET_CALENDARIO;
export const URL_GENERICA = BASE + AMB_ID + MET_GENERICA;
export const URL_VEHICULO = BASE + AMB_ID + MET_VEHICULO;
export const URL_EXPRESS = BASE + AMB_ID + MET_EXPRESS;
export const URL_CITAS_PENDIENTES = BASE + AMB_ID + MET_CITAS_PENDIENTES;
export const URL_CITAS_HISTORIAL = BASE + AMB_ID + MET_HISTORIAL;
export const URL_CITAS_REGISTRAR = BASE + AMB_ID + MET_CITAS_REGISTRAR;
export const URL_CITAS_ELIMINAR = BASE + AMB_ID + MET_ELIMINAR_CITA;
export const URL_CITAS_ACTUALIZAR = BASE + AMB_ID + MET_ACTUALIZAR_CITA;
export const URL_KILOMETRAJE = BASE + AMB_ID + MET_KILOMETRAJE;
export const URL_TOKEN = BASE + AMB_ID + MET_TOKEN;
export const URL_NOTICIA_INTERNA = BASE + AMB_ID + MET_NOTICIA_INTERNA;
export const URL_NOTICIA_EXTERNA = BASE + AMB_ID + MET_NOTICIA_EXTERNA;
export const URL_NOTICIA_EVENTO_ID = BASE + AMB_ID + MET_EVENTO_ID;
export const URL_BENEFICIO_ID = BASE + AMB_ID + MET_BENEFICIO_ID;

// WEBSERVICES V2
export const URL_SERVICIO_MARCA = BASE + AMB_ID + MET_MARCA_SERVICIO;
export const URL_CITAS_REGISTRAR_PROVICIONA = BASE + AMB_ID + MET_CITAS_PROVICIONAL;
export const URL_ACTUALIZAR_CALENDARIO = BASE + AMB_ID + MET_ACTUALIZAR_CALENDARIO;


