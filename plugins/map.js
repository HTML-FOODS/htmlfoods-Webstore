import Vue from 'vue'
import * as VueGoogleMaps from "vue2-google-maps" // Import package

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAiVp2qbQhCVb1WhCv11Kcs9yD1C36q_Hs",
    libraries: "places"
  }
});

// former Api key
//AIzaSyB1D3VXAKPOZ8Lk9NGVEZyKJ3d96WbhsvE