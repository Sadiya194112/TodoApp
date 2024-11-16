import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Ensure Vuetify styles are imported
import { aliases, mdi } from 'vuetify/iconsets/mdi'; // Ensure icons are imported
import '@mdi/font/css/materialdesignicons.css'; // Material Design Icons

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
});

const app = createApp(App);
app.use(store);
app.use(vuetify)
app.mount('#app')
