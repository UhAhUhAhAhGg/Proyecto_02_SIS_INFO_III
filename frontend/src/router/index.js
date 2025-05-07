import { createRouter, createWebHistory } from 'vue-router';
import UsuariosComponente from '../components/UsuariosComponente.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import InicioVue from '@/components/InicioVue.vue';
import EditarCSV from '@/components/EditarCSV.vue';
const routes = [
  {
    path: '/usuarios',
    //path: '/hello',
    name: 'Usuarios',
    //name: 'hello',
    component: UsuariosComponente,
    //component: HelloWorld,
  },
  {
    path: '/hello',
    name: 'HelloWorld',
    component: HelloWorld,
  },
  {
    path: '/',
    name: 'Inicio',
    component: InicioVue
  },
  {
    path: '/EditarCSV',
    name: 'EditarCSV',
    component: EditarCSV,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
