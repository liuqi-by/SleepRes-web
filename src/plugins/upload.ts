import uploader from 'vue-simple-uploader';

import 'vue-simple-uploader/dist/style.css';

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(uploader);
});
