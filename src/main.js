import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Global Styles
import './assets/main.css';

createApp(App)
  .use(router)
  .use(store)
  .mount('#app');
