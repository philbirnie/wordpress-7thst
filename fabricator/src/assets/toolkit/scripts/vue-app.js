/**
 * Load up Vue.js and axios to be used globally
 *
 */

import Vue from 'vue';
import axios from 'axios';

window.Vue = Vue;
window.axios = axios;

if (IS_DEV) {
    Vue.config.devtools = true;
}
