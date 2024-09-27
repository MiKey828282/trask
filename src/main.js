import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate';
import router from './router';

const pinia = createPinia();
pinia.use(piniaPersist);

createApp(App).mount('#app')

const app = createApp(App);

app.use(createPinia());
app.use(pinia);
app.use(router);
app.mount('#app');

