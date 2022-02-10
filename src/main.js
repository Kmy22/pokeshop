import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Primevue from 'primevue/config'
import Button from 'primevue/button'
import Inputtext from 'primevue/inputtext'
import Rating from 'primevue/rating'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'

import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons


const app = createApp(App);
app.use(router);
app.use(Primevue);
app.use(ToastService);

app.component('Button',Button);
app.component('Inputtext',Inputtext);
app.component('Rating',Rating);
app.component('Toast',Toast);

app.mount('#app');

