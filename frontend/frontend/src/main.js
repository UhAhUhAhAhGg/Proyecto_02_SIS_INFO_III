import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // importación del router

createApp(App).use(router).mount('#app'); // inicialización de la app
