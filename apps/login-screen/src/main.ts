import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';

import '@leopple-games/styles/normalize';
import { createBootstrap } from '@leopple-games/styles/bootstrap/vue-bootstrap';

const app = createApp(App);

app.use(createPinia());
app.use(createBootstrap());

app.mount('#app');
