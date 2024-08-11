import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
//import { Carousel, Slide } from 'vue3-carousel'; // Importa los componentes del carrusel
//import 'vue3-carousel/dist/carousel.css'; // Importa los estilos del carrusel

const app = createApp(App);

app.use(router);

// Registra los componentes del carrusel globalmente
//app.component('Carousel', Carousel);
//app.component('Slide', Slide);

app.mount('#app');
