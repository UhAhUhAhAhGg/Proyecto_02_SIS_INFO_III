import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // importación del router
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'animate.css'


createApp(App).use(router).mount('#app'); // inicialización de la app
