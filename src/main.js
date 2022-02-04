import { createApp } from 'vue'
import App from './App.vue'

import Primevue from 'primevue/config'
import Button from 'primevue/button'
import Inputtext from 'primevue/inputtext'

import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons

const app = createApp(App);
app.use(Primevue);

app.component('Button',Button);
app.component('Inputtext',Inputtext);

app.mount('#app');
