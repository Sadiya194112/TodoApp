import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa4'
import { mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'font-awesome/css/font-awesome.min.css'




const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      fa,
      mdi,
    },
  }
});


const app = createApp(App);
app.use(store);
app.use(vuetify)
app.use(store)
app.mount('#app')
