import { createApp } from 'vue';
import store from './store/store';
import App from './App.vue';

import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa4'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'font-awesome/css/font-awesome.min.css'



const app = createApp(App);
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  }
});

app.use(vuetify)
app.use(store);

app.use(vuetify).mount('#app');
