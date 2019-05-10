import login from '../pages/Login.vue'
import menu from 'layouts/Menu.vue'
import citas from 'layouts/Citas.vue'
/*Home */
import home from '../pages/footer/Home.vue'
/**Footer */
import producto from '../pages/footer/Producto.vue'
import historial from '../pages/footer/Historial.vue'
import contacto from '../pages/footer/Contacto.vue'
/*citas */
import taller from '../pages/footer/citas/Taller.vue'
import lista from '../pages/footer/citas/Lista.vue'
import detalle from '../pages/footer/citas/Detalle.vue'
import marca from '../pages/footer/citas/Marca.vue'
/*Historial */
import servicios from '../pages/dashboard/Servicios.vue'
import calendario from '../pages/footer/citas/Calendario.vue'
import Cita from '../pages/footer/citas/Cita.vue'
import Vehiculo from '../pages/footer/citas/Vehiculo.vue'
/*Splash */
import splash from '../pages/Splash.vue'

export default[
  { 
    path: '/', 
    name:'splash',
    component: login
  },
  { 
    path: '/login', 
    name:'login',
    component: login
  },
  
         
  {
    path: '/menu', 
    component: menu,
    children: 
    [
      {
        path:'/menu/detalle',   
        name:'detalle', 
        component: detalle
      },
       {
        path:'/menu/citas',
        component: citas,
        children:
        [
          {
            path:'/menu/citas/marca',   
            name:'marca', 
            component: marca
          },
          {		          
            path:'/menu/citas/lista',   		
            name:'lista', 		
            component: lista		
          },
          {
            path:'/menu/citas/taller',   
            name:'taller', 
            component: taller
          },
          {
            path:'/menu/citas/calendario',   
            name:'calendario', 
            component: calendario
          },
          {
            path:'/menu/citas/cita',   
            name:'cita', 
            component: Cita
          },
          {
            path:'/menu/citas/vehiculo',   
            name:'vehiculo', 
            component: Vehiculo
          }
        ]
       },
       { 
        path:'/menu/home',   
        name:'home', 
        component: home
       },
       { 
        path:'/menu/producto',   
        name:'producto', 
        component:producto
       },
       { 
          path:'/menu//historial',   
          name:'historial', 
          component:historial
       },
       { 
          path:'/menu//contacto',   
          name:'contacto', 
          component:contacto
       },
       /*Dashboard */
       {
          path:'/menu//servicios',   
          name:'servicios', 
          component: servicios
        }       
    ]
  }
]
  

